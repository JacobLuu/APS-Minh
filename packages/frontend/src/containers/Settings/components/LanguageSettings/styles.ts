import styled from "styled-components";

import { Button, Checkbox, InputLabel, Paper } from "@material-ui/core";

import { TEXT_COLOR_GREY } from "../../../../themes/colors";

export const LanguageCheckbox = styled(Checkbox)`
  padding-left: 0;
`;

export const SaveButton = styled(Button)`
  font-size: 16px;
  font-weight: 600;
  width: 84px;
  border-radius: 20px;
  text-transform: capitalize;
`;

export const SettingPaper = styled(Paper)`
  .MuiPaper-root {
    max-width: 668px;
  }
`;

export const LanguageInputLabel = styled(InputLabel)`
  color: ${TEXT_COLOR_GREY};
`;
