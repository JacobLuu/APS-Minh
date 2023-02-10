import React, { useRef } from "react";
import { getValue, focusAtTheEnd } from "../../../../utils/inputHelpers";
import { MAX_500_CHARACTERS_VALIDATION_RULES } from "../../../../utils/formValidator";
import { Control, Controller } from "react-hook-form";
import Text from "../../../Text";
import { TableGridItem, SourceInputField } from "./styles";
import {
  RequiredErrorMessage,
  AnswerLengthErrorMessage,
  UnitErrorMessage,
} from "../../../ErrorMessage";

interface ExtractedResultsScoreFormProps {
  hasLabel: boolean;
  label: string;
  disclosureName: string;
  unitName: string;
  control: Control<any>;
  onChange: (field: any, value: string, onChange: (value) => void) => void;
}

const ExtractedResultsScoreForm = (props: ExtractedResultsScoreFormProps) => {
  const reasonRef = useRef<HTMLInputElement | null>(null);
  const REQUIRED = "required";
  const MAXLENGTH = "maxLength";

  return (
    <>
      {props.hasLabel ? (
        <TableGridItem item xs={4} style={{ paddingLeft: 0 }}>
          <Text $size="md" $weight="bold">
            {props.label}
          </Text>
        </TableGridItem>
      ) : null}
      <TableGridItem item xs={props.hasLabel ? 5 : 9} style={{ marginTop: 2 }}>
        <Controller
          rules={MAX_500_CHARACTERS_VALIDATION_RULES}
          name={props.disclosureName}
          control={props.control}
          render={({ field, fieldState }) => {
            return (
              <>
                <SourceInputField
                  id={field.name}
                  name={field.name}
                  type="text"
                  value={getValue(field.value, "")}
                  inputRef={(ref) => {
                    reasonRef.current = ref;
                    field.ref = ref;
                  }}
                  onFocus={() =>
                    focusAtTheEnd(reasonRef.current, field.value.length)
                  }
                  onChange={(e) =>
                    props.onChange(field.name, e.target.value, field.onChange)
                  }
                  multiline
                  variant="outlined"
                  size="small"
                  error={fieldState.invalid}
                />
                {fieldState.error?.type === REQUIRED && (
                  <RequiredErrorMessage />
                )}
                {fieldState.error?.type === MAXLENGTH && (
                  <AnswerLengthErrorMessage />
                )}
              </>
            );
          }}
        />
      </TableGridItem>

      <TableGridItem item xs={3} style={{ marginTop: 2 }}>
        <Controller
          name={props.unitName}
          control={props.control}
          rules={MAX_500_CHARACTERS_VALIDATION_RULES}
          render={({ field, fieldState }) => {
            return (
              <>
                <SourceInputField
                  id={field.name}
                  name={field.name}
                  inputRef={field.ref}
                  value={getValue(field.value, "")}
                  type="text"
                  onChange={(e) =>
                    props.onChange(field.name, e.target.value, field.onChange)
                  }
                  variant="outlined"
                  size="small"
                  error={fieldState.invalid}
                />
                {fieldState.error?.type === REQUIRED && (
                  <RequiredErrorMessage />
                )}
                {fieldState.error?.type === MAXLENGTH && <UnitErrorMessage />}
              </>
            );
          }}
        />
      </TableGridItem>
    </>
  );
};

export default React.memo(ExtractedResultsScoreForm);
