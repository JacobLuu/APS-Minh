import styled from "styled-components";

import Box from "@material-ui/core/Box";

import {
  COLOR_SOCIAL,
  COLOR_ENVIRONMENT,
  COLOR_GOVERNANCE,
} from "../../../../themes/colors";

interface ChartIconProps {
  $label: string;
}

export const ChartIcon = styled(Box)<ChartIconProps>`
  height: 12px;
  width: 12px;
  background-color: ${(props) => {
    let color = "";
    switch (props.$label) {
      case "environmental":
        color = `${COLOR_ENVIRONMENT}`;
        break;
      case "social":
        color = `${COLOR_SOCIAL}`;
        break;
      case "governance":
        color = `${COLOR_GOVERNANCE}`;
        break;
      default:
        color = `${COLOR_ENVIRONMENT}`;
        break;
    }

    return color;
  }};
`;
