import styled from "styled-components";

import { Container } from "@material-ui/core";

import { TEXT_COLOR_DARKER_GREY } from "../../../../themes/colors";

export const DroppableContainer = styled(Container)`
  padding: 5px 0;
`;

export const RankOrder = styled.div`
  border: 1px dashed ${TEXT_COLOR_DARKER_GREY};
  text-align: center;
  padding: 10px 0;
  margin: 5px 10px;
`;
