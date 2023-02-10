import { lazy } from "react";

const LazyFrameworkSettingsReview = lazy(
  () => import("./FrameworkSettingsReview")
);

export default LazyFrameworkSettingsReview;
