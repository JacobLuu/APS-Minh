import React from "react";

import { MuiButton } from "./styles";

export interface ButtonProps {
  $label: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  $category: "confirm" | "cancel";
}

const Button = (props: ButtonProps) => {
  const { $label } = props;

  return (
    <MuiButton variant="outlined" color="primary" {...props}>
      {$label}
    </MuiButton>
  );
};

Button.defaultProps = {
  type: "button",
  onClick: () => {},
  disabled: false,
};

export default Button;
