import styled from "styled-components";

import TextField from "@material-ui/core/TextField";

import { INPUT_BACKGROUND_COLOR } from "../../themes/colors";

export const NumberedTextField = styled(TextField)`
  width: 40px;
  background-color: ${INPUT_BACKGROUND_COLOR};
  .MuiInputBase-root {
    padding: 0;
  }
  .MuiInputBase-input {
    padding: 8px 8px 8px 12px;
  }
`;
