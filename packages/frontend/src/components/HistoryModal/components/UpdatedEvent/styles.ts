import styled from "styled-components";

import { Grid, Typography } from "@material-ui/core";

export const Text = styled(Typography)`
  font-size: 16px;
  font-weight: 400;
` as typeof Typography;

export const SmallText = styled(Typography)`
  font-size: 12px;
  font-weight: 400;
` as typeof Typography;

export const BoldText = styled(Typography)`
  font-size: 16px;
  font-weight: 600;
` as typeof Typography;

export const GridItem = styled(Grid)``;
