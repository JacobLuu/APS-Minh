import React from "react";
import { Control, Controller } from "react-hook-form";

import { getValue } from "../../utils/inputHelpers";
import { ScoreErrorMessage } from "../ErrorMessage";
import { NumberedTextField } from "./styles";

interface ScoreInputProps {
  name: string;
  onChange: (field: any, value: string, onChange: (value) => void) => void;
  control: Control<any>;
  rules?: object;
  valid?: boolean;
  showErrorMessage?: boolean;
  containerStyle?: any;
  inputStyle?: any;
}

const ScoreInput = (props: ScoreInputProps) => {
  return (
    <>
      <Controller
        name={props.name}
        control={props.control}
        rules={props.rules}
        render={({ field, fieldState }) => {
          return (
            <div style={props.containerStyle}>
              <NumberedTextField
                onChange={(e) =>
                  props.onChange(
                    field.name,
                    e.target.value.trim(),
                    field.onChange
                  )
                }
                value={getValue(field.value, "")}
                type="text"
                inputRef={field.ref}
                name={props.name}
                id={props.name}
                variant="outlined"
                size="small"
                error={fieldState.invalid || !props.valid}
                style={props.inputStyle}
              />
              {fieldState.invalid && props.showErrorMessage && (
                <ScoreErrorMessage />
              )}
            </div>
          );
        }}
      />
    </>
  );
};

ScoreInput.defaultProps = {
  rules: {},
  valid: true,
  showErrorMessage: true,
  containerStyle: {},
  inputStyle: {},
};

export default React.memo(ScoreInput);
