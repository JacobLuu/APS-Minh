import styled from "styled-components";

import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

export const Title = styled(DialogTitle)`
  .MuiTypography-root {
    font-weight: 600;
    font-size: 16px;
  }
`;

export const ScoreField = styled(TextField)`
  input {
    padding: 12px;
  }
`;
