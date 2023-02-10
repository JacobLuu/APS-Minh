export enum ParentTabValue {
  tabAllSectors = "1",
  tabSector = "2",
}

export enum UnitWeightValue {
  weight0 = 0,
  weight1,
  weight2,
}

export enum ChildTabValue {
  tabEnvironment = "1",
  tabSocial = "2",
  tabGovernance = "3",
}

export enum TypeUnitText {
  UnitWeight = "Unit weights",
  UnitPercentage = "Percentage",
}

export interface IMetric {
  metricLabel: string;
  metricUnitWeights: number[];
}

export interface IChildTable {
  tableLabel: string;
  metrics: IMetric[];
}

export interface IHandleSelectChangeParam {
  childTableIndex: number;
  metricIndex: number;
  unitWeightIndex: number;
  value: UnitWeightValue;
}
export interface IUnitWeightTableMasterState {
  tableHeads: string[];
  tableContents: IChildTable[];
}

export interface IFrameworkSettingsState {
  isContainerLoading: boolean;
  frameworkName: string;
  unitWeightTableMasterState: IUnitWeightTableMasterState;
}

export interface IMetrics {
  id: number;
  name: string;
  completed: number;
  unit_weights: number;
  weights: number;
  status: boolean;
}
