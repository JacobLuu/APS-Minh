import moment from "moment";
import React from "react";

import Box from "@material-ui/core/Box";

import Text from "../../../../components/Text";
import { COLOR_PRIMARY } from "../../../../themes/colors";

import type { Answer as AnswerType } from "../../../../types";

interface AnswerProps {
  answer: AnswerType;
  isEditable: boolean;
  setIsAddScoreModalOpen: (state: boolean) => void;
}

const Answer = (props: AnswerProps) => {
  const { answer, isEditable, setIsAddScoreModalOpen } = props;

  return (
    <Box my={2} pl={4} display="flex">
      <Box display="flex" flexDirection="column" width="12.5%">
        <Text $weight="bold">Score</Text>
        <Text $weight="bold" $color={COLOR_PRIMARY} $size="md">
          {answer.overall_score}
        </Text>
      </Box>

      <Box display="flex" flexDirection="column">
        <Box display="flex" flexDirection="column">
          <Text $weight="bold">Answer</Text>
          <Text>{answer.text}</Text>
        </Box>

        <Box display="flex" mt={0.75}>
          <Box mr={1}>
            <Text $weight="bold">
              {answer.member.first_name}
              &nbsp;
              {answer.member.last_name}
            </Text>
          </Box>
          <Box mr={1}>
            <Text>
              {moment.unix(answer.modified_at).format("HH:mm  DD-MM-YYYY")}
            </Text>
          </Box>

          {isEditable && (
            <Box>
              <Text
                $color={COLOR_PRIMARY}
                onClick={() => setIsAddScoreModalOpen(true)}
                $hasCursor
              >
                Edit
              </Text>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(Answer);
