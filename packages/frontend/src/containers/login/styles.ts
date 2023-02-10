import styled from "styled-components";

import {
  Button,
  Container,
  Tab,
  TabProps,
  Tabs,
  TextField,
  Typography,
} from "@material-ui/core";
import { TabPanel } from "@material-ui/lab";

import { HEADER_HEIGHT } from "../../constants/size";
import {
  COLOR_BOX_SHADOW,
  GREY,
  COLOR_PRIMARY,
  WHITE,
} from "../../themes/colors";

interface LoginTabProps {
  $active: boolean;
}

export const LoginTab = styled(Tab)<LoginTabProps & TabProps>`
  margin-top: 10px;
  color: ${(props) => (props.$active ? COLOR_PRIMARY : GREY)};
  font-size: 20px;
  font-weight: 600;
  text-transform: capitalize;
  &:focus {
    outline: none;
  }
`;

export const LoginTabs = styled(Tabs)`
  .PrivateTabIndicator-colorSecondary-3 {
    color: ${COLOR_PRIMARY};
  }
`;

export const LoginTabPanel = styled(TabPanel)`
  padding: 0;
`;

export const LoginContainer = styled(Container)`
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
  box-shadow: ${COLOR_BOX_SHADOW};
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FormContainer = styled(Container)`
  width: 100%;
  height: 480px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
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

export const Icon = styled.div`
  position: absolute;
  right: 12px;
  top: 12px;
`;
