import React from "react";
import { SuspendLoadingOverlay as LoadingOverlay } from "./styles";

const SuspendLoadingOverlay = () => {
  return <LoadingOverlay active spinner classNamePrefix="suspend-overlay-" />;
};

export default SuspendLoadingOverlay;
