// 🔴  this file is to simulate the data passed down from redux, it will be deleted later on
import { IUnitWeightTableMasterState } from "../../types/frameworkSettings";

const mockData: IUnitWeightTableMasterState = {
  tableHeads: [
    "Consumer Good",
    "Extractives & Minerals Processing",
    "Financials",
    "Food & Beverage",
    " Health Care",
    "Renewable Resources & Alternative Energy",
    "Resource Transformation",
  ],
  tableContents: [
    {
      tableLabel: "Carbon Footprint (Greenhouse Emissions)",
      metrics: [
        {
          metricLabel: "Direct greenhouse gas emissions  (Scope 1)",
          metricUnitWeights: [1, 1, 1, 1, 1, 1, 1],
        },
        {
          metricLabel: "Energy indirect greenhouse gas emissions (Scope 2)",
          metricUnitWeights: [1, 1, 1, 1, 1, 1, 1],
        },
        {
          metricLabel: "Total greenhouse gas emissions (Scope 1 & 2)",
          metricUnitWeights: [1, 1, 1, 1, 1, 1, 1],
        },
        {
          metricLabel: "Other indirect greenhouse gas emissions (Scope 3)",
          metricUnitWeights: [1, 1, 1, 1, 1, 1, 1],
        },
        {
          metricLabel:
            "Greenhouse gas intensity (Greenhouse gas emissions/Sales)",
          metricUnitWeights: [1, 1, 1, 1, 1, 1, 1],
        },
        {
          metricLabel: "Breakdown of energy sources",
          metricUnitWeights: [1, 1, 1, 1, 1, 1, 1],
        },
      ],
    },
    {
      tableLabel: "Energy Efficiency",
      metrics: [
        {
          metricLabel: "Direct greenhouse gas emissions  (Scope 1)",
          metricUnitWeights: [1, 1, 1, 1, 1, 1, 1],
        },
        {
          metricLabel: "Energy indirect greenhouse gas emissions (Scope 2)",
          metricUnitWeights: [1, 1, 1, 1, 1, 1, 1],
        },
        {
          metricLabel: "Total greenhouse gas emissions (Scope 1 & 2)",
          metricUnitWeights: [1, 1, 1, 1, 1, 1, 1],
        },
        {
          metricLabel: "Other indirect greenhouse gas emissions (Scope 3)",
          metricUnitWeights: [1, 1, 1, 1, 1, 1, 1],
        },
        {
          metricLabel:
            "Greenhouse gas intensity (Greenhouse gas emissions/Sales)",
          metricUnitWeights: [1, 1, 1, 1, 1, 1, 1],
        },
        {
          metricLabel: "Breakdown of energy sources",
          metricUnitWeights: [1, 1, 1, 1, 1, 1, 1],
        },
      ],
    },
    {
      tableLabel: "Environmental Fines",
      metrics: [
        {
          metricLabel: "Direct greenhouse gas emissions  (Scope 1)",
          metricUnitWeights: [1, 1, 1, 1, 1, 1, 1],
        },
        {
          metricLabel: "Energy indirect greenhouse gas emissions (Scope 2)",
          metricUnitWeights: [1, 1, 1, 1, 1, 1, 1],
        },
        {
          metricLabel: "Total greenhouse gas emissions (Scope 1 & 2)",
          metricUnitWeights: [1, 1, 1, 1, 1, 1, 1],
        },
        {
          metricLabel: "Other indirect greenhouse gas emissions (Scope 3)",
          metricUnitWeights: [1, 1, 1, 1, 1, 1, 1],
        },
        {
          metricLabel:
            "Greenhouse gas intensity (Greenhouse gas emissions/Sales)",
          metricUnitWeights: [1, 1, 1, 1, 1, 1, 1],
        },
        {
          metricLabel: "Breakdown of energy sources",
          metricUnitWeights: [1, 1, 1, 1, 1, 1, 1],
        },
      ],
    },
  ],
};

export default mockData;
