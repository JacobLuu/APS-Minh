import styled from "styled-components";

import { Grid } from "@material-ui/core";

import { HEADER_HEIGHT } from "../../../../constants/size";
import { WHITE } from "../../../../themes/colors";

export const Container = styled(Grid)`
  background-color: ${WHITE};
  min-height: calc(- ${HEADER_HEIGHT + 64 + 55}px);
  max-height: 100vh;
  border-radius: 0 5px 5px 0;
  overflow: auto;
`;
