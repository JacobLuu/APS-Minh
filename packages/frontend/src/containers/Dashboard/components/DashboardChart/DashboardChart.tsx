import React from "react";
import Chart from "react-apexcharts";
import { useTranslation } from "react-i18next";

import { Box, Paper } from "@material-ui/core";

import {
  COLOR_BOX_SHADOW,
  LINE_CHART_COLOR_1,
  LINE_CHART_COLOR_2,
  SONIC_GRAY,
  TEXT_COLOR_GREY,
} from "../../../../themes/colors";
import { defaultFontFamily } from "../../../../themes/themes";

const DashboardChart = () => {
  const { t } = useTranslation();

  const ranking_history = t(
    "login:portfolio_rating_history.portfolio_rating_history"
  );
  const portfolio_score = t("login:portfolio_rating_history.portfolio_score");
  const benchmark_avg = t("login:portfolio_rating_history.benchmark_avg");
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const chartOptions = {
    series: [
      {
        name: portfolio_score,
        data: [22, 47, 10, 5, 40, 3, 70, 2, 17, 50, 5, 38],
      },
      {
        name: benchmark_avg,
        data: [12, 18, 5, 33, 10, 14, 45, 15, 2, 16, 38, 18],
      },
    ],
    options: {
      colors: [LINE_CHART_COLOR_1, LINE_CHART_COLOR_2],
      title: {
        text: ranking_history,
        align: "left",
        margin: 10,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize: "14px",
          fontWeight: "600",
          fontFamily: defaultFontFamily,
          color: TEXT_COLOR_GREY,
          lineHeight: "18px",
        },
      },
      chart: {
        toolbar: {
          show: false,
        },
        background: "transparent",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: labels,
      },
      legend: {
        fontSize: "15px",
        fontFamily: defaultFontFamily,
        fontWeight: 600,
        position: "top",
        horizontalAlign: "right",
        color: SONIC_GRAY,
        offsetY: -40,
        markers: {
          width: 20,
          height: 15,
          radius: 0,
          offsetY: 3,
        },
      },
      grid: {
        show: true,
      },
    },
  };

  return (
    <Box height="400px">
      <Paper
        style={{
          padding: 24,
          height: "100%",
          boxShadow: `${COLOR_BOX_SHADOW}`,
        }}
      >
        <Chart
          options={chartOptions.options}
          series={chartOptions.series}
          type="line"
          height="100%"
          className="grafik"
        />
      </Paper>
    </Box>
  );
};

export default React.memo(DashboardChart);
