import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { Box, Grid } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

import { updateQuantitativeNewScoreRequested } from "../../reducers/category";
import { updateExtractedResultRequested as updateExtractedResultRequestedAction } from "../../reducers/source";
import { selectUser } from "../../reducers/user";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { IndicatorKey } from "../../types/indicator_key";
import {
  MAX_500_CHARACTERS_VALIDATION_RULES,
  OVERALL_SCORE_VALIDATION_RULES,
} from "../../utils/formValidator";
import {
  hasValidValue,
  transformTextToFloatValue,
} from "../../utils/inputHelpers";
import { getRoundedOverallScore } from "../../utils/miscellaneous";
import {
  ReasonForChangeLengthErrorMessage,
  RequiredErrorMessage,
  ScoreErrorMessage,
} from "../ErrorMessage";
import ExtractedResultDisclosureForm from "./components/ExtractedResultDisclosureForm";
import Text from "../../components/Text";
import {
  CancelButton,
  ErrorMessageContainer,
  Form,
  OverallScoreContainer,
  SaveButton,
  ScoreTextField,
  ScoreTextLabel,
  TextAreaField,
} from "./styles";

import type { ExtractedResultForm as ExtractedResultFormInterface } from "../../types/source";
import type { ExtractedResultValue } from "../../types/extracted_result_value";

interface ExtractedResultFormProps {
  extracted_result_score?: {
    id: number;
    overall_score: number;
    extracted_result_values: ExtractedResultValue[];
    reasons_for_change: string;
  };
  news_score_id: number;
  indicator_key_score_id: number;
  indicator_key: IndicatorKey;
  indicator_key_id: number;
  category_id: number;
}

const ExtractedResultForm = (props: ExtractedResultFormProps) => {
  const [editMode, setEditMode] = useState(false);
  const [editHistoryModalOpen, setEditHistoryModalOpen] =
    useState<boolean>(false);
  const { extracted_result_score, indicator_key } = props;
  const params = useParams<{ companyId: string }>();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { language } = useAppSelector(selectUser);

  const indicator_keyword = indicator_key.indicator_keywords?.find(
    (indicator_keyword) => {
      return indicator_keyword.locale === language;
    }
  );

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    trigger,
    reset,
    formState: { isValid, errors, dirtyFields },
  } = useForm<ExtractedResultFormInterface>({
    defaultValues: {
      overall_score: null,
      extracted_result_values: [
        {
          id: 0,
          label: "",
          disclosure: "",
          unit: "",
        },
      ],
      reasons_for_change: "",
    },
  });

  const fields = watch();

  const setFormBasedOnStore = (): void => {
    const extracted_result_values =
      extracted_result_score.extracted_result_values?.map(
        (extracted_result_value) => extracted_result_value
      ) || [];
    reset({
      overall_score: extracted_result_score.overall_score,
      extracted_result_values,
      reasons_for_change: "",
    });
  };

  const REQUIRED = "required";
  const MAXLENGTH = "maxLength";

  useEffect(() => setFormBasedOnStore(), [extracted_result_score]);

  const setFormTextValue = (
    field: any,
    value: string,
    onChange: (value) => void
  ) => {
    if (value.trim() === "") onChange("");
    else onChange(value);
    trigger();
  };

  const setFormNumberValue = (
    field: any,
    value: string,
    onChange: (value) => void
  ) => {
    if (value === "") {
      onChange(null);
    } else if (value === "0") {
      onChange(0);
    } else {
      onChange(transformTextToFloatValue(value));
    }
    trigger();
  };

  const submit = (data) => {
    const overall_score = getRoundedOverallScore(data.overall_score);

    const requestData = {
      overall_score,
      extracted_result_values: data.extracted_result_values?.map(
        (result_value) => {
          return {
            id: result_value.id,
            disclosure: result_value.disclosure,
            unit: result_value.unit,
          };
        }
      ),
      reasons_for_change: data.reasons_for_change,
    };
    const quantitativeNewScorePayload = {
      category_id: props.category_id,
      company_id: Number(params.companyId),
      indicator_key_id: props.indicator_key_id,
      indicator_key_score_id: props.indicator_key_score_id,
      news_score_id: props.news_score_id,
      overall_score,
      reasons_for_change: data.reasons_for_change,
    };

    if (requestData.extracted_result_values?.length > 0) {
      dispatch(
        updateExtractedResultRequestedAction({
          extracted_result_score_id: extracted_result_score.id,
          data: requestData,
        })
      );
    }
    if (quantitativeNewScorePayload) {
      dispatch(
        updateQuantitativeNewScoreRequested(quantitativeNewScorePayload)
      );
    }
    setValue("reasons_for_change", "");
    setEditMode(false);
  };

  const handleCancel = () => {
    setFormBasedOnStore();
    setEditMode(false);
    trigger();
  };

  const hasError = useCallback(
    (name) => {
      return name in errors;
    },
    [fields]
  );

  const isFormChanged = useMemo(() => {
    const isExtractedResultDirty =
      dirtyFields.extracted_result_values?.filter((value) => {
        return value.disclosure || value.unit;
      }).length > 0;

    const isOverallScoreDirty = dirtyFields.overall_score;
    return isOverallScoreDirty || isExtractedResultDirty;
  }, [fields]);

  const renderHeaders = (hasLabel) => {
    if (editMode) {
      if (hasLabel) {
        return (
          <React.Fragment>
            <Grid item xs={4} />
            <Grid item xs={5}>
              <Box mt={2} mb={1.5}>
                <Text $size="md" $weight="bold">
                  {t("company:source_edit_mode.disclosure")}
                </Text>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box mt={2} mb={1.5}>
                <Text $size="md" $weight="bold">
                  {t("company:source_edit_mode.unit")}
                </Text>
              </Box>
            </Grid>
          </React.Fragment>
        );
      }
      if (!hasLabel) {
        return null;
      }
    }

    if (hasLabel) {
      return (
        <React.Fragment>
          <Grid item xs={6} />
          <Grid item xs={6}>
            <Box mt={2} mb={1.5}>
              <Text $size="md" $weight="bold">
                {t("company:source_view_mode.disclosure")}
              </Text>
            </Box>
          </Grid>
        </React.Fragment>
      );
    }
    if (!hasLabel) {
      return null;
    }
  };

  const renderValues = () => {
    const hasLabel =
      fields.extracted_result_values?.find((value) => !!value.label) !==
      undefined;
    return (
      <Grid container spacing={1}>
        {renderHeaders(hasLabel)}
        {fields.extracted_result_values?.map((value, index) => {
          if (editMode) {
            return (
              <ExtractedResultDisclosureForm
                key={value.id}
                hasLabel={hasLabel}
                label={value.label}
                disclosureName={`extracted_result_values.${index}.disclosure`}
                unitName={`extracted_result_values.${index}.unit`}
                control={control}
                onChange={setFormTextValue}
              />
            );
          }
          if (hasLabel) {
            return (
              <React.Fragment key={value.id}>
                <Grid item xs={6}>
                  <Text $size="md" style={{ wordBreak: "break-word" }}>
                    {value.label}
                  </Text>
                </Grid>
                <Grid item xs={6}>
                  <Text
                    $size="md"
                    style={{ wordBreak: "break-word" }}
                  >{`${value.disclosure} ${value.unit}`}</Text>
                </Grid>
              </React.Fragment>
            );
          }
          return (
            <React.Fragment key={value.id}>
              <Grid item xs={12}>
                <Text
                  $size="md"
                  style={{ wordBreak: "break-word" }}
                >{`${value.disclosure} ${value.unit}`}</Text>
              </Grid>
            </React.Fragment>
          );
        })}
      </Grid>
    );
  };

  return (
    <>
      <Text style={{ wordBreak: "break-word" }}>
        {t("company:source_view_mode.score")}
      </Text>
      <Form onSubmit={handleSubmit(submit)}>
        {editMode ? (
          <React.Fragment>
            <OverallScoreContainer>
              <Controller
                name="overall_score"
                rules={OVERALL_SCORE_VALIDATION_RULES}
                control={control}
                render={({ field, fieldState }) => {
                  return (
                    <ScoreTextField
                      value={hasValidValue(field.value) ? field.value : ""}
                      type="text"
                      onChange={(e) =>
                        setFormNumberValue(
                          field.name,
                          e.target.value,
                          field.onChange
                        )
                      }
                      inputRef={field.ref}
                      name={field.name}
                      id={field.name}
                      variant="outlined"
                      size="small"
                      error={fieldState.invalid}
                    />
                  );
                }}
              />
              <ErrorMessageContainer>
                {hasError("overall_score") ? <ScoreErrorMessage /> : null}
              </ErrorMessageContainer>
            </OverallScoreContainer>
          </React.Fragment>
        ) : (
          <ScoreTextLabel>
            <Text $size="md">
              {extracted_result_score.overall_score === null
                ? "-"
                : extracted_result_score.overall_score}
            </Text>
          </ScoreTextLabel>
        )}

        <Text
          $size="md"
          $weight="bold"
          style={{ marginTop: 32, marginBottom: 8 }}
        >
          {indicator_keyword?.keyword || ""}
        </Text>
        {renderValues()}

        {editMode && (
          <>
            <Text
              $size="md"
              $weight="bold"
              style={{ marginTop: 48, marginBottom: 8 }}
            >
              {t("company:source_edit_mode.reason_for_change")}
            </Text>
            <Controller
              name="reasons_for_change"
              control={control}
              rules={MAX_500_CHARACTERS_VALIDATION_RULES}
              render={({ field, fieldState }) => {
                const error = fieldState.invalid && isFormChanged;
                return (
                  <>
                    <TextAreaField
                      value={field.value}
                      onChange={(e) =>
                        setFormTextValue(
                          field.name,
                          e.target.value,
                          field.onChange
                        )
                      }
                      multiline
                      inputRef={field.ref}
                      name={field.name}
                      id={field.name}
                      variant="outlined"
                      error={error}
                    />
                    {fieldState.error?.type === REQUIRED && error && (
                      <RequiredErrorMessage />
                    )}
                    {fieldState.error?.type === MAXLENGTH && (
                      <ReasonForChangeLengthErrorMessage />
                    )}
                  </>
                );
              }}
            />
          </>
        )}

        {/* TODO: Outdated function */}
        {/* <EditContainer>
          {editMode ? (
            <>
              <CancelButton
                onClick={() => handleCancel()}
                color="primary"
                type="button"
                style={{ marginRight: 8 }}
              >
                {t("company:source_edit_mode.cancel")}
              </CancelButton>
              <SaveButton
                disabled={!isValid || !isFormChanged}
                color="primary"
                variant="contained"
                type="submit"
              >
                {t("company:source_edit_mode.save")}
              </SaveButton>
            </>
          ) : (
            <>
              <IconButton
                color="primary"
                disableRipple
                disableFocusRipple
                style={{ marginRight: 8 }}
                onClick={() => setEditMode(true)}
              >
                <EditIcon
                  style={{ marginRight: 8, height: 16, background: "none" }}
                />
                <LinkText>{t("company:source_view_mode.edit_all")}</LinkText>
              </IconButton>
              <LinkText onClick={() => setEditHistoryModalOpen(true)}>
                {t("company:source_view_mode.edit_history")}
              </LinkText>
            </>
          )}
        </EditContainer> */}
      </Form>
    </>
  );
};

export default React.memo(ExtractedResultForm);
