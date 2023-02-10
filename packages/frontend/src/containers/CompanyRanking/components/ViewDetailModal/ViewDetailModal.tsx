import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import CloseIcon from "@material-ui/icons/Close";

import { DroppableId } from "../../../../constants/enums";
import { selectCategory } from "../../../../reducers/category";
import { getDocumentsRequested } from "../../../../reducers/documents";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { useLabelTranslation } from "../../../../utils/customHooks";
import QuantitativeRows from "./QuantitativeRows";
import QuestionnaireScoreRow from "./QuestionnaireScoreRow";
import {
  TextBold,
  ViewDetailCollapse,
  ViewDetailDialog,
  ViewDetailDialogContent,
} from "./styles";

import type { CompanyBase } from "../../../../types";

interface ViewDetailModalProps {
  open: boolean;
  company: CompanyBase;
  factorId: number;
  handleCloseDialog: () => void;
  selectedTab: string;
  droppableId: DroppableId;
  isNotDraggable: boolean;
}

const ViewDetailModal = (props: ViewDetailModalProps) => {
  const { t } = useTranslation();
  const { handleCloseDialog, factorId, isNotDraggable } = props;
  const [isQualitativeCollapsed, setIsQualitativeCollapsed] =
    React.useState(false);
  const [isQuantitativeCollapsed, setIsQuantitativeCollapsed] =
    React.useState(false);
  const { category } = useAppSelector(selectCategory);
  const { translateCategoryLabel, translateFactorLabel } =
    useLabelTranslation();

  const factor = category?.factors.find((factor) => factor.id === factorId);
  const qualitativeScore = factor?.factor_score?.qualitative_score;
  const quantitativeScore = factor?.factor_score?.quantitative_score;

  const qualitativeDisclosureCount = React.useMemo(() => {
    return qualitativeScore?.questionnaire_scores.reduce(
      (total, questionnaire_score) => {
        if (questionnaire_score && questionnaire_score.answers.length > 0) {
          total += questionnaire_score.answers.length;
        }
        if (questionnaire_score && questionnaire_score.news_scores.length > 0) {
          total += questionnaire_score.news_scores.length;
        }
        return total;
      },
      0
    );
  }, [qualitativeScore]);

  const quantitativeDisclosureCount = React.useMemo(() => {
    return quantitativeScore?.indicator_key_scores.reduce(
      (total, indicator_key_score) => {
        if (
          indicator_key_score &&
          indicator_key_score.extracted_result_scores.length > 0
        ) {
          total += indicator_key_score.extracted_result_scores.length;
        }
        if (indicator_key_score && indicator_key_score.news_scores.length > 0) {
          total += indicator_key_score.news_scores.length;
        }
        return total;
      },
      0
    );
  }, [quantitativeScore]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (props.open) {
      dispatch(
        getDocumentsRequested({
          company_id: Number(props.company.id),
          keyword: "",
        })
      );
    }
  }, [props.company.id, props.open]);

  return (
    <ViewDetailDialog open={props.open} maxWidth={false}>
      <Box display="flex" justifyContent="space-between" padding="20px 24px 0">
        <Box width="80%">
          <Box display="flex" style={{ marginBottom: 20 }}>
            <TextBold style={{ marginRight: "40px" }}>
              {`${t("ranking_feature:view_detail_modal.category")} `}
              <span>{translateCategoryLabel(category?.category_label)}</span>
            </TextBold>
            <TextBold>
              {`${t("ranking_feature:view_detail_modal.factor")} `}
              <span>{translateFactorLabel(factor)}</span>
            </TextBold>
          </Box>

          <TextBold style={{ marginBottom: 20 }}>
            {`${t("ranking_feature:view_detail_modal.factor_score")} `}
            <span>{factor?.factor_score?.overall_score || 0}</span>
          </TextBold>
        </Box>

        <Box>
          {props.open && (
            <IconButton onClick={() => handleCloseDialog()}>
              <CloseIcon />
            </IconButton>
          )}
        </Box>
      </Box>

      <ViewDetailDialogContent>
        {/* Qualitative Detail */}
        <Box paddingBottom="15px">
          <ViewDetailCollapse
            onClick={() => setIsQualitativeCollapsed((prevState) => !prevState)}
          >
            <Box className="arrowCollapse">
              {isQualitativeCollapsed ? (
                <ArrowDropDownIcon />
              ) : (
                <ArrowDropUpIcon />
              )}
              <TextBold>
                {`${t("company:qualitative_quantitative.qualitative")} (${
                  qualitativeDisclosureCount || 0
                })`}
              </TextBold>
            </Box>

            <TextBold>
              {`${t("ranking_feature:view_detail_modal.qualitative_score")} ${
                qualitativeScore?.overall_score || "-"
              }`}
            </TextBold>
          </ViewDetailCollapse>
          {qualitativeScore?.questionnaire_scores.map((questionnaire_score) => (
            <QuestionnaireScoreRow
              companyId={props.company.id}
              categoryId={category.id}
              key={questionnaire_score.id}
              isViewDetailCollapsed={isQualitativeCollapsed}
              questionnaireScore={questionnaire_score}
              selectedTab={props.selectedTab}
              droppableId={props.droppableId}
              isNotDraggable={isNotDraggable}
            />
          ))}
        </Box>

        {/* Quantitative Detail */}
        <Box paddingBottom="15px">
          <ViewDetailCollapse
            onClick={() =>
              setIsQuantitativeCollapsed((prevState) => !prevState)
            }
          >
            <Box className="arrowCollapse">
              {isQuantitativeCollapsed ? (
                <ArrowDropDownIcon />
              ) : (
                <ArrowDropUpIcon />
              )}
              <TextBold>
                {`${t("company:qualitative_quantitative.quantitative")} (${
                  quantitativeDisclosureCount || 0
                })`}
              </TextBold>
            </Box>

            <TextBold>
              {`${t("ranking_feature:view_detail_modal.quantitative_score")} ${
                quantitativeScore?.overall_score || "-"
              }`}
            </TextBold>
          </ViewDetailCollapse>
          {quantitativeScore?.indicator_key_scores.map(
            (indicator_key_score) => (
              <QuantitativeRows
                key={indicator_key_score.id}
                isViewDetailCollapsed={isQuantitativeCollapsed}
                indicatorKeyScore={indicator_key_score}
              />
            )
          )}
        </Box>
      </ViewDetailDialogContent>
    </ViewDetailDialog>
  );
};

export default React.memo(ViewDetailModal);
