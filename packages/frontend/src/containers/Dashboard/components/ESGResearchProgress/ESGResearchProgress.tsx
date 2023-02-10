import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { Box, Container, Table, TableCell, TableRow } from "@material-ui/core";

import TablePaginationActions from "../../../../components/TablePaginationActions";
import { COMPANY_PATH } from "../../../../constants/paths";
import {
  getProgressCompaniesRequested,
  selectProgressCompaniesCompanies,
} from "../../../../reducers/progress_companies";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { useLabelTranslation } from "../../../../utils/customHooks";
import {
  ArrowBox,
  ArrowDown,
  ArrowUp,
  ContainerESG,
  Header,
  LineProgress,
  PaginationBox,
  TablePaginationESG,
  TBody,
  Text,
  TextHeader,
  THead,
} from "./styles";

const ESGResearchProgress = () => {
  const dispatch = useAppDispatch();
  const { company_scores, pagination } = useAppSelector(
    selectProgressCompaniesCompanies
  );
  const [page, setPage] = React.useState(0);
  const [direction, setDirection] = React.useState("desc");
  const { translateCompanyName } = useLabelTranslation();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(
      getProgressCompaniesRequested({
        pagination: {
          direction: direction,
          offset: page * 10,
          limit: 10,
        },
      })
    );
  }, [page, direction]);

  const handleRequestSort = () => {
    const isAsc = direction === "desc";
    setDirection(isAsc ? "asc" : "desc");
  };

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  return (
    <ContainerESG>
      <Box height="100%">
        <Header>{t("login:esg_progress.esg_research_progress")}</Header>
        <Box display="flex" flexDirection="column" height="100%">
          <Container style={{ padding: "0 10px" }}>
            <Table style={{ padding: "10px" }}>
              <THead>
                <TableRow>
                  <TableCell style={{ width: "70%" }}>
                    <TextHeader>{t("login:esg_progress.company")}</TextHeader>
                  </TableCell>
                  <TableCell style={{ display: "flex" }}>
                    <TextHeader>{t("login:esg_progress.progress")}</TextHeader>
                    <ArrowBox onClick={handleRequestSort}>
                      <ArrowUp
                        color={direction === "desc" ? "primary" : "disabled"}
                      />
                      <ArrowDown
                        color={direction === "asc" ? "primary" : "disabled"}
                      />
                    </ArrowBox>
                  </TableCell>
                </TableRow>
              </THead>

              <TBody>
                {company_scores.map((company_score) => {
                  return (
                    <TableRow key={company_score.id}>
                      <TableCell>
                        <Text>
                          <Link
                            className="companyNameLink"
                            to={COMPANY_PATH.replace(
                              ":companyId",
                              String(company_score.company.id)
                            )}
                          >
                            {translateCompanyName(company_score.company)}
                          </Link>
                        </Text>
                      </TableCell>
                      <TableCell>
                        <LineProgress
                          variant="determinate"
                          value={0}
                          $percentage={
                            (company_score.completed_metric_count /
                              company_score.metric_count) *
                            100
                          }
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TBody>
            </Table>
            <PaginationBox>
              <TablePaginationESG
                component="div"
                count={pagination.total_count}
                rowsPerPageOptions={[10]}
                page={page}
                rowsPerPage={10}
                onPageChange={handleChangePage}
                ActionsComponent={TablePaginationActions}
              />
            </PaginationBox>
          </Container>
        </Box>
      </Box>
    </ContainerESG>
  );
};

export default React.memo(ESGResearchProgress);
