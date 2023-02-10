import React, { memo, useMemo, useContext, useLayoutEffect } from "react";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import TableRow from "@material-ui/core/TableRow";
import LoadingOverlay from "react-loading-overlay";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import Typography from "@material-ui/core/Typography";
import TableContainer from "@material-ui/core/TableContainer";
import ColWidthControl from "./ColWidthControl";
import MemoizedTableRow from "./MemoizedTableRow";
import { frameworkSettingContext } from "./IndustrySetting";
import { IFrameworkSettingsState } from "../../types/frameworkSettings";

const ContentTables = memo<{
  unitWeightMasterState: IFrameworkSettingsState["unitWeightTableMasterState"];
}>((props) => {
  const { unitWeightMasterState } = props;
  const { isContentOnLoading } = useContext(frameworkSettingContext);

  useLayoutEffect(() => {
    const childTableWrapper = document.querySelectorAll(".wrap_child_table");
    const examlpleTableLength = document
      .querySelector("table.MuiTable-root")
      ?.getBoundingClientRect().width;
    childTableWrapper.forEach((element) => {
      element.style.width = `${examlpleTableLength}px`;
    });
  }, [unitWeightMasterState.tableHeads.length]);

  return useMemo(
    () => (
      <LoadingOverlay
        style={{ backgroundColor: "#fff" }}
        active={isContentOnLoading}
        spinner
      >
        <Box className="wrap_content">
          <TableContainer>
            <Box className="wrap_child_table">
              <Table>
                <ColWidthControl
                  numberOfColumn={
                    unitWeightMasterState.tableHeads.length as number
                  }
                />
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={2}>Sector</TableCell>
                    {unitWeightMasterState.tableHeads.map((tableHead) => (
                      <TableCell
                        key={tableHead}
                        align="left"
                        className="column_body"
                      >
                        {tableHead}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
            {unitWeightMasterState.tableContents.map(
              (childTable, childTableIndex) => (
                <Box className="wrap_child_table" key={childTable.tableLabel}>
                  <Typography variant="h5">{childTable.tableLabel}</Typography>
                  <Table>
                    <ColWidthControl
                      numberOfColumn={
                        unitWeightMasterState.tableHeads.length as number
                      }
                    />
                    <TableBody>
                      <TableRow>
                        <TableCell
                          scope="column"
                          className="child_table_header"
                        >
                          S/No
                        </TableCell>
                        <TableCell
                          scope="column"
                          className="child_table_header"
                        >
                          Metric
                        </TableCell>
                        {childTable.metrics[0].metricUnitWeights.map(
                          (_, staticHeaderIndex) => (
                            <TableCell
                              key={staticHeaderIndex + 1}
                              scope="column"
                              className="child_table_header"
                              align="center"
                            >
                              <Typography align="center">
                                Unit weights
                              </Typography>
                            </TableCell>
                          )
                        )}
                      </TableRow>
                      {childTable.metrics.map((metric, metricIndex) => (
                        <MemoizedTableRow
                          key={metric.metricLabel}
                          metric={metric}
                          childTableIndex={childTableIndex}
                          metricIndex={metricIndex}
                        />
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              )
            )}
          </TableContainer>
        </Box>
      </LoadingOverlay>
    ),
    [unitWeightMasterState]
  );
});

export default ContentTables;
