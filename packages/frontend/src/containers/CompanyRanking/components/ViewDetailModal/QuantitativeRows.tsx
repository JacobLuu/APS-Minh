import React from "react";

import Box from "@material-ui/core/Box";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

import { selectUser } from "../../../../reducers/user";
import { useAppSelector } from "../../../../store/hooks";
import { IndicatorKeyScore } from "../../../../types";
import { countDisclosuresOfMetric } from "../../../../utils/countDisclosure";
import IndicatorsDetails from "./IndicatorsDetails";
import { Collapse, TextBold } from "./styles";

type Props = {
  isViewDetailCollapsed: boolean;
  indicatorKeyScore: IndicatorKeyScore;
};

const QuantitativeRows = (props: Props) => {
  const [isAnswersDetailedCollapsed, setIsAnswersDetailedCollapsed] =
    React.useState(false);
  const { extracted_result_scores, news_scores, indicator_key } =
    props.indicatorKeyScore;
  const { language } = useAppSelector(selectUser);
  const indicator_keyword = indicator_key.indicator_keywords.find(
    (indicator_keyword) => {
      return indicator_keyword.locale === language;
    }
  );

  return (
    <Box>
      {props.isViewDetailCollapsed && (
        <Box>
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
              {`${indicator_keyword.keyword || ""} (${countDisclosuresOfMetric(
                extracted_result_scores,
                news_scores
              )})`}
            </TextBold>
          </Collapse>
          {props?.indicatorKeyScore?.extracted_result_scores.map(
            (extracted_result_score) => (
              <IndicatorsDetails
                key={extracted_result_score.id}
                documents={
                  extracted_result_score?.extracted_result?.document &&
                  extracted_result_score?.extracted_result?.document
                }
                extracted_result_score={extracted_result_score}
                isAnswersDetailedCollapsed={isAnswersDetailedCollapsed}
              />
            )
          )}
        </Box>
      )}
    </Box>
  );
};

export default QuantitativeRows;
