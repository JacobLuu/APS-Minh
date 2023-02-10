import styled from "styled-components";

import { Button } from "@material-ui/core";

import { COLOR_PRIMARY, WHITE } from "../../../../themes/colors";

export const ActionButton = styled(Button)`
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  & p {
    font-weight: 600;
    letter-spacing: 0.15px;
    color: ${WHITE};
  }
  border-radius: 40px;
  box-shadow: none;
  text-transform: capitalize;
`;

export const CancelButton = styled(ActionButton)`
  text-transform: uppercase;
  & p {
    color: ${COLOR_PRIMARY};
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .MuiButton-contained {
    box-shadow: none;
  }
`;

export const ErrorMessageBox = styled.div`
  position: absolute;
  top: 10px;
  right: 30px;
`;
