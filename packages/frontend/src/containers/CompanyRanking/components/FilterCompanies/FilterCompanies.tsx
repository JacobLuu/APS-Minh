import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";

import { RankingTabsEnums } from "../../../../constants/enums";
import { resetTemporaryAnswers } from "../../../../reducers/category";
import { getCompaniesRankingRequested } from "../../../../reducers/companies_ranking";
import { useAppDispatch } from "../../../../store/hooks";
import { COLOR_PRIMARY } from "../../../../themes/colors";
import { useLabelTranslation } from "../../../../utils/customHooks";
import { TRIMMED_VALIDATION_RULES } from "../../../../utils/formValidator";
import {
  FilterBox,
  FilterContainer,
  InlineBox,
  RankingSearchBox,
  SectorSelect,
  SelectBox,
  Title,
} from "./styles";

import type { Sector, CompanyBase } from "../../../../types";
import { Category } from "../../../../types/category";

interface IFilterCompanies {
  sectors: Sector[];
  categories: Category[];
  selectedTab: string;
  companyList: CompanyBase[];
  selectedCategory: number;
  selectedFactor: number;
  selectedSector: number;
  isRankedList: {
    topCompanies: boolean;
    bottomCompanies: boolean;
  };
  setSelectedCategory: (_event: number) => void;
  setSelectedFactor: (_event: number) => void;
  setSelectedSector: (_event: number) => void;
  handleClearAll: () => void;
  addCompanyTopRanking: (company_add) => void;
  addCompanyBottomRanking: (company_add) => void;
}

const FilterCompanies = (props: IFilterCompanies) => {
  const dispatch = useAppDispatch();
  const {
    selectedTab,
    categories,
    selectedCategory,
    selectedFactor,
    selectedSector,
    addCompanyTopRanking,
    addCompanyBottomRanking,
    setSelectedSector,
    setSelectedCategory,
    setSelectedFactor,
    handleClearAll,
    isRankedList,
  } = props;
  const { t } = useTranslation();
  const {
    translateSectorLabel,
    translateCategoryLabel,
    translateFactorLabel,
    translateCompanyName,
  } = useLabelTranslation();
  const filterOptions = createFilterOptions({
    trim: true,
  });

  const { control } = useForm();

  const handleChangeSector = (event) => {
    setSelectedSector(event.target.value);
    handleClearAll();
  };

  const handleChangeCategory = (event) => {
    setSelectedCategory(event.target.value);
    handleClearAll();
  };

  const handleChangeFactor = (event) => {
    setSelectedFactor(event.target.value);
    dispatch(resetTemporaryAnswers());
    handleClearAll();
  };

  const handleChangeRankingSearchBox = (e: React.SyntheticEvent, value) => {
    if (
      selectedTab === `${RankingTabsEnums.top_company}` &&
      !isRankedList.topCompanies
    ) {
      addCompanyTopRanking(value);
    }
    if (
      selectedTab === `${RankingTabsEnums.bottom_company}` &&
      !isRankedList.bottomCompanies
    ) {
      addCompanyBottomRanking(value);
    }
  };

  const factors = React.useMemo(() => {
    const new_data = categories?.find((category) => {
      if (selectedCategory === category.id) {
        return true;
      }
      return false;
    });

    if (new_data?.factors.length > 0) {
      return new_data.factors;
    }
    return [];
  }, [categories, selectedCategory]);

  useEffect(() => {
    if (factors[0]?.id) {
      setSelectedFactor(factors[0].id);
    }
  }, [factors]);

  useEffect(() => {
    dispatch(
      getCompaniesRankingRequested({
        factor_id: selectedFactor,
        category_id: selectedCategory,
        sector_id: selectedSector,
      })
    );
  }, [selectedFactor, selectedCategory, selectedSector]);
  return (
    <FilterContainer maxWidth={false}>
      <FilterBox>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item md={12} lg={12} xs={12}>
            <Box
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <InlineBox>
                <Title>{t("ranking_feature:create_ranking.sector")}</Title>
                <Controller
                  name="sector-filter-box"
                  rules={TRIMMED_VALIDATION_RULES}
                  control={control}
                  render={({ fieldState }) => {
                    return (
                      <SelectBox>
                        <SectorSelect
                          value={selectedSector}
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
                            value={selectedSector}
                            disabled
                            style={{ display: "none" }}
                          />
                          {props.sectors.map((sector) => (
                            <MenuItem key={`${sector.id}`} value={sector.id}>
                              {translateSectorLabel(sector.name)}
                            </MenuItem>
                          ))}
                        </SectorSelect>
                      </SelectBox>
                    );
                  }}
                />
              </InlineBox>
              <InlineBox>
                <Title>{t("ranking_feature:create_ranking.category")}</Title>
                <Controller
                  name="category-filter-box"
                  rules={TRIMMED_VALIDATION_RULES}
                  control={control}
                  render={({ fieldState }) => {
                    return (
                      <SelectBox>
                        <SectorSelect
                          value={selectedCategory}
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
                            value={selectedCategory || 1}
                            disabled
                            style={{ display: "none" }}
                          />
                          {categories.map((category) => (
                            <MenuItem
                              key={`${category.id}`}
                              value={category.id}
                            >
                              {translateCategoryLabel(category.category_label)}
                            </MenuItem>
                          ))}
                        </SectorSelect>
                      </SelectBox>
                    );
                  }}
                />
              </InlineBox>

              <InlineBox>
                <Title>{t("ranking_feature:create_ranking.factor")}</Title>
                <Controller
                  name="factor-filter-box"
                  rules={TRIMMED_VALIDATION_RULES}
                  control={control}
                  render={({ fieldState }) => {
                    return (
                      <SelectBox>
                        <SectorSelect
                          value={selectedFactor}
                          variant="outlined"
                          autoComplete="off"
                          onChange={handleChangeFactor}
                          error={fieldState.invalid}
                          disabled={factors.length === 0 || !factors}
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
                            value={selectedFactor || 1}
                            disabled
                            style={{ display: "none" }}
                          />
                          {factors?.map((factor) => (
                            <MenuItem key={`${factor.id}`} value={factor.id}>
                              {translateFactorLabel(factor)}
                            </MenuItem>
                          ))}
                        </SectorSelect>
                      </SelectBox>
                    );
                  }}
                />
              </InlineBox>
            </Box>
          </Grid>
          <Grid
            item
            md={12}
            lg={4}
            xs={12}
            style={{ marginTop: "30px", maxWidth: "387px" }}
          >
            <RankingSearchBox>
              <Autocomplete
                id="category-filter-box"
                options={props.companyList}
                getOptionLabel={(option) =>
                  translateCompanyName(option).toUpperCase()
                }
                forcePopupIcon={false}
                clearOnBlur
                popupIcon=""
                onChange={handleChangeRankingSearchBox}
                value={null}
                filterOptions={filterOptions}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    placeholder={t(
                      "ranking_feature:create_ranking.search_company"
                    )}
                    fullWidth
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <InputAdornment position="end">
                          <SearchIcon style={{ color: COLOR_PRIMARY }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </RankingSearchBox>
          </Grid>
        </Grid>
      </FilterBox>
    </FilterContainer>
  );
};

export default React.memo(FilterCompanies);
