import styled from "styled-components";
import LoadingOverlay from "react-loading-overlay";

import { COLOR_PRIMARY, WHITE } from "../../themes/colors";

LoadingOverlay.propTypes = undefined;

export const SuspendLoadingOverlay = styled(LoadingOverlay)`
  width: 100vw;
  height: 100vh;
  overflow: scroll;
  .suspend-overlay-overlay {
    background: ${WHITE};
  }
  .suspend-overlay-spinner {
    svg circle {
      stroke: ${COLOR_PRIMARY};
    }
  }
`;
