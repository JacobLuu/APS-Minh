import styled from "styled-components";

import { Box, Typography } from "@material-ui/core";
import Edit from "@material-ui/icons/Edit";

import { GREY, COLOR_PRIMARY } from "../../themes/colors";

interface EditProps {
  $disabled?: boolean;
}

export const EditText = styled(Typography)<EditProps>`
  font-weight: 700;
  font-size: 16px;
  color: ${(props) => (props.$disabled ? `${GREY}` : `${COLOR_PRIMARY}`)};
  cursor: ${(props) => !props.$disabled && "pointer"};
`;

export const EditBox = styled(Box)<EditProps>`
  display: flex;
  align-items: center;
  margin-right: 12px;
  color: ${(props) => (props.$disabled ? `${GREY}` : `${COLOR_PRIMARY}`)};
`;

export const Icon = styled(Edit)<EditProps>`
  height: 17px;
  color: ${(props) => (props.$disabled ? `${GREY}` : `${COLOR_PRIMARY}`)};
  cursor: ${(props) => !props.$disabled && "pointer"};
`;
