import styled from "styled-components";

import { Grid, Typography } from "@material-ui/core";

import { WHITE } from "../../themes/colors";

export const Text = styled(Typography)`
  font-size: 14px;
` as typeof Typography;

export const ControlContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: #eeeeee;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 12px 4px 4px;
`;

export const ViewerContainer = styled.div`
  flex: 1;
  overflow: hidden;
  height: 360px;
  position: relative;
`;

export const DetailsContainer = styled.div`
  display: flex;
  background-color: white;
  flex-wrap: wrap;
  margin-top: 16px;
  padding: 12px;
`;

export const GridItem = styled(Grid)``;

export const ErrorMessageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${WHITE};
  width: 100%;
  height: 100%;
`;

export const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background-color: #c02323;
  color: ${WHITE};
  height: 100px;
  padding: 5px;
  white-space: pre-wrap;
  font-weight: bold;
`;
