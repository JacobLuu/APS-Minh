import { all } from "redux-saga/effects";

import categorySaga from "./category";
import companiesSaga from "./companies";
import companySagas from "./company";
import dashboardSaga from "./dashboard";
import documentsSaga from "./documents";
import esgNewsSaga from "./esg_news";
import esgNewsFactorsSaga from "./esg_news_factors.ts";
import factorsSaga from "./factors";
import factorScoresSaga from "./factor_scores";
import historiesSaga from "./histories";
import lastChangedCompaniesSaga from "./last_changed_companies";
import membersSaga from "./members";
import newsSaga from "./news";
import progressCompaniesSaga from "./progress_companies";
import rankingDropdownListSaga from "./ranking_dropdown_list";
import settingsSaga from "./settings";
import sourceSaga from "./source";
import userSagas from "./user";
import teamNotesSaga from "./team_notes";
import rankingCompaniesSaga from "./ranking_companies";
import companyRankingCategoryViewSaga from "./company_ranking_category_view";
import companyRankingFactoryViewSaga from "./company_ranking_factory_view";
import sectorsSaga from "./sectors";

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    userSagas.userWatcher(),
    membersSaga.membersWatcher(),
    companySagas.companyWatcher(),
    companiesSaga.companiesWatcher(),
    documentsSaga.getDocumentsWatcher(),
    esgNewsSaga.getEsgNewsWatcher(),
    esgNewsFactorsSaga.getEsgNewsFactorsWatcher(),
    historiesSaga.historiesWatcher(),
    factorsSaga.factorsWatcher(),
    factorScoresSaga.factorScoresWatcher(),
    sourceSaga.sourceWatcher(),
    settingsSaga.settingsWatcher(),
    newsSaga.getNewsWatcher(),
    dashboardSaga.getDashboardWatcher(),
    lastChangedCompaniesSaga.getLastChangedCompaniesWatcher(),
    categorySaga.categoryWatcher(),
    progressCompaniesSaga.progressCompaniesWatcher(),
    rankingDropdownListSaga.categoriesDropdownListWatcher(),
    teamNotesSaga.NotesWatcher(),
    rankingCompaniesSaga.companiesWatcher(),
    companyRankingCategoryViewSaga.watcher(),
    companyRankingFactoryViewSaga.watcher(),
    sectorsSaga.sectorsWatcher(),
  ]);
}
