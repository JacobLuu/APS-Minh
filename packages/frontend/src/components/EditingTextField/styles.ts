import styled from "styled-components";

import { TextField } from "@material-ui/core";

import { INPUT_BACKGROUND_COLOR } from "../../themes/colors";

export const SourceInputField = styled(TextField)`
  width: 100%;
  background-color: ${INPUT_BACKGROUND_COLOR};
`;
