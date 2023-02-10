import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import ReactApexChart from "react-apexcharts";
import Typography from "@material-ui/core/Typography";
import {
  COLOR_PRIMARY,
  COLOR_GOVERNANCE,
  COLOR_SOCIAL,
  COLOR_ENVIRONMENT,
  COLOR_TEXT_PRIMARY,
} from "../../../../themes/colors";
import { KIND_OF_PROPOTION } from "../../../../constants/enums";
import InputField, { Container } from "./styles";

export interface IPropotion {
  kindOfPropotion: string;
}

const Propotion = (props: IPropotion) => {
  const { kindOfPropotion } = props;
  const defaultQnQPropotionData = {
    qualiative: 0,
    quantitative: 0,
  };

  const defaultESGPropotionData = {
    environmental: 0,
    social: 0,
    governance: 0,
  };
  const defaultPropotionData =
    kindOfPropotion === KIND_OF_PROPOTION.QNQ
      ? defaultQnQPropotionData
      : defaultESGPropotionData;
  const [propotionRate, setPropotionRate] = useState(defaultPropotionData);
  const data = {
    QnQ: [30, 70],
    ESG: [20, 30, 50],
  };
  const colorList = {
    QnQ: [COLOR_PRIMARY, COLOR_GOVERNANCE],
    ESG: [COLOR_GOVERNANCE, COLOR_SOCIAL, COLOR_ENVIRONMENT],
  };
  const title = {
    QnQ: "Quantitative & Qualitative Proportion",
    ESG: "ESG Proportion",
  };
  const propotionData = {
    series: kindOfPropotion === KIND_OF_PROPOTION.QNQ ? data.QnQ : data.ESG,
    options: {
      fill: {
        colors:
          kindOfPropotion === KIND_OF_PROPOTION.QNQ
            ? colorList.QnQ
            : colorList.ESG,
      },
      chart: {
        type: "donut",
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        enabled: false,
      },
      colors:
        kindOfPropotion === KIND_OF_PROPOTION.QNQ
          ? colorList.QnQ
          : colorList.ESG,
      states: {
        normal: {
          filter: {
            type: "none",
            value: 0,
          },
        },
        hover: {
          filter: {
            type: "none",
            value: 0.15,
          },
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: "none",
            value: 0.35,
          },
        },
      },
      plotOptions: {
        pie: {
          startAngle: 0,
          endAngle: 360,
          expandOnClick: false,
          offsetX: -30,
          offsetY: 0,
          customScale: 0.8,
          donut: {
            size: "81%",
            labels: {
              hover: {
                show: false,
              },
              show: true,
              name: {
                show: true,
                fontSize: "14px",
                fontWeight: 400,
                fontFamily: "Source Sans Pro",
                color: COLOR_TEXT_PRIMARY,
                offsetY: 5,
              },
              value: {
                show: false,
              },
              total: {
                show: true,
                label: `Weight (${8}%)`,
                color: COLOR_TEXT_PRIMARY,
                showAlways: true,
              },
            },
          },
        },
      },
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 1540,
          options: {
            plotOptions: {
              pie: {
                startAngle: 0,
                endAngle: 360,
                expandOnClick: false,
                offsetX: 80,
                offsetY: 0,
                customScale: 0.8,
              },
            },
          },
        },
        {
          breakpoint: 1285,
          options: {
            plotOptions: {
              pie: {
                startAngle: 0,
                endAngle: 360,
                expandOnClick: false,
                offsetX: 95,
                offsetY: 0,
                customScale: 0.8,
              },
            },
          },
        },
        {
          breakpoint: 1024,
          options: {
            plotOptions: {
              pie: {
                startAngle: 0,
                endAngle: 360,
                expandOnClick: false,
                offsetX: 95,
                offsetY: 0,
                customScale: 0.8,
              },
            },
          },
        },
        {
          breakpoint: 965,
          options: {
            plotOptions: {
              pie: {
                startAngle: 0,
                endAngle: 360,
                expandOnClick: false,
                offsetX: 95,
                offsetY: 0,
                customScale: 0.8,
              },
            },
          },
        },
      ],
    },
  };

  const maxLengthCheck = (event) => {
    if (event.target.value.length > event.target.maxLength) {
      event.target.value = event.target.value.slice(0, event.target.maxLength);
    }
  };

  return (
    <Container className="propotion">
      <p className="title">
        {kindOfPropotion === KIND_OF_PROPOTION.QNQ ? title.QnQ : title.ESG}
      </p>
      <Box className="inner">
        <Box className="input-wrapper">
          {kindOfPropotion === KIND_OF_PROPOTION.QNQ ? (
            <>
              <Box className="input-row">
                <span className="input-left">
                  <span>
                    <div
                      className="maker"
                      style={{ background: COLOR_PRIMARY }}
                    />
                  </span>
                  <span>
                    <Typography>Quantiative</Typography>
                  </span>
                </span>
                <span className="input-right">
                  <span style={{ width: "65px" }}>
                    <InputField
                      type="number"
                      onInput={maxLengthCheck}
                      onWheel={(e) => e.target.blur()}
                      maxLength={2}
                      min={0}
                      max={99}
                    />
                  </span>
                  <span style={{ marginLeft: "5px" }}>%</span>
                </span>
              </Box>
              <Box className="input-row">
                <span className="input-left">
                  <span>
                    <div
                      className="maker"
                      style={{ background: COLOR_GOVERNANCE }}
                    />
                  </span>
                  <span>
                    <Typography>Qualiative</Typography>
                  </span>
                </span>
                <span className="input-right">
                  <span style={{ width: "65px" }}>
                    <InputField
                      type="number"
                      onInput={maxLengthCheck}
                      onWheel={(e) => e.target.blur()}
                      maxLength={2}
                      min={0}
                      max={99}
                    />
                  </span>
                  <span style={{ marginLeft: "5px" }}>%</span>
                </span>
              </Box>
            </>
          ) : (
            <>
              <Box className="input-row">
                <span className="input-left">
                  <span>
                    <div
                      className="maker"
                      style={{ background: COLOR_ENVIRONMENT }}
                    />
                  </span>
                  <span>
                    <Typography>Environmental Risk</Typography>
                  </span>
                </span>
                <span className="input-right">
                  <span style={{ width: "65px" }}>
                    <InputField
                      type="number"
                      onInput={maxLengthCheck}
                      onWheel={(e) => e.target.blur()}
                      maxLength={2}
                      min={0}
                      max={99}
                    />
                  </span>
                  <span style={{ marginLeft: "5px" }}>%</span>
                </span>
              </Box>
              <Box className="input-row">
                <span className="input-left">
                  <span>
                    <div
                      className="maker"
                      style={{ background: COLOR_SOCIAL }}
                    />
                  </span>
                  <span>
                    <Typography>Social Risk</Typography>
                  </span>
                </span>

                <span className="input-right">
                  <span style={{ width: "65px" }}>
                    <InputField
                      type="number"
                      onInput={maxLengthCheck}
                      onWheel={(e) => e.target.blur()}
                      maxLength={2}
                      min={0}
                      max={99}
                    />
                  </span>
                  <span style={{ marginLeft: "5px" }}>%</span>
                </span>
              </Box>
              <Box className="input-row">
                <span className="input-left">
                  <span>
                    <div
                      className="maker"
                      style={{ background: COLOR_GOVERNANCE }}
                    />
                  </span>
                  <span>
                    <Typography>Governance Risk</Typography>
                  </span>
                </span>

                <span className="input-right">
                  <span style={{ width: "65px" }}>
                    <InputField
                      type="number"
                      onInput={maxLengthCheck}
                      onWheel={(e) => e.target.blur()}
                      maxLength={2}
                      min={0}
                      max={99}
                    />
                  </span>
                  <span style={{ marginLeft: "5px" }}>%</span>
                </span>
              </Box>
            </>
          )}
        </Box>
        <ReactApexChart
          options={propotionData.options}
          series={propotionData.series}
          type="donut"
          height="115%"
          width="115%"
        />
      </Box>
    </Container>
  );
};

export default React.memo(Propotion);
