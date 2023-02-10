import styled from "styled-components";

import Divider from "@material-ui/core/Divider";
import Typography, { TypographyProps } from "@material-ui/core/Typography";

import { HEADER_HEIGHT } from "../../constants/size";
import { defaultFontFamily } from "../../themes/themes";

interface MenuItemProps extends TypographyProps {
  $isActive?: boolean;
}

export const Container = styled.div`
  width: 100%;
  height: ${HEADER_HEIGHT}px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .logo_nexus {
    width: 120px;
  }
`;

export const Title = styled.div`
  padding-left: 35px;
  cursor: pointer;
  padding-top: 9px;
`;

export const UserInformationContainer = styled.div`
  display: flex;
  align-items: center;
  height: 20px;
  justify-content: space-around;
  margin-right: 20px;
`;

export const MenuItem = styled(Typography)<MenuItemProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${defaultFontFamily}, sans-serif;
  font-style: normal;
  font-weight: ${({ $isActive }) => ($isActive ? "bold" : "normal")};
  font-size: 16px;
  margin: 0 20px 0 20px;
  cursor: pointer;
`;

export const MenuDivider = styled(Divider)`
  background-color: #212121;
`;
