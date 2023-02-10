import React, { memo, useMemo, useContext } from "react";
import Select from "@material-ui/core/Select";
import TableRow from "@material-ui/core/TableRow";
import MenuItem from "@material-ui/core/MenuItem";
import TableCell from "@material-ui/core/TableCell";
import { frameworkSettingContext } from "./IndustrySetting";
import { IMetric, UnitWeightValue } from "../../types/frameworkSettings";

const MemoizedTableRow = memo<{
  metric: IMetric;
  metricIndex: number;
  childTableIndex: number;
}>((props) => {
  const { childTableIndex, metric, metricIndex } = props;
  const { isTableOnEditMode, handleChangeSpecificTableCell } = useContext(
    frameworkSettingContext
  );

  return useMemo(
    () => (
      <>
        <TableRow key={metric.metricLabel}>
          <TableCell>{metricIndex}</TableCell>
          <TableCell className="metric_label">{metric.metricLabel}</TableCell>
          {metric.metricUnitWeights.map((unitWeight, unitWeightIndex) => (
            <TableCell align="center">
              {isTableOnEditMode ? (
                <Select
                  className="select_weight"
                  variant="outlined"
                  autoComplete="off"
                  value={unitWeight}
                  onChange={({
                    target: { value },
                  }: {
                    target: HTMLInputElement | UnitWeightValue;
                  }): void =>
                    handleChangeSpecificTableCell({
                      childTableIndex,
                      metricIndex,
                      unitWeightIndex,
                      value,
                    })
                  }
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value={UnitWeightValue.weight0}>
                    {UnitWeightValue.weight0}
                  </MenuItem>
                  <MenuItem value={UnitWeightValue.weight1}>
                    {UnitWeightValue.weight1}
                  </MenuItem>
                  <MenuItem value={UnitWeightValue.weight2}>
                    {UnitWeightValue.weight2}
                  </MenuItem>
                </Select>
              ) : (
                <p>{unitWeight}</p>
              )}
            </TableCell>
          ))}
        </TableRow>
      </>
    ),
    [metric, isTableOnEditMode]
  );
});

export default MemoizedTableRow;
