import { makeStyles } from "@material-ui/core/styles";
import { COLOR_PRIMARY, WHITE } from "./colors";

const useGlobalStyles = makeStyles({
  "@global": {
    "*": {
      boxSizing: "border-box",
      margin: 0,
    },
    svg: {
      overflow: "hidden",
      verticalAlign: "middle",
    },
    a: {
      textDecoration: "none",
    },
    "._loading_overlay_overlay": {
      background: WHITE,
    },
    "._loading_overlay_spinner > svg > circle": {
      stroke: `${COLOR_PRIMARY}`,
    },
    iframe: {
      pointerEvents: "none",
    },
  },
});

export default useGlobalStyles;
