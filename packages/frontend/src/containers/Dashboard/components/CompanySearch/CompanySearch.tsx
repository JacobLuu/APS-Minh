import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import { createFilterOptions } from "@material-ui/lab";

import PATHS from "../../../../constants/paths";
import { getCompaniesRequested } from "../../../../reducers/companies";
import { useAppDispatch } from "../../../../store/hooks";
import { COLOR_PRIMARY } from "../../../../themes/colors";
import { useLabelTranslation } from "../../../../utils/customHooks";
import { CompanyAutocomplete, CompanySearchBox } from "./styles";

import type { CompanyBase } from "../../../../types";

interface CompanySearchProps {
  companies: CompanyBase[];
}

const CompanySearch = (props: CompanySearchProps) => {
  const history = useHistory();
  const { t } = useTranslation();
  const [value, setValue] = React.useState<CompanyBase>(null);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { translateCompanyName } = useLabelTranslation();

  React.useEffect(() => {
    if (!location.pathname.includes(PATHS.SEARCH_COMPANY_DETAIL_PATH)) {
      setValue(null);
    }
  }, [location]);

  useEffect(() => {
    dispatch(getCompaniesRequested(String("")));
  }, []);

  const handleOnChange = (company) => {
    if (company) {
      const path = PATHS.COMPANY_PATH.replace(":companyId", String(company.id));
      history.push(path);
    }
    setValue(company);
  };

  const filterOptions = createFilterOptions({
    trim: true,
    // prepare searchable text for MUI search function
    stringify: (option: CompanyBase) => {
      if (option) {
        return `${option.ticker} ${option.name} ${
          option.pinyin_shortcut || ""
        }`;
      }
    },
  });

  return (
    <CompanySearchBox>
      <CompanyAutocomplete
        id="company-search-box"
        options={props.companies}
        getOptionLabel={(company: CompanyBase) =>
          `${company.ticker} -- ${translateCompanyName(company).toUpperCase()}`
        }
        filterOptions={filterOptions}
        popupIcon={<SearchIcon style={{ color: `${COLOR_PRIMARY}` }} />}
        value={value}
        onChange={(_event, company) => {
          handleOnChange(company);
        }}
        renderInput={(params) => (
          <TextField
            style={{ minWidth: "400px" }}
            {...params}
            placeholder={t("login:dashboard_search_bar.search_company")}
            variant="outlined"
            size="small"
          />
        )}
      />
    </CompanySearchBox>
  );
};

export default React.memo(CompanySearch);
