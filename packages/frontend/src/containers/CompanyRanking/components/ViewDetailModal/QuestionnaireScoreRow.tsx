import React from "react";

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

import {
  DroppableId,
  Language as LanguageEnum,
} from "../../../../constants/enums";
import { selectUser } from "../../../../reducers/user";
import { useAppSelector } from "../../../../store/hooks";
import { countDisclosuresOfMetric } from "../../../../utils/countDisclosure";
import AnswersDetails from "./AnswersDetails";
import { Collapse, TextBold } from "./styles";

import type { QuestionnaireScore } from "../../../../types/questionnaire_score";

type Props = {
  companyId: number;
  categoryId: number;
  isViewDetailCollapsed: boolean;
  questionnaireScore: QuestionnaireScore;
  selectedTab: string;
  droppableId: DroppableId;
  isNotDraggable: boolean;
};

const QuestionnaireScoreRow = (props: Props) => {
  const [isAnswersDetailedCollapsed, setIsAnswersDetailedCollapsed] =
    React.useState(false);
  const { answers, news_scores } = props.questionnaireScore;
  const { language } = useAppSelector(selectUser);

  return (
    <>
      {props.isViewDetailCollapsed && (
        <>
          <Collapse
            display="flex"
            onClick={() =>
              setIsAnswersDetailedCollapsed((prevState) => !prevState)
            }
          >
            {isAnswersDetailedCollapsed ? (
              <ArrowDropDownIcon style={{ cursor: "pointer" }} />
            ) : (
              <ArrowDropUpIcon style={{ cursor: "pointer" }} />
            )}
            <TextBold>
              {`${
                language === LanguageEnum.chinese
                  ? props?.questionnaireScore?.questionnaire?.text_cn
                  : props?.questionnaireScore?.questionnaire?.text
              } (${countDisclosuresOfMetric(answers, news_scores)})`}
            </TextBold>
          </Collapse>
          <AnswersDetails
            answers={props.questionnaireScore?.answers}
            news_scores={props.questionnaireScore?.news_scores}
            questionnaireScoreId={props.questionnaireScore.id}
            companyId={props.companyId}
            categoryId={props.categoryId}
            isAnswersDetailedCollapsed={isAnswersDetailedCollapsed}
            selectedTab={props.selectedTab}
            droppableId={props.droppableId}
            isNotDraggable={props.isNotDraggable}
          />
        </>
      )}
    </>
  );
};

export default QuestionnaireScoreRow;
