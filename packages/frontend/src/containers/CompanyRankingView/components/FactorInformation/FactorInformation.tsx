import React from "react";
import { Box } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import CloseIcon from "@material-ui/icons/Close";
import { useTranslation } from "react-i18next";
import Text from "../../../../components/Text";
import { COLOR_BOX_SHADOW, COLOR_PRIMARY } from "../../../../themes/colors";
import { ScoreDialog } from "./styles";
import FactorPage from "../../../Company/components/FactorPage";
import {
  getFactorScoreToEditRequest,
  selectCompanyRankingFactoryView,
} from "../../../../reducers/company_ranking_factory_view";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";

interface IFactorInformation {
  companyName: string;
  isOpenFactor: boolean;
  setFactorScoreToEdit: (open: boolean) => void;
  factor: {
    factor_label: string;
    factor_overall_score: string;
    factor_score_id: number;
  };
  reloadPage: () => void;
}

const FactorInformation = (props: IFactorInformation) => {
  const dispatch = useAppDispatch();

  const { factorScoreToEdit } = useAppSelector(selectCompanyRankingFactoryView);

  const { setFactorScoreToEdit, companyName, factor, reloadPage } = props;

  const { factor_label, factor_score_id: factorScoreId } = factor;

  const { t } = useTranslation();
  const handleCancel = () => {
    setFactorScoreToEdit(undefined);
  };

  React.useEffect(() => {
    if (factorScoreId) {
      dispatch(getFactorScoreToEditRequest({ factorScoreId }));
    }
  }, [factorScoreId]);

  return (
    // Todo: make loading here while requesting
    <ScoreDialog open={props.isOpenFactor} maxWidth={false}>
      <Box
        display="flex"
        justifyContent="space-between"
        margin="32px 32px 0px 32px"
      >
        <Box>
          <Text $size="xs" style={{ lineHeight: "20px" }}>
            {t("ranking_feature:create_ranking.company")}
          </Text>
          <Text
            $size="lg"
            $weight="bold"
            $color={COLOR_PRIMARY}
            style={{ lineHeight: "20px", marginBottom: "20px" }}
          >
            {companyName}
          </Text>
        </Box>
        <CloseIcon onClick={() => handleCancel()} />
      </Box>
      <Paper
        style={{
          margin: "0 auto",
          width: "98%",
          boxShadow: `${COLOR_BOX_SHADOW}`,
        }}
      >
        {factorScoreToEdit && (
          <FactorPage
            factor={{
              label: factor_label,
              factor_score: factorScoreToEdit,
            }}
            // truyền factor fake vào đây
            isExpanded
            isMetricsWeightageShown
            isOpenFactor={props.isOpenFactor}
            reloadPage={reloadPage}
          />
        )}
      </Paper>
    </ScoreDialog>
  );
};

export default React.memo(FactorInformation);
