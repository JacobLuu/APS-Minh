import styled from "styled-components";

import { Button, TextField } from "@material-ui/core";

export const ForgetPasswordFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 24px;
  position: relative;
`;

export const Input = styled(TextField)`
  width: 320px;
  input {
    padding: 16px 12px;
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
