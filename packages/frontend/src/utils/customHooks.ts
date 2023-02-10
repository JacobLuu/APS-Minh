import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  CACHED_LANGUAGE,
  CLOUDFRONT_VIEWER_COUNTRY,
} from "../constants/localStorage";
import { selectUser } from "../reducers/user";
import { useAppSelector } from "../store/hooks";
import { changeMomentLocale } from "./date";
import { capitalizeEachNoun, getInitialResponseHeaders } from "./miscellaneous";
import { Language as LanguageEnum } from "../constants/enums";

export interface Size {
  width: number | undefined;
  height: number | undefined;
}

export const useWindowSize = (): Size => {
  const [windowSize, setWindowSize] = useState<Size>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
};

export const useViewerCountry = () => {
  useEffect(() => {
    const headers = getInitialResponseHeaders();
    if (headers["cloudfront-viewer-country"]) {
      localStorage.setItem(
        CLOUDFRONT_VIEWER_COUNTRY,
        headers["cloudfront-viewer-country"]
      );
    }
  }, []);
};

export const useSelectedTab = (initialTab: string) => {
  const [selectedTab, setSelectedTab] = useState<string>(initialTab);

  const handleChangeTab = (
    _event: React.ChangeEvent<{}>,
    tabValue: number | string
  ) => {
    setSelectedTab(String(tabValue));
  };

  return {
    selectedTab,
    handleChangeTab,
  };
};

export const useLanguage = () => {
  const { language } = useAppSelector(selectUser);
  const { i18n } = useTranslation();

  useEffect(() => {
    if (language) {
      i18n.changeLanguage(language);
      localStorage.setItem(CACHED_LANGUAGE, language);
    } else {
      const cached_language = localStorage.getItem(CACHED_LANGUAGE);
      const new_language = LanguageEnum[LanguageEnum[cached_language]];
      i18n.changeLanguage(new_language);
      changeMomentLocale(new_language);
    }
  }, [language]);
};

export const useLabelTranslation = () => {
  const { language } = useAppSelector(selectUser);
  const { t } = useTranslation();

  const translateCategoryLabel = (category_label: string): string => {
    switch (category_label) {
      case "environmental":
        return t("company:overall_score.environmental");
      case "social":
        return t("company:overall_score.social");
      case "governance":
        return t("company:overall_score.governance");
      default:
        return "";
    }
  };

  const translateSectorLabel = (sector_label: string): string => {
    switch (sector_label) {
      // New sector
      case "Communication Services":
        return t("ranking_feature:sector_list.communication_services");
      case "Consumer Discretionary":
        return t("ranking_feature:sector_list.consumer_discretionary");
      case "Consumer Staples":
        return t("ranking_feature:sector_list.consumer_staples");
      case "Energy":
        return t("ranking_feature:sector_list.energy");
      case "Financials":
        return t("ranking_feature:sector_list.financials");
      case "Health Care":
        return t("ranking_feature:sector_list.health_care");
      case "Industrials":
        return t("ranking_feature:sector_list.industrials");
      case "Information Technology":
        return t("ranking_feature:sector_list.information_technology");
      case "Materials":
        return t("ranking_feature:sector_list.materials");
      case "Real Estate":
        return t("ranking_feature:sector_list.real_estate");
      case "Utilities":
        return t("ranking_feature:sector_list.utilities");
      // Old sector
      case "Basic Materials":
        return t("ranking_feature:sector_list.basic_materials");
      case "Consumer Cyclical":
        return t("ranking_feature:sector_list.consumer_cyclical");
      case "Consumer Defensive":
        return t("ranking_feature:sector_list.consumer_defensive");
      case "Financial Services":
        return t("ranking_feature:sector_list.financial_services");
      case "Technology":
        return t("ranking_feature:sector_list.technology");
      default:
        return "";
    }
  };

  const translateFactorLabel = (factor) => {
    if (
      language === LanguageEnum.chinese &&
      factor?.label_cn &&
      factor?.label_cn !== "NaN"
    ) {
      return capitalizeEachNoun(factor?.label_cn);
    }
    return capitalizeEachNoun(factor?.label);
  };

  const translateCompanyName = (company) => {
    if (language === LanguageEnum.chinese && company.name_cn) {
      return company.name_cn;
    }
    return company.name;
  };

  return {
    translateCategoryLabel,
    translateSectorLabel,
    translateFactorLabel,
    translateCompanyName,
  };
};

export default {
  useWindowSize,
  useViewerCountry,
  useSelectedTab,
  useLanguage,
  useLabelTranslation,
};
