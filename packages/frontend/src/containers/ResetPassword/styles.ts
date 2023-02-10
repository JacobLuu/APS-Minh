import styled from "styled-components";

import {
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";

import { HEADER_HEIGHT } from "../../constants/size";
import { WHITE } from "../../themes/colors";

export const ResetPasswordContainer = styled(Container)`
  height: calc(100vh - ${HEADER_HEIGHT}px);
  display: flex;
  align-items: center;
`;

export const Box = styled(Container)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 820px;
  height: 530px;
  background: ${WHITE};
  border-radius: 10px;
`;

export const FormContainer = styled(Container)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Input = styled(TextField)`
  width: 320px;
  input {
    padding: 0 12px 0 12px;
    height: 54px;
    ::-ms-reveal {
      display: none;
    }
  }
  .MuiInputLabel-outlined.MuiInputLabel-marginDense {
    transform: translate(14px, 20px) scale(1);
  }

  .MuiInputLabel-outlined.MuiInputLabel-shrink {
    transform: translate(14px, -6px) scale(0.75);
  }
`;

export const SubmitButton = styled(Button)`
  margin-top: 30px;
  margin-bottom: 10px;
  font-size: 18px;
  width: 128px;
  height: 50px;
  font-weight: 600;
  border-radius: 300px;
  cursor: pointer;
  text-transform: capitalize;
`;

export const Icon = styled(IconButton)`
  :focus {
    outline: none;
  }
`;

export const ErrorMessage = styled(Typography)`
  font-size: 14px;
  line-height: 16px;
  color: red;
  height: 24px;
  width: 320px;
  white-space: pre-wrap;
  padding: 0 5px 0 5px;
`;
