import styled from "styled-components";

import { Button, Container, IconButton, TextField } from "@material-ui/core";

export const LoginFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FormContainer = styled(Container)`
  width: 100%;
  height: 480px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Input = styled(TextField)`
  width: 320px;
  input {
    padding: 16px 46px 16px 12px;
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

export const LoginButton = styled(Button)`
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
  position: absolute;
  right: 12px;
  top: 12px;
  padding: 0;
  border: none;
  color: rgba(0, 0, 0, 0.54);
  cursor: pointer;
  :focus {
    outline: none;
  }
`;
