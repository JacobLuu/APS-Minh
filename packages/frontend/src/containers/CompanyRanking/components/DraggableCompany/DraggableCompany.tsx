import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useTranslation } from "react-i18next";

import { Typography } from "@material-ui/core";

import { DroppableId } from "../../../../constants/enums";
import { COMPANY_PATH } from "../../../../constants/paths";
import { getCategoryRequested } from "../../../../reducers/category";
import { useAppDispatch } from "../../../../store/hooks";
import { CompanyBase } from "../../../../types";
import { useLabelTranslation } from "../../../../utils/customHooks";
import { RankOrder } from "../DroppableArea/styles";
import ViewDetailModal from "../ViewDetailModal";
import {
  ColumnContainer,
  DraggableContainer,
  LinkText,
  LinkTextColor,
  Text,
  Value,
} from "./styles";

interface DraggableCompanyProps {
  index: number;
  company: CompanyBase;
  companies: CompanyBase[];
  key: number;
  droppableId: DroppableId;
  qualitativeScoreValues?: number;
  isNotDraggable: boolean;
  selectedTab: string;
}

const DraggableCompany = (props: DraggableCompanyProps) => {
  const {
    company,
    index,
    droppableId,
    qualitativeScoreValues,
    isNotDraggable,
  } = props;

  const qualitative_score =
    company.category?.category_score?.factor_scores[0]?.qualitative_score
      .overall_score || 0;
  const quantitative_score =
    company.category?.category_score?.factor_scores[0]?.quantitative_score
      .overall_score || 0;
  const factor_overall_score =
    company.category?.category_score?.factor_scores[0].overall_score || 0;
  const [isDetailModalOpen, setIsDetailModalOpen] = React.useState(false);
  const [companyDetailFactorId, setCompanyDetailFactorId] =
    React.useState(null);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { translateCompanyName } = useLabelTranslation();

  const getCompanyDetail = (company) => {
    const { id: factorId } =
      company.category?.category_score?.factor_scores[0]?.factor;
    dispatch(
      getCategoryRequested({
        companyId: company.id,
        categoryId: company.category.id,
      })
    );
    setIsDetailModalOpen(true);
    setCompanyDetailFactorId(factorId);
  };

  const handleCloseDialog = () => {
    setIsDetailModalOpen(false);
  };

  const isDefaultCompany = company.id === null;
  const defaultId = `-${index}`;

  return (
    <>
      <Draggable
        // default company will have negative draggableId so it won't clash with real companies
        draggableId={company.id ? company.id.toString() : defaultId}
        index={index}
        isDragDisabled={isDefaultCompany || isNotDraggable}
      >
        {(provided, snapshot) =>
          !isDefaultCompany ? (
            <DraggableContainer
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              maxWidth={false}
              className={`company__single${
                !snapshot.isDragging && droppableId !== DroppableId.company_list
                  ? "__static"
                  : "__dragging"
              }`}
            >
              <div style={{ width: "40%" }}>
                <Typography>
                  <LinkTextColor
                    to={COMPANY_PATH.replace(":companyId", String(company.id))}
                  >
                    {translateCompanyName(company).toUpperCase()}
                  </LinkTextColor>
                </Typography>
              </div>
              <ColumnContainer style={{ width: "15%" }}>
                <Text>
                  {t("ranking_feature:create_ranking.qualitative_score")}
                </Text>
                <Value>
                  {droppableId === DroppableId.company_list
                    ? qualitative_score || "-"
                    : qualitativeScoreValues}
                </Value>
              </ColumnContainer>
              <ColumnContainer style={{ width: "15%" }}>
                <Text>
                  {t("ranking_feature:create_ranking.quantitative_score")}
                </Text>
                <Value>{quantitative_score || "-"}</Value>
              </ColumnContainer>
              <ColumnContainer style={{ width: "15%" }}>
                <Text>{t("ranking_feature:create_ranking.factor_score")}</Text>
                <Value $isLinkColor>{factor_overall_score}</Value>
              </ColumnContainer>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "15%",
                }}
              >
                <LinkText
                  onClick={() => {
                    getCompanyDetail(company);
                  }}
                >
                  {t("ranking_feature:create_ranking.view_detail")}
                </LinkText>
              </div>
              <span style={{ display: "none" }}>{provided.placeholder}</span>
            </DraggableContainer>
          ) : (
            <RankOrder ref={provided.innerRef}>
              <Text>{`${t("ranking_feature:create_ranking.rank")} ${
                index + 1
              }`}</Text>
            </RankOrder>
          )
        }
      </Draggable>

      <ViewDetailModal
        open={isDetailModalOpen}
        company={company}
        factorId={companyDetailFactorId}
        handleCloseDialog={handleCloseDialog}
        selectedTab={props.selectedTab}
        droppableId={droppableId}
        isNotDraggable={isNotDraggable}
      />
    </>
  );
};

DraggableCompany.defaultProps = {
  qualitativeScoreValues: 0,
};

export default React.memo(DraggableCompany);
