import styled from "styled-components";

import Container from "@material-ui/core/Container";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { TEXT_MENU_SEARCH_COLOR } from "../../../../themes/colors";

export const CompanySearchBox = styled(Container)`
  display: flex;
  background: ${TEXT_MENU_SEARCH_COLOR};
  color: ${TEXT_MENU_SEARCH_COLOR};
  border-radius: 5px;
  max-width: 400px;
  padding: 0px;
`;

export const CompanyAutocomplete = styled(Autocomplete)`
  .MuiAutocomplete-popupIndicatorOpen {
    transform: rotate(0deg);
  }
  .MuiOutlinedInput-notchedOutline {
    border: none;
  }
`;
