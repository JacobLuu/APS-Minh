import React from "react";

import { TypographyProps } from "@material-ui/core/Typography";

import { COLOR_TEXT_PRIMARY } from "../../themes/colors";
import { CustomizedText } from "./styles";

export interface TextProps extends TypographyProps {
  $size?: string;
  $weight?: string;
  $color?: string;
  children: number | string | string[];
  $hasCursor?: boolean;
  style?: any;
}

const Text = (props: TextProps) => {
  const { children } = props;

  return <CustomizedText {...props}>{children}</CustomizedText>;
};

Text.defaultProps = {
  $size: "sm",
  $weight: "normal",
  $color: COLOR_TEXT_PRIMARY,
  $hasCursor: false,
  style: {},
};

export default Text;
