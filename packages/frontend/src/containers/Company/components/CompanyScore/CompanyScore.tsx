/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import { useTranslation } from "react-i18next";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

import Text from "../../../../components/Text";
import { selectCompany } from "../../../../reducers/company";
import { useAppSelector } from "../../../../store/hooks";
import {
  COLOR_PRIMARY,
  STATE_OFF,
  STATE_ON,
  WHITE,
} from "../../../../themes/colors";
import { capitalizeText } from "../../../../utils/miscellaneous";
import { LineProgress } from "./styles";

const LetterScore = (props: { letter: string; active: boolean }) => {
  return (
    <Typography
      style={{
        fontWeight: 600,
        textAlign: "center",
        width: 25,
        height: 22,
        marginBottom: 0,
        color: props.active ? WHITE : COLOR_PRIMARY,
        backgroundColor: props.active ? COLOR_PRIMARY : "",
        borderRadius: "4px",
      }}
    >
      {props.letter}
    </Typography>
  );
};

interface CategoryScoreProps {
  label: string;
  score: number;
  rank: string;
  weightage: number;
  pre_score: number;
}

const CategoryScore = (props: CategoryScoreProps) => {
  const label = `${props.label} (${props.weightage}%)`;
  const overallScoreDiff = Number(props.pre_score) - Number(props.score);
  return (
    <Box mb={1.5}>
      <Box display="flex" justifyContent="space-between" mb={0.5}>
        <Text>{capitalizeText(label)}</Text>
        <Box display="flex" mb={0.5}>
          <Text>
            {props.score ? String(props.score) : "-"}&nbsp;({props.rank || "-"})
          </Text>
          {overallScoreDiff < 0 && <ArrowUpwardIcon htmlColor={STATE_ON} />}
          {overallScoreDiff > 0 && <ArrowDownwardIcon htmlColor={STATE_OFF} />}
        </Box>
      </Box>

      <Box>
        <LineProgress
          variant="determinate"
          value={0}
          $category_label={props.label}
          $percentage={props.weightage}
        />
      </Box>
    </Box>
  );
};

const CompanyScore = () => {
  const { company_score, categories } = useAppSelector(selectCompany);
  const { t } = useTranslation();
  const overallScoreDiff =
    Number(company_score.pre_score) - Number(company_score.overall_score);

  return (
    <Box px={3} py={2} height="100%" bgcolor={WHITE} borderRadius={8}>
      <Box>
        <Text $size="lg" $weight="bold">
          {capitalizeText(t("company:overall_score.overall_score"))}
        </Text>
      </Box>

      <Box display="flex" justifyContent="flex-start">
        <Grid container>
          <Grid item xs={12} md={5}>
            <Box
              mt={4}
              display="flex"
              justifyContent="space-between"
              flexDirection="column"
              alignItems="center"
            >
              <Box
                display="flex"
                justifyContent="center"
                flexDirection="column"
                alignItems="center"
                width={90}
                height={90}
                ml={2}
              >
                <Box
                  mt={1}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  <Text $size="3xl" $weight="bold" $color={COLOR_PRIMARY}>
                    {company_score.overall_score
                      ?.toFixed(1)
                      .replace(".0", "") || "-"}
                  </Text>
                  {overallScoreDiff < 0 && (
                    <ArrowUpwardIcon
                      fontSize="large"
                      htmlColor={STATE_ON}
                      style={{ marginTop: "-25px" }}
                    />
                  )}
                  {overallScoreDiff > 0 && (
                    <ArrowDownwardIcon
                      fontSize="large"
                      htmlColor={STATE_OFF}
                      style={{ marginTop: "-25px" }}
                    />
                  )}
                </Box>
              </Box>

              <Box
                display="inline-flex"
                mt={3}
                borderBottom={`1px solid ${COLOR_PRIMARY}`}
              >
                {["A", "B", "C", "D", "E"].map((letter) => (
                  <LetterScore
                    key={letter}
                    letter={letter}
                    active={letter === company_score.rank_score}
                  />
                ))}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={7}>
            <Box mt={4} ml={2} width="100%">
              {categories.map((category) => (
                <CategoryScore
                  key={category.id}
                  label={category.category_label}
                  score={category.category_score.overall_score}
                  rank={category.category_score.rank_score}
                  weightage={category.category_score.weightage}
                  pre_score={category.category_score.pre_score}
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default React.memo(CompanyScore);
