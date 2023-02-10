import React from "react";

const ColWidthControl = ({ numberOfColumn }) => {
  const arrayColChildren = [...Array(numberOfColumn)];
  return (
    <colgroup>
      <col className="column_index" />
      <col className="column_head" />
      {arrayColChildren.map((_, index) => (
        <col key={index + 1} className="column_body" />
      ))}
    </colgroup>
  );
};

export default ColWidthControl;
