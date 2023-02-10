import React, { useState } from "react";

import Box from "@material-ui/core/Box";

import Button from "../../../../components/Button";
import Text from "../../../../components/Text";
import { selectUser } from "../../../../reducers/user";
import { useAppSelector } from "../../../../store/hooks";
import {
  COLOR_PRIMARY,
  FRAME_BACKGROUND,
  WHITE,
} from "../../../../themes/colors";
import { QualitativeScore } from "../../../../types/qualitative_score";
import { QuestionnaireScore } from "../../../../types/questionnaire_score";
import AddScoreModal from "../AddScoreModal";
import Answer from "../Answer";

interface HeaderProps {
  qualitative_score: QualitativeScore;
}

const Header = (props: HeaderProps) => {
  const { qualitative_score } = props;

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      pl={4}
      py={1.5}
      borderRadius={8}
      bgcolor={FRAME_BACKGROUND}
    >
      <Box display="flex" mr={2}>
        <Text $weight="bold">Qualitative</Text>
      </Box>

      <Box display="flex">
        <Box mr={2}>
          <Text $weight="bold">Score</Text>
        </Box>
        <Box mr={9}>
          <Text $weight="bold">{`${
            qualitative_score.overall_score || "-"
          }`}</Text>
        </Box>

        <Box mr={2.5}>
          <Text $weight="bold">Weights</Text>
        </Box>
        <Box mr={4}>
          <Text $weight="bold">{`${qualitative_score.weightage || "-"}%`}</Text>
        </Box>
      </Box>
    </Box>
  );
};

interface BodyProps {
  questionnaire_scores: QuestionnaireScore[];
}

const Body = (props: BodyProps) => {
  const { questionnaire_scores = [] } = props;
  const [doesViewAllQuestionnaires, setDoesViewAllQuestionnaires] =
    useState(false);

  const renderedQuestionnaireScores = doesViewAllQuestionnaires
    ? questionnaire_scores
    : questionnaire_scores.slice(0, 3);

  const handleViewQuestionnaire = () => {
    setDoesViewAllQuestionnaires((prevState) => !prevState);
  };

  return (
    <Box mt={2} pl={4}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={2}
      >
        <Text $weight="bold">Guiding Questions</Text>
      </Box>

      {questionnaire_scores.length === 0 && (
        <Box my={2.5}>
          <Text>There&apos;s no question.</Text>
        </Box>
      )}

      {renderedQuestionnaireScores.map((questionnaire_score) => (
        <Box key={questionnaire_score.id} my={1.5}>
          <Text>{`- ${questionnaire_score.questionnaire.text}`}</Text>
        </Box>
      ))}

      {questionnaire_scores.length > 3 && (
        <Box mb={1}>
          <Text
            $color={COLOR_PRIMARY}
            onClick={handleViewQuestionnaire}
            $hasCursor
          >
            {doesViewAllQuestionnaires ? "View Less" : "View More"}
            &nbsp;&gt;&gt;
          </Text>
        </Box>
      )}
    </Box>
  );
};

interface ActionProps {
  setIsAddScoreModalOpen: (state: boolean) => void;
  isDisabled: boolean;
}

const Action = (props: ActionProps) => {
  const { setIsAddScoreModalOpen, isDisabled } = props;

  const handleAddScore = () => {
    setIsAddScoreModalOpen(true);
  };

  return (
    <Box mt={2} pl={4}>
      <Button
        onClick={handleAddScore}
        $label="Add scores"
        $category="confirm"
        disabled={isDisabled}
      />
    </Box>
  );
};

interface QualitativeBoxProps {
  qualitative_score: QualitativeScore;
  factor_score_id: number;
  category_id: number;
  reloadPage: () => void;
}

const QualitativeBox = (props: QualitativeBoxProps) => {
  const { qualitative_score, factor_score_id, category_id, reloadPage } = props;
  const [isAddScoreModalOpen, setIsAddScoreModalOpen] = useState(false);
  const {
    questionnaire_scores,
    id: qualitative_score_id,
    answers,
  } = qualitative_score ||
  ({
    questionnaire_scores: [],
    id: null,
    answers: [],
  } as QualitativeScore);

  const { id: memberId } = useAppSelector(selectUser);

  const currentUserAnswer = answers.find((answer) => {
    return answer.member.id === memberId;
  });

  return (
    <Box height="100%" my={4} borderRadius={8} bgcolor={WHITE}>
      <Header qualitative_score={qualitative_score} />
      <Body questionnaire_scores={questionnaire_scores} />

      <Action
        setIsAddScoreModalOpen={setIsAddScoreModalOpen}
        isDisabled={Boolean(currentUserAnswer)}
      />

      {answers.map((answer) => (
        <Answer
          key={answer.id}
          answer={answer}
          isEditable={answer.member.id === memberId}
          setIsAddScoreModalOpen={setIsAddScoreModalOpen}
        />
      ))}

      <AddScoreModal
        isOpen={isAddScoreModalOpen}
        setIsOpen={setIsAddScoreModalOpen}
        answer={currentUserAnswer}
        qualitative_score_id={qualitative_score_id}
        factor_score_id={factor_score_id}
        category_id={category_id}
        reloadPage={reloadPage}
      />
    </Box>
  );
};

export default React.memo(QualitativeBox);
