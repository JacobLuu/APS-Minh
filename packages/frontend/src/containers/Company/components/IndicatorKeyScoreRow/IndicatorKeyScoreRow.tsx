import React, { useMemo } from "react";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

import Text from "../../../../components/Text";
import { COLOR_BORDER, COLOR_ENVIRONMENT } from "../../../../themes/colors";
import {
  ExtractedResultValueByLabel,
  ExtractedResultValuesByYear,
} from "../../../../types/extracted_result_value";
import { YearlyIndicatorKeyScore } from "../../../../types/yearly_indicator_key_score";
import { capitalizeWord } from "../../../../utils/miscellaneous";
import ExtractedResultValueRow from "../ExtractedResultValueRow";

import type {
  IndicatorKeyScore,
  ExtractedResultScore,
} from "../../../../types";

interface IndicatorKeyScoreRowProps {
  indicator_key_score: IndicatorKeyScore;
  isMetricsWeightageShown: boolean;
  isFirstRow: boolean;
}

const IndicatorKeyScoreRow = (props: IndicatorKeyScoreRowProps) => {
  const { indicator_key_score, isMetricsWeightageShown, isFirstRow } = props;

  // TODO: Hard-coded years for now
  const years = [2019, 2020, 2021];

  const yearly_indicator_key_scores = useMemo((): YearlyIndicatorKeyScore[] => {
    const result = [];

    for (let i = 0; i < years.length; i += 1) {
      const yearly_indicator_key_score =
        indicator_key_score.yearly_indicator_key_scores.find(
          (yearly_indicator_key_score) =>
            yearly_indicator_key_score.year === years[i]
        );
      if (yearly_indicator_key_score) {
        result.push(yearly_indicator_key_score);
      } else {
        result.push({
          disclosure: null,
          id: years[0] - years[i],
          overall_score: null,
          unit: "",
          weightage: null,
          year: null,
        } as YearlyIndicatorKeyScore);
      }
    }

    return result;
  }, [indicator_key_score.yearly_indicator_key_scores]);

  const { extracted_result_scores } = indicator_key_score;
  const extracted_result_value_labels = new Set<string>();
  const extracted_result_values_by_year = {} as ExtractedResultValuesByYear;

  for (let i = 0; i < years.length; i += 1) {
    const year = years[i];
    const yearly_extracted_result_scores: ExtractedResultScore[] =
      extracted_result_scores.filter((extracted_result_score) => {
        const extracted_result_document =
          extracted_result_score.extracted_result.document;
        const document_year =
          extracted_result_document && extracted_result_document[0].year;
        const extracted_result_score_year =
          extracted_result_score.year || document_year;
        return extracted_result_score_year === year;
      });

    extracted_result_values_by_year[year] = {} as ExtractedResultValueByLabel;

    for (let j = 0; j < yearly_extracted_result_scores.length; j += 1) {
      if (yearly_extracted_result_scores[j]) {
        for (
          let k = 0;
          k < yearly_extracted_result_scores[j].extracted_result_pages.length;
          k += 1
        ) {
          const extracted_result_page =
            yearly_extracted_result_scores[j].extracted_result_pages[k];
          for (
            let m = 0;
            m < extracted_result_page.extracted_result_values.length;
            m += 1
          ) {
            const extracted_result_value =
              extracted_result_page.extracted_result_values[m];
            if (extracted_result_value.label) {
              extracted_result_value_labels.add(extracted_result_value.label);
              extracted_result_values_by_year[year][
                extracted_result_value.label
              ] = extracted_result_value;
              extracted_result_values_by_year[year].extracted_result_score_id =
                yearly_extracted_result_scores[j].id;
            }
          }
        }
      }
    }
  }

  return (
    <>
      <Grid item xs={4}>
        <Box
          borderTop={!isFirstRow ? `1px solid ${COLOR_BORDER}` : ""}
          pt={!isFirstRow ? 1.5 : 0}
          pb={1.5}
          height="100%"
        >
          <Text>{capitalizeWord(indicator_key_score.indicator_key.label)}</Text>
        </Box>
      </Grid>
      <Grid item xs={8}>
        <Grid container style={{ height: "100%" }}>
          {yearly_indicator_key_scores.map(
            (yearly_indicator_key_score: YearlyIndicatorKeyScore) => {
              return (
                <Grid key={yearly_indicator_key_score.id} item xs={4}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    borderTop={!isFirstRow ? `1px solid ${COLOR_BORDER}` : ""}
                    borderLeft={`1px solid ${COLOR_BORDER}`}
                    px={3}
                    pt={!isFirstRow ? 1.5 : 0}
                    pb={1.5}
                    height="100%"
                  >
                    <Box width="60%">
                      <Text
                        $weight="bold"
                        $color={COLOR_ENVIRONMENT}
                        style={{
                          wordBreak: "break-all",
                        }}
                      >
                        {yearly_indicator_key_score.disclosure || "-"}
                        &nbsp;&nbsp;
                        {yearly_indicator_key_score.unit}
                      </Text>
                    </Box>

                    {isMetricsWeightageShown && (
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        width="40%"
                      >
                        <Text>
                          {yearly_indicator_key_score.overall_score?.toFixed(
                            1
                          ) || "-"}
                        </Text>
                        <Text>
                          {yearly_indicator_key_score.weightage
                            ? `${yearly_indicator_key_score.weightage}%`
                            : "-"}
                        </Text>
                      </Box>
                    )}
                  </Box>
                </Grid>
              );
            }
          )}
        </Grid>
      </Grid>

      {[...extracted_result_value_labels].map(
        (extracted_result_value_label) => {
          return (
            <ExtractedResultValueRow
              key={extracted_result_value_label}
              extracted_result_values_by_year={extracted_result_values_by_year}
              label={extracted_result_value_label}
            />
          );
        }
      )}
    </>
  );
};

export default React.memo(IndicatorKeyScoreRow);
