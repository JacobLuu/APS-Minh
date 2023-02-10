const setPagePath = (path: string) => {
  window.gtag("config", process.env.REACT_APP_FRONTEND_GOOGLE_ANALYTICS_ID, {
    page_path: path,
  });
};

const sendPageView = (path: string) => {
  window.gtag("event", "page_view", {
    page_path: path,
  });
};

export default {
  setPagePath,
  sendPageView,
};
