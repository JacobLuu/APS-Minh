import React from "react";
import { useTranslation } from "react-i18next";

import Box from "@material-ui/core/Box";

import { Member } from "../../../../types";
import { formattedLastChangedCompanies } from "../../../../utils/date";
import { LinkText } from "./styles";

interface UpdatedMemberProps {
  user: Member;
  updatedBy: Member;
  lastUpdatedAt: number;
}

const UpdatedMember = (props: UpdatedMemberProps) => {
  const { t } = useTranslation();
  const todayString = t("login:login.today");
  const updateBy = props.updatedBy;
  const fullName =
    props.user.id === updateBy.id
      ? t("login:login.you")
      : `${updateBy.last_name}`;
  return (
    <Box>
      <LinkText>
        {`${fullName}, `}
        {formattedLastChangedCompanies(props.lastUpdatedAt, todayString)}
      </LinkText>
    </Box>
  );
};

export default React.memo(UpdatedMember);
