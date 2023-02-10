import React from "react";

import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

import { CompanyScore } from "../../../../types/company";
import { Box, ChangedScoreBox } from "./styles";

interface ChangedScoreProps {
  companyScore: CompanyScore;
  getTextForChangedItem: (changed_item: string, before_value: string) => string;
}

const ChangedScore = (props: ChangedScoreProps) => {
  const { pre_score, overall_score } = props.companyScore;

  const valueOfChangedScore = React.useMemo(() => {
    if (!overall_score && pre_score) return -pre_score;
    if (overall_score != null && pre_score != null)
      return overall_score - pre_score;

    if (
      (pre_score == null || pre_score !== 0) &&
      (overall_score == null || overall_score !== 0)
    ) {
      return overall_score;
    }
  }, [overall_score, pre_score]);

  const isIncreasedScore = valueOfChangedScore > 0;

  const amountChangedScoreString = Math.abs(valueOfChangedScore)
    .toFixed(1)
    .toString();

  return (
    <ChangedScoreBox>
      {overall_score != null || pre_score != null ? (
        <Box $is_arrow_up={isIncreasedScore}>
          <span style={{ minWidth: 20 }}>
            <p>
              {props.getTextForChangedItem(
                "score",
                (overall_score != null ? overall_score : "-").toString()
              )}
            </p>
          </span>
          {valueOfChangedScore && (
            <div className="text_overall_score">
              <ArrowUpwardIcon className="is_arrow_up" />
              {props.getTextForChangedItem("score", amountChangedScoreString)}
            </div>
          )}
        </Box>
      ) : (
        "-"
      )}
    </ChangedScoreBox>
  );
};

export default React.memo(ChangedScore);
