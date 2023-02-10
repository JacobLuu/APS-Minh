import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import Box from "@material-ui/core/Box";
import MenuItem from "@material-ui/core/MenuItem";

import EditingTextField from "../../../../components/EditingTextField";
import Text from "../../../../components/Text";
import {
  AnswerLengthErrorMessage,
  SourceLengthErrorMessage,
} from "../../../../components/ErrorMessage";
import { DroppableId } from "../../../../constants/enums";
import { addQualitativeDisclosureFromRanking } from "../../../../reducers/category";
import { selectDocuments } from "../../../../reducers/documents";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { COLOR_PRIMARY, SONIC_GRAY } from "../../../../themes/colors";
import {
  MAX_200_CHARACTERS_VALIDATION_RULES,
  MAX_500_CHARACTERS_VALIDATION_RULES,
} from "../../../../utils/formValidator";
import { setFormTextValue } from "../../../../utils/inputHelpers";
import {
  AddAnswer,
  AddAnswerButton,
  AddAnswerForm,
  CancelButton,
  DocumentSelect,
  SaveButton,
  TextAreaField,
  TextItalic,
} from "./styles";

import type { NewsScore } from "../../../../types/news_score";
import type { Answer as QualitativeAnswer } from "../../../../types/answer";
import type { DisclosurePayload } from "../../../../types/factor";

type Props = {
  companyId: number;
  categoryId: number;
  questionnaireScoreId: number;
  isAnswersDetailedCollapsed: boolean;
  answers: QualitativeAnswer[];
  news_scores: NewsScore[];
  selectedTab: string;
  droppableId: DroppableId;
  isNotDraggable: boolean;
};

const AnswersDetails = (props: Props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { list: documents } = useAppSelector(selectDocuments);

  const [isAddingAnswer, setIsAddingAnswer] = React.useState(false);
  const { questionnaireScoreId, news_scores, droppableId, isNotDraggable } =
    props;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<DisclosurePayload>({
    defaultValues: {
      // initial value for document_id is an empty string to conform with <Select> API
      document_id: "",
      overall_score: null,
      reasons_for_change: "",
      source: "",
      text: "",
      weightage: null,
      year: "",
    },
    mode: "onChange",
  });

  const fields = watch();

  const save = (data) => {
    setIsAddingAnswer(false);
    if (data.document_id) data.source = null;
    else data.document_id = null;
    delete data.year;

    const selectedDocument = documents.find(
      (document) => document.id === data.document_id
    );
    const documentName = selectedDocument?.name || data.source || "";

    dispatch(
      addQualitativeDisclosureFromRanking({
        category_id: props.categoryId,
        company_id: props.companyId,
        questionnaire_score_id: questionnaireScoreId,
        data,
        document_name: documentName,
        selectedTab: props.selectedTab,
      })
    );
    reset();
  };

  const handleAnswerCancel = () => {
    setIsAddingAnswer(false);
    reset();
  };

  const isAddAnswerDisabled = React.useMemo(() => {
    if (droppableId === DroppableId.company_list) {
      return true;
    }
    return isNotDraggable;
  }, [isNotDraggable, droppableId]);

  return (
    <>
      {props.isAnswersDetailedCollapsed && (
        <Box>
          {props.answers.map((answer) => (
            <Box
              style={{ paddingLeft: "40px", paddingBottom: "15px" }}
              key={answer.id}
            >
              <Text $size="xs" $weight="bold" $color={SONIC_GRAY}>
                {answer.document?.name || answer.source}
              </Text>
              <TextItalic style={{ color: COLOR_PRIMARY }}>
                {answer.text}
              </TextItalic>
            </Box>
          ))}

          {news_scores.map((news_score) => (
            <Box
              style={{ paddingLeft: "40px", paddingBottom: "15px" }}
              key={news_score.id}
            >
              <Text>{news_score?.news?.source_name}</Text>
              <TextItalic style={{ color: COLOR_PRIMARY }}>
                {news_score?.news?.title}
              </TextItalic>
            </Box>
          ))}

          {!isAddingAnswer && (
            <AddAnswerButton
              disableRipple
              disabled={isAddAnswerDisabled}
              color="primary"
              type="button"
              onClick={() => setIsAddingAnswer(true)}
            >
              {t("ranking_feature:view_detail_modal.add_answer")}
            </AddAnswerButton>
          )}
          {isAddingAnswer && (
            <AddAnswer>
              <AddAnswerForm onSubmit={handleSubmit(save)}>
                <Box mb={1.5}>
                  <Controller
                    name="document_id"
                    control={control}
                    render={({ field }) => {
                      return (
                        <DocumentSelect
                          labelId="document-select-label"
                          id="document-select"
                          value={fields.document_id}
                          onChange={field.onChange}
                          variant="outlined"
                          MenuProps={{
                            anchorOrigin: {
                              vertical: "bottom",
                              horizontal: "left",
                            },
                            transformOrigin: {
                              vertical: "top",
                              horizontal: "left",
                            },
                            getContentAnchorEl: null,
                          }}
                        >
                          {documents.map((document) => {
                            return (
                              <MenuItem key={document.id} value={document.id}>
                                {document.name}
                              </MenuItem>
                            );
                          })}
                          <MenuItem value={0}>
                            {t("company:qualitative_edit_mode.others")}
                          </MenuItem>
                        </DocumentSelect>
                      );
                    }}
                  />
                </Box>

                {fields.document_id === 0 && (
                  <Box mb={1.5}>
                    <EditingTextField
                      isEditing
                      text={fields.source}
                      name="source"
                      control={control}
                      placeholder={`${t(
                        "company:qualitative_edit_mode.source_name"
                      )}*`}
                      onChange={setFormTextValue}
                      rules={MAX_200_CHARACTERS_VALIDATION_RULES}
                      customErrorMessage={<SourceLengthErrorMessage />}
                    />
                  </Box>
                )}

                <Controller
                  name="text"
                  control={control}
                  rules={MAX_500_CHARACTERS_VALIDATION_RULES}
                  render={({ field, fieldState }) => {
                    return (
                      <Box width="100%">
                        <TextAreaField
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                          multiline
                          inputRef={field.ref}
                          name="text"
                          id="text"
                          variant="outlined"
                          error={fieldState.invalid}
                          placeholder={t(
                            "ranking_feature:view_detail_modal.answer"
                          )}
                        />
                        {errors.text && <AnswerLengthErrorMessage />}
                      </Box>
                    );
                  }}
                />
                <Box className="buttonGroup">
                  <CancelButton
                    disableRipple
                    color="primary"
                    type="button"
                    onClick={() => handleAnswerCancel()}
                  >
                    {t("ranking_feature:view_detail_modal.cancel")}
                  </CancelButton>
                  <SaveButton disableRipple color="primary" type="submit">
                    {t("ranking_feature:view_detail_modal.save")}
                  </SaveButton>
                </Box>
              </AddAnswerForm>
            </AddAnswer>
          )}
        </Box>
      )}
    </>
  );
};

export default AnswersDetails;
