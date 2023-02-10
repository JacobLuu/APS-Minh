export enum CategoryType {
  environmental = 1,
  social = 2,
  governance = 3,
}

export enum ColumnIndex {
  OverallScore = 1,
  Environmental = 2,
  Social = 3,
  Governance = 4,
}

export enum UserRoleType {
  admin = "admin",
  member = "member",
}

export enum FrameworkStatusType {
  active = "active",
  temporary = "temporary",
  deactive = "deactive",
}

export enum PositionType {
  label = 1,
  disclosure = 2,
  unit = 3,
}

export enum Language {
  english = "en",
  chinese = "zh",
}

export enum RankingTabsEnums {
  top_company = 1,
  bottom_company = 2,
}

export enum DroppableId {
  top_company = "topCompany",
  bottom_company = "bottomCompany",
  company_list = "companyList",
}

export enum FilterRankPerformanceType {
  all_companies = "allCompanies",
  top10 = "top10",
  bottom10 = "bottom10",
}

export enum SortOrder {
  asc = "ascending",
  desc = "descending",
}

export enum SELECTED_FRAMEWORK {
  GRI = "GRI",
  CUSTOM = "CUSTOM",
}

export enum KIND_OF_PROPOTION {
  ESG = "ESG",
  QNQ = "QNQ",
}

export enum EXCHANGE_CURRENCY {
  "Hong Kong" = "HKD",
  "Taiwan" = "TWD",
  "Shanghai" = "CNY",
  "New York" = "USD",
  "Shenzhen" = "CNY",
  "USNASDAQ" = "USD",
  "MCX" = "RUB",
  "Saudi" = "SAR",
  "NYSE" = "USD",
  "Other OTC" = "USD",
  "NasdaqGS" = "USD",
}
