import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import TabContext from "@material-ui/lab/TabContext";
import EditIcon from "@material-ui/icons/Edit";
import Box from "@material-ui/core/Box";
import Text from "../../../../components/Text";

import { score_gradient } from "../../../../assets/images";
import HeatMap from "../../../../components/HeatMap";
import {
  CategoryType,
  FilterRankPerformanceType,
} from "../../../../constants/enums";
import PATHS from "../../../../constants/paths";
import {
  getCompaniesRankingRequested,
  selectCompaniesRanking,
  resetList,
} from "../../../../reducers/companies_ranking";
import {
  getCategoriesDropdownListRequested,
  selectRankingDropdownList,
} from "../../../../reducers/ranking_dropdown_list";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  COLOR_BOX_SHADOW,
  SONIC_GRAY,
  TEXT_COLOR_GREY,
} from "../../../../themes/colors";
import {
  useLabelTranslation,
  useSelectedTab,
} from "../../../../utils/customHooks";
import { TRIMMED_VALIDATION_RULES } from "../../../../utils/formValidator";
import {
  CategoriesGroup,
  CompanyRankingTab,
  CompanyRankingTabPanel,
  CompanyRankingTabs,
  GroupSelect,
  HeaderContainer,
  Image,
  RankNowButton,
  ScoreGradient,
  SectorSelect,
  SelectBox,
  SelectContainer,
  TabPanelBox,
} from "./styles";

const defaultSectorValue = 1;

const CompanyRanking = () => {
  const [sectorValue, setSectorValue] = React.useState(defaultSectorValue);
  const [isHeatMapVisible, setIsHeatMapVisible] = React.useState(false);
  const [categoryValue, setCategoryValue] = React.useState(
    CategoryType.environmental
  );
  const { selectedTab, handleChangeTab } = useSelectedTab(
    FilterRankPerformanceType.top10
  );
  const history = useHistory();
  const { t } = useTranslation();
  const { translateCategoryLabel, translateSectorLabel } =
    useLabelTranslation();

  const categoriesDropdownListState = useAppSelector(selectRankingDropdownList);
  const dispatch = useAppDispatch();
  const { notNullList: rankingCandidates, getCompaniesRankingStatus } =
    useAppSelector(selectCompaniesRanking);

  const { control } = useForm({
    defaultValues: {
      answer: "",
      score: null,
      source: "",
      sector: "",
      category: "",
      reasons_for_change: "",
    },
    mode: "onChange",
  });

  const handleChangeSector = (event) => {
    setSectorValue(event.target.value);
  };

  const handleChangeCategory = (event) => {
    setCategoryValue(event.target.value);
  };

  const handleDetail = () => {
    history.push({
      pathname: PATHS.RANK_PERFORMANCE,
      search: `?sector_id=${sectorValue}&category_id=${categoryValue}`,
    });
  };

  const handleRankFactor = () => {
    dispatch(resetList());
    history.push({
      pathname: PATHS.COMPANY_RANKING_PATH,
    });
  };

  React.useEffect(() => {
    dispatch(
      getCompaniesRankingRequested({
        factor_id: 0,
        category_id: categoryValue,
        sector_id: sectorValue,
      })
    );
    handleChangeTab(null, FilterRankPerformanceType.top10);
  }, [sectorValue, categoryValue]);

  React.useEffect(() => {
    dispatch(getCategoriesDropdownListRequested());
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  React.useEffect(() => {
    setIsHeatMapVisible(false);
  }, [rankingCandidates]);
  return (
    <Paper
      style={{ padding: 24, height: "100%", boxShadow: `${COLOR_BOX_SHADOW}` }}
    >
      <HeaderContainer>
        <Text
          $weight="bold"
          $color={TEXT_COLOR_GREY}
          style={{ lineHeight: "18px", paddingRight: "5px" }}
        >
          {t("ranking_feature:rank_performance.rank_performance")}
        </Text>
        <Box>
          {isHeatMapVisible && (
            <>
              <RankNowButton
                style={{ margin: "0px 5px" }}
                startIcon={<EditIcon />}
                variant="outlined"
                color="primary"
                onClick={handleRankFactor}
              >
                {t("ranking_feature:rank_performance.create_rank")}
              </RankNowButton>
              <RankNowButton
                variant="outlined"
                color="primary"
                onClick={handleDetail}
              >
                {t("ranking_feature:rank_performance.view_details")}
              </RankNowButton>
            </>
          )}
        </Box>
      </HeaderContainer>
      <SelectContainer>
        <CategoriesGroup>
          <GroupSelect>
            <Text
              $weight="bold"
              $color={TEXT_COLOR_GREY}
              style={{ lineHeight: "18px", paddingRight: "5px" }}
            >
              {t("ranking_feature:rank_performance.sector")}
            </Text>
            <Controller
              name="sector"
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
            <Text
              $weight="bold"
              $color={TEXT_COLOR_GREY}
              style={{ lineHeight: "18px", paddingRight: "5px" }}
            >
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
                            {translateCategoryLabel(category.category_label)}
                          </MenuItem>
                        )
                      )}
                    </SectorSelect>
                  </SelectBox>
                );
              }}
            />
          </GroupSelect>
        </CategoriesGroup>

        <ScoreGradient>
          <Text
            $weight="bold"
            $color={SONIC_GRAY}
            style={{
              lineHeight: "18px",
              paddingRight: "5px",
              marginRight: "10px",
            }}
          >
            {t("ranking_feature:rank_performance.weak")}
          </Text>
          <Image src={score_gradient} />
          <Text
            $weight="bold"
            $color={SONIC_GRAY}
            style={{
              lineHeight: "18px",
              paddingRight: "5px",
              marginLeft: "10px",
            }}
          >
            {t("ranking_feature:rank_performance.strong")}
          </Text>
        </ScoreGradient>
      </SelectContainer>

      <TabContext value={selectedTab}>
        <CompanyRankingTabPanel value={FilterRankPerformanceType.top10}>
          <TabPanelBox maxWidth={false}>
            <HeatMap
              series={rankingCandidates}
              yAxisWidth={400}
              getCompaniesRankingStatus={getCompaniesRankingStatus}
              selectedFilter={selectedTab}
              selectedCategory={categoryValue}
              selectedSector={sectorValue}
              isHeatMapVisible={isHeatMapVisible}
              setIsHeatMapVisible={setIsHeatMapVisible}
            >
              <CompanyRankingTabs
                value={selectedTab}
                onChange={handleChangeTab}
              >
                <CompanyRankingTab
                  disableRipple
                  value={FilterRankPerformanceType.top10}
                  label={t("ranking_feature:rank_performance.top_10")}
                />
                <CompanyRankingTab
                  disableRipple
                  value={FilterRankPerformanceType.bottom10}
                  label={t("ranking_feature:rank_performance.bottom_10")}
                />
              </CompanyRankingTabs>
            </HeatMap>
          </TabPanelBox>
        </CompanyRankingTabPanel>

        <CompanyRankingTabPanel value={FilterRankPerformanceType.bottom10}>
          <TabPanelBox maxWidth={false}>
            <HeatMap
              series={rankingCandidates}
              yAxisWidth={400}
              getCompaniesRankingStatus={getCompaniesRankingStatus}
              selectedFilter={selectedTab}
              selectedCategory={categoryValue}
              selectedSector={sectorValue}
              isHeatMapVisible={isHeatMapVisible}
              setIsHeatMapVisible={setIsHeatMapVisible}
            >
              <CompanyRankingTabs
                value={selectedTab}
                onChange={handleChangeTab}
              >
                <CompanyRankingTab
                  disableRipple
                  value={FilterRankPerformanceType.top10}
                  label={t("ranking_feature:rank_performance.top_10")}
                />
                <CompanyRankingTab
                  disableRipple
                  value={FilterRankPerformanceType.bottom10}
                  label={t("ranking_feature:rank_performance.bottom_10")}
                />
              </CompanyRankingTabs>
            </HeatMap>
          </TabPanelBox>
        </CompanyRankingTabPanel>
      </TabContext>
    </Paper>
  );
};

export default CompanyRanking;
