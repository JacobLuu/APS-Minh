import styled from "styled-components";

import Typography from "@material-ui/core/Typography";

import { TextProps } from "./Text";

export const CustomizedText = styled(Typography)<TextProps>`
  font-size: ${(props) => {
    switch (props.$size) {
      case "xs":
        return "12px";
      case "sm":
        return "14px";
      case "md":
        return "16px";
      case "lg":
        return "19px";
      case "xl":
        return "25px";
      case "3xl":
        return "60px";
      default:
        return "14px";
    }
  }};
  font-weight: ${(props) => {
    switch (props.$weight) {
      case "light":
        return 300;
      case "normal":
        return 400;
      case "bold":
        return 600;
      default:
        return 400;
    }
  }};
  color: ${(props) => props.$color};
  cursor: ${(props) => (props.$hasCursor ? "pointer" : "")};
`;
