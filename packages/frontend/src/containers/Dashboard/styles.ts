import styled from "styled-components";

import { Container, Tab, TabProps } from "@material-ui/core";

import {
  BACKGROUND_COLOR,
  DARKER_GREY,
  COLOR_PRIMARY,
} from "../../themes/colors";

export const DashboardContainer = styled(Container)`
  background-color: ${BACKGROUND_COLOR};
  padding: 0 40px;
`;

interface CustomTabProps {
  $active: boolean;
}

export const CustomTab = styled(Tab)<CustomTabProps & TabProps>`
  color: ${(props) => (props.$active ? COLOR_PRIMARY : DARKER_GREY)};
  font-size: 20px;
  font-weight: 600;
  text-transform: capitalize;
  &:focus {
    outline: none;
  }
  .MuiTab-wrapper {
    width: auto;
    color: inherit;
  }
`;
