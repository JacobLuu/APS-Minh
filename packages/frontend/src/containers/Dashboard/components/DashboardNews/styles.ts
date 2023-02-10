import styled from "styled-components";

import Typography from "@material-ui/core/Typography";

import { COLOR_PRIMARY } from "../../../../themes/colors";

export const Title = styled(Typography)`
  font-size: 14px;
  color: ${COLOR_PRIMARY};
  cursor: pointer;
  overflow-wrap: break-word;
`;

export const NewsImage = styled.img`
  height: 88px;
  width: 96px;
  cursor: pointer;
`;
