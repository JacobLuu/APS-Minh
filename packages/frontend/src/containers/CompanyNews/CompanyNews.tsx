import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

import Box from "@material-ui/core/Box";

import BreadcrumbsHeader from "../../components/BreadcrumbsHeader";
import { COMPANY_PATH, DASHBOARD_PATH } from "../../constants/paths";
import { selectNews } from "../../reducers/news";
import { useAppSelector } from "../../store/hooks";
import { useLabelTranslation } from "../../utils/customHooks";
import { capitalizeText } from "../../utils/miscellaneous";
import CompanyNewsDetail from "./components/CompanyNewsDetail";
import { Container } from "./styles";

const CompanyNews = () => {
  const { t } = useTranslation();
  const { translateCompanyName } = useLabelTranslation();

  const { company } = useAppSelector(selectNews);

  const breadcrumbs = useMemo(() => {
    if (company) {
      return [
        {
          label: t("login:dashboard_header.dashboard"),
          path: DASHBOARD_PATH,
        },
        {
          label: capitalizeText(translateCompanyName(company)),
          path: COMPANY_PATH.replace(":companyId", String(company.id)),
        },
        {
          label: t("login:bread_crumb.news"),
        },
      ];
    }
    return [
      {
        label: t("login:dashboard_header.dashboard"),
        path: DASHBOARD_PATH,
      },
      {
        label: t("login:bread_crumb.news"),
      },
    ];
  }, [company]);

  return (
    <Container>
      <Box ml={4.5} mr={3} mb={2}>
        <BreadcrumbsHeader items={breadcrumbs} />

        <CompanyNewsDetail />
      </Box>
    </Container>
  );
};

export default React.memo(CompanyNews);
