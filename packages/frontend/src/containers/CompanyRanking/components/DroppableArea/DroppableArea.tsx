import React from "react";
import { Droppable } from "react-beautiful-dnd";

import { DroppableId } from "../../../../constants/enums";
import DraggableCompany from "../DraggableCompany";
import { DroppableContainer } from "./styles";

import type { CompanyBase } from "../../../../types";

interface DroppableAreaProps {
  isNotDraggable: boolean;
  droppableId: DroppableId;
  companies: CompanyBase[];
  tabID: number;
  selectedTab: string;
}

const DroppableArea = (props: DroppableAreaProps) => {
  const qualitativeScoreTop10 = [
    10, 9.8, 9.6, 9.3, 9.1, 8.9, 8.7, 8.4, 8.2, 8.0,
  ];

  const qualitativeScoreBottom10 = [
    2.0, 1.8, 1.6, 1.3, 1.1, 0.9, 0.7, 0.4, 0.2, 0,
  ];

  const qualitativeScoreValues =
    props.tabID === 1
      ? [...qualitativeScoreTop10]
      : [...qualitativeScoreBottom10];

  return (
    <Droppable droppableId={props.droppableId}>
      {(provided, snapshot) => (
        <DroppableContainer
          className={`${snapshot.isDraggingOver ? "drag--active" : ""}`}
          ref={provided.innerRef}
          {...provided.droppableProps}
          maxWidth={false}
        >
          {props.companies?.map((company, index) => (
            <DraggableCompany
              isNotDraggable={props.isNotDraggable}
              key={company.id ? company.id : -index}
              index={index}
              companies={props.companies}
              company={company}
              droppableId={props.droppableId}
              qualitativeScoreValues={qualitativeScoreValues[index]}
              selectedTab={props.selectedTab}
            />
          ))}
          <span style={{ display: "none" }}>{provided.placeholder}</span>
        </DroppableContainer>
      )}
    </Droppable>
  );
};

export default React.memo(DroppableArea);
