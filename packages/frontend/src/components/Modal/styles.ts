import styled from "styled-components";
import DialogActions, {
  DialogActionsProps,
} from "@material-ui/core/DialogActions";

import Clear from "@material-ui/icons/Clear";

export const ClearIcon = styled(Clear)`
  position: absolute;
  cursor: pointer;
  top: 16px;
  right: 16px;

  :hover {
    transform: scale(1.2);
  }
`;

export interface ActionContainerProps extends DialogActionsProps {
  $hasChildren: boolean;
  $actionContainerPosition: string;
}

export const ActionContainer = styled(DialogActions)<ActionContainerProps>`
  padding: ${(props) => {
    return props.$hasChildren ? "8px 24px 16px" : "0px";
  }};
  justify-content: ${(props) => props.$actionContainerPosition};
`;
