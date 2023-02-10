import styled from "styled-components";

import { HEADER_HEIGHT } from "../../constants/size";

export const Container = styled.div`
  height: calc(100vh - ${HEADER_HEIGHT}px);
  overflow: scroll;
`;
