import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { Box } from "@material-ui/core";
import Text from "../../components/Text";

import ExtractedResultForm from "../../components/ExtractedResultForm";
import PdfViewer from "../../components/PdfViewer";
import {
  getDocumentRequested,
  getExtractedResultRequested as getExtractedResultRequestedAction,
  resetSource,
  selectSource,
} from "../../reducers/source";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  GridItem,
  OutputContainer,
  SourceViewContainer,
  VerticalLine,
} from "./styles";

interface SourceViewInterface {
  extracted_result_score_id?: number;
  document?: any;
  news_score_id: number;
  indicator_key_score_id: number;
  indicator_key_id: number;
  category_id: number;
}
const SourceView = (props: SourceViewInterface) => {
  const dispatch = useAppDispatch();
  const [currentExtractedResultIndex, setCurrentExtractedResultIndex] =
    useState(0);
  const source = useAppSelector(selectSource);
  const { t } = useTranslation();

  const extracted_result_score = useMemo(() => {
    const result_score = source.extracted_result_score;
    const extracted_result_values = [];
    for (let i = 0; i < result_score.extracted_result_pages.length; i += 1) {
      for (
        let j = 0;
        j <
        result_score.extracted_result_pages[i].extracted_result_values.length;
        j += 1
      ) {
        extracted_result_values.push(
          result_score.extracted_result_pages[i].extracted_result_values[j]
        );
      }
    }

    return {
      id: result_score.id,
      overall_score: result_score.overall_score,
      extracted_result_values: extracted_result_values,
      reasons_for_change: "",
    };
  }, [source, currentExtractedResultIndex]);

  useEffect(() => {
    if (props.extracted_result_score_id) {
      dispatch(
        getExtractedResultRequestedAction({
          extracted_result_score_id: Number(props.extracted_result_score_id),
        })
      );
    } else if (props.document.id) {
      dispatch(
        getDocumentRequested({
          document_id: props.document.id,
        })
      );
    } else {
      dispatch(resetSource());
    }
  }, []);

  return (
    <Box mt={2}>
      <GridItem item xs={12}>
        <Text $size="xl">
          {source.extracted_result_score.document?.name || ""}
        </Text>
      </GridItem>

      <GridItem container style={{ position: "relative" }}>
        <GridItem
          item
          xs={6}
          style={{ position: "relative", paddingRight: 12 }}
        >
          <Box mb={3}>
            <Text style={{ textTransform: "uppercase" }}>
              {t("company:source_view_mode.input")}
            </Text>
          </Box>
          <PdfViewer
            extracted_result_score={source.extracted_result_score}
            currentExtractedResultIndex={currentExtractedResultIndex}
            setCurrentExtractedResultIndex={setCurrentExtractedResultIndex}
          />
        </GridItem>

        <VerticalLine />

        <GridItem item xs={6}>
          <Box pl={1.5} mb={3}>
            <Text style={{ textTransform: "uppercase" }}>
              {t("company:source_view_mode.output")}
            </Text>
          </Box>
          {props.extracted_result_score_id !== 0 && (
            <OutputContainer>
              <ExtractedResultForm
                extracted_result_score={extracted_result_score}
                indicator_key={source.indicator_key}
                news_score_id={props.news_score_id}
                indicator_key_score_id={props.indicator_key_score_id}
                indicator_key_id={props.indicator_key_id}
                category_id={props.category_id}
              />
            </OutputContainer>
          )}
        </GridItem>
      </GridItem>
    </Box>
  );
};

SourceView.defaultProps = {
  extracted_result_score_id: 0,
  document: {},
};

export default React.memo(SourceView);
