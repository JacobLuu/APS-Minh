import React, { useMemo, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";

import BreadcrumbsHeader from "../../components/BreadcrumbsHeader";
import ConfirmBeforeLeaveModal from "../../components/ConfirmBeforeLeaveModal";
import CustomToastContainer from "../../components/CustomToastContainer";
import {
  CategoryType,
  DroppableId,
  RankingTabsEnums,
} from "../../constants/enums";
import { DASHBOARD_PATH } from "../../constants/paths";
import {
  getCompaniesRankingBottomRequested,
  getCompaniesRankingTopRequested,
  selectCompaniesRanking,
} from "../../reducers/companies_ranking";
import {
  getCategoriesDropdownListRequested,
  selectRankingDropdownList,
} from "../../reducers/ranking_dropdown_list";
import { selectUser } from "../../reducers/user";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { COLOR_BOX_SHADOW, COLOR_PRIMARY } from "../../themes/colors";
import { RequestStates } from "../../types/request";
import { useSelectedTab } from "../../utils/customHooks";
import CompaniesList from "./components/CompaniesList";
import FilterCompanies from "./components/FilterCompanies";
import RankingTabs from "./components/RankingTabs";

import type {
  CompanyBase,
  RankedCompany,
  GetRankedCompaniesPayload,
} from "../../types";

const defaultCompany: CompanyBase = {
  category: null,
  company_score: {
    id: null,
    overall_score: null,
    pre_score: null,
    is_arrow_up: false,
    rank_score: "",
    updated_at: null,
  },
  created_at: null,
  id: null,
  industry: {
    id: null,
    name: "",
    sector: {
      id: null,
      name: "",
    },
  },
  name: "",
  name_cn: "",
  ticker: "",
  updated_at: null,
};
const defaultFactorValue = 1;
const defaultSectorValue = 1;
const initialSelectedRankingTabs = "1";

const CompanyRanking = () => {
  const {
    list: rankingCandidates,
    getCompaniesRankingStatus,
    rankedCompaniesTop,
    rankedCompaniesBottom,
  } = useAppSelector(selectCompaniesRanking);
  const user = useAppSelector(selectUser);

  const getRankedCompanyInfoList = (): RankedCompany[] => {
    const rankedCompanyList = [];
    const rankedTopAndBottomCompanies = rankedCompaniesTop.concat(
      rankedCompaniesBottom
    );
    rankedTopAndBottomCompanies.forEach((rankingCandidate) => {
      rankingCandidate.category.category_score.factor_scores.forEach(
        (factor_score) => {
          factor_score.factor.factor_custom_ranks.forEach(
            (factor_custom_rank) => {
              if (
                factor_custom_rank.custom_rank !== 0 &&
                factor_custom_rank.member_id === user.id
              ) {
                rankedCompanyList.push({
                  company: rankingCandidate,
                  custom_rank: factor_custom_rank.custom_rank,
                });
              }
            }
          );
        }
      );
    });
    return rankedCompanyList;
  };

  const getDefaultTopCompaniesList = (): CompanyBase[] => {
    const defaultTopCompanies = [...Array(10)];
    const rankedCompaniesInfoList = getRankedCompanyInfoList();
    rankedCompaniesInfoList.forEach((infoRankedCompany) => {
      if (infoRankedCompany.custom_rank > 0) {
        defaultTopCompanies[10 - infoRankedCompany.custom_rank] =
          infoRankedCompany.company;
      }
    });
    return defaultTopCompanies.map((item) => {
      if (!item) {
        return defaultCompany;
      }
      return item;
    });
  };

  const getDefaultBottomCompaniesList = (): CompanyBase[] => {
    const defaultBottomCompanies = [...Array(10)];
    const rankedCompaniesInfoList = getRankedCompanyInfoList();
    rankedCompaniesInfoList.forEach((infoRankedCompany) => {
      if (infoRankedCompany.custom_rank < 0) {
        defaultBottomCompanies[infoRankedCompany.custom_rank * -1 - 1] =
          infoRankedCompany.company;
      }
    });
    return defaultBottomCompanies.map((item) => {
      if (!item) {
        return defaultCompany;
      }
      return item;
    });
  };
  const defaultTopCompanies = getDefaultTopCompaniesList();
  const defaultBottomCompanies = getDefaultBottomCompaniesList();
  const [topCompanies, setTopCompanies] = useState<CompanyBase[]>([]);
  const [bottomCompanies, setBottomCompanies] = useState<CompanyBase[]>([]);
  const [companyList, setCompanyList] = useState<CompanyBase[]>([]);
  const { search } = useLocation();
  const category_id = new URLSearchParams(search).get("category_id");
  const sector_id = new URLSearchParams(search).get("sector_id");
  const [sectorValue, setSectorValue] = React.useState(
    parseInt(sector_id, 10) || defaultSectorValue
  );
  const [categoryValue, setCategoryValue] = React.useState(
    parseInt(category_id, 10) || CategoryType.environmental
  );
  const [factorValue, setFactorValue] = React.useState(defaultFactorValue);
  const categoriesDropdownListState = useAppSelector(selectRankingDropdownList);
  const { selectedTab, handleChangeTab } = useSelectedTab(
    initialSelectedRankingTabs
  );
  const [isChangedRankingSaved, setIsChangedRankingSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // used to prevent toast in first render
  const didMountRef = React.useRef(false);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const replaceElementFromArray = (array, index, value) => {
    array.splice(index, 1, value);
  };

  const removeElementFromArray = (array, index) => {
    return array.splice(index, 1);
  };

  const addElementToArray = (array, index, value) => {
    array.splice(index, 0, value);
  };

  const findFirstCompanyDefaultInArray = (companies) => {
    return companies.findIndex((company) => company.id === null);
  };

  const handleAddCompanyToTopRankingFromSearchBar = (
    topCompanies,
    companyList,
    added_company
  ) => {
    const topCompaniesAfterRanking = [...topCompanies];
    const companiesListAfterRanking = [...companyList];
    const firstDefaultCompanyIndex = findFirstCompanyDefaultInArray(
      topCompaniesAfterRanking
    );
    const lastIndex = topCompaniesAfterRanking.length - 1;
    const addedCompanyIndexInCompaniesList =
      companiesListAfterRanking.findIndex(
        (company) => company.id === added_company.id
      );

    removeElementFromArray(
      companiesListAfterRanking,
      addedCompanyIndexInCompaniesList
    );
    if (firstDefaultCompanyIndex === -1) {
      addElementToArray(
        companiesListAfterRanking,
        0,
        topCompaniesAfterRanking[lastIndex]
      );
      replaceElementFromArray(
        topCompaniesAfterRanking,
        lastIndex,
        added_company
      );
    } else {
      replaceElementFromArray(
        topCompaniesAfterRanking,
        firstDefaultCompanyIndex,
        added_company
      );
    }

    return {
      topCompaniesAfterRanking,
      companiesListAfterRanking,
    };
  };

  const handleAddCompanyToBottomRankingFromSearchBar = (
    bottomCompanies,
    companyList,
    added_company
  ) => {
    const bottomCompaniesAfterRanking = [...bottomCompanies];
    const companiesListAfterRanking = [...companyList];
    const firstDefaultCompanyIndex = findFirstCompanyDefaultInArray(
      bottomCompaniesAfterRanking
    );
    const lastIndex = bottomCompaniesAfterRanking.length - 1;
    const addedCompanyIndexInCompaniesList =
      companiesListAfterRanking.findIndex(
        (company) => company.id === added_company.id
      );

    removeElementFromArray(
      companiesListAfterRanking,
      addedCompanyIndexInCompaniesList
    );
    if (firstDefaultCompanyIndex === -1) {
      addElementToArray(
        companiesListAfterRanking,
        0,
        bottomCompaniesAfterRanking[lastIndex]
      );
      replaceElementFromArray(
        bottomCompaniesAfterRanking,
        lastIndex,
        added_company
      );
    } else {
      replaceElementFromArray(
        bottomCompaniesAfterRanking,
        firstDefaultCompanyIndex,
        added_company
      );
    }

    return {
      bottomCompaniesAfterRanking,
      companiesListAfterRanking,
    };
  };

  const handleDropToCompanyList = (
    dropEvent,
    topCompaniesAfterRanking,
    bottomCompaniesAfterRanking,
    companiesListAfterRanking,
    company
  ) => {
    const { source, destination } = dropEvent;

    addElementToArray(companiesListAfterRanking, destination.index, company);
    if (source.droppableId === DroppableId.top_company) {
      topCompaniesAfterRanking.pop();
    }
    if (source.droppableId === DroppableId.bottom_company) {
      bottomCompaniesAfterRanking.pop();
    }
  };

  const handleDropToTopCompany = (
    dropEvent,
    topCompaniesAfterRanking,
    companiesListAfterRanking,
    company
  ) => {
    const { source, destination } = dropEvent;
    const lastIndex = topCompaniesAfterRanking.length - 1;
    const firstDefaultCompanyIndex = findFirstCompanyDefaultInArray(
      topCompaniesAfterRanking
    );

    if (
      source.droppableId === DroppableId.company_list &&
      firstDefaultCompanyIndex === -1
    ) {
      addElementToArray(
        companiesListAfterRanking,
        0,
        topCompaniesAfterRanking[lastIndex]
      );
      removeElementFromArray(topCompaniesAfterRanking, lastIndex);
      addElementToArray(topCompaniesAfterRanking, destination.index, company);
    } else if (source.droppableId === DroppableId.company_list) {
      const replacedCompany = topCompaniesAfterRanking[destination.index];
      if (replacedCompany && replacedCompany.id !== null) {
        addElementToArray(companiesListAfterRanking, 0, replacedCompany);
      }
      replaceElementFromArray(
        topCompaniesAfterRanking,
        destination.index,
        company
      );
    } else if (source.droppableId === DroppableId.top_company) {
      const replacedCompany = topCompaniesAfterRanking[destination.index];
      if (replacedCompany && replacedCompany.id !== null) {
        addElementToArray(companiesListAfterRanking, 0, replacedCompany);
      }
      topCompaniesAfterRanking.pop();
      replaceElementFromArray(
        topCompaniesAfterRanking,
        destination.index,
        company
      );
    }
  };

  const handleDropToBottomCompany = (
    dropEvent,
    bottomCompaniesAfterRanking,
    companiesListAfterRanking,
    company
  ) => {
    const { source, destination } = dropEvent;
    const lastIndex = bottomCompaniesAfterRanking.length - 1;
    const firstDefaultCompanyIndex = findFirstCompanyDefaultInArray(
      bottomCompaniesAfterRanking
    );

    if (
      source.droppableId === DroppableId.company_list &&
      firstDefaultCompanyIndex === -1
    ) {
      addElementToArray(
        companiesListAfterRanking,
        0,
        bottomCompaniesAfterRanking[lastIndex]
      );
      removeElementFromArray(bottomCompaniesAfterRanking, lastIndex);
      addElementToArray(
        bottomCompaniesAfterRanking,
        destination.index,
        company
      );
    } else if (source.droppableId === DroppableId.company_list) {
      const replacedCompany = bottomCompaniesAfterRanking[destination.index];
      if (replacedCompany && replacedCompany.id !== null) {
        addElementToArray(companiesListAfterRanking, 0, replacedCompany);
      }
      replaceElementFromArray(
        bottomCompaniesAfterRanking,
        destination.index,
        company
      );
    } else if (source.droppableId === DroppableId.bottom_company) {
      const replacedCompany = bottomCompaniesAfterRanking[destination.index];
      if (replacedCompany && replacedCompany.id !== null) {
        addElementToArray(companiesListAfterRanking, 0, replacedCompany);
      }
      bottomCompaniesAfterRanking.pop();
      replaceElementFromArray(
        bottomCompaniesAfterRanking,
        destination.index,
        company
      );
    }
  };

  const handleDragStartFromTopCompany = (dragStartEvent, topCompanies) => {
    const topCompaniesAfterRanking = [...topCompanies];
    const draggingCompany =
      topCompaniesAfterRanking[dragStartEvent.source.index];
    replaceElementFromArray(
      topCompaniesAfterRanking,
      dragStartEvent.source.index,
      defaultCompany
    );
    topCompaniesAfterRanking.push(draggingCompany);

    return topCompaniesAfterRanking;
  };

  const handleDragStartFromBottomCompany = (
    dragStartEvent,
    bottomCompanies
  ) => {
    const bottomCompaniesAfterRanking = [...bottomCompanies];
    const draggingCompany =
      bottomCompaniesAfterRanking[dragStartEvent.source.index];
    replaceElementFromArray(
      bottomCompaniesAfterRanking,
      dragStartEvent.source.index,
      defaultCompany
    );
    bottomCompaniesAfterRanking.push(draggingCompany);

    return bottomCompaniesAfterRanking;
  };

  const addCompanyToTopRanking = (added_company) => {
    const { topCompaniesAfterRanking, companiesListAfterRanking } =
      handleAddCompanyToTopRankingFromSearchBar(
        topCompanies,
        companyList,
        added_company
      );

    setTopCompanies(topCompaniesAfterRanking);
    setCompanyList(companiesListAfterRanking);
  };

  const addCompanyToBottomRanking = (added_company) => {
    const { bottomCompaniesAfterRanking, companiesListAfterRanking } =
      handleAddCompanyToBottomRankingFromSearchBar(
        bottomCompanies,
        companyList,
        added_company
      );

    setBottomCompanies(bottomCompaniesAfterRanking);
    setCompanyList(companiesListAfterRanking);
  };

  const handleClearAll = () => {
    if (selectedTab === `${RankingTabsEnums.top_company}`) {
      setTopCompanies(defaultTopCompanies);
    }
    if (selectedTab === `${RankingTabsEnums.bottom_company}`) {
      setBottomCompanies(defaultBottomCompanies);
    }
  };

  const handleDragEnd = (dropEvent: DropResult) => {
    const { destination, source } = dropEvent;
    let company;
    const companiesListAfterRanking = [...companyList];
    const topCompaniesAfterRanking = [...topCompanies];
    const bottomCompaniesAfterRanking = [...bottomCompanies];
    // if user drag company to old place or whitespace, do nothing
    if (!destination || destination.index > 9) {
      // if destination is null then get the last company and set it to source.index
      if (source.droppableId === DroppableId.top_company) {
        const company = removeElementFromArray(topCompaniesAfterRanking, 10)[0];
        replaceElementFromArray(
          topCompaniesAfterRanking,
          source.index,
          company
        );
        setTopCompanies(topCompaniesAfterRanking);
      }
      if (source.droppableId === DroppableId.bottom_company) {
        const company = removeElementFromArray(
          bottomCompaniesAfterRanking,
          10
        )[0];
        replaceElementFromArray(
          bottomCompaniesAfterRanking,
          source.index,
          company
        );
        setBottomCompanies(bottomCompaniesAfterRanking);
      }
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      if (destination.droppableId === DroppableId.top_company) {
        const company = removeElementFromArray(topCompaniesAfterRanking, 10)[0];
        replaceElementFromArray(
          topCompaniesAfterRanking,
          destination.index,
          company
        );
        setTopCompanies(topCompaniesAfterRanking);
      }
      if (destination.droppableId === DroppableId.bottom_company) {
        const company = removeElementFromArray(
          bottomCompaniesAfterRanking,
          10
        )[0];
        replaceElementFromArray(
          bottomCompaniesAfterRanking,
          destination.index,
          company
        );
        setBottomCompanies(bottomCompaniesAfterRanking);
      }
      return;
    }

    // Source logic
    if (source.droppableId === DroppableId.company_list) {
      company = companiesListAfterRanking[source.index];
      removeElementFromArray(companiesListAfterRanking, source.index);
    } else if (source.droppableId === DroppableId.top_company) {
      company = topCompaniesAfterRanking[topCompaniesAfterRanking.length - 1];
    } else if (source.droppableId === DroppableId.bottom_company) {
      company =
        bottomCompaniesAfterRanking[bottomCompaniesAfterRanking.length - 1];
    }

    // Destination logic
    if (destination.droppableId === DroppableId.company_list) {
      handleDropToCompanyList(
        dropEvent,
        topCompaniesAfterRanking,
        bottomCompaniesAfterRanking,
        companiesListAfterRanking,
        company
      );
    } else if (destination.droppableId === DroppableId.top_company) {
      handleDropToTopCompany(
        dropEvent,
        topCompaniesAfterRanking,
        companiesListAfterRanking,
        company
      );
    } else if (destination.droppableId === DroppableId.bottom_company) {
      handleDropToBottomCompany(
        dropEvent,
        bottomCompaniesAfterRanking,
        companiesListAfterRanking,
        company
      );
    }

    setTopCompanies(topCompaniesAfterRanking);
    setBottomCompanies(bottomCompaniesAfterRanking);
    setCompanyList(companiesListAfterRanking);
  };

  const handleDragStart = (dragStartEvent) => {
    if (dragStartEvent.source.droppableId === DroppableId.top_company) {
      const topCompaniesAfterRanking = handleDragStartFromTopCompany(
        dragStartEvent,
        topCompanies
      );
      setTopCompanies(topCompaniesAfterRanking);
    }
    if (dragStartEvent.source.droppableId === DroppableId.bottom_company) {
      const bottomCompaniesAfterRanking = handleDragStartFromBottomCompany(
        dragStartEvent,
        bottomCompanies
      );
      setBottomCompanies(bottomCompaniesAfterRanking);
    }
  };

  const isRankingChanged = React.useMemo(() => {
    const isTopCompaniesChanged = topCompanies.some(
      (company) => !defaultTopCompanies.includes(company)
    );
    const isBottomCompaniesChanged = bottomCompanies.some(
      (company) => !defaultBottomCompanies.includes(company)
    );
    return isTopCompaniesChanged || isBottomCompaniesChanged;
  }, [topCompanies, bottomCompanies]);

  const isRankedList = React.useMemo(() => {
    const rankedCompanyInfoList = getRankedCompanyInfoList();
    const isRankedCompanyList = {
      topCompanies: false,
      bottomCompanies: false,
    };
    if (rankedCompanyInfoList.length > 0) {
      const isRankedTopCompanies = rankedCompanyInfoList.some(
        (rankedCompanyInfo) => rankedCompanyInfo.custom_rank > 0
      );
      isRankedCompanyList.topCompanies = isRankedTopCompanies;
    }
    if (rankedCompanyInfoList.length > 0) {
      const isRankedBottomCompanies = rankedCompanyInfoList.some(
        (rankedCompanyInfo) => {
          return rankedCompanyInfo.custom_rank < 0;
        }
      );
      isRankedCompanyList.bottomCompanies = isRankedBottomCompanies;
    }
    return isRankedCompanyList;
  }, [rankingCandidates, rankedCompaniesTop, rankedCompaniesBottom]);

  const breadCrumbs = useMemo(() => {
    return [
      {
        label: t("login:dashboard_header.dashboard"),
        path: DASHBOARD_PATH,
      },
      {
        label: t("ranking_feature:create_ranking.rank_performance"),
      },
    ];
  }, [user.language]);

  React.useEffect(() => {
    if (
      rankingCandidates.length > 0 &&
      getCompaniesRankingStatus === RequestStates.Succeeded &&
      (isRankedList.bottomCompanies || isRankedList.topCompanies) &&
      didMountRef.current
    ) {
      toast(
        <CustomToastContainer
          Icon={<PriorityHighIcon />}
          title={t("ranking_feature:create_ranking.info")}
          message={t("ranking_feature:create_ranking.toast_ranked_factor")}
        />,
        {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: false,
        }
      );
    }
    didMountRef.current = true;
  }, [rankingCandidates]);

  React.useEffect(() => {
    dispatch(getCategoriesDropdownListRequested());
  }, []);

  React.useEffect(() => {
    const companiesListWithoutTopCompanies = rankingCandidates.filter(
      (rankingCandidate) => {
        for (let i = 0; i < defaultTopCompanies.length; i += 1) {
          if (defaultTopCompanies[i].id === rankingCandidate.id) {
            return false;
          }
        }
        return true;
      }
    );

    const companyListWithoutRankedCompany =
      companiesListWithoutTopCompanies.filter((rankingCandidate) => {
        for (let i = 0; i < defaultBottomCompanies.length; i += 1) {
          if (defaultBottomCompanies[i].id === rankingCandidate.id) {
            return false;
          }
        }
        return true;
      });

    setTopCompanies(defaultTopCompanies);
    setBottomCompanies(defaultBottomCompanies);
    setCompanyList(companyListWithoutRankedCompany);
  }, [rankingCandidates, rankedCompaniesTop, rankedCompaniesBottom]);

  React.useEffect(() => {
    const payload: GetRankedCompaniesPayload = {
      sector_id: sectorValue,
      category_id: categoryValue,
      factor_id: factorValue,
    };

    dispatch(getCompaniesRankingTopRequested(payload));
    dispatch(getCompaniesRankingBottomRequested(payload));
    handleChangeTab(null, initialSelectedRankingTabs);
  }, [sectorValue, categoryValue, factorValue]);

  React.useEffect(() => {
    if (getCompaniesRankingStatus === RequestStates.Requested) {
      setIsLoading(true);
    } else setIsLoading(false);
  }, [getCompaniesRankingStatus]);

  return (
    <Container style={{ padding: "0 40px" }} maxWidth={false}>
      <Backdrop
        style={{ color: `${COLOR_PRIMARY}`, zIndex: 1201 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <BreadcrumbsHeader items={breadCrumbs} />
      <Paper
        style={{
          padding: 24,
          margin: "10px 0 40px",
          height: "100%",
          boxShadow: `${COLOR_BOX_SHADOW}`,
        }}
      >
        <DragDropContext
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
        >
          <FilterCompanies
            sectors={categoriesDropdownListState.sectors}
            categories={categoriesDropdownListState.categories}
            setSelectedSector={setSectorValue}
            setSelectedCategory={setCategoryValue}
            setSelectedFactor={setFactorValue}
            selectedSector={sectorValue}
            selectedCategory={categoryValue}
            selectedFactor={factorValue}
            companyList={companyList}
            selectedTab={selectedTab}
            handleClearAll={handleClearAll}
            addCompanyTopRanking={addCompanyToTopRanking}
            addCompanyBottomRanking={addCompanyToBottomRanking}
            isRankedList={isRankedList}
          />
          <RankingTabs
            isRankedList={isRankedList}
            isSaveButtonDisabled={!isRankingChanged}
            selectedTab={selectedTab}
            selectedCategory={categoryValue}
            selectedFactor={factorValue}
            selectedSector={sectorValue}
            handleChangeTab={handleChangeTab}
            setIsChangedRankingSaved={setIsChangedRankingSaved}
            topCompanies={topCompanies}
            bottomCompanies={bottomCompanies}
          />
          <CompaniesList
            selectedTab={selectedTab}
            companies={companyList}
            isRankedList={isRankedList}
          />
          <ConfirmBeforeLeaveModal
            handleClearAll={handleClearAll}
            isBlocked={isRankingChanged && !isChangedRankingSaved}
          />
        </DragDropContext>
      </Paper>
    </Container>
  );
};

export default React.memo(CompanyRanking);
