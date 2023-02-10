import styled from "styled-components";

import { Container, Grid } from "@material-ui/core";

import { GREY } from "../../themes/colors";

export const SourceViewContainer = styled(Container)`
  padding: 0;
`;

export const GridItem = styled(Grid)``;

export const VerticalLine = styled.div`
  border-left: 1px solid ${GREY};
  height: calc(100% - 27px);
  position: absolute;
  left: 50%;
  bottom: 0;
`;

export const OutputContainer = styled.div`
  background-color: white;
  padding: 36px 24px;
  margin-left: 12px;
`;
