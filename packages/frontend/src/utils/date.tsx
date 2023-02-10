import "moment/locale/zh-cn";

import moment from "moment";

import { Language as LanguageEnum } from "../constants/enums";
import { CACHED_LANGUAGE } from "../constants/localStorage";

// Example: 16/09/2021, 03:21 PM
const DATE_TIME_FORMAT = "DD/MM/yyyy, hh:mm A";

export const getGTMTimeZone = () => {
  const time = moment().toString();
  return `${time.substring(time.length - 8, time.length - 2)}`;
};

export const getMillisecond = (second: number): number => second * 1000;

export const getDateTimeFromUnixTimestamp = (unixTimestamp: number): string => {
  return moment(getMillisecond(unixTimestamp)).format(DATE_TIME_FORMAT);
};

export const getFromNow = (date) => moment.unix(date).fromNow();

export const isToday = (date) => {
  return moment.unix(date).isSame(new Date(), "day");
};

export const getFormattedDate = (date, today_string) => {
  if (date) {
    return isToday(date)
      ? today_string
      : moment.unix(date).format("D MMM YYYY");
  }
  return "";
};

export const formattedLastChangedCompanies = (date, today_string) => {
  if (date) {
    return isToday(date)
      ? `${today_string}, ${moment.unix(date).format("HH:mm")}`
      : moment.unix(date).format("DD/MM, HH:mm");
  }
  return "";
};

export const changeMomentLocale = (language: LanguageEnum) => {
  const cached_language = localStorage.getItem(CACHED_LANGUAGE);
  if (
    language === LanguageEnum.chinese ||
    cached_language === LanguageEnum.chinese
  ) {
    moment.locale("zh-cn");
  } else moment.locale("en");
};

export const getCurrentYear = () => +new Date().getFullYear();
