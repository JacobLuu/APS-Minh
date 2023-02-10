import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";
import { COMPANY_SEARCH_KEYWORD } from "../../../../constants/localStorage";
import {
  FilterBox,
  FilterContainer,
  InlineBox,
  RankingSearchBox,
  Title,
  SelectBox,
  SectorSelect,
} from "./styles";
import {
  getCompaniesRequested,
  selectCompanies,
} from "../../../../reducers/companies";
import type { Sector } from "../../../../types";
import { useAppDispatch } from "../../../../store/hooks";
import type { CompanyBase } from "../../../../types";
import { useLabelTranslation } from "../../../../utils/customHooks";
interface IRankPerformanceFilter {
  sectors: Sector[];
  keyword: string;
  selectedSectorId: string | undefined;
  setCompanySearch: (string) => void;
  setSelectedSectorId: (string) => void;
}

const DEFAULT_OPTION = -1;

const RankPerformanceFilter = (props: IRankPerformanceFilter) => {
  const {
    setCompanySearch,
    setSelectedSectorId,
    sectors,
    keyword,
    selectedSectorId,
  } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const companies = useSelector(selectCompanies);
  const { translateCompanyName } = useLabelTranslation();

  const filterOptions = createFilterOptions({
    trim: true,
    stringify: (option: CompanyBase) => {
      if (option) {
        return `${option.ticker} ${option.name} ${
          option.pinyin_shortcut || ""
        }`;
      }
    },
  });
  const handleChangeItem = (e) => {
    const { value } = e.target;
    if (value !== DEFAULT_OPTION) {
      setSelectedSectorId(value);
    } else {
      // set undefined to remove sectorId on the URL
      setSelectedSectorId(undefined);
    }
  };

  const currentLimit = useMemo(() => {
    if (companies.total_count !== 0) {
      return companies.total_count;
    }
  }, [companies.total_count]);

  useEffect(() => {
    dispatch(getCompaniesRequested());
  }, [currentLimit]);

  return (
    <FilterContainer maxWidth={false}>
      <FilterBox>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={12} md={12} lg={6}>
            <RankingSearchBox>
              <Autocomplete
                id="category-filter-box"
                options={companies.list}
                getOptionLabel={(option) =>
                  translateCompanyName(option).toUpperCase()
                }
                defaultChecked
                forcePopupIcon={false}
                clearOnBlur
                popupIcon=""
                inputValue={keyword}
                filterOptions={filterOptions}
                onInputChange={(event, newValue) => {
                  localStorage.setItem(COMPANY_SEARCH_KEYWORD, newValue);
                  setCompanySearch(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder={t(
                      "ranking_feature:create_ranking.company_name"
                    )}
                    fullWidth
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <InputAdornment position="end">
                          <SearchIcon style={{ color: "#292D32" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </RankingSearchBox>
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <InlineBox>
              <Title>{t("ranking_feature:create_ranking.filter_by")}</Title>
              <RankingSearchBox>
                <SelectBox>
                  <SectorSelect
                    value={
                      sectors.length && selectedSectorId
                        ? selectedSectorId
                        : DEFAULT_OPTION
                    }
                    variant="outlined"
                    autoComplete="off"
                    onChange={handleChangeItem}
                    MenuProps={{
                      style: {
                        maxHeight: "300px",
                      },
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
                    <MenuItem value={DEFAULT_OPTION}>All Sector</MenuItem>
                    {sectors.map((sector) => (
                      <MenuItem key={sector.id} value={sector.id}>
                        {sector.name}
                      </MenuItem>
                    ))}
                  </SectorSelect>
                </SelectBox>
              </RankingSearchBox>
            </InlineBox>
          </Grid>
        </Grid>
      </FilterBox>
    </FilterContainer>
  );
};

export default React.memo(RankPerformanceFilter);
