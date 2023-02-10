export const getOperatingSystem = (window) => {
  let operatingSystem = "Not known";
  if (window.navigator.appVersion.indexOf("Win") !== -1) {
    operatingSystem = "Windows OS";
  }
  if (window.navigator.appVersion.indexOf("Mac") !== -1) {
    operatingSystem = "MacOS";
  }
  if (window.navigator.appVersion.indexOf("X11") !== -1) {
    operatingSystem = "UNIX OS";
  }
  if (window.navigator.appVersion.indexOf("Linux") !== -1) {
    operatingSystem = "Linux OS";
  }
  return operatingSystem;
};

export const formatBytes = (bytes: number): number => {
  if (bytes === 0) return 0;
  return parseFloat((bytes / (1024 * 1024)).toFixed(2));
};

export const capitalizeWord = (word: string) => {
  return word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase();
};

export const capitalizeText = (text: string) => {
  return text
    ?.split(" ")
    .map((word) => capitalizeWord(word))
    .join(" ");
};

export const capitalizeEachNoun = (text) => {
  const capitalizedText = capitalizeText(text);
  return capitalizedText
    ?.replaceAll(" And ", " and ")
    .replaceAll(" Of ", " of ")
    .replaceAll(" Or ", " or ")
    .replaceAll(" To ", " to ");
};

// Implemented based on this: https://stackoverflow.com/a/4881836
export const getInitialResponseHeaders = () => {
  const req = new XMLHttpRequest();
  req.open("GET", document.location, false);
  req.send(null);
  const headerList = req.getAllResponseHeaders().toLowerCase().split("\r\n");
  const headers = {};
  for (let i = 0; i < headerList.length; i += 1) {
    const [key, value] = headerList[i].split(":", 2);
    if (key && value) headers[key] = value.trim();
  }

  return headers;
};

export const getRoundedOverallScore = (overall_score) => {
  if (overall_score == null || overall_score === 0) return overall_score;
  return Number(overall_score).toFixed(2);
};

export function getEnvironment() {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  if (baseUrl.includes("localhost")) {
    return "Local Host";
  }
  if (baseUrl.includes("stg")) {
    return "Staging";
  }
  if (baseUrl.includes("demo")) {
    return "Demo";
  }
  return "Development";
}

export const searchParamsToObject = (stringParam: string): Object => {
  try {
    if (stringParam[0] === "?") {
      const search = stringParam.substring(1);
      const decodedURI = decodeURI(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/%2C/g, ",");
      return JSON.parse(`{"${decodedURI}"}`);
    }
    return {};
  } catch (error) {
    console.error(["There is an error", error]);
    return {};
  }
};

// Todo: config tsconfig and babel to enable nullishCoalescing feature
export const nullishCoalescing = (value, replacingValue = "") => {
  return !!value || value === 0 ? value : replacingValue;
};
