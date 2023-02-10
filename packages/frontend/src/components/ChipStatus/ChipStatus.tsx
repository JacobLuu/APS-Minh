import React from "react";

import { MuiBox } from "./styles";

export interface ChipStatusProps {
  children: string;
  style?: any;
}
function ChipStatus(props: ChipStatusProps) {
  const { children } = props;
  return <MuiBox {...props}>{children}</MuiBox>;
}

export default ChipStatus;
