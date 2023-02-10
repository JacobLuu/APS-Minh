import React from "react";
import { useTranslation } from "react-i18next";
import Text from "../Text";
import { error } from "../../assets/images";
import { STATE_OFF } from "../../themes/colors";

const renderErrorMessage = (message) => {
  return (
    <span>
      <img src={error} alt="error" />
      <Text $weight="bold" $color={STATE_OFF} style={{ marginLeft: "5px" }}>
        {message}
      </Text>
    </span>
  );
};

const ScoreErrorMessage = React.memo(() => {
  const { t } = useTranslation();
  const rangeOfScore = t("company:source_edit_mode.range_of_score");
  return renderErrorMessage(rangeOfScore);
});

const RequiredErrorMessage = React.memo(() => {
  const { t } = useTranslation();
  const requiredMessage = t("profile:my_details_edit.required_message");
  return renderErrorMessage(requiredMessage);
});

const ProfileFirstNameErrorMessage = React.memo(() => {
  const { t } = useTranslation();
  const firstNameInvalidMessage = t(
    "profile:my_details_edit.first_name_invalid"
  );
  return renderErrorMessage(firstNameInvalidMessage);
});

const ProfileLastNameErrorMessage = React.memo(() => {
  const { t } = useTranslation();
  const lastNameInvalidMessage = t("profile:my_details_edit.last_name_invalid");
  return renderErrorMessage(lastNameInvalidMessage);
});

const FrameworkImportErrorMessage = React.memo(() => {
  const { t } = useTranslation();
  return renderErrorMessage(
    t("settings:upload_invalid_format.there_is_an_issue")
  );
});

const FrameworkImportFactorLengthErrorMessage = React.memo(() => {
  const { t } = useTranslation();
  const factorLengthErrorMessage = t(
    "company:add_disclosure_popup.error_message.factor"
  );
  return renderErrorMessage(factorLengthErrorMessage);
});

const ConflictErrorMessage = React.memo(() => {
  const { t } = useTranslation();
  const conflictErrorMessage = t("company:pdf_viewer.conflict_error_message");
  return renderErrorMessage(conflictErrorMessage);
});

const SourceLengthErrorMessage = React.memo(() => {
  const { t } = useTranslation();
  const sourceLengthErrorMessage = t(
    "company:add_disclosure_popup.error_message.source_name"
  );
  return renderErrorMessage(sourceLengthErrorMessage);
});

const AnswerLengthErrorMessage = React.memo(() => {
  const { t } = useTranslation();
  const answerLengthErrorMessage = t(
    "company:add_disclosure_popup.error_message.answer"
  );
  return renderErrorMessage(answerLengthErrorMessage);
});

const ReasonForChangeLengthErrorMessage = React.memo(() => {
  const { t } = useTranslation();
  const reasonForChangeErrorMessage = t(
    "company:add_disclosure_popup.error_message.reason_for_change"
  );
  return renderErrorMessage(reasonForChangeErrorMessage);
});

const UnitErrorMessage = React.memo(() => {
  const { t } = useTranslation();
  const unitLengthErrorMessage = t(
    "company:add_disclosure_popup.error_message.unit"
  );
  return renderErrorMessage(unitLengthErrorMessage);
});

export {
  ScoreErrorMessage,
  RequiredErrorMessage,
  ProfileFirstNameErrorMessage,
  ProfileLastNameErrorMessage,
  FrameworkImportErrorMessage,
  ConflictErrorMessage,
  FrameworkImportFactorLengthErrorMessage,
  SourceLengthErrorMessage,
  AnswerLengthErrorMessage,
  ReasonForChangeLengthErrorMessage,
  UnitErrorMessage,
};
