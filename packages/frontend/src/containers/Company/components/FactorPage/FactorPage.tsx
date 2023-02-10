import isEmpty from "lodash/isEmpty";
import React, { useEffect } from "react";
import LoadingOverlay from "react-loading-overlay";

import Box from "@material-ui/core/Box";

import Accordion from "../../../../components/Accordion";
import Text from "../../../../components/Text";
import {
  getFactorScoreRequested,
  selectFactorScores,
} from "../../../../reducers/factor_scores";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  COLOR_BOX_SHADOW,
  COLOR_TEXT_SECONDARY,
  COLOR_PRIMARY,
  WHITE,
} from "../../../../themes/colors";
import { FactorScore } from "../../../../types/factor_score";
import QualitativeBox from "../QualitativeBox";
import QuantitativeTable from "../QuantitativeTable";

import type { Factor } from "../../../../types";
import type { QuantitativeScore } from "../../../../types/quantitative_score";
import type { QualitativeScore } from "../../../../types/qualitative_score";

interface HeaderProps {
  label: string;
  score: number;
  weightage: number;
}

const Header = (props: HeaderProps) => {
  const { label, score, weightage } = props;

  const handleChangeColor = (weightage) => {
    if (weightage > 0) return COLOR_PRIMARY;
    return COLOR_TEXT_SECONDARY;
  };

  return (
    <>
      <Box>
        <Text $size="md" $weight="bold" $color={handleChangeColor(weightage)}>
          {label}
        </Text>
      </Box>

      <Box display="flex" justifyContent="space-between">
        <Box display="flex" justifyContent="space-between" mr={8} width="80px">
          <Box mr={2}>
            <Text
              $size="md"
              $weight="bold"
              $color={handleChangeColor(weightage)}
            >
              Score
            </Text>
          </Box>
          <Box>
            <Text
              $size="md"
              $weight="bold"
              $color={handleChangeColor(weightage)}
            >
              {score || "-"}
            </Text>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" mr={4} width="100px">
          <Box mr={2}>
            <Text
              $size="md"
              $weight="bold"
              $color={handleChangeColor(weightage)}
            >
              Weights
            </Text>
          </Box>
          <Box>
            <Text
              $size="md"
              $weight="bold"
              $color={handleChangeColor(weightage)}
            >
              {weightage ? `${weightage}%` : "- %"}
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  );
};

interface FactorPageProps {
  factor: Factor;
  isMetricsWeightageShown: boolean;
  isExpanded: boolean;
  setIsExpanded?: Function;
  index?: number;
  category_id: number;
  reloadPage?: () => void;
}

const FactorPage = (props: FactorPageProps) => {
  const {
    factor,
    isMetricsWeightageShown,
    isExpanded,
    setIsExpanded,
    index,
    category_id,
    reloadPage,
  } = props;

  const dispatch = useAppDispatch();
  const { factor_scores_by_id } = useAppSelector(selectFactorScores);

  const handleExpand = () => {
    setIsExpanded((prevState: boolean[]) =>
      prevState.map((isExpanded, factorPageIndex) => {
        return index === factorPageIndex ? !isExpanded : isExpanded;
      })
    );
  };

  useEffect(() => {
    if (isExpanded) {
      dispatch(
        getFactorScoreRequested({
          id: factor.factor_score.id,
        })
      );
    }
  }, [isExpanded, factor.factor_score.id]);

  let factor_score = {} as FactorScore;
  let qualitative_score = {} as QualitativeScore;
  let quantitative_score = {} as QuantitativeScore;

  if (
    !isEmpty(factor_scores_by_id) &&
    !isEmpty(factor_scores_by_id[factor.factor_score.id])
  ) {
    factor_score = factor_scores_by_id[factor.factor_score.id];
    ({ qualitative_score, quantitative_score } = factor_score);
  }

  return (
    <Box
      bgcolor={WHITE}
      boxShadow={COLOR_BOX_SHADOW}
      py={3}
      px={3.5}
      mb={2}
      borderRadius={8}
    >
      <Accordion
        headerJSX={
          <Header
            score={
              factor_score.overall_score || factor.factor_score.overall_score
            }
            weightage={factor_score.weightage || factor.factor_score.weightage}
            label={factor.label}
          />
        }
        isExpanded={isExpanded}
        handleExpand={handleExpand}
      >
        {factor_score.id ? (
          <>
            <QuantitativeTable
              quantitative_score={quantitative_score}
              isMetricsWeightageShown={isMetricsWeightageShown}
            />
            <QualitativeBox
              qualitative_score={qualitative_score}
              factor_score_id={factor_score.id}
              category_id={category_id}
              reloadPage={reloadPage}
            />
          </>
        ) : (
          <Box
            height="200px"
            width="100%"
            display="flex"
            justifyContent="center"
          >
            <LoadingOverlay active spinner />
          </Box>
        )}
      </Accordion>
    </Box>
  );
};

FactorPage.defaultProps = {
  setIsExpanded: () => {},
  reloadPage: () => {},
  index: null,
};

export default React.memo(FactorPage);
