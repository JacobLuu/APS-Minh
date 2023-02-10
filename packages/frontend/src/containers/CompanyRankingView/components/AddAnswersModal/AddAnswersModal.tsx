import React, { useState, useMemo } from "react";
import {
  Controller,
  useFieldArray,
  useForm,
  Control,
  FieldArrayWithId,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import LoadingOverlay from "react-loading-overlay";

import Box from "@material-ui/core/Box";
import HelpIcon from "@material-ui/icons/Help";
import CircularProgress from "@material-ui/core/CircularProgress";

import Text from "../../../../components/Text";
import Modal from "../../../../components/Modal";
import Tooltip from "../../../../components/Tooltip";
import { selectFactors } from "../../../../reducers/factors";
import {
  createTeamNoteRequested,
  updateTeamNotesRequested,
  selectTeamNotes,
} from "../../../../reducers/team_notes";
import { selectUser } from "../../../../reducers/user";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  COLOR_DISABLED_INPUT,
  COLOR_PRIMARY,
  STATE_OFF,
} from "../../../../themes/colors";
import { QuestionnaireScore } from "../../../../types/questionnaire_score";
import answersService from "../../../../services/answers";
import {
  MAX_500_CHARACTERS_OPTIONAL_RULES,
  SCORE_VALIDATION_RULES,
} from "../../../../utils/formValidator";
import { capitalizeWord } from "../../../../utils/miscellaneous";
import {
  CancelButton,
  CompanyText,
  FactorText,
  ScoreField,
  SmallText,
  TextAreaField,
  Title,
  UpdateButton,
  WarningText,
} from "./styles";

interface HeaderProps {
  companyName: string;
}

const Header = (props: HeaderProps) => {
  const { companyName } = props;
  const { t } = useTranslation();

  return (
    <Box mt={4} px={3}>
      <Box mb={2}>
        <Text $weight="bold" $size="md">
          {t("ranking_feature:create_ranking.set_default_factor")}
        </Text>
      </Box>
      <Box mb={1}>
        <SmallText>{t("ranking_feature:create_ranking.company")}</SmallText>
      </Box>
      <Box>
        <CompanyText>{companyName}</CompanyText>
      </Box>
    </Box>
  );
};

interface BodyProps {
  categoryLabel: string;
  control: Control<Form>;
  reset: Function;
  getValues: Function;
  trigger: Function;
  factors: FactorForm[];
  fields: FieldArrayWithId<Form, "factors", "id">[];
  dirtyFields: any;
}

const Body = (props: BodyProps) => {
  const {
    categoryLabel,
    control,
    reset,
    getValues,
    trigger,
    factors,
    fields,
    dirtyFields,
  } = props;
  const MAXLENGTH = "maxLength";

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Box width="16.66%">
          <Box display="flex" alignItems="center">
            <Title>{capitalizeWord(categoryLabel)}</Title>
            <Tooltip
              title="Quick input for factor qualitative scores"
              placement="top-start"
            >
              <HelpIcon
                style={{
                  fontSize: "14px",
                  color: `${COLOR_PRIMARY}`,
                  margin: "0px 0px 2px 2px",
                }}
              />
            </Tooltip>
          </Box>
          <Controller
            name="default_overall_score"
            rules={SCORE_VALIDATION_RULES}
            control={control}
            render={({ field, fieldState }) => {
              return (
                <>
                  <ScoreField
                    type="number"
                    onChange={(e) => {
                      reset({
                        default_overall_score:
                          e.target.value === "0"
                            ? 0
                            : Number(e.target.value) || "",
                        factors: factors.map((factor) => {
                          factor.factor_score.qualitative_score.overall_score =
                            factor.factor_score.qualitative_score
                              .questionnaire_scores.length === 0
                              ? 0
                              : Number(e.target.value) || "";
                          return factor;
                        }),
                        team_note_content: getValues("team_note_content"),
                      });
                      field.onChange(Number(e.target.value) || "");
                      trigger();
                    }}
                    value={field.value}
                    inputRef={field.ref}
                    name={field.name}
                    id={field.name}
                    variant="outlined"
                    error={fieldState?.error?.type.length > 0}
                  />
                </>
              );
            }}
          />
        </Box>

        <Box px={2} width="83.33%">
          <Title>Team Notes</Title>
          <Controller
            name="team_note_content"
            rules={MAX_500_CHARACTERS_OPTIONAL_RULES}
            control={control}
            render={({ field, fieldState }) => {
              return (
                <>
                  <TextAreaField
                    onChange={(e) => field.onChange(e.target.value)}
                    value={field.value}
                    multiline
                    minRows={5}
                    inputRef={field.ref}
                    name={field.name}
                    id={field.name}
                    placeholder="Enter your team note here"
                    variant="outlined"
                    error={fieldState.error?.type === MAXLENGTH}
                  />
                  <Text $color={STATE_OFF}>{fieldState?.error?.message}</Text>
                </>
              );
            }}
          />

          {fields.map((field, index) => (
            <React.Fragment key={field.id}>
              <Box
                mt={2.5}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <FactorText>{field.label}</FactorText>
                <Controller
                  name={`factors.${index}.factor_score.qualitative_score.overall_score`}
                  rules={SCORE_VALIDATION_RULES}
                  control={control}
                  render={({ field, fieldState }) => {
                    return (
                      <>
                        <ScoreField
                          type="number"
                          onChange={(e) => {
                            if (e.target.value === "0") field.onChange(0);
                            else if (e.target.value === "") field.onChange("");
                            else field.onChange(Number(e.target.value));
                          }}
                          value={field.value}
                          inputRef={field.ref}
                          name={field.name}
                          id={field.name}
                          variant="outlined"
                          error={fieldState.error?.type === MAXLENGTH}
                        />
                      </>
                    );
                  }}
                />
              </Box>
              {((getValues(
                `factors.${index}.factor_score.qualitative_score.overall_score`
              ) !== getValues("default_overall_score") &&
                getValues("default_overall_score") !== "" &&
                getValues("default_overall_score") === "0" &&
                getValues(
                  `factors.${index}.factor_score.qualitative_score.questionnaire_scores`
                ).length > 0) ||
                (dirtyFields.factors && dirtyFields.factors[index])) && (
                <Box mt={2}>
                  <Controller
                    name={`factors.${index}.factor_score.qualitative_score.text`}
                    rules={MAX_500_CHARACTERS_OPTIONAL_RULES}
                    control={control}
                    render={({ field, fieldState }) => {
                      return (
                        <>
                          <TextAreaField
                            onChange={(e) => field.onChange(e.target.value)}
                            value={field.value}
                            multiline
                            minRows={1}
                            inputRef={field.ref}
                            name={field.name}
                            id={field.name}
                            placeholder="Enter your answer here"
                            variant="outlined"
                          />
                          <Text $color={STATE_OFF}>
                            {fieldState.error?.message}
                          </Text>
                        </>
                      );
                    }}
                  />
                </Box>
              )}
            </React.Fragment>
          ))}
        </Box>
      </Box>

      {getValues("default_overall_score") > 0 && (
        <Box display="flex" justifyContent="center" mt={2}>
          <WarningText>
            The change you have made will affect the Qualitative Scores of all
            &nbsp;
            {capitalizeWord(categoryLabel)}
            &nbsp; factors
          </WarningText>
        </Box>
      )}
    </Box>
  );
};

interface ActionProps {
  handleCancel: () => void;
  isFetching: boolean;
  isDisabled: boolean;
  isCreateManyAnswersServiceFetching: boolean;
}

const Action = (props: ActionProps) => {
  const {
    handleCancel,
    isDisabled,
    isFetching,
    isCreateManyAnswersServiceFetching,
  } = props;
  const { t } = useTranslation();

  return (
    <Box display="flex" alignItems="center">
      <CancelButton variant="outlined" onClick={() => handleCancel()}>
        {t("ranking_feature:create_ranking.cancel")}
      </CancelButton>
      <Box display="flex" alignItems="center" position="relative">
        <UpdateButton
          variant="contained"
          type="submit"
          disabled={isDisabled || isFetching}
        >
          {t("ranking_feature:create_ranking.update")}
        </UpdateButton>
        {isCreateManyAnswersServiceFetching && (
          <CircularProgress
            size={20}
            style={{
              position: "absolute",
              right: -20,
            }}
          />
        )}
      </Box>
    </Box>
  );
};

interface Form {
  default_overall_score: number | string;
  factors: FactorForm[];
  team_note_content: string;
}

interface FactorForm {
  id: number;
  label: string;
  factor_score: {
    qualitative_score: {
      overall_score: string | number;
      text: string;
      questionnaire_scores: QuestionnaireScore[];
    };
  };
}

interface IAddAnswersModal {
  companyName: string;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  categoryScoreId: number;
  categoryLabel: string;
  company_id: number;
  getRankingList: () => void;
}

const AddAnswersModal = (props: IAddAnswersModal) => {
  const {
    setOpen,
    companyName,
    categoryScoreId,
    categoryLabel,
    getRankingList,
  } = props;
  const [
    isCreateManyAnswersServiceSuccess,
    setIsCreateManyAnswersServiceSuccess,
  ] = useState(false);
  const [
    isCreateManyAnswersServiceFetching,
    setIsCreateManyAnswersServiceFetching,
  ] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const { list: factors, status: factorsStateStatus } =
    useAppSelector(selectFactors);
  const teamNotes = useAppSelector(selectTeamNotes);

  const currentUserTeamNote = teamNotes?.list?.find(
    (teamNote) => teamNote.member.id === user.id
  );

  const default_factors: FactorForm[] = useMemo(() => {
    const result = [];
    for (let i = 0; i < factors?.length; i += 1) {
      result.push({
        id: factors[i].id,
        label: factors[i].label,
        factor_score: {
          qualitative_score: {
            qualitative_score_id: factors[i].factor_score.qualitative_score.id,
            overall_score:
              factors[i].factor_score.qualitative_score.overall_score || "",
            questionnaire_scores:
              factors[i].factor_score.qualitative_score.questionnaire_scores,
            text: "",
          },
        },
      });
    }
    return result;
  }, [factors]);

  const {
    control,
    handleSubmit,
    reset,
    trigger,
    getValues,
    formState: { dirtyFields, isSubmitting, isSubmitted },
  } = useForm<Form>({
    defaultValues: {
      default_overall_score: "",
      factors: default_factors,
      team_note_content: currentUserTeamNote?.content || "",
    },
    mode: "onChange",
  });

  const { fields } = useFieldArray({
    control,
    name: "factors",
  });

  const handleCancel = () => {
    setOpen(false);
    reset();
  };

  const submit = (data: Form) => {
    const factorPayloadData = data.factors.map(
      (payload) => payload.factor_score.qualitative_score
    );
    const payloadData = factorPayloadData.map((data) => ({
      ...data,
      member_id: user.id,
    }));
    const answers = payloadData
      .map((payload) => ({
        member_id: payload.member_id,
        qualitative_score_id: Number(payload.qualitative_score_id),
        overall_score: Number(payload.overall_score),
        text: payload.text || "This is the input from ranking",
      }))
      .filter((answer) => answer.text)
      .filter((answer) => answer.overall_score > 0);

    setIsCreateManyAnswersServiceFetching(true);
    answersService
      .createMany({
        company_id: props.company_id,
        answers,
      })
      .then(() => {
        getRankingList();
        setIsCreateManyAnswersServiceSuccess(true);
        setIsCreateManyAnswersServiceFetching(false);
      });

    if (data.team_note_content.length > 0 && currentUserTeamNote) {
      dispatch(
        updateTeamNotesRequested({
          id: currentUserTeamNote?.id,
          content: data.team_note_content,
        })
      );
    }

    if (!currentUserTeamNote && data.team_note_content.length > 0) {
      dispatch(
        createTeamNoteRequested({
          category_score_id: categoryScoreId,
          content: data.team_note_content,
          member_id: user.id,
        })
      );
    }
    reset();
  };

  React.useEffect(() => {
    reset({
      default_overall_score: "",
      factors: default_factors,
      team_note_content: currentUserTeamNote?.content || "",
    });
  }, [default_factors, currentUserTeamNote]);

  React.useEffect(() => {
    if (teamNotes.status.isSuccess && isCreateManyAnswersServiceSuccess) {
      setOpen(false);
    }
  }, [isCreateManyAnswersServiceSuccess, teamNotes.status.isSuccess]);

  const isFetching =
    teamNotes.status.isFetching || factorsStateStatus.isFetching;

  const isDisabled =
    getValues("factors")
      .map((factor) => factor.factor_score.qualitative_score.overall_score)
      .filter((score) => score > 0).length === 0 ||
    (isSubmitted && getValues("team_note_content").length < 500) ||
    isSubmitting;

  return (
    <Modal
      isOpen={props.isOpen}
      headerJSX={<Header companyName={companyName} />}
      bodyJSX={
        isFetching ? (
          <Box
            height="200px"
            width="100%"
            display="flex"
            justifyContent="center"
          >
            <LoadingOverlay active spinner />
          </Box>
        ) : (
          <Body
            categoryLabel={categoryLabel}
            control={control}
            reset={reset}
            getValues={getValues}
            trigger={trigger}
            factors={default_factors}
            fields={fields}
            dirtyFields={dirtyFields}
          />
        )
      }
      actionJSX={
        <Action
          handleCancel={handleCancel}
          isFetching={isFetching}
          isCreateManyAnswersServiceFetching={
            isCreateManyAnswersServiceFetching
          }
          isDisabled={isDisabled}
        />
      }
      handleSubmit={handleSubmit(submit)}
      handleClose={handleCancel}
      actionContainerPosition="center"
    />
  );
};

export default React.memo(AddAnswersModal);
