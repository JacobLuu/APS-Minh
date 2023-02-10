/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable prettier/prettier */
import React from "react";
import Chart from "react-apexcharts";
import { useTranslation } from "react-i18next";
import LoadingOverlay from "react-loading-overlay";
import { useHistory } from "react-router-dom";

import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";

import { FilterRankPerformanceType } from "../../constants/enums";
import PATHS from "../../constants/paths";
import { resetList } from "../../reducers/companies_ranking";
import { useAppDispatch } from "../../store/hooks";
import { GREY, TABLE_BORDER_COLOR, WHITE } from "../../themes/colors";
import { CompanyBase, RequestStates } from "../../types";
import { useLabelTranslation } from "../../utils/customHooks";
import SortButton from "../SortButton";
import {
  BoldText,
  ChartContainer,
  ChartHeader,
  Companies,
  DataNotFound,
  HeaderText,
  RankNowButton,
  XaxisText,
  YaxisLinkText,
} from "./styles";

interface IHeatMap {
  series: CompanyBase[];
  yAxisWidth?: number;
  children?: React.ReactNode;
  getCompaniesRankingStatus: number;
  selectedFilter: string;
  selectedCategory: number;
  selectedSector: number;
  isHeatMapVisible?: boolean;
  setIsHeatMapVisible?: (isHeatMapVisible: boolean) => void;
}

const HeatMap = ({
  series,
  yAxisWidth,
  children,
  getCompaniesRankingStatus,
  selectedFilter,
  selectedCategory,
  selectedSector,
  isHeatMapVisible,
  setIsHeatMapVisible,
}: IHeatMap) => {
  const [xAxisHeatMap, setXaxisHeatMap] = React.useState("");
  const [yAxisHeatMap, setYaxisHeatMap] = React.useState("");
  const [heatMapData, setHeatMapData] = React.useState(null);
  const [selectedFactor, setSelectedFactor] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [order, setOrder] = React.useState("desc");
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { translateCompanyName } = useLabelTranslation();

  const BottomRankColors = [
    "#FDDCE0",
    "#FBCAD0",
    "#FABDC5",
    "#F9B0B9",
    "#F8A5AF",
    "#F897A3",
    "#F78B98",
    "#F67F8E",
    "#F57282",
    "#F46879",
  ];

  const TopRankColors = [
    "#DAE3FC",
    "#CFDAFB",
    "#C6D4FB",
    "#BBCBFA",
    "#B1C3F9",
    "#A6BBF8",
    "#9DB4F8",
    "#93ACF7",
    "#88A4F6",
    "#7C9BF5",
  ];

  const [rankColors, setRankColors] = React.useState(TopRankColors);
  const [heatMapRanges, setHeatMapRanges] = React.useState(TopRankColors);

  const handleRequestSort = (heatMapPoint) => {
    const newSeriesData = [...heatMapData].sort((serieDataA, serieDataB) => {
      const elementsA = serieDataA.data.find(
        (item) => item.x === heatMapPoint.x
      );
      const elementsB = serieDataB.data.find(
        (item) => item.x === heatMapPoint.x
      );

      if (selectedFactor?.x === heatMapPoint.x) {
        if (order === "desc") return elementsB.y - elementsA.y;
      }
      return elementsA.y - elementsB.y;
    });

    if (selectedFactor?.x !== heatMapPoint.x) {
      setOrder("desc");
    }

    if (selectedFactor?.x === heatMapPoint.x) {
      setOrder((prevState) => {
        if (prevState === "asc") return "desc";
        return "asc";
      });
    }
    setSelectedFactor(heatMapPoint);
    setHeatMapData(newSeriesData);
  };

  const heatMapTooltip = ({ series, seriesIndex, dataPointIndex, w }) => {
    return `${'<div class="arrowBox"><p>'} ${
      series[seriesIndex][dataPointIndex] !== 0
        ? `${t("ranking_feature:rank_performance.rank")} ${
            series[seriesIndex][dataPointIndex] > 0
              ? `${t("ranking_feature:rank_performance.top")} ${
                  Math.abs(10 - series[seriesIndex][dataPointIndex]) + 1
                }`
              : `${t("ranking_feature:rank_performance.bottom")} ${Math.abs(
                  series[seriesIndex][dataPointIndex]
                )}`
          } ${t("ranking_feature:rank_performance.out_of")} ${
            heatMapData.length
          } ${t("ranking_feature:rank_performance.companies_in")} ${
            w.globals.labels[dataPointIndex]
          }`
        : ""
    } </p>
      <p>${t("ranking_feature:rank_performance.factor_score")} ${
      w.globals.initialSeries[seriesIndex].data[dataPointIndex]?.factorScore
    } </p>
       </div>`;
  };
  const rangesFactorScore = [];

  const handleColorRankingTopOrBottom = (j) => {
    if (selectedFilter === FilterRankPerformanceType.bottom10) {
      rangesFactorScore.unshift({
        from: j * -1,
        to: j * -1,
        color: rankColors[j - 1],
      });
      rangesFactorScore.push({
        from: j,
        to: j,
        color: GREY,
      });
    } else if (selectedFilter === FilterRankPerformanceType.top10) {
      rangesFactorScore.unshift({
        from: j * -1,
        to: j * -1,
        color: GREY,
      });
      rangesFactorScore.push({
        from: j,
        to: j,
        color: rankColors[j - 1],
      });
    }
  };

  const handleColorRankAll = (j) => {
    rangesFactorScore.unshift({
      from: j * -1,
      to: j * -1,
      color: rankColors[j + 9],
    });
    rangesFactorScore.push({
      from: j,
      to: j,
      color: rankColors[j - 1],
    });
  };

  React.useEffect(() => {
    if (
      selectedFilter === FilterRankPerformanceType.top10 ||
      selectedFilter === FilterRankPerformanceType.bottom10
    ) {
      for (let j = 1; j <= 10; j += 1) {
        handleColorRankingTopOrBottom(j);
      }
    } else {
      for (let j = 1; j <= 10; j += 1) {
        handleColorRankAll(j);
      }
    }

    setHeatMapRanges(rangesFactorScore);
  }, [rankColors]);

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "heatmap",
      toolbar: {
        show: false,
      },
      animations: {
        enabled: false,
      },
    },
    grid: {
      show: false,
    },
    states: {
      normal: {
        filter: {
          type: "none",
        },
      },
      hover: {
        filter: {
          type: "none",
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: "none",
        },
      },
    },
    stroke: {
      show: true,
      curve: "straight",
      lineCap: "round",
      width: 5,
    },

    legend: {
      show: false,
    },

    plotOptions: {
      heatmap: {
        enableShades: false,
        colorScale: {
          ranges: [
            ...heatMapRanges,
            {
              from: 0,
              to: 0,
              color: TABLE_BORDER_COLOR,
            },
          ],
          min: -10,
          max: 10,
        },
      },
    },
    dataLabels: { enabled: false },

    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      position: "top",

      labels: {
        show: false,
        rotate: 0,
        rotateAlways: false,
        hideOverlappingLabels: false,
        showDuplicates: false,
        trim: true,
        maxHeight: 50,
        style: {
          fontSize: "12px",
        },
      },

      tooltip: {
        enabled: false,
      },
    },

    yaxis: {
      show: true,
      labels: {
        show: false,
        style: {
          colors: ["#7A99F8"],
          fontSize: "14px",
          fontFamily: "Source Sans Pro",
          fontWeight: 600,
        },
        offsetX: 0,
        offsetY: 0,
      },
    },

    tooltip: {
      enabled: true,
      shared: true,
      followCursor: true,
      custom: heatMapTooltip,
      style: {
        fontSize: "12px",
        fontFamily: undefined,
      },
      marker: {
        show: true,
      },
      items: {
        display: "flex",
      },
    },
  };

  const getAllCompaniesRanking = () => {
    const showedCompaniesListOnHeatMap = [];
    (series || []).forEach((company) => {
      const { id, category } = company;
      const factorScores = category?.category_score?.factor_scores;
      factorScores.forEach((factorScore) => {
        factorScore.factor.factor_custom_ranks.forEach((factor_custom_rank) => {
          const isExistInRankedCompanies = showedCompaniesListOnHeatMap.some(
            (rankedCompany) => {
              return rankedCompany.id === factor_custom_rank.company_id;
            }
          );
          if (
            factor_custom_rank.company_id === id &&
            factor_custom_rank.custom_rank !== 0 &&
            !isExistInRankedCompanies
          ) {
            showedCompaniesListOnHeatMap.push({
              name: translateCompanyName(company),
              id: id,
              categoryScore: category?.category_score?.overall_score,
              data: factorScores.map((factorScore) => ({
                id: factorScore.id,
                factorScore: factorScore.overall_score || 0,
                x: factorScore.factor.label,
                y: factorScore.custom_rank,
              })),
            });
          }
        });
      });
    });
    return showedCompaniesListOnHeatMap;
  };

  const handleRankNow = () => {
    dispatch(resetList());
    history.push({
      pathname: PATHS.COMPANY_RANKING_PATH,
      search: `?sector_id=${selectedSector}&category_id=${selectedCategory}`,
    });
  };

  React.useEffect(() => {
    setLoading(getCompaniesRankingStatus === RequestStates.Requested);
  }, [getCompaniesRankingStatus]);

  React.useEffect(() => {
    if (selectedFilter === FilterRankPerformanceType.top10) {
      const seriesDataSortDesc = (getAllCompaniesRanking() || [])
        .sort((factorScoreA, factorScoreB) => {
          return factorScoreA.categoryScore - factorScoreB.categoryScore;
        })
        .slice(-10);

      setRankColors(TopRankColors);
      setHeatMapData(seriesDataSortDesc);
      setOrder(null);
      return;
    }

    if (selectedFilter === FilterRankPerformanceType.bottom10) {
      const seriesDataSortAsc = (getAllCompaniesRanking() || [])
        .sort((factorScoreA, factorScoreB) => {
          return factorScoreB.categoryScore - factorScoreA.categoryScore;
        })
        .slice(-10);

      setRankColors(BottomRankColors);
      setHeatMapData(seriesDataSortAsc);
      setOrder(null);
      return;
    }

    const rankAllCompaniesColors = TopRankColors.concat(BottomRankColors);
    setRankColors(rankAllCompaniesColors);
    setHeatMapData(getAllCompaniesRanking);
    setOrder(null);
  }, [series, selectedFilter]);

  React.useEffect(() => {
    const heatmapRect = document.getElementsByClassName(
      "apexcharts-heatmap-rect"
    );
    setXaxisHeatMap(heatmapRect[0]?.width.animVal.valueAsString);
    setYaxisHeatMap(heatmapRect[0]?.height.animVal.valueAsString);

    if (heatMapData?.length > 0) {
      setIsHeatMapVisible(true);
    }
  }, [heatMapData]);

  if (heatMapData === null) {
    return <LoadingOverlay style={{ backgroundColor: WHITE }} active spinner />;
  }

  return (
    <LoadingOverlay style={{ backgroundColor: WHITE }} active={loading} spinner>
      <ChartContainer>
        <ChartHeader xAxisHeatMap={xAxisHeatMap} yAxisWidth={yAxisWidth}>
          <Box className="container">
            {children ||
              (heatMapData.length > 0 && (
                <Box>
                  <RankNowButton
                    variant="outlined"
                    color="primary"
                    startIcon={<EditIcon />}
                    onClick={handleRankNow}
                  >
                    {t("ranking_feature:rank_performance.create_rank")}
                  </RankNowButton>
                  <HeaderText style={{ marginTop: 20 }}>
                    {t("ranking_feature:rank_performance.companies")} (
                    {heatMapData.length})
                  </HeaderText>
                </Box>
              ))}
          </Box>

          {heatMapData.length > 0 && (
            <Box className="factorBox">
              <HeaderText>
                {t("ranking_feature:rank_performance.factors")}
              </HeaderText>
              <Box className="factorRows">
                {heatMapData[0]?.data?.map((item) => (
                  <div key={item.id} className="box">
                    <Tooltip title={item.x} placement="bottom">
                      <XaxisText>{item.x}</XaxisText>
                    </Tooltip>
                    <SortButton
                      handleOnclick={handleRequestSort}
                      item={item}
                      order={order}
                      selectedFactor={selectedFactor}
                    />
                  </div>
                ))}
              </Box>
            </Box>
          )}
        </ChartHeader>

        <Companies
          isHeatmapVisible={isHeatMapVisible}
          yAxisHeatMap={yAxisHeatMap}
          yAxisWidth={yAxisWidth}
        >
          <div className="companiesColumn">
            {heatMapData?.map((item) => (
              <div key={item.id} className="box">
                <Tooltip
                  title={`${item.name.toUpperCase()} (${item.categoryScore})`}
                  placement="right"
                >
                  <Typography style={{ width: "fitContent" }}>
                    <YaxisLinkText to={`/company/${item?.id}`}>
                      {item.name.toUpperCase()}
                    </YaxisLinkText>
                  </Typography>
                </Tooltip>
              </div>
            ))}
          </div>

          {heatMapData.length > 0 ? (
            <Chart
              options={options}
              series={heatMapData}
              height={(heatMapData.length + 1) * 45}
              width={
                heatMapData[0]?.data
                  ? (heatMapData[0]?.data.length + 1) * 140
                  : "100%"
              }
              type="heatmap"
            />
          ) : (
            <DataNotFound>
              <BoldText style={{ paddingBottom: "20px" }}>
                {t("ranking_feature:rank_performance.have_not_ranked")}
              </BoldText>
              <RankNowButton
                variant="contained"
                color="primary"
                onClick={handleRankNow}
              >
                {t("ranking_feature:rank_performance.rank_now")}
              </RankNowButton>
            </DataNotFound>
          )}
        </Companies>
      </ChartContainer>
    </LoadingOverlay>
  );
};

HeatMap.defaultProps = {
  yAxisWidth: 200,
  isHeatMapVisible: false,
  setIsHeatMapVisible: () => {},
};

export default React.memo(HeatMap);
