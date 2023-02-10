import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en_login from "./locales/en/login.json";
import en_plugin from "./locales/en/plugin.json";
import en_profile from "./locales/en/profile.json";
import en_company from "./locales/en/company.json";
import en_settings from "./locales/en/settings.json";
import en_ranking_feature from "./locales/en/ranking_feature.json";
import zh_login from "./locales/zh/login.json";
import zh_plugin from "./locales/zh/plugin.json";
import zh_profile from "./locales/zh/profile.json";
import zh_company from "./locales/zh/company.json";
import zh_settings from "./locales/zh/settings.json";
import zh_ranking_feature from "./locales/zh/ranking_feature.json";

export const resources = {
  en: {
    // Namespaces
    login: en_login,
    plugin: en_plugin,
    profile: en_profile,
    company: en_company,
    settings: en_settings,
    ranking_feature: en_ranking_feature,
  },
  zh: {
    login: zh_login,
    plugin: zh_plugin,
    profile: zh_profile,
    company: zh_company,
    settings: zh_settings,
    ranking_feature: zh_ranking_feature,
  },
} as const;

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",
    fallbackLng: "dev",
    supportedLngs: ["en", "zh"],
    ns: [
      "login",
      "plugin",
      "profile",
      "company",
      "settings",
      "ranking_feature",
    ],
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
