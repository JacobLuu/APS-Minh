import React from "react";

import { EditBox, EditText, Icon } from "./styles";

interface EditButtonProps {
  text: string;
  showIcon?: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const EditButton = (props: EditButtonProps) => {
  const handleClick = () => {
    if (!props.disabled) props.onClick();
  };

  return (
    <EditBox $disabled={props.disabled} onClick={handleClick}>
      {props.showIcon && <Icon $disabled={props.disabled} />}
      <EditText $disabled={props.disabled}>{props.text}</EditText>
    </EditBox>
  );
};

EditButton.defaultProps = {
  showIcon: false,
  disabled: false,
};

export default React.memo(EditButton);
