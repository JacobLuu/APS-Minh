import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Box, Grid, Typography } from "@material-ui/core";
import Text from "../../../../components/Text";
import { capitalizeEachNoun } from "../../../../utils/miscellaneous";
import { Container } from "./styles";
import { Factor } from "../../../../types/settings";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { selectUser } from "../../../../reducers/user";
import { Language } from "../../../../constants/enums";
import {
  selectFactor,
  getFactorRequested as getFactorRequestedAction,
} from "../../../../reducers/settings/factor";

interface SettingsRightSideProps {
  selectedFactor: Factor;
}

const SettingsRightSide = (props: SettingsRightSideProps) => {
  const dispatch = useAppDispatch();
  const { factor } = useAppSelector(selectFactor);
  const { language } = useAppSelector(selectUser);
  const { t } = useTranslation();

  const renderQuantitativeMetricLabel = (indicator_key) => {
    const indicator_keyword = indicator_key.indicator_keywords.find(
      (indicator_keyword) => {
        return indicator_keyword.locale === language;
      }
    );
    return indicator_keyword.keyword;
  };

  useEffect(() => {
    if (props.selectedFactor) {
      dispatch(getFactorRequestedAction({ factorId: props.selectedFactor.id }));
    }
  }, [props.selectedFactor]);

  return (
    <Container item xs={9}>
      {props.selectedFactor && factor && factor.id !== 0 && (
        <Box mt={4.5} ml={5.5} mr={5.5}>
          <Grid container direction="column">
            <Grid container alignItems="center">
              <Text $size="lg" $weight="bold" $color="#4A4A4A">
                {capitalizeEachNoun(factor.label)}
              </Text>
            </Grid>
            <Box mt={3}>
              <Text $color="#979797">
                {t("settings:framework_view_mode.description")}
              </Text>
            </Box>
            <Box mt={0.5}>
              {factor.description?.split("<br/>").map((text) => (
                <Typography key={text}>{text}</Typography>
              ))}
            </Box>
            <Box mt={3}>
              <Text $color="#979797">
                {t("settings:framework_view_mode.qualitative")}
              </Text>
              <Box mt={1}>
                {factor.questionnaires?.map((questionnaire, index) => {
                  return (
                    <Box mt={index === 0 ? 0 : 2} ml={2} key={questionnaire.id}>
                      <Grid container>
                        <Typography style={{ width: "20px" }}>
                          {index + 1}.
                        </Typography>
                        <Typography style={{ width: "calc(100% - 20px)" }}>
                          {language === Language.chinese
                            ? questionnaire.text_cn
                            : questionnaire.text}
                        </Typography>
                      </Grid>
                    </Box>
                  );
                })}
              </Box>
            </Box>
            <Box mt={3}>
              <Text $color="#979797">
                {t("settings:framework_view_mode.quantitative")}
              </Text>
              <Box mt={1}>
                {factor.indicator_keys?.map((indicator_key, index) => {
                  return (
                    <Box mt={index === 0 ? 0 : 2} ml={2} key={indicator_key.id}>
                      <Grid container>
                        <Typography style={{ width: "20px" }}>
                          {index + 1}.
                        </Typography>
                        <Typography style={{ width: "calc(100% - 20px)" }}>
                          {renderQuantitativeMetricLabel(indicator_key)}
                        </Typography>
                      </Grid>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default React.memo(SettingsRightSide);
