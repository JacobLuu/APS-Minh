import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import TableRow from "@material-ui/core/TableRow";

import { CategoryType, ColumnIndex } from "../../../../constants/enums";
import { RANK_PERFORMANCE_PATH } from "../../../../constants/paths";
import { getFactorsRequested } from "../../../../reducers/factors";
import { getTeamNotesRequested } from "../../../../reducers/team_notes";
import { useAppDispatch } from "../../../../store/hooks";
import { COLOR_PRIMARY } from "../../../../themes/colors";
import { CategoryScore } from "../../../../types/category_score";
import { FactorScoreChildrenType } from "../../../../types/factor_score";
import AddAnswersModal from "../AddAnswersModal";
import {
  DashboardTableCellScore,
  TableCellCompany,
  TableCellRank,
  TableCellScore,
} from "./styles";

interface ICompanyRow {
  company_name: string;
  sector_name: string;
  company_score_overall_score: number;
  category_scores: CategoryScore[];
  company_id: number;
  shouldShowRankColumn: boolean;
  rankingOrderInSector: string;
  getRankingList: () => void;
  selectedColumnIndex: number;
}
const CompanyRow = (props: ICompanyRow) => {
  const {
    category_scores,
    company_name,
    sector_name,
    company_score_overall_score,
    company_id,
    shouldShowRankColumn,
    rankingOrderInSector,
    getRankingList,
    selectedColumnIndex,
  } = props;
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [categoryScoreId, setCategoryScoreId] = useState<number>(null);
  const [categoryLabel, setCategoryLabel] = useState("");

  const handleClickScore = (companyId, categoryId, categoryScoreId) => {
    if (location.pathname === RANK_PERFORMANCE_PATH) {
      setCategoryScoreId(categoryScoreId);
      setCategoryLabel(CategoryType[categoryId]);

      dispatch(
        getFactorsRequested({
          category_id: categoryId,
          category_score_id: categoryScoreId,
          factor_score_children_type: FactorScoreChildrenType.qualitative,
        })
      );
      dispatch(
        getTeamNotesRequested({
          category_score_id: categoryScoreId,
        })
      );
      setIsModalOpened(true);
    }
  };

  return (
    <React.Fragment>
      <TableRow>
        {shouldShowRankColumn && (
          <TableCellRank align="left">{rankingOrderInSector}</TableCellRank>
        )}
        <TableCellCompany align="left">
          <Link
            to={`company/${company_id}`}
            target="_blank"
            style={{ color: `${COLOR_PRIMARY}` }}
          >
            {company_name}
          </Link>
        </TableCellCompany>
        <TableCellRank align="left">{sector_name}</TableCellRank>
        <TableCellRank
          align="center"
          $isActive={selectedColumnIndex === ColumnIndex.OverallScore}
        >
          {company_score_overall_score || "-"}
        </TableCellRank>
        {location.pathname === RANK_PERFORMANCE_PATH ? (
          <>
            <TableCellScore
              $isActive={selectedColumnIndex === ColumnIndex.Environmental}
              align="center"
              onClick={() =>
                handleClickScore(
                  company_id,
                  CategoryType.environmental,
                  category_scores[0].id
                )
              }
            >
              {category_scores[0]?.overall_score || "-"}
            </TableCellScore>
            <TableCellScore
              $isActive={selectedColumnIndex === ColumnIndex.Social}
              align="center"
              onClick={() =>
                handleClickScore(
                  company_id,
                  CategoryType.social,
                  category_scores[1].id
                )
              }
            >
              {category_scores[1]?.overall_score || "-"}
            </TableCellScore>
            <TableCellScore
              $isActive={selectedColumnIndex === ColumnIndex.Governance}
              align="center"
              onClick={() =>
                handleClickScore(
                  company_id,
                  CategoryType.governance,
                  category_scores[2].id
                )
              }
            >
              {category_scores[2]?.overall_score || "-"}
            </TableCellScore>
          </>
        ) : (
          <>
            <DashboardTableCellScore align="center">
              {category_scores[0]?.overall_score || "-"}
            </DashboardTableCellScore>
            <DashboardTableCellScore align="center">
              {category_scores[1]?.overall_score || "-"}
            </DashboardTableCellScore>
            <DashboardTableCellScore align="center">
              {category_scores[2]?.overall_score || "-"}
            </DashboardTableCellScore>
          </>
        )}
      </TableRow>
      {isModalOpened && (
        <AddAnswersModal
          isOpen={isModalOpened}
          setOpen={setIsModalOpened}
          companyName={company_name}
          categoryScoreId={categoryScoreId}
          categoryLabel={categoryLabel}
          company_id={company_id}
          getRankingList={getRankingList}
        />
      )}
    </React.Fragment>
  );
};

export default React.memo(CompanyRow);
