import { createTheme } from "@material-ui/core/styles";

import {
  COLOR_PRIMARY,
  TABLE_TITLE_COLOR,
  COLOR_TEXT_PRIMARY,
  WHITE,
} from "./colors";

export const defaultFontFamily = "Source Sans Pro";

const theme = createTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true, // No more ripple, on the whole application.
    },
  },
  typography: {
    fontFamily: [defaultFontFamily, "sans-serif"].join(","),
    allVariants: {
      color: COLOR_TEXT_PRIMARY,
      lineHeight: "24px",
      fontSize: "0.875rem",
      fontWeight: 400,
      textAlign: "left",
    },
    fontWeightBold: 600,
  },
  palette: {
    primary: {
      main: COLOR_PRIMARY,
      contrastText: WHITE,
    },
  },
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontFamily: defaultFontFamily,
        backgroundColor: COLOR_PRIMARY,
        color: WHITE,
        fontStyle: "normal",
        height: "min-content",
        maxWidth: 270,
        fontSize: 14,
        padding: 15,
        fontWeight: 400,
        border: `1px solid ${TABLE_TITLE_COLOR}`,
      },
    },
    MuiButton: {
      contained: {
        "&:focus": {
          outline: "none",
        },
      },
      textPrimary: {
        "&:hover": {
          "background-color": "inherit",
        },
      },
    },
    MuiIconButton: {
      colorPrimary: {
        "&:hover": {
          "background-color": WHITE,
        },
      },
    },
  },
});

export default theme;
