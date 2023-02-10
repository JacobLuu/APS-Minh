import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import Factor from "../Factor";
import Container from "./styles";
import { COLOR_PRIMARY } from "../../../../themes/colors";
import { factorList } from "../../mockdata";
import { sectorSettingContext } from "../../SectorSetting";

const UnitWeights = () => {
  const { isTableOnEditMode, setIsTableOnEditMode } =
    React.useContext(sectorSettingContext);

  return (
    <Container>
      <div className="unit-weight-header">
        <div className="unit-weight-action">
          <span>Unit Weights</span>
          <span
            role="presentation"
            className="edit-button"
            onClick={() => setIsTableOnEditMode(!isTableOnEditMode)}
            onKeyDown={() => setIsTableOnEditMode(!isTableOnEditMode)}
          >
            <EditIcon />
          </span>
        </div>
        <div className="unit-weight-annotation">
          <span>0 - Not Material</span>
          <span>1 - Material</span>
          <span>2 - Very Material</span>
        </div>
      </div>
      {factorList.map((factor) => (
        <Factor
          id={factor.id}
          name={factor.factorName}
          metrics={factor.metrics}
        />
      ))}
    </Container>
  );
};

export default React.memo(UnitWeights);
