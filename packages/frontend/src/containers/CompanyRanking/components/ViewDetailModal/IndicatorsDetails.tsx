import React from "react";
import Box from "@material-ui/core/Box";
import Text from "../../../../components/Text";
import { ExtractedResultScore, Document } from "../../../../types";
import { COLOR_PRIMARY } from "../../../../themes/colors";

type Props = {
  isAnswersDetailedCollapsed: boolean;
  documents: Document[];
  extracted_result_score: ExtractedResultScore;
};

const IndicatorsDetails = (props: Props) => {
  const { extracted_result_score } = props;
  const disclosureTexts: string[] = [];
  for (
    let i = 0;
    i < extracted_result_score.extracted_result_pages.length;
    i += 1
  ) {
    for (
      let j = 0;
      j <
      extracted_result_score.extracted_result_pages[i].extracted_result_values
        .length;
      j += 1
    ) {
      const extracted_result_value =
        extracted_result_score.extracted_result_pages[i]
          .extracted_result_values[j];
      const label = extracted_result_value.label
        ? `${extracted_result_value.label}: `
        : "";
      const disclosureText = extracted_result_value.disclosure || "";
      const unit = extracted_result_value.unit || "";
      disclosureTexts.push(`${label}${disclosureText} ${unit}`);
    }
  }

  return (
    <Box>
      {props.isAnswersDetailedCollapsed && (
        <Box>
          <Box style={{ paddingLeft: "40px", paddingBottom: "15px" }}>
            <Text>{props.documents && props.documents[0]?.name}</Text>
            <Text style={{ color: "#aaa" }}>
              {props.extracted_result_score?.source}
            </Text>
            {disclosureTexts.map((text) => (
              <Text $color={COLOR_PRIMARY} key={text}>
                {text}
              </Text>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default IndicatorsDetails;
