import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";

import { score_gradient } from "../../assets/images";
import BreadcrumbsHeader from "../../components/BreadcrumbsHeader";
import HeatMap from "../../components/HeatMap";
import { CategoryType, FilterRankPerformanceType } from "../../constants/enums";
import PATHS from "../../constants/paths";
import {
  getCompaniesRankingRequested,
  selectCompaniesRanking,
} from "../../reducers/companies_ranking";
import {
  getCategoriesDropdownListRequested,
  selectRankingDropdownList,
} from "../../reducers/ranking_dropdown_list";
import { selectUser } from "../../reducers/user";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { SONIC_GRAY, TEXT_COLOR_GREY } from "../../themes/colors";
import { RequestStates } from "../../types/request";
import { useLabelTranslation } from "../../utils/customHooks";
import { TRIMMED_VALIDATION_RULES } from "../../utils/formValidator";
import { capitalizeText } from "../../utils/miscellaneous";
import {
  ChartContainer,
  FactorCategories,
  GroupSelect,
  Image,
  RankPerformanceContainer,
  ScoreGradient,
  SectorSelect,
  SelectBox,
  Text,
} from "./styles";

const defaultSectorValue = 1;

const RankPerformance = () => {
  const { control } = useForm();
  const { t } = useTranslation();
  const { search } = useLocation();
  const sector_id = new URLSearchParams(search).get("sector_id");
  const category_id = new URLSearchParams(search).get("category_id");
  const [sectorValue, setSectorValue] = React.useState(
    parseInt(sector_id, 10) || defaultSectorValue
  );
  const { translateSectorLabel, translateCategoryLabel } =
    useLabelTranslation();
  const { language } = useAppSelector(selectUser);
  const [categoryValue, setCategoryValue] = React.useState(
    parseInt(category_id, 10) || CategoryType.environmental
  );
  const [selectedFilter, setSelectedFilter] = React.useState(
    FilterRankPerformanceType.all_companies
  );
  const dispatch = useAppDispatch();
  const categoriesDropdownListState = useAppSelector(selectRankingDropdownList);
  const { notNullList: rankingCandidates, getCompaniesRankingStatus } =
    useAppSelector(selectCompaniesRanking);
  const handleChangeSector = (event) => {
    setSectorValue(event.target.value);
    setSelectedFilter(FilterRankPerformanceType.all_companies);
  };

  const handleChangeCategory = (event) => {
    setCategoryValue(event.target.value);
    setSelectedFilter(FilterRankPerformanceType.all_companies);
  };

  const handleChangeFilter = (event) => {
    setSelectedFilter(event.target.value);
  };

  const breadCrumbs = React.useMemo(() => {
    return [
      {
        path: PATHS.DASHBOARD_PATH,
        label: t("login:dashboard_header.dashboard"),
      },
      { label: t("ranking_feature:rank_performance.rank_performance") },
      { label: t("ranking_feature:rank_performance.heatmap") },
    ];
  }, [language]);

  React.useEffect(() => {
    dispatch(
      getCompaniesRankingRequested({
        factor_id: 0,
        category_id: categoryValue,
        sector_id: sectorValue,
      })
    );
  }, [sectorValue, categoryValue]);

  React.useEffect(() => {
    dispatch(getCategoriesDropdownListRequested());
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <RankPerformanceContainer maxWidth={false}>
      <Box style={{ margin: "15px 0 20px 0" }}>
        <BreadcrumbsHeader items={breadCrumbs} />
      </Box>
      <Box>
        <Paper style={{ padding: 24, height: "100%" }}>
          <FactorCategories>
            <FactorCategories>
              <GroupSelect>
                <Text style={{ color: TEXT_COLOR_GREY }}>
                  {t("ranking_feature:rank_performance.sector")}
                </Text>
                <Controller
                  name="sectorPerformance"
                  rules={TRIMMED_VALIDATION_RULES}
                  control={control}
                  render={({ fieldState }) => {
                    return (
                      <SelectBox>
                        <SectorSelect
                          value={sectorValue}
                          variant="outlined"
                          autoComplete="off"
                          onChange={handleChangeSector}
                          error={fieldState.invalid}
                          MenuProps={{
                            anchorOrigin: {
                              vertical: "bottom",
                              horizontal: "left",
                            },
                            transformOrigin: {
                              vertical: "top",
                              horizontal: "left",
                            },
                            getContentAnchorEl: null,
                          }}
                        >
                          <MenuItem
                            value={sectorValue || 1}
                            disabled
                            style={{ display: "none" }}
                          />
                          {categoriesDropdownListState.sectors.map((sector) => (
                            <MenuItem key={sector.id} value={sector.id}>
                              {translateSectorLabel(sector.name)}
                            </MenuItem>
                          ))}
                        </SectorSelect>
                      </SelectBox>
                    );
                  }}
                />
              </GroupSelect>

              <GroupSelect>
                <Text style={{ color: TEXT_COLOR_GREY }}>
                  {t("ranking_feature:rank_performance.category")}
                </Text>
                <Controller
                  name="category"
                  rules={TRIMMED_VALIDATION_RULES}
                  control={control}
                  render={({ fieldState }) => {
                    return (
                      <SelectBox>
                        <SectorSelect
                          value={categoryValue}
                          variant="outlined"
                          autoComplete="off"
                          onChange={handleChangeCategory}
                          error={fieldState.invalid}
                          MenuProps={{
                            anchorOrigin: {
                              vertical: "bottom",
                              horizontal: "left",
                            },
                            transformOrigin: {
                              vertical: "top",
                              horizontal: "left",
                            },
                            getContentAnchorEl: null,
                          }}
                        >
                          <MenuItem
                            value={categoryValue || 1}
                            disabled
                            style={{ display: "none" }}
                          />
                          {categoriesDropdownListState.categories.map(
                            (category) => (
                              <MenuItem key={category.id} value={category.id}>
                                {capitalizeText(
                                  translateCategoryLabel(
                                    category.category_label
                                  )
                                )}
                              </MenuItem>
                            )
                          )}
                        </SectorSelect>
                      </SelectBox>
                    );
                  }}
                />
              </GroupSelect>

              <GroupSelect>
                <Text style={{ color: TEXT_COLOR_GREY }}>
                  {t("ranking_feature:rank_performance.filters")}
                </Text>
                <Controller
                  name="category"
                  rules={TRIMMED_VALIDATION_RULES}
                  control={control}
                  render={({ fieldState }) => {
                    return (
                      <SelectBox>
                        <SectorSelect
                          value={selectedFilter}
                          variant="outlined"
                          autoComplete="off"
                          onChange={handleChangeFilter}
                          error={fieldState.invalid}
                          disabled={
                            getCompaniesRankingStatus ===
                            RequestStates.Requested
                          }
                          MenuProps={{
                            anchorOrigin: {
                              vertical: "bottom",
                              horizontal: "left",
                            },
                            transformOrigin: {
                              vertical: "top",
                              horizontal: "left",
                            },
                            getContentAnchorEl: null,
                          }}
                        >
                          <MenuItem
                            value={FilterRankPerformanceType.all_companies}
                          >
                            {t(
                              "ranking_feature:rank_performance.all_companies"
                            )}
                          </MenuItem>
                          <MenuItem value={FilterRankPerformanceType.top10}>
                            {t("ranking_feature:rank_performance.top_10")}
                          </MenuItem>
                          <MenuItem value={FilterRankPerformanceType.bottom10}>
                            {t("ranking_feature:rank_performance.bottom_10")}
                          </MenuItem>
                        </SectorSelect>
                      </SelectBox>
                    );
                  }}
                />
              </GroupSelect>
            </FactorCategories>

            <ScoreGradient>
              <Text style={{ color: SONIC_GRAY, marginRight: "10px" }}>
                {t("ranking_feature:rank_performance.weak")}
              </Text>
              <Image src={score_gradient} />
              <Text style={{ color: SONIC_GRAY, marginLeft: "10px" }}>
                {t("ranking_feature:rank_performance.strong")}
              </Text>
            </ScoreGradient>
          </FactorCategories>
          <Divider style={{ margin: "20px 0" }} />

          <ChartContainer>
            <HeatMap
              series={rankingCandidates}
              getCompaniesRankingStatus={getCompaniesRankingStatus}
              selectedFilter={selectedFilter}
              selectedCategory={categoryValue}
              selectedSector={sectorValue}
            />
          </ChartContainer>
        </Paper>
      </Box>
    </RankPerformanceContainer>
  );
};

export default RankPerformance;
