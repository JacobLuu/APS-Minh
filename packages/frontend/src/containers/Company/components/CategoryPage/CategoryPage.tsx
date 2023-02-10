import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import Skeleton from "@material-ui/lab/Skeleton";
import TabContext from "@material-ui/lab/TabContext";

import Text from "../../../../components/Text";
import {
  getCompanyDetailsRequested,
  selectCompany,
} from "../../../../reducers/company";
import { getFactorScoreRequested } from "../../../../reducers/factor_scores";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { COLOR_PRIMARY } from "../../../../themes/colors";
import { Category, Factor, RequestStates } from "../../../../types";
import { useSelectedTab } from "../../../../utils/customHooks";
import FactorPage from "../FactorPage";
import TeamNotesModal from "../TeamNotesModal";
import { CategoryTab, CategoryTabs, InputLabel, TabPanel } from "./styles";

enum CategoryTabEnum {
  environment = "1",
  social = "2",
  governance = "3",
}

interface TabContentProps {
  factors: Factor[];
  isMetricsWeightageShown: boolean;
  isFactorPagesExpanded: boolean[];
  setIsFactorPagesExpanded: Function;
  category_id: number;
}

const TabContent = (props: TabContentProps) => {
  const {
    factors,
    isMetricsWeightageShown,
    isFactorPagesExpanded,
    setIsFactorPagesExpanded,
    category_id,
  } = props;

  if (factors.length === 0) {
    return (
      <>
        {[1, 2, 3].map((key) => (
          <Box key={key} my={2}>
            <Skeleton variant="rect" width="100%" height={78} />
          </Box>
        ))}
      </>
    );
  }

  return (
    <>
      {factors.map((factor, index) => (
        <FactorPage
          key={factor.id}
          factor={factor}
          isMetricsWeightageShown={isMetricsWeightageShown}
          isExpanded={isFactorPagesExpanded[index]}
          setIsExpanded={setIsFactorPagesExpanded}
          index={index}
          category_id={category_id}
        />
      ))}
    </>
  );
};

const CategoryPage = () => {
  const initialSelectedTab = String(CategoryTabEnum.environment);
  const { selectedTab, handleChangeTab } = useSelectedTab(initialSelectedTab);
  const tabsRef = useRef(null);
  const dispatch = useAppDispatch();
  const params = useParams<{ companyId: string }>();
  const selectedCompany = useAppSelector(selectCompany);
  const [isMetricsWeightageShown, setIsMetricsWeightageShown] = useState(false);
  const [isTeamNotesModalOpen, setIsTeamNotesModalOpen] = useState(false);
  const [isFactorPagesExpanded, setIsFactorPagesExpanded] = useState<boolean[]>(
    []
  );
  const [isFactorPagesInitialized, setIsFactorPagesInitialized] =
    useState(false);

  const category: Category = useMemo(() => {
    switch (selectedTab) {
      case CategoryTabEnum.environment:
        return selectedCompany.categories[0];
      case CategoryTabEnum.social:
        return selectedCompany.categories[1];
      case CategoryTabEnum.governance:
        return selectedCompany.categories[2];
      default:
        return selectedCompany.categories[0];
    }
  }, [selectedTab, selectedCompany.categories]);

  const { factors } = category;

  const areAllFactorPagesExpanded = isFactorPagesExpanded.every(
    (isFactorPageExpanded) => isFactorPageExpanded
  );

  useEffect(() => {
    if (factors.length > 0 && !isFactorPagesInitialized) {
      setIsFactorPagesExpanded(factors.map(() => false));
      setIsFactorPagesInitialized(true);
    }
  }, [factors]);

  const handleClickCheckbox = () => {
    setIsMetricsWeightageShown((prevState) => !prevState);
  };

  const handleExpandAll = () => {
    if (
      selectedCompany.requestState !== RequestStates.Requested &&
      !areAllFactorPagesExpanded
    ) {
      for (let i = 0; i < factors.length; i += 1) {
        if (!isFactorPagesExpanded[i]) {
          dispatch(
            getFactorScoreRequested({
              id: factors[i].factor_score.id,
            })
          );
        }
      }
      setIsFactorPagesExpanded((prevState) => prevState.map(() => true));
    } else {
      setIsFactorPagesExpanded((prevState) => prevState.map(() => false));
    }
  };

  return (
    <Box mt={2}>
      <TabContext value={selectedTab}>
        <CategoryTabs
          TabIndicatorProps={{
            style: Object.assign({ display: "none" }),
          }}
          value={selectedTab}
          onChange={(e, value) => {
            dispatch(
              getCompanyDetailsRequested({
                company_id: Number(params.companyId),
                category_id: value,
              })
            );
            handleChangeTab(e, value);
            setIsFactorPagesInitialized(false);
          }}
          aria-label="tabs"
          ref={tabsRef}
        >
          <CategoryTab
            $active={selectedTab === `${CategoryTabEnum.environment}`}
            value={`${CategoryTabEnum.environment}`}
            label="Environment"
          />
          <CategoryTab
            $active={selectedTab === `${CategoryTabEnum.social}`}
            value={`${CategoryTabEnum.social}`}
            label="Social"
          />
          <CategoryTab
            $active={selectedTab === `${CategoryTabEnum.governance}`}
            value={`${CategoryTabEnum.governance}`}
            label="Governance"
          />
        </CategoryTabs>

        <Box display="flex" alignItems="center" justifyContent="flex-end">
          <Box mr={3}>
            <Text
              $color={COLOR_PRIMARY}
              $weight="bold"
              onClick={handleExpandAll}
              $hasCursor
            >
              {areAllFactorPagesExpanded ? "Collapse All" : "Expand All"}
            </Text>
          </Box>

          <Box display="flex" alignItems="center">
            <Checkbox
              id="show-metric-weightage"
              checked={isMetricsWeightageShown}
              onChange={handleClickCheckbox}
              disableRipple
              color="primary"
            />
            <InputLabel htmlFor="show-metric-weightage" color="primary">
              Show metrics weightages
            </InputLabel>
          </Box>

          <Box ml={3}>
            <Text
              $weight="bold"
              $color={COLOR_PRIMARY}
              $hasCursor
              onClick={() => setIsTeamNotesModalOpen(true)}
            >
              Team Notes
            </Text>
          </Box>
        </Box>

        <TabPanel value={CategoryTabEnum.environment}>
          <TabContent
            factors={factors}
            isMetricsWeightageShown={isMetricsWeightageShown}
            isFactorPagesExpanded={isFactorPagesExpanded}
            setIsFactorPagesExpanded={setIsFactorPagesExpanded}
            category_id={selectedCompany.categories[0]?.id || null}
          />
        </TabPanel>
        <TabPanel value={CategoryTabEnum.social}>
          <TabContent
            factors={factors}
            isMetricsWeightageShown={isMetricsWeightageShown}
            isFactorPagesExpanded={isFactorPagesExpanded}
            setIsFactorPagesExpanded={setIsFactorPagesExpanded}
            category_id={selectedCompany.categories[1]?.id || null}
          />
        </TabPanel>
        <TabPanel value={CategoryTabEnum.governance}>
          <TabContent
            factors={factors}
            isMetricsWeightageShown={isMetricsWeightageShown}
            isFactorPagesExpanded={isFactorPagesExpanded}
            setIsFactorPagesExpanded={setIsFactorPagesExpanded}
            category_id={selectedCompany.categories[2]?.id || null}
          />
        </TabPanel>
      </TabContext>

      <TeamNotesModal
        isOpen={isTeamNotesModalOpen}
        setIsOpen={setIsTeamNotesModalOpen}
        category={category}
      />
    </Box>
  );
};

export default React.memo(CategoryPage);
