import React, { useState } from "react";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

import Modal from "../../../../components/Modal";
import Text from "../../../../components/Text";
import SourceView from "../../../../containers/SourceView";
import { COLOR_BORDER, COLOR_ENVIRONMENT } from "../../../../themes/colors";
import { ExtractedResultValuesByYear } from "../../../../types/extracted_result_value";
import { capitalizeWord } from "../../../../utils/miscellaneous";

import type { ExtractedResultValue } from "../../../../types/extracted_result_value";

interface ExtractedResultValueRowProps {
  label: string;
  extracted_result_values_by_year: ExtractedResultValuesByYear;
}

const ExtractedResultValueRow = (props: ExtractedResultValueRowProps) => {
  const { label, extracted_result_values_by_year } = props;
  const years = [2019, 2020, 2021];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [extracted_result_score_id, set_extracted_result_score_id] =
    useState<number>(null);

  const handleClickDisclosure = (extracted_result_score_id: number) => {
    set_extracted_result_score_id(extracted_result_score_id);
    setIsModalOpen(true);
  };

  return (
    <>
      <Grid item xs={4}>
        <Box height="100%" pr={1} pl={4} py={1.5}>
          <Text>{capitalizeWord(label)}</Text>
        </Box>
      </Grid>
      <Grid item xs={8}>
        <Grid container style={{ height: "100%" }}>
          {years.map((year) => {
            const extracted_result_value: ExtractedResultValue =
              extracted_result_values_by_year[year][label];
            const disclosure = extracted_result_value
              ? extracted_result_value.disclosure
              : "-";
            const unit = extracted_result_value
              ? extracted_result_value.unit
              : "";
            const { extracted_result_score_id } =
              extracted_result_values_by_year[year];
            return (
              <Grid key={year} item xs={4}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  borderLeft={`1px solid ${COLOR_BORDER}`}
                  px={3}
                  py={1.5}
                  height="100%"
                >
                  <Box width="60%">
                    <Text
                      $weight="bold"
                      $color={COLOR_ENVIRONMENT}
                      $hasCursor
                      onClick={() =>
                        handleClickDisclosure(extracted_result_score_id)
                      }
                    >
                      {disclosure}
                      &nbsp;&nbsp;
                      {unit}
                    </Text>
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Grid>

      <Modal
        isOpen={isModalOpen}
        headerJSX={null}
        bodyJSX={
          <SourceView
            extracted_result_score_id={extracted_result_score_id}
            news_score_id={0}
            indicator_key_score_id={0}
            indicator_key_id={0}
            category_id={0}
          />
        }
        handleClose={() => setIsModalOpen(false)}
        maxWidth="md"
      />
    </>
  );
};

export default React.memo(ExtractedResultValueRow);
