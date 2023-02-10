import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { Table, TableCell, TableRow } from "@material-ui/core";

import LastChangedUpdatedEvent from "../../../../components/HistoryModal/components/LastChangedUpdatedEvent";
import TablePaginationActions from "../../../../components/TablePaginationActions";
import {
  getLastChangedCompaniesRequested,
  selectLastChangedCompanies,
} from "../../../../reducers/last_changed_companies";
import { selectUser } from "../../../../reducers/user";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { useLabelTranslation } from "../../../../utils/customHooks";
import { isNone } from "../../../../utils/formValidator";
import { CommonTablePagination, LinkText, TBody } from "../CommonTable/styles";
import { PaginationBox } from "../ESGResearchProgress/styles";
import ScoreChanged from "./ScoreChanged";
import Text from "../../../../components/Text";
import {
  LastChangedCompaniesBox,
  NumberOfChangedBox,
  TableRowStyle,
  THead,
} from "./styles";
import UpdatedMember from "./UpdatedMember";
import { COMPANY_PATH } from "../../../../constants/paths";
import { TEXT_COLOR_GREY } from "../../../../themes/colors";

const LastChangedCompanies = () => {
  const [page, setPage] = React.useState(0);

  const dispatch = useAppDispatch();
  const { last_changed_companies, pagination } = useAppSelector(
    selectLastChangedCompanies
  );
  const user = useAppSelector(selectUser);
  const { translateCompanyName } = useLabelTranslation();
  const { t } = useTranslation();

  const getTextForChangedItem = useCallback(
    (changed_item: string, value: string): string => {
      if (isNone(value)) {
        value = "0";
      } else if (changed_item.includes("weightage")) {
        value += "%";
      } else if (!changed_item.includes("score")) {
        value = `"${value}"`;
      }

      return value;
    },
    []
  );

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  React.useEffect(() => {
    dispatch(
      getLastChangedCompaniesRequested({
        offset: page * 10,
        limit: 10,
      })
    );
  }, [page]);

  return (
    <LastChangedCompaniesBox>
      <Text $size="md" $weight="bold" style={{ padding: "20px 0 5px 10px" }}>
        {t("login:dashboard_last_changed_companies.last_changed_companies")}
      </Text>
      <Table>
        <THead>
          <TableRow>
            <TableCell style={{ width: "30%", paddingLeft: 8 }}>
              <Text $weight="bold" $color={TEXT_COLOR_GREY}>
                {t("login:dashboard_last_changed_companies.company")}
              </Text>
            </TableCell>
            <TableCell style={{ width: "10%", minWidth: "81px" }}>
              <Text $weight="bold" $color={TEXT_COLOR_GREY}>
                {t("login:dashboard_last_changed_companies.esg_score")}
              </Text>
            </TableCell>
            <TableCell style={{ width: "10%", minWidth: "100px" }}>
              <Text $weight="bold" $color={TEXT_COLOR_GREY}>
                {t("login:dashboard_last_changed_companies.last_updated")}
              </Text>
            </TableCell>
            <TableCell style={{ width: "15%", minWidth: "131px" }}>
              <Text
                $weight="bold"
                $color={TEXT_COLOR_GREY}
                style={{ textAlign: "center" }}
              >
                {t("login:dashboard_last_changed_companies.number_of_change")}
              </Text>
            </TableCell>
            <TableCell style={{ width: "35%", paddingLeft: 10 }}>
              <Text $weight="bold" $color={TEXT_COLOR_GREY}>
                {t("login:dashboard_last_changed_companies.history")}
              </Text>
            </TableCell>
          </TableRow>
        </THead>

        <TBody>
          {last_changed_companies.map((last_changed_company) => {
            return (
              <TableRowStyle key={last_changed_company.id}>
                <TableCell style={{ maxWidth: "250px" }}>
                  <Link
                    to={COMPANY_PATH.replace(
                      ":companyId",
                      String(last_changed_company.company.id)
                    )}
                  >
                    <LinkText>
                      {translateCompanyName(last_changed_company.company)}
                    </LinkText>
                  </Link>
                </TableCell>
                <TableCell>
                  <ScoreChanged
                    companyScore={last_changed_company.company.company_score}
                    getTextForChangedItem={getTextForChangedItem}
                  />
                </TableCell>
                <TableCell>
                  {last_changed_company.company.company_score.updated_at ? (
                    <UpdatedMember
                      user={user}
                      updatedBy={last_changed_company.member}
                      lastUpdatedAt={
                        last_changed_company.company.company_score.updated_at
                      }
                    />
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell>
                  <NumberOfChangedBox>
                    <Text
                      $color={TEXT_COLOR_GREY}
                      style={{
                        display: "flex",
                        textAlign: "center",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      {last_changed_company.company.company_score.change_count}
                    </Text>
                  </NumberOfChangedBox>
                </TableCell>
                <TableCell style={{ minWidth: "270px" }}>
                  {last_changed_company.action_info ? (
                    <LastChangedUpdatedEvent
                      actionInfo={last_changed_company.action_info}
                    />
                  ) : (
                    "-"
                  )}
                </TableCell>
              </TableRowStyle>
            );
          })}
        </TBody>
      </Table>
      <PaginationBox>
        <CommonTablePagination
          component="div"
          count={pagination.total_count}
          page={page}
          rowsPerPage={10}
          rowsPerPageOptions={[10]}
          onPageChange={handleChangePage}
          ActionsComponent={TablePaginationActions}
        />
      </PaginationBox>
    </LastChangedCompaniesBox>
  );
};

LastChangedCompanies.defaultProps = {
  scrollTopOnPaging: false,
};

export default React.memo(LastChangedCompanies);
