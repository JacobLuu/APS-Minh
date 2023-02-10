import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Prompt, useHistory, useLocation } from "react-router-dom";

import {
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import Text from "../Text";
import {
  ActionBox,
  DialogContainer,
  LeaveButton,
  StayButton,
  Title,
} from "./styles";

interface ConfirmBeforeLeaveModalProps {
  isBlocked: boolean;
  handleClearAll: () => void;
}

const ConfirmBeforeLeaveModal = (props: ConfirmBeforeLeaveModalProps) => {
  const { isBlocked, handleClearAll } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();
  const history = useHistory();
  const [lastLocation, setLastLocation] = useState(location);
  const [shouldUnload, setShouldUnload] = useState(false);
  const [confirmedNavigation, setConfirmedNavigation] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
    setShouldUnload(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const showModal = (nextLocation) => {
    openModal();
    setLastLocation(nextLocation);
  };

  const handleBlockedRoute = (nextLocation) => {
    if (!confirmedNavigation && isBlocked) {
      showModal(nextLocation);
      return false;
    }

    return true;
  };

  const handleConfirmNavigationClick = () => {
    closeModal();
    setConfirmedNavigation(true);
    handleClearAll();
  };

  // Block react routes
  useEffect(() => {
    if (confirmedNavigation && lastLocation) {
      // Navigate to the previous blocked location with your navigate function
      setShouldUnload(true);
      history.push(lastLocation.pathname);
    }
  }, [confirmedNavigation, lastLocation, history]);

  // Block non-react routes
  useEffect(() => {
    const unload = (event) => {
      if (isBlocked && !shouldUnload) {
        event.returnValue = t(
          "ranking_feature:confirm_leave_modal.changes_not_saved"
        );
      }
      if (shouldUnload) {
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", unload);
    return () => window.removeEventListener("beforeunload", unload);
  }, [isBlocked, shouldUnload]);
  return (
    <>
      <Prompt when message={handleBlockedRoute} />
      <DialogContainer open={isModalOpen} onClose={closeModal}>
        <DialogTitle>
          <Title>
            {t("ranking_feature:confirm_leave_modal.do_you_want_to_leave")}
          </Title>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Text $size="md">
              {t("ranking_feature:confirm_leave_modal.changes_not_saved")}
            </Text>
          </DialogContentText>
        </DialogContent>
        <ActionBox>
          <StayButton onClick={closeModal} variant="text">
            {t("ranking_feature:confirm_leave_modal.stay")}
          </StayButton>
          <LeaveButton
            onClick={handleConfirmNavigationClick}
            variant="contained"
            color="primary"
          >
            {t("ranking_feature:confirm_leave_modal.leave")}
          </LeaveButton>
        </ActionBox>
      </DialogContainer>
    </>
  );
};

export default ConfirmBeforeLeaveModal;
