import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import PriorityHighIcon from "@material-ui/icons/PriorityHigh";

import CustomToastContainer from "../components/CustomToastContainer";
import { LOGIN_PATH } from "../constants/paths";
import {
  checkProcessStatusRequested as checkProcessStatusRequestedAction,
  selectCategories,
} from "../reducers/settings/categories";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export const GetFrameworkSettingsStatus = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const oneMinute = 60000;
  const { isUploadFrameworkStatus, isTooltipStatus } =
    useAppSelector(selectCategories);

  useEffect(() => {
    if (window.location.pathname !== LOGIN_PATH) {
      dispatch(checkProcessStatusRequestedAction({ isTooltipStatus: false }));
      if (isUploadFrameworkStatus) {
        const interval = setInterval(
          () =>
            dispatch(
              checkProcessStatusRequestedAction({ isTooltipStatus: true })
            ),
          oneMinute
        );
        return () => {
          clearInterval(interval);
        };
      }
    }
  }, [window.location.pathname, isUploadFrameworkStatus]);

  useEffect(() => {
    if (isTooltipStatus) {
      if (!isUploadFrameworkStatus) {
        toast(
          <CustomToastContainer
            Icon={<PriorityHighIcon />}
            title="Info"
            message={t(
              "settings:replacing_process.framework_successfully_applied"
            )}
          />,
          {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false,
          }
        );

        setTimeout(() => window.location.reload(), 3000);
      }
    }
  }, [isTooltipStatus]);

  return null;
};

export default GetFrameworkSettingsStatus;
