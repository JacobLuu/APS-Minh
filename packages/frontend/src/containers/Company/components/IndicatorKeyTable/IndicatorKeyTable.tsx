import React from "react";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

import Text from "../../../../components/Text";
import { COLOR_BORDER } from "../../../../themes/colors";
import IndicatorKeyScoreRow from "../IndicatorKeyScoreRow";

import type { QuantitativeScore } from "../../../../types/quantitative_score";

interface HeaderProps {
  isMetricsWeightageShown: boolean;
}

const Header = (props: HeaderProps) => {
  const { isMetricsWeightageShown } = props;
  const years = [2019, 2020, 2021];

  return (
    <>
      <Grid item xs={4}>
        <Box height="100%" display="flex">
          <Text $size="xs">Metric</Text>
        </Box>
      </Grid>

      <Grid item xs={8}>
        <Grid container style={{ height: "100%" }}>
          {years.map((year) => {
            return (
              <Grid key={year} item xs={4}>
                <Box
                  borderLeft={`1px solid ${COLOR_BORDER}`}
                  pl={3}
                  height="100%"
                  display="flex"
                >
                  <Box mb={2} width="50%">
                    <Text $weight="bold">{year}</Text>
                  </Box>

                  {isMetricsWeightageShown && (
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      pr={3}
                      width="50%"
                    >
                      <Text $size="xs">Score</Text>
                      <Text $size="xs">Weights</Text>
                    </Box>
                  )}
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </>
  );
};

interface BodyProps {
  quantitative_score: QuantitativeScore;
  isMetricsWeightageShown: boolean;
}

const Body = (props: BodyProps) => {
  const { quantitative_score, isMetricsWeightageShown } = props;
  const { indicator_key_scores } = quantitative_score;
  return (
    <>
      {indicator_key_scores.map((indicator_key_score, index) => {
        return (
          <IndicatorKeyScoreRow
            key={indicator_key_score.id}
            indicator_key_score={indicator_key_score}
            isMetricsWeightageShown={isMetricsWeightageShown}
            isFirstRow={index === 0}
          />
        );
      })}
    </>
  );
};

interface IndicatorKeyTableProps {
  quantitative_score: QuantitativeScore;
  isMetricsWeightageShown: boolean;
}

const IndicatorKeyTable = (props: IndicatorKeyTableProps) => {
  const { quantitative_score, isMetricsWeightageShown } = props;

  return (
    <Box display="flex" alignItems="center" mt={2} pl={4}>
      <Grid container>
        <Header isMetricsWeightageShown={isMetricsWeightageShown} />
        <Body
          quantitative_score={quantitative_score}
          isMetricsWeightageShown={isMetricsWeightageShown}
        />
      </Grid>
    </Box>
  );
};

export default React.memo(IndicatorKeyTable);
