import styled from "styled-components";

import Button from "@material-ui/core/Button";

import { COLOR_BORDER, COLOR_PRIMARY, WHITE } from "../../themes/colors";
import { ButtonProps } from "./Button";

export const MuiButton = styled(Button)<ButtonProps>`
  background-color: ${(props) =>
    props.$category === "confirm" ? COLOR_PRIMARY : WHITE};
  padding: 8px;
  border-radius: 4px;
  border-color: ${COLOR_PRIMARY};
  color: ${(props) => (props.$category === "confirm" ? WHITE : COLOR_PRIMARY)};
  font-weight: 600;
  font-size: 14px;
  text-transform: capitalize;
  min-width: 78px;

  :hover {
    background-color: ${(props) =>
      props.$category === "confirm" ? COLOR_PRIMARY : ""};
  }

  &.MuiButton-outlined.Mui-disabled {
    background-color: ${COLOR_BORDER};
    border: 1px solid ${COLOR_BORDER};
  }

  &.MuiButton-root.Mui-disabled {
    color: ${WHITE};
  }
`;
