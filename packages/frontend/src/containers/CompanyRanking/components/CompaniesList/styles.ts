import styled from "styled-components";

import Container from "@material-ui/core/Container";

export const DroppableContainer = styled(Container)`
  padding: 0;
  margin-top: 10px;
  height: fit-content;
  min-height: 45px;
  max-height: 560px;
  overflow-y: auto;
`;
