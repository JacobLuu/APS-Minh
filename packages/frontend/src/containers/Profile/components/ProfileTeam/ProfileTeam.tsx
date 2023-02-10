import React, { useState, useEffect, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  Paper,
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
} from "@material-ui/core";
import Text from "../../../../components/Text";
import {
  ProfileTeamContainer,
  TeamTableContainer,
  TableBodyRow,
  TableBodyCell,
  TeamTablePagination,
  UserAvatar,
} from "./styles";
import TablePaginationActions from "../../../../components/TablePaginationActions";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  getMembersRequested,
  selectMembers,
  updateRoleRequested,
} from "../../../../reducers/members";
import { selectUser } from "../../../../reducers/user";
import { capitalizeText } from "../../../../utils/miscellaneous";
import { RequestStates } from "../../../../types";
import { COLOR_PRIMARY } from "../../../../themes/colors";

const ProfileTeam = () => {
  const [selectedPage, setSelectedPage] = useState(0);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const container = useRef(null);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { members, requestState } = useAppSelector(selectMembers);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (user.organization_id || requestState === RequestStates.Succeeded) {
      dispatch(getMembersRequested());
    }
  }, [user.organization_id, requestState]);

  const membersShown = useMemo(() => {
    return members.slice(
      selectedPage * rowsPerPage,
      selectedPage * rowsPerPage + rowsPerPage
    );
  }, [members, selectedPage, rowsPerPage]);

  const updateRole = (memberId, role) => {
    dispatch(updateRoleRequested({ memberId, role }));
  };

  const translateMemberRole = (role) => {
    if (role === "member") {
      return t("profile:my_team.member");
    }

    if (role === "admin") {
      return t("profile:my_team.admin");
    }
  };

  return (
    <ProfileTeamContainer maxWidth={false}>
      <Paper style={{ width: "100%", overflow: "hidden" }}>
        <TeamTableContainer ref={container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell style={{ paddingLeft: 0, backgroundColor: "white" }}>
                  <Text>{t("profile:my_team.name")}</Text>
                </TableCell>
                <TableCell style={{ backgroundColor: "white" }}>
                  <Text>{t("profile:my_team.email_address")}</Text>
                </TableCell>
                <TableCell style={{ backgroundColor: "white" }}>
                  <Text>{t("profile:my_team.role")}</Text>
                </TableCell>

                {user.role === "admin" ? (
                  <TableCell style={{ backgroundColor: "white" }}>
                    <Text>{t("profile:my_team.action")}</Text>
                  </TableCell>
                ) : null}
              </TableRow>
            </TableHead>

            <TableBody>
              {membersShown.map((member, memberIndex) => {
                const stringYou = t("profile:my_team.you");
                const initials =
                  member.first_name.slice(0, 1) + member.last_name.slice(0, 1);
                const fullName =
                  user.id === member.id
                    ? stringYou
                    : `${member.first_name} ${member.last_name}`;
                return (
                  <TableBodyRow key={member.id}>
                    <TableBodyCell>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <UserAvatar $index={memberIndex} alt={initials}>
                          {initials}
                        </UserAvatar>
                        <Text
                          $size="md"
                          $weight="bold"
                          style={{ marginLeft: 8 }}
                        >
                          {fullName}
                        </Text>
                      </div>
                    </TableBodyCell>

                    <TableBodyCell>
                      <Text $size="md">{member.email_address}</Text>
                    </TableBodyCell>

                    <TableBodyCell>
                      <Text $size="md">
                        {capitalizeText(translateMemberRole(member.role))}
                      </Text>
                    </TableBodyCell>

                    {user.role === "admin" ? (
                      <TableBodyCell>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          {member.id !== user.id && (
                            <>
                              {member.role === "admin" ? (
                                <Text
                                  $size="md"
                                  $color="#979797"
                                  $weight="bold"
                                  $hasCursor
                                  onClick={() =>
                                    updateRole(member.id, "member")
                                  }
                                >
                                  {t("profile:my_team.make_member")}
                                </Text>
                              ) : (
                                <Text
                                  $size="md"
                                  $weight="bold"
                                  $color={COLOR_PRIMARY}
                                  $hasCursor
                                  onClick={() => updateRole(member.id, "admin")}
                                >
                                  {t("profile:my_team.make_admin")}
                                </Text>
                              )}
                            </>
                          )}
                        </div>
                      </TableBodyCell>
                    ) : null}
                  </TableBodyRow>
                );
              })}
            </TableBody>
          </Table>
        </TeamTableContainer>

        <TeamTablePagination
          component="div"
          rowsPerPageOptions={[5, 10, 20, 50]}
          count={members.length}
          page={selectedPage}
          onPageChange={(_event, page) => setSelectedPage(page)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(event) => {
            setSelectedPage(0);
            setRowsPerPage(Number(event.target.value));
            container.current.scrollTo(0, 0);
          }}
          labelRowsPerPage={t("profile:my_team.rows_per_page")}
          ActionsComponent={TablePaginationActions}
        />
      </Paper>
    </ProfileTeamContainer>
  );
};

export default React.memo(ProfileTeam);
