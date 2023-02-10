import React from "react";
import Box from "@material-ui/core/Box";
import MenuItem from "@material-ui/core/MenuItem";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Typography from "@material-ui/core/Typography";
import Container from "./styles";
import ChipStatus from "../../../../components/ChipStatus";
import { SectorSelect } from "../../styles";
import { sectorSettingContext } from "../../SectorSetting";
import { IMetrics } from "../../../../types/frameworkSettings";

export interface IFactor {
  id: number;
  name: string;
  metrics: IMetrics[];
}
const Factor = (props: IFactor) => {
  const { id, name, metrics } = props;
  const { isTableOnEditMode } = React.useContext(sectorSettingContext);
  return (
    <Container id={id}>
      <Typography className="metric-name">{name}</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width="10%">S/No</TableCell>
            <TableCell align="left" width="30%">
              Metric
            </TableCell>
            <TableCell align="center" width="15%">
              % companies completed
            </TableCell>
            <TableCell align="center" width="15%">
              Unit Weights
            </TableCell>
            <TableCell align="center" width="15%">
              Weights
            </TableCell>
            <TableCell align="center" width="15%">
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {metrics.map((metric) => (
            <TableRow key={metric.id}>
              <TableCell component="th" scope="row" width="10%">
                {metric.id}
              </TableCell>
              <TableCell align="left" width="30%">
                {metric.name}
              </TableCell>
              <TableCell align="center" width="15%">
                {metric.completed}
              </TableCell>
              <TableCell align="center" width="15%">
                {isTableOnEditMode === true ? (
                  <Box className="box-wrapper">
                    <SectorSelect
                      className="weights-select"
                      value={1}
                      variant="outlined"
                      autoComplete="off"
                      // onChange={handleChangeSector}
                      MenuProps={{
                        anchorOrigin: {
                          vertical: "bottom",
                          horizontal: "left",
                        },
                        transformOrigin: {
                          vertical: "top",
                          horizontal: "left",
                        },
                        getContentAnchorEl: null,
                      }}
                    >
                      <MenuItem
                        value={123}
                        disabled
                        style={{ display: "none" }}
                      />
                      <MenuItem value={0}>0</MenuItem>
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                    </SectorSelect>
                  </Box>
                ) : (
                  metric.unit_weights
                )}
              </TableCell>
              <TableCell align="center" width="15%">
                {`${metric.weights} %`}
              </TableCell>
              <TableCell align="center" width="15%" className="status-cell">
                <Box className="box-wrapper">
                  <ChipStatus>{`${metric.status}`}</ChipStatus>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default React.memo(Factor);
