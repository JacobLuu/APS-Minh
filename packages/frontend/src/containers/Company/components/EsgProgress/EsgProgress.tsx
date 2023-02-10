import React from "react";
import ReactApexChart from "react-apexcharts";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

import Text from "../../../../components/Text";
import { selectCompany } from "../../../../reducers/company";
import { useAppSelector } from "../../../../store/hooks";
import {
  COLOR_ENVIRONMENT,
  COLOR_GOVERNANCE,
  COLOR_SOCIAL,
  WHITE,
} from "../../../../themes/colors";
import { defaultFontFamily } from "../../../../themes/themes";
import { capitalizeText } from "../../../../utils/miscellaneous";
import { ChartIcon } from "./styles";

interface ChartLabelProps {
  label: string;
  percentage: number;
}

const ChartLabel = (props: ChartLabelProps) => {
  const text = capitalizeText(`${props.label} (${props.percentage}%)`);
  return (
    <Box display="flex" alignItems="center" my={2}>
      <ChartIcon $label={props.label} mr={2} />
      <Text>{text}</Text>
    </Box>
  );
};

const EsgProgress = () => {
  const { categories, categoryMetricProgresses } =
    useAppSelector(selectCompany);

  const options = {
    chart: {
      id: "radialBar",
    },
    colors: [COLOR_ENVIRONMENT, COLOR_SOCIAL, COLOR_GOVERNANCE],
    plotOptions: {
      radialBar: {
        offsetX: -16,
        offsetY: -2,
        hollow: {
          size: "15%",
        },
        track: {
          show: false,
          margin: 8,
        },
        dataLabels: {
          show: false,
          name: {
            fontFamily: defaultFontFamily,
            color: "black",
          },
        },
      },
    },
    labels: ["Environment", "Social", "Governance"],
  };

  return (
    <Box px={3} py={2} height="100%" bgcolor={WHITE} borderRadius={8}>
      <Box>
        <Text $size="lg" $weight="bold">
          ESG Analysing Progress
        </Text>
      </Box>

      {categories.length === 3 && (
        <Box display="flex" alignItems="center" mt={1}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <Box maxWidth={270}>
                <ReactApexChart
                  options={options}
                  series={categoryMetricProgresses}
                  height={190}
                  type="radialBar"
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box display="flex" flexDirection="column">
                {categories.map((category, index) => (
                  <ChartLabel
                    key={category.category_label}
                    label={category.category_label}
                    percentage={
                      Math.floor(categoryMetricProgresses[index] * 100) / 100
                    }
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default React.memo(EsgProgress);
