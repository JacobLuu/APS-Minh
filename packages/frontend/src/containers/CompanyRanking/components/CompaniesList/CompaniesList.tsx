import React from "react";
import { Droppable } from "react-beautiful-dnd";

import { DroppableId, RankingTabsEnums } from "../../../../constants/enums";
import { CompanyBase } from "../../../../types";
import DraggableCompany from "../DraggableCompany";
import { DroppableContainer } from "./styles";

interface CompaniesListProps {
  companies: CompanyBase[];
  selectedTab: string;
  isRankedList: {
    topCompanies: boolean;
    bottomCompanies: boolean;
  };
}

const CompaniesList = (props: CompaniesListProps) => {
  const { companies, isRankedList, selectedTab } = props;
  const isNotDraggable = React.useMemo(() => {
    if (
      isRankedList.topCompanies &&
      selectedTab === `${RankingTabsEnums.top_company}`
    ) {
      return true;
    }
    if (
      isRankedList.bottomCompanies &&
      selectedTab === `${RankingTabsEnums.bottom_company}`
    ) {
      return true;
    }
    return false;
  }, [isRankedList, selectedTab]);
  return (
    <Droppable droppableId={DroppableId.company_list}>
      {(provided, snapshot) => (
        <DroppableContainer
          ref={provided.innerRef}
          {...provided.droppableProps}
          maxWidth={false}
          className={`company_list ${
            snapshot.isDraggingOver ? "drag_complete" : "remove"
          }`}
        >
          {companies.map((company, index) => (
            <DraggableCompany
              isNotDraggable={isNotDraggable}
              index={index}
              companies={companies}
              company={company}
              key={company.id}
              droppableId={DroppableId.company_list}
            />
          ))}
          <span style={{ display: "none" }}>{provided.placeholder}</span>
        </DroppableContainer>
      )}
    </Droppable>
  );
};

export default React.memo(CompaniesList);
