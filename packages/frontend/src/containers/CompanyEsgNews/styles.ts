import styled from "styled-components";

import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { Autocomplete } from "@material-ui/lab";

import { HEADER_HEIGHT } from "../../constants/size";

export const Container = styled.div`
  height: calc(100vh - ${HEADER_HEIGHT}px);
  overflow: scroll;
`;

export const FactorOptionBox = styled(Box)`
  .MuiAutocomplete-option {
    padding-left: 24px;
  }
`;

export const SearchBox = styled(TextField)`
  .MuiOutlinedInput-root {
    padding: 4px;
  }
`;

export const NewsAutocomplete = styled(Autocomplete)`
  .MuiAutocomplete-popupIndicatorOpen {
    transform: rotate(0deg);
  }
` as typeof Autocomplete;
