import React from "react";

import { ArrowBox, ArrowDown, ArrowUp } from "./styles";

interface ISortButton {
  handleOnclick: React.EventHandler<any>;
  item: string;
  selectedFactor: string;
  order: string;
}

const SortButton = ({
  handleOnclick,
  item,
  selectedFactor,
  order,
}: ISortButton) => {
  const handleOnClick = () => {
    handleOnclick(item);
  };
  return (
    <ArrowBox onClick={handleOnClick}>
      <ArrowUp
        color={
          selectedFactor?.x === item.x && order === "desc"
            ? "primary"
            : "disabled"
        }
      />
      <ArrowDown
        color={
          selectedFactor?.x === item.x && order === "asc"
            ? "primary"
            : "disabled"
        }
      />
    </ArrowBox>
  );
};

export default SortButton;
