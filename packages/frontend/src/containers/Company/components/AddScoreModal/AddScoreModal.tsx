import React, { useEffect } from "react";
import { Control, Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";

import Button from "../../../../components/Button/Button";
import Modal from "../../../../components/Modal";
import Text from "../../../../components/Text";
import {
  getCompanyDetailsRequested,
  selectCompany,
} from "../../../../reducers/company";
import {
  getFactorScoreFailed,
  getFactorScoreRequested,
} from "../../../../reducers/factor_scores";
import { selectUser } from "../../../../reducers/user";
import answersService from "../../../../services/answers";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { COLOR_PRIMARY, STATE_OFF } from "../../../../themes/colors";
import {
  MAX_500_CHARACTERS_VALIDATION_RULES,
  OVERALL_SCORE_VALIDATION_RULES,
} from "../../../../utils/formValidator";
import { ScoreField, Title } from "./styles";

import type { CompanyDetailsState as Company, Answer } from "../../../../types";

const Header = () => {
  return <Title>Set qualitative scores</Title>;
};

interface BodyProps {
  company: Company;
  control: Control<Form>;
}

const Body = (props: BodyProps) => {
  const { company, control } = props;
  return (
    <>
      <Box mb={2}>
        <Text>Company</Text>
        <Text $size="lg" $weight="bold" $color={COLOR_PRIMARY}>
          {company.name}
        </Text>
      </Box>

      <Box display="flex" justifyContent="space-between">
        <Box width="12.5%">
          <Text $weight="bold">Score</Text>
          <Controller
            name="overall_score"
            control={control}
            rules={OVERALL_SCORE_VALIDATION_RULES}
            render={({ field, fieldState }) => {
              return (
                <Box mt={0.5}>
                  <ScoreField
                    value={field.value}
                    onChange={field.onChange}
                    inputRef={field.ref}
                    name={field.name}
                    id={field.name}
                    variant="outlined"
                    type="number"
                    error={fieldState?.error?.message?.length > 0}
                  />
                  {fieldState.error && (
                    <Text $color={STATE_OFF} $weight="bold" $size="sm">
                      {fieldState.error.message}
                    </Text>
                  )}
                </Box>
              );
            }}
          />
        </Box>

        <Box width="82.5%">
          <Text $weight="bold">Answer</Text>
          <Controller
            name="text"
            control={control}
            rules={MAX_500_CHARACTERS_VALIDATION_RULES}
            render={({ field, fieldState }) => {
              return (
                <Box mt={0.5}>
                  <TextField
                    value={field.value}
                    onChange={field.onChange}
                    multiline
                    inputRef={field.ref}
                    name={field.name}
                    id={field.name}
                    variant="outlined"
                    fullWidth
                    minRows={5}
                    placeholder="Enter your answer here"
                    error={fieldState?.error?.message?.length > 0}
                  />
                  {fieldState.error && (
                    <Text $color={STATE_OFF} $weight="bold" $size="sm">
                      {fieldState.error.message}
                    </Text>
                  )}
                </Box>
              );
            }}
          />
        </Box>
      </Box>
    </>
  );
};

interface ActionsProps {
  handleClose: () => void;
}

const Actions = (props: ActionsProps) => {
  const { handleClose } = props;
  return (
    <>
      <Button onClick={handleClose} $label="Cancel" $category="cancel" />
      <Button type="submit" $label="Save" $category="confirm" />
    </>
  );
};

export interface Form {
  overall_score: number | string;
  text: string;
}

interface AddScoreModalProps {
  isOpen: boolean;
  setIsOpen: Function;
  answer: Answer;
  qualitative_score_id: number;
  factor_score_id: number;
  category_id: number;
  reloadPage: () => void;
}

const AddScoreModal = (props: AddScoreModalProps) => {
  const {
    isOpen,
    setIsOpen,
    answer,
    qualitative_score_id,
    factor_score_id,
    category_id,
    reloadPage,
  } = props;
  const company = useAppSelector(selectCompany);
  const { id: member_id } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const params = useParams<{ companyId: string }>();

  const { control, handleSubmit, reset } = useForm<Form>({
    defaultValues: {
      overall_score: "",
      text: "",
    },
  });

  useEffect(() => {
    reset({
      overall_score: answer?.overall_score || "",
      text: answer?.text || "",
    });
  }, [answer]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const dispatchGetFactorScore = () => {
    dispatch(
      getFactorScoreRequested({
        id: factor_score_id,
      })
    );
  };

  const dispatchGetCompany = () => {
    dispatch(
      getCompanyDetailsRequested({
        company_id: Number(params.companyId),
        category_id,
      })
    );
  };

  const save = (data: Form) => {
    handleClose();
    try {
      if (answer) {
        answersService
          .updateOne(answer.id, {
            overall_score: Number(data.overall_score),
            text: data.text.trim(),
          })
          .then(dispatchGetFactorScore)
          .then(dispatchGetCompany)
          .then(reloadPage);
      } else {
        answersService
          .create({
            overall_score: Number(data.overall_score),
            text: data.text.trim(),
            member_id,
            qualitative_score_id,
          })
          .then(dispatchGetFactorScore)
          .then(dispatchGetCompany)
          .then(reloadPage);
      }
    } catch (error: any) {
      dispatch(
        getFactorScoreFailed({
          error,
        })
      );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      handleSubmit={handleSubmit(save)}
      handleClose={handleClose}
      headerJSX={<Header />}
      bodyJSX={<Body control={control} company={company} />}
      actionJSX={<Actions handleClose={handleClose} />}
    />
  );
};

export default React.memo(AddScoreModal);
