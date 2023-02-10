import React, { ChangeEvent, useState } from "react";
import ReactApexChart from "react-apexcharts";

import Box from "@material-ui/core/Box";
import MenuItem from "@material-ui/core/MenuItem";
import { useRouteMatch } from "react-router-dom";

import Text from "../../../../components/Text";
import {
  selectCompany,
  getMonthlyCategoryScoreRequest,
} from "../../../../reducers/company";
import { useAppSelector, useAppDispatch } from "../../../../store/hooks";
import {
  COLOR_ENVIRONMENT,
  COLOR_GOVERNANCE,
  COLOR_SOCIAL,
  WHITE,
} from "../../../../themes/colors";
import { defaultFontFamily } from "../../../../themes/themes";
import { capitalizeText } from "../../../../utils/miscellaneous";
import { COMPANY_PATH } from "../../../../constants/paths";
import { getCurrentYear } from "../../../../utils/date";
import { YearSelect } from "./styles";

const currentYear = getCurrentYear();

const EsgPerformance = () => {
  const {
    params: { companyId },
  } = useRouteMatch(COMPANY_PATH);
  const { monthlyCategoryScores } = useAppSelector(selectCompany);
  const dispatch = useAppDispatch();
  const [year, setYear] = useState(currentYear);

  const series = monthlyCategoryScores.map((category) => ({
    name: capitalizeText(category.category_label),
    data: category.data || [],
  }));

  const options = {
    chart: {
      id: "lineChart",
      toolbar: {
        show: true,
        tools: {
          download: false,
          pan: false,
        },
        autoSelected: "zoom",
      },
    },
    stroke: {
      show: true,
      curve: "smooth",
      width: 3,
      colors: [COLOR_ENVIRONMENT, COLOR_SOCIAL, COLOR_GOVERNANCE],
      lineCap: "round",
    },
    xaxis: {
      categories: [
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
      ],
      labels: {
        show: true,
      },
    },
    yaxis: {
      min: 0,
      max: 10,
    },
    colors: [COLOR_ENVIRONMENT, COLOR_SOCIAL, COLOR_GOVERNANCE],
    legend: {
      show: true,
      position: "top",
      fontSize: 14,
      fontFamily: defaultFontFamily,
      itemMargin: {
        horizontal: 12,
      },
    },
  };

  const handleChangeYear = (event: ChangeEvent<HTMLInputElement>) => {
    setYear(Number(event.target.value));
    dispatch(
      getMonthlyCategoryScoreRequest({
        companyId,
        year: +event.target.value,
      })
    );
  };

  React.useEffect(() => {
    dispatch(getMonthlyCategoryScoreRequest({ companyId, year: currentYear }));
  }, []);

  return (
    <Box
      style={{
        backgroundColor: `${WHITE}`,
        borderRadius: 8,
      }}
      px={3}
      py={2}
      height="100%"
      minHeight={400}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        height="10%"
      >
        <Text $size="lg" $weight="bold">
          ESG Performance
        </Text>

        <YearSelect
          labelId="year-select-label"
          id="year-select"
          value={year}
          onChange={handleChangeYear}
          variant="outlined"
        >
          {/* TODO: Should define a relevant year range  */}
          <MenuItem value={2018}>2018</MenuItem>
          <MenuItem value={2019}>2019</MenuItem>
          <MenuItem value={2020}>2020</MenuItem>
          <MenuItem value={2021}>2021</MenuItem>
          <MenuItem value={2022}>2022</MenuItem>
        </YearSelect>
      </Box>

      <Box width="100%" height="90%">
        <ReactApexChart
          options={options}
          series={series}
          width="100%"
          height="100%"
          type="line"
        />
      </Box>
    </Box>
  );
};

export default React.memo(EsgPerformance);
