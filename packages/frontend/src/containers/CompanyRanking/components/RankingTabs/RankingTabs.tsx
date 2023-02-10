import throttle from "lodash/throttle";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import CheckIcon from "@material-ui/icons/Check";
import TabContext from "@material-ui/lab/TabContext";

import CustomToastContainer from "../../../../components/CustomToastContainer";
import { DroppableId, RankingTabsEnums } from "../../../../constants/enums";
import PATHS, { RANK_PERFORMANCE } from "../../../../constants/paths";
import { selectCategory } from "../../../../reducers/category";
import {
  resetUpdateRankingStatus,
  selectCompaniesRanking,
  updateCompaniesRankingBottomRequest,
  updateCompaniesRankingTopRequest,
} from "../../../../reducers/companies_ranking";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { RequestStates } from "../../../../types/request";
import DroppableArea from "../DroppableArea";
import {
  ActionContainer,
  ClearAllButton,
  DoneButton,
  RankingContainerTabs,
  RankingTab,
  RankingTabPanel,
} from "./styles";

import type { CompanyBase } from "../../../../types";

interface RankingTabsProps {
  isRankedList: {
    topCompanies: boolean;
    bottomCompanies: boolean;
  };
  isSaveButtonDisabled: boolean;
  selectedTab: string;
  selectedSector: number;
  selectedCategory: number;
  selectedFactor: number;
  topCompanies: CompanyBase[];
  bottomCompanies: CompanyBase[];
  setIsChangedRankingSaved: (isChangedRankingSaved: boolean) => void;
  handleChangeTab: (_event: React.ChangeEvent<{}>, tabValue: number) => void;
}

const RankingTabs = (props: RankingTabsProps) => {
  const {
    selectedTab,
    isSaveButtonDisabled,
    topCompanies,
    bottomCompanies,
    selectedSector,
    selectedCategory,
    selectedFactor,
    isRankedList,
    handleChangeTab,
    setIsChangedRankingSaved,
  } = props;

  const dispatch = useAppDispatch();
  const history = useHistory();
  const { t } = useTranslation();
  const { temporaryAnswers } = useAppSelector(selectCategory);
  const { updateRankingStatus } = useAppSelector(selectCompaniesRanking);

  const handleSaveRanking = () => {
    if (!isRankedList.topCompanies) {
      const topCompaniesCopy = [...topCompanies];
      const changedCompaniesRankingTop = topCompaniesCopy
        .reverse()
        .map((changed_company, index) => {
          return {
            company_id: changed_company.id,
            custom_rank: index + 1,
          };
        })
        .filter((changed_company) => changed_company.company_id !== null);

      if (changedCompaniesRankingTop.length > 0) {
        dispatch(
          updateCompaniesRankingTopRequest({
            temporaryAnswers: temporaryAnswers.topAnswers,
            sector_id: selectedSector,
            category_id: selectedCategory,
            factor_id: selectedFactor,
            companies_rank: changedCompaniesRankingTop,
          })
        );
        setIsChangedRankingSaved(true);
      }
    }

    if (!isRankedList.bottomCompanies) {
      const bottomCompaniesCopy = [...bottomCompanies];
      const changedCompaniesRankingBottom = bottomCompaniesCopy
        .map((changed_company, index) => {
          return {
            company_id: changed_company.id,
            custom_rank: (index + 1) * -1,
          };
        })
        .filter((changed_company) => changed_company.company_id !== null);

      if (changedCompaniesRankingBottom.length > 0) {
        dispatch(
          updateCompaniesRankingBottomRequest({
            temporaryAnswers: temporaryAnswers.bottomAnswers,
            sector_id: selectedSector,
            category_id: selectedCategory,
            factor_id: selectedFactor,
            companies_rank: changedCompaniesRankingBottom,
          })
        );
        setIsChangedRankingSaved(true);
      }
    }
  };

  const throttleHandleSaveRanking = useCallback(
    throttle(handleSaveRanking, 5000, { leading: true, trailing: false }),
    [
      isRankedList,
      temporaryAnswers,
      topCompanies,
      bottomCompanies,
      selectedSector,
      selectedCategory,
      selectedFactor,
    ]
  );

  const handleNavigateToHeatmap = () => {
    history.push({
      pathname: RANK_PERFORMANCE,
      search: `?sector_id=${selectedSector}&category_id=${selectedCategory}`,
    });
  };

  React.useEffect(() => {
    if (updateRankingStatus === RequestStates.Succeeded) {
      toast(
        <CustomToastContainer
          Icon={<CheckIcon />}
          title={t("ranking_feature:toast_save_success.success")}
          message={t(
            "ranking_feature:toast_save_success.toast_save_ranking_success"
          )}
          linkTitle={t("ranking_feature:toast_save_success.view_heatmap")}
          handleClickLink={handleNavigateToHeatmap}
        />,
        {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
          hideProgressBar: true,
          closeButton: false,
        }
      );
    }
    return () => {
      dispatch(resetUpdateRankingStatus());
    };
  }, [updateRankingStatus]);

  return (
    <Container style={{ padding: 0 }} maxWidth={false}>
      <TabContext value={selectedTab}>
        <ActionContainer>
          <RankingContainerTabs
            value={selectedTab}
            onChange={handleChangeTab}
            aria-label="ranking_tabs"
          >
            <RankingTab
              label={t("ranking_feature:create_ranking.top_10")}
              disableRipple
              value={`${RankingTabsEnums.top_company}`}
            />
            <RankingTab
              label={t("ranking_feature:create_ranking.bottom_10")}
              disableRipple
              value={`${RankingTabsEnums.bottom_company}`}
            />
          </RankingContainerTabs>

          <Box>
            <Link to={`${PATHS.RANK_PERFORMANCE}`}>
              <ClearAllButton color="primary" type="button">
                {t("ranking_feature:create_ranking.cancel")}
              </ClearAllButton>
            </Link>
            <DoneButton
              disabled={isSaveButtonDisabled}
              color="primary"
              variant="contained"
              type="submit"
              onClick={throttleHandleSaveRanking}
            >
              {t("ranking_feature:create_ranking.save")}
            </DoneButton>
          </Box>
        </ActionContainer>

        <RankingTabPanel value={`${RankingTabsEnums.top_company}`}>
          <DroppableArea
            isNotDraggable={isRankedList.topCompanies}
            companies={topCompanies}
            droppableId={DroppableId.top_company}
            tabID={RankingTabsEnums.top_company}
            selectedTab={selectedTab}
          />
        </RankingTabPanel>

        <RankingTabPanel value={`${RankingTabsEnums.bottom_company}`}>
          <DroppableArea
            isNotDraggable={isRankedList.bottomCompanies}
            companies={bottomCompanies}
            droppableId={DroppableId.bottom_company}
            tabID={RankingTabsEnums.bottom_company}
            selectedTab={selectedTab}
          />
        </RankingTabPanel>
      </TabContext>
    </Container>
  );
};

export default React.memo(RankingTabs);
