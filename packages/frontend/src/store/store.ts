import createSagaMiddleware from "redux-saga";

import { configureStore } from "@reduxjs/toolkit";

import categoryReducer from "../reducers/category";
import companiesReducer from "../reducers/companies";
import companiesRankingReducer from "../reducers/companies_ranking";
import companyReducer from "../reducers/company";
import companyRankingCategoryViewReducer from "../reducers/company_ranking_category_view";
import companyRankingFactoryViewReducer from "../reducers/company_ranking_factory_view";
import dashboardReducer from "../reducers/dashboard";
import documentReducer from "../reducers/documents";
import esgNewsReducer from "../reducers/esg_news";
import esgNewsFactorsReducer from "../reducers/esg_news_factors";
import factorScoresReducer from "../reducers/factor_scores";
import factorsReducer from "../reducers/factors";
import frameworkSettingsReducer from "../reducers/frameworkSettings";
import historiesReducer from "../reducers/histories";
import lastChangedCompaniesReducer from "../reducers/last_changed_companies";
import membersReducer from "../reducers/members";
import newsReducer from "../reducers/news";
import progressCompaniesReducer from "../reducers/progress_companies";
import rankingCompaniesReducer from "../reducers/ranking_companies";
import rankingDropdownListReducer from "../reducers/ranking_dropdown_list";
import sectorReducer from "../reducers/sectors";
import settingsCategoriesReducer from "../reducers/settings/categories";
import settingsFactorReducer from "../reducers/settings/factor";
import settingsTemplateFileReducer from "../reducers/settings/template";
import sharedReducer from "../reducers/shared";
import sourceReducer from "../reducers/source";
import teamNotesReducer from "../reducers/team_notes";
import userReducer from "../reducers/user";
import rootSaga from "../sagas";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    user: userReducer,
    members: membersReducer,
    company: companyReducer,
    category: categoryReducer,
    companies: companiesReducer,
    companiesRanking: companiesRankingReducer,
    newsList: newsReducer,
    dashboard: dashboardReducer,
    documents: documentReducer,
    esgNews: esgNewsReducer,
    esgNewsFactors: esgNewsFactorsReducer,
    histories: historiesReducer,
    factors: factorsReducer,
    factorScores: factorScoresReducer,
    source: sourceReducer,
    sectors: sectorReducer,
    settingsCategories: settingsCategoriesReducer,
    settingsFactor: settingsFactorReducer,
    settingsTemplateFile: settingsTemplateFileReducer,
    shared: sharedReducer,
    lastChangedCompanies: lastChangedCompaniesReducer,
    progressCompanies: progressCompaniesReducer,
    rankingDropdownList: rankingDropdownListReducer,
    frameworkSettings: frameworkSettingsReducer,
    teamNotes: teamNotesReducer,
    rankingCompanies: rankingCompaniesReducer,
    companyRankingCategoryView: companyRankingCategoryViewReducer,
    companyRankingFactoryView: companyRankingFactoryViewReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "settingsFactor/getTemplateFileSucceeded",
          "settingsCategories/uploadFrameworkFileRequested",
          "settingsCategories/uploadFrameworkFileFailed",
        ],
        ignoredPaths: ["settingsTemplateFile.fileData"],
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
