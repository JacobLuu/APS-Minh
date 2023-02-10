import React from "react";
import { Control, Controller } from "react-hook-form";
import Text from "../Text";
import { RequiredErrorMessage } from "../ErrorMessage";
import { SourceInputField } from "./styles";

interface EditingTextFieldProps {
  isEditing: boolean;
  text: string;
  name: string;
  multiline?: boolean;
  minRows?: number;
  placeholder?: string;
  control: Control<any>;
  rules?: object;
  valid?: boolean;
  type?: string;
  customErrorMessage?: React.ReactNode;
  disabled?: boolean;
  onChange: (field: any, value: string, onChange: (value) => void) => void;
}

const EditingTextField = (props: EditingTextFieldProps) => {
  return (
    <>
      {props.isEditing ? (
        <Controller
          name={props.name}
          control={props.control}
          rules={props.rules}
          render={({ field, fieldState }) => {
            return (
              <>
                <SourceInputField
                  onChange={(e) =>
                    props.onChange(field.name, e.target.value, field.onChange)
                  }
                  value={field.value}
                  inputRef={field.ref}
                  name={field.name}
                  type={props.type}
                  multiline={props.multiline}
                  minRows={props.minRows}
                  placeholder={props.placeholder}
                  id={field.name}
                  variant="outlined"
                  size="small"
                  disabled={props.disabled}
                  error={fieldState.invalid || !props.valid}
                />
                {(fieldState.invalid || !props.valid) &&
                  props.customErrorMessage}
              </>
            );
          }}
        />
      ) : (
        <Text style={{ wordBreak: "break-word" }}>{props.text}</Text>
      )}
    </>
  );
};

EditingTextField.defaultProps = {
  multiline: false,
  minRows: 3,
  placeholder: "",
  rules: {},
  valid: true,
  type: "text",
  disabled: false,
  customErrorMessage: <RequiredErrorMessage />,
};

export default React.memo(EditingTextField);
