import styled from "styled-components";

import LinearProgress from "@material-ui/core/LinearProgress";

import {
  COLOR_SOCIAL,
  COLOR_ENVIRONMENT,
  COLOR_GOVERNANCE,
  BACKGROUND_COLOR,
} from "../../../../themes/colors";

interface LineProgressProps {
  $category_label: string;
  $percentage: number;
}

export const LineProgress = styled(LinearProgress)<LineProgressProps>`
  height: 10px;
  border-radius: 20px;
  background-image: ${(props) => {
    let color = "";
    switch (props.$category_label) {
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

    return `linear-gradient(to right, ${color} 0%, ${color} ${props.$percentage}%, ${BACKGROUND_COLOR} ${props.$percentage}%)`;
  }};
`;
