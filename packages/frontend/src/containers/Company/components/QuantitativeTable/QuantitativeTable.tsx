import React from "react";

import Box from "@material-ui/core/Box";

import Text from "../../../../components/Text";
import { FRAME_BACKGROUND, WHITE } from "../../../../themes/colors";
import IndicatorKeyTable from "../IndicatorKeyTable";
import type { QuantitativeScore } from "../../../../types/quantitative_score";

interface HeaderProps {
  quantitative_score: QuantitativeScore;
}

const Header = (props: HeaderProps) => {
  const { quantitative_score } = props;
  const { overall_score, weightage } = quantitative_score;

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      pl={4}
      py={1.5}
      borderRadius={8}
      style={{
        backgroundColor: `${FRAME_BACKGROUND}`,
      }}
    >
      <Box display="flex" mr={2}>
        <Text $weight="bold">Quantitative</Text>
      </Box>

      <Box display="flex">
        <Box display="flex" justifyContent="space-between" mr={8} width="80px">
          <Box mr={2}>
            <Text $weight="bold">Score</Text>
          </Box>
          <Box>
            <Text $weight="bold">{`${overall_score || "-"}`}</Text>
          </Box>
        </Box>

        <Box display="flex" justifyContent="space-between" mr={4} width="100px">
          <Box mr={2}>
            <Text $weight="bold">Weights</Text>
          </Box>
          <Box>
            <Text $weight="bold">{`${weightage || "-"}%`}</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

interface QuantitativeTableProps {
  quantitative_score: QuantitativeScore;
  isMetricsWeightageShown: boolean;
}

const QuantitativeTable = (props: QuantitativeTableProps) => {
  const { quantitative_score, isMetricsWeightageShown } = props;

  return (
    <Box
      style={{
        backgroundColor: `${WHITE}`,
      }}
      height="100%"
      borderRadius={8}
      mt={2}
    >
      <Header quantitative_score={quantitative_score} />
      <IndicatorKeyTable
        quantitative_score={quantitative_score}
        isMetricsWeightageShown={isMetricsWeightageShown}
      />
    </Box>
  );
};

export default React.memo(QuantitativeTable);
