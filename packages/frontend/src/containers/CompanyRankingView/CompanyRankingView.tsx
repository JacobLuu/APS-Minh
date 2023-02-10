import debounce from "lodash/debounce";
import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import TabContext from "@material-ui/lab/TabContext";

import BreadcrumbsHeader from "../../components/BreadcrumbsHeader";
import Text from "../../components/Text";
import { CategoryType, ColumnIndex, SortOrder } from "../../constants/enums";
import { DASHBOARD_PATH, RANK_PERFORMANCE_PATH } from "../../constants/paths";
import {
  getRankingListRequest,
  IQueryParams,
  selectCompanyRankingCategoryView,
} from "../../reducers/company_ranking_category_view";
import {
  getRankingListRequest as getRankingListRequestFactoryView,
  selectCompanyRankingFactoryView,
} from "../../reducers/company_ranking_factory_view";
import { getSectorsRequested, selectSectors } from "../../reducers/sectors";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { COLOR_BOX_SHADOW, COLOR_PRIMARY } from "../../themes/colors";
import { useSelectedTab } from "../../utils/customHooks";
import { searchParamsToObject } from "../../utils/miscellaneous";
import CompanyRow from "./components/CompanyRow";
import FactorScore from "./components/Factor";
import RankPerformanceFilter from "./components/RankPerformanceFilter";
import {
  ArrowBox,
  ArrowDown,
  ArrowUp,
  ColumnHeading,
  PaginationBox,
  RankPagination,
  RankPerformanceContainer,
  SettingsTab,
  TabContainer,
  Title,
} from "./styles";

enum SettingsTabValue {
  OverallScore = 1,
  Environmental = 2,
  Social = 3,
  Governance = 4,
}

const DEFAULT_PAGE = "1";
const DEFAULT_OFFSET = 0;
const DEFAULT_ROWS_PER_PAGE_OPTIONS = [10, 20, 50];

enum URLParamKeys {
  tab = "tab",
  sector = "sector",
  factor = "factor",
  keyword = "keyword",
  category = "category",
  direction = "direction",
  limit = "limit",
  page = "page",
}

const CompanyRankingView = () => {
  const location = useLocation();
  const history = useHistory();
  const { search } = location;

  const {
    rankingList: rankingListCategoryView,
    totalCount: totalCountCategoryView,
  } = useAppSelector(selectCompanyRankingCategoryView);
  const {
    rankingList: rankingListFactoryView,
    totalCount: totalCountFactoryView,
  } = useAppSelector(selectCompanyRankingFactoryView);
  const dispatch = useAppDispatch();
  const { selectedTab, handleChangeTab } = useSelectedTab(
    String(SettingsTabValue.OverallScore)
  );
  const { t } = useTranslation();
  const [direction, setDirection] = React.useState(SortOrder.desc);
  const [currentPage, setCurrentPage] = React.useState<string>(DEFAULT_PAGE);
  const [limit, setLimit] = React.useState(10);
  const [companySearchKeyword, setCompanySearchKeyword] = React.useState("");
  const [selectedSectorId, setSelectedSectorId] =
    React.useState<string>(undefined);
  // Todo: use two states below to display which columns are active
  const [selectedColumnIndex, setSelectedColumnIndex] = React.useState(null);
  const [selectedCategoryId, setSelectedCategoryId] =
    React.useState<string>(undefined);
  const [selectedFactorId, setSelectedFactorId] =
    React.useState<string>(undefined);
  const sectorsState = useAppSelector(selectSectors);
  const breadCrumbs = useMemo(() => {
    return [
      {
        label: t("login:dashboard_header.dashboard"),
        path: DASHBOARD_PATH,
      },
      {
        label: t("ranking_feature:create_ranking.rank_performance"),
      },
    ];
  }, []);

  const debounceNavigation = React.useRef(debounce(history.push, 1000));

  const handleSearchKeyword = (value: string) => {
    setCompanySearchKeyword(value);
    const currentParamsObject = new URLSearchParams(search);
    if (value) {
      currentParamsObject.set(URLParamKeys.keyword, value);
    } else {
      currentParamsObject.delete(URLParamKeys.keyword);
    }
    // This will TRIGGER the useEffect with [search] below
    debounceNavigation.current({
      search: currentParamsObject.toString(),
    });
  };

  // all params handlers here but not for search keyword param due to the debounce
  const handleChangeURLParams = (
    params: Partial<{ [key in URLParamKeys]: string }>
  ) => {
    const currentParamsObject = new URLSearchParams(search);
    const paramKeys = Object.keys(params);
    let hasURLChanged = false;
    let hasTabChanged = false;
    paramKeys.forEach((key) => {
      const currentValue = params[key];
      const oldValue = currentParamsObject.get(key);
      if (oldValue !== `${currentValue}`) {
        if (!currentValue) {
          currentParamsObject.delete(key);
        } else {
          currentParamsObject.set(key, currentValue);
        }
        hasURLChanged = true;
        if (key === URLParamKeys.tab) {
          hasTabChanged = true;
        }
      }
    });
    // Only navigate when the URL string changes
    if (hasURLChanged) {
      // If the param is not "page", set "page" back to default
      if (!paramKeys.includes(URLParamKeys.page)) {
        currentParamsObject.delete(URLParamKeys.page);
      }
      if (hasTabChanged) {
        // Reset the factor param when tab change
        currentParamsObject.delete(URLParamKeys.factor);
      }
      //  This will TRIGGER the useEffect with [search] below
      history.push({
        search: currentParamsObject.toString(),
      });
    }
  };

  const getRankingList = () => {
    const searchParamsObject = searchParamsToObject(search);
    const {
      tab,
      sector,
      factor,
      keyword,
      category,
      limit: limitFromURL,
      page,
      direction: directionParam,
    } = searchParamsObject as { [k in URLParamKeys]: string };
    let limitOption;
    if (DEFAULT_ROWS_PER_PAGE_OPTIONS.includes(+limitFromURL)) {
      setLimit(+limitFromURL);
      limitOption = +limitFromURL;
    } else {
      // if it's not the limit change in the URL, then fall back to default
      setLimit(DEFAULT_ROWS_PER_PAGE_OPTIONS[0]);
      limitOption = DEFAULT_ROWS_PER_PAGE_OPTIONS[0];
    }
    const searchKeyword = keyword?.replaceAll("+", " ");
    const commonQueryParams = {
      limit: limitOption,
      offset: (+page - 1) * limitOption || DEFAULT_OFFSET,
      keyword: searchKeyword,
      sector_id: sector,
      direction: (directionParam === SortOrder.asc
        ? "asc"
        : "desc") as IQueryParams["direction"],
    };

    if (tab === `${SettingsTabValue.OverallScore}` || !tab) {
      dispatch(
        getRankingListRequest({
          ...commonQueryParams,
          category_id: category,
        })
      );
    } else {
      dispatch(
        getRankingListRequestFactoryView({
          ...commonQueryParams,
          category_id: `${+tab - 1}`,
          factor_id: factor,
        })
      );
    }
    // All these three below could have undefined state
    setSelectedSectorId(sector);
    setSelectedCategoryId(category);
    setSelectedFactorId(factor);
    if (selectedTab !== tab) {
      setSelectedFactorId(undefined);
      if (tab === undefined) {
        // when first get in the page
        handleChangeTab(null, SettingsTabValue.OverallScore);
      } else {
        handleChangeTab(null, tab);
      }
    }
    if (directionParam !== direction) {
      setDirection((directionParam as SortOrder) || SortOrder.desc);
    }
    setLimit(limitOption);
    if (page !== currentPage) {
      setCurrentPage(page || DEFAULT_PAGE);
    }
    setCompanySearchKeyword(searchKeyword || "");
  };

  useEffect(() => {
    getRankingList();
  }, [search]);

  const handleSort = (targetSortId: string | CategoryType) => {
    const isAsc = direction === SortOrder.desc;
    const newDirection = isAsc ? SortOrder.asc : SortOrder.desc;
    if (selectedTab === `${SettingsTabValue.OverallScore}`) {
      handleChangeURLParams({
        [URLParamKeys.category as string]: targetSortId,
        [URLParamKeys.direction]: newDirection,
      });
    } else {
      handleChangeURLParams({
        [URLParamKeys.factor as string]: targetSortId,
        [URLParamKeys.direction]: newDirection,
      });
    }
  };

  const getNumbersOfPages = React.useMemo(() => {
    if (selectedTab === `${SettingsTabValue.OverallScore}`) {
      return Math.ceil(totalCountCategoryView / limit);
    }
    return Math.ceil(totalCountFactoryView / limit);
  }, [totalCountCategoryView, totalCountFactoryView, limit]);

  const showingResultsPagination = (totalCount, page, rowsPerPage) => {
    let recordFrom = 0;
    let recordTo = 0;

    if (totalCount < 1) {
      recordFrom = 0;
    } else recordFrom = (page - 1) * rowsPerPage + 1;

    if (page * rowsPerPage < totalCount) {
      recordTo = page * rowsPerPage;
    } else recordTo = totalCount;
    return `Showing ${recordFrom} - ${recordTo} of ${totalCount} results`;
  };

  const handleChangeLimit = (e) => {
    const { value: limitValue } = e.target;
    handleChangeURLParams({ [URLParamKeys.limit]: limitValue });
  };

  const handleChangePage = (page) => {
    handleChangeURLParams({ [URLParamKeys.page]: `${page}` });
  };

  React.useEffect(() => {
    dispatch(getSectorsRequested());
  }, []);

  return (
    <RankPerformanceContainer
      maxWidth={false}
      disableGutters={location.pathname !== RANK_PERFORMANCE_PATH}
    >
      {location.pathname === RANK_PERFORMANCE_PATH && (
        <BreadcrumbsHeader items={breadCrumbs} />
      )}
      {location.pathname === RANK_PERFORMANCE_PATH && (
        <Box pt={2.5}>
          <TabContext value={selectedTab}>
            <TabContainer
              TabIndicatorProps={{ style: { display: "none" } }}
              value={selectedTab}
              onChange={(e, value) => {
                handleChangeURLParams({ [URLParamKeys.tab]: value });
              }}
              aria-label="tabs"
            >
              <SettingsTab
                $active={selectedTab === `${SettingsTabValue.OverallScore}`}
                label={t("ranking_feature:create_ranking.overall_score")}
                value={`${SettingsTabValue.OverallScore}`}
              />
              <SettingsTab
                $active={selectedTab === `${SettingsTabValue.Environmental}`}
                label={t("ranking_feature:create_ranking.environment")}
                value={`${SettingsTabValue.Environmental}`}
              />
              <SettingsTab
                $active={selectedTab === `${SettingsTabValue.Social}`}
                label={t("ranking_feature:create_ranking.social")}
                value={`${SettingsTabValue.Social}`}
              />
              <SettingsTab
                $active={selectedTab === `${SettingsTabValue.Governance}`}
                label={t("ranking_feature:create_ranking.governance")}
                value={`${SettingsTabValue.Governance}`}
              />
            </TabContainer>
          </TabContext>
        </Box>
      )}
      <Paper
        style={{
          padding: "20px 20px 1px",
          height: "100%",
          boxShadow: `${COLOR_BOX_SHADOW}`,
          borderRadius: "4px 4px 0px 0px",
        }}
      >
        {location.pathname !== RANK_PERFORMANCE_PATH && (
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Text $weight="bold" $size="md">
              Rank performance
            </Text>
            <Text
              $color={COLOR_PRIMARY}
              $weight="bold"
              $size="md"
              $hasCursor
              onClick={() => history.push(RANK_PERFORMANCE_PATH)}
            >
              View more
            </Text>
          </Box>
        )}
        <RankPerformanceFilter
          keyword={companySearchKeyword}
          selectedSectorId={selectedSectorId}
          setCompanySearch={handleSearchKeyword}
          setSelectedSectorId={(id) => {
            handleChangeURLParams({ [URLParamKeys.sector]: id });
          }}
          sectors={sectorsState.sectors}
        />
      </Paper>
      <Paper
        style={{
          height: "100%",
          boxShadow: `${COLOR_BOX_SHADOW}`,
        }}
      >
        <Container style={{ padding: 0 }} maxWidth={false}>
          <TableContainer>
            <Table aria-label="company table">
              <TableHead className="ranking_title">
                {selectedTab === `${SettingsTabValue.OverallScore}` ? (
                  <TableRow>
                    {selectedSectorId && (
                      // Todo: put this into translation
                      <Title align="left">Rank</Title>
                    )}
                    <Title align="left">
                      {t("ranking_feature:create_ranking.company")}
                    </Title>
                    <Title align="left">
                      {t("ranking_feature:create_ranking.sector")}
                    </Title>
                    <Title align="center">
                      <Box display="flex" justifyContent="center">
                        <ColumnHeading
                          style={{ width: "fit-content" }}
                          $isActive={
                            selectedColumnIndex === ColumnIndex.OverallScore
                          }
                        >
                          {t("ranking_feature:create_ranking.overall_score")}
                        </ColumnHeading>
                        <ArrowBox
                          onClick={() => {
                            setSelectedColumnIndex(ColumnIndex.OverallScore);
                            handleSort(undefined);
                          }}
                        >
                          <ArrowUp
                            color={
                              direction === SortOrder.asc
                                ? "primary"
                                : "disabled"
                            }
                          />
                          <ArrowDown
                            color={
                              direction === SortOrder.desc
                                ? "primary"
                                : "disabled"
                            }
                          />
                        </ArrowBox>
                      </Box>
                    </Title>
                    <Title align="center">
                      <Box display="flex" justifyContent="center">
                        <ColumnHeading
                          style={{ width: "fit-content" }}
                          $isActive={
                            selectedColumnIndex === ColumnIndex.Environmental
                          }
                        >
                          {t("ranking_feature:create_ranking.environment")}
                        </ColumnHeading>
                        <ArrowBox
                          onClick={() => {
                            setSelectedColumnIndex(ColumnIndex.Environmental);
                            handleSort(CategoryType.environmental);
                          }}
                        >
                          <ArrowUp
                            color={
                              direction === SortOrder.asc
                                ? "primary"
                                : "disabled"
                            }
                          />
                          <ArrowDown
                            color={
                              direction === SortOrder.desc
                                ? "primary"
                                : "disabled"
                            }
                          />
                        </ArrowBox>
                      </Box>
                    </Title>
                    <Title align="center">
                      <Box display="flex" justifyContent="center">
                        <ColumnHeading
                          style={{ width: "fit-content" }}
                          $isActive={selectedColumnIndex === ColumnIndex.Social}
                        >
                          {t("ranking_feature:create_ranking.social")}
                        </ColumnHeading>
                        <ArrowBox
                          onClick={() => {
                            setSelectedColumnIndex(ColumnIndex.Social);
                            handleSort(CategoryType.social);
                          }}
                        >
                          <ArrowUp
                            color={
                              direction === SortOrder.asc
                                ? "primary"
                                : "disabled"
                            }
                          />
                          <ArrowDown
                            color={
                              direction === SortOrder.desc
                                ? "primary"
                                : "disabled"
                            }
                          />
                        </ArrowBox>
                      </Box>
                    </Title>
                    <Title align="center">
                      <Box display="flex" justifyContent="center">
                        <ColumnHeading
                          style={{ width: "fit-content" }}
                          $isActive={
                            selectedColumnIndex === ColumnIndex.Governance
                          }
                        >
                          {t("ranking_feature:create_ranking.governance")}
                        </ColumnHeading>
                        <ArrowBox
                          onClick={() => {
                            setSelectedColumnIndex(ColumnIndex.Governance);
                            handleSort(CategoryType.governance);
                          }}
                        >
                          <ArrowUp
                            color={
                              direction === SortOrder.asc
                                ? "primary"
                                : "disabled"
                            }
                          />
                          <ArrowDown
                            color={
                              direction === SortOrder.desc
                                ? "primary"
                                : "disabled"
                            }
                          />
                        </ArrowBox>
                      </Box>
                    </Title>
                  </TableRow>
                ) : (
                  <TableRow>
                    {selectedSectorId && (
                      // Todo: put this into translation
                      <Title align="left">Rank</Title>
                    )}
                    <Title align="left">
                      {t("ranking_feature:create_ranking.company")}
                    </Title>
                    <Title align="left">
                      {t("ranking_feature:create_ranking.sector")}
                    </Title>
                    {rankingListFactoryView[0]?.factors.map(
                      ({ factor_label, factor_id }) => (
                        <Title align="center" key={factor_id}>
                          <Box display="flex" justifyContent="center">
                            <ColumnHeading
                              style={{ width: "fit-content" }}
                              $isActive={selectedColumnIndex === factor_id}
                            >
                              {factor_label}
                            </ColumnHeading>
                            <ArrowBox
                              onClick={() => {
                                setSelectedColumnIndex(factor_id);
                                handleSort(factor_id);
                              }}
                            >
                              <ArrowUp
                                color={
                                  direction === SortOrder.asc
                                    ? "primary"
                                    : "disabled"
                                }
                              />
                              <ArrowDown
                                color={
                                  direction === SortOrder.desc
                                    ? "primary"
                                    : "disabled"
                                }
                              />
                            </ArrowBox>
                          </Box>
                        </Title>
                      )
                    )}
                  </TableRow>
                )}
              </TableHead>
              {selectedTab === `${SettingsTabValue.OverallScore}` ? (
                <TableBody>
                  {rankingListCategoryView.map((rowItem) => (
                    <CompanyRow
                      // Todo: group props below into more concise props. Eg: companyInfo...
                      key={rowItem.company_id}
                      company_id={rowItem.company_id}
                      shouldShowRankColumn={!!selectedSectorId}
                      rankingOrderInSector={rowItem.ranking_order_in_sector}
                      company_name={rowItem.company_name}
                      sector_name={rowItem.sector_name}
                      company_score_overall_score={
                        rowItem.company_overall_score
                      }
                      category_scores={rowItem.category_scores}
                      category_label={
                        CategoryType[rowItem.category_scores[0].id]
                      }
                      getRankingList={getRankingList}
                      selectedColumnIndex={selectedColumnIndex}
                    />
                  ))}
                </TableBody>
              ) : (
                <TableBody>
                  {rankingListFactoryView.map((item) => (
                    <FactorScore
                      key={item.company_id}
                      company_id={item.company_id}
                      company_name={item.company_name}
                      sector_name={item.sector_name}
                      factors={item.factors}
                      shouldShowRankColumn={!!selectedSectorId}
                      rankingOrderInSector={
                        selectedSectorId
                          ? item.ranking_order_in_sector
                          : undefined
                      }
                      selectedColumnIndex={selectedColumnIndex}
                    />
                  ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>

          <PaginationBox>
            <Box display="flex" alignItems="center">
              <Select
                // setValue for the input via this props
                native
                variant="outlined"
                onChange={handleChangeLimit}
                value={limit}
                style={{ margin: "0px 10px" }}
              >
                {DEFAULT_ROWS_PER_PAGE_OPTIONS.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </Select>
              <Typography>
                {selectedTab === `${SettingsTabValue.OverallScore}`
                  ? showingResultsPagination(
                      totalCountCategoryView,
                      currentPage,
                      limit
                    )
                  : showingResultsPagination(
                      totalCountFactoryView,
                      currentPage,
                      limit
                    )}
              </Typography>
            </Box>

            <RankPagination
              page={+currentPage}
              color="primary"
              shape="rounded"
              count={getNumbersOfPages}
              onChange={(e, page) => handleChangePage(page)}
            />
          </PaginationBox>
        </Container>
      </Paper>
    </RankPerformanceContainer>
  );
};

export default React.memo(CompanyRankingView);
