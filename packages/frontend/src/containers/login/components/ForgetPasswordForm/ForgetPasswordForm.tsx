import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";

import CustomToastContainer from "../../../../components/CustomToastContainer";
import mailService from "../../../../services/mail";
import { COLOR_PRIMARY, STATE_OFF } from "../../../../themes/colors";
import { EMAIL_VALIDATION_RULES } from "../../../../utils/formValidator";
import { hasValidValue } from "../../../../utils/inputHelpers";
import Text from "../../../../components/Text";
import { ForgetPasswordFormContainer, Input, SubmitButton } from "./styles";

interface ForgetPasswordFormProps {
  setLoginFormShown: (show: boolean) => void;
}

const ForgetPasswordForm = (props: ForgetPasswordFormProps) => {
  const [emailInvalidity, setEmailInvalidity] = useState<boolean>(false);
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { isValid },
    setError,
    trigger,
  } = useForm({
    defaultValues: {
      email_address: "",
    },
  });

  const resetPassword = async (data: { email_address: string }) => {
    try {
      const response = await mailService.forgetPassword({
        email_address: data.email_address,
      });
      if (response.data.result === "Success") {
        reset();
        setEmailInvalidity(false);
        toast(
          <CustomToastContainer
            Icon={<PriorityHighIcon />}
            title="Info"
            message={t(
              "login:forgot_password.reset_password_request_successful"
            )}
          />,
          {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false,
          }
        );
      } else {
        setEmailInvalidity(true);
        setError("email_address", {});
      }
    } catch (err) {
      setEmailInvalidity(true);
      setError("email_address", {});
    }
  };

  const setFormValue = (data: { field: any; value: string }) => {
    setEmailInvalidity(false);

    if (data.value === "") {
      reset();
    } else {
      setValue(data.field, data.value, {
        shouldValidate: true,
      });
    }
    trigger();
  };

  return (
    <ForgetPasswordFormContainer onSubmit={handleSubmit(resetPassword)}>
      <Text
        $size="lg"
        style={{
          margin: "36px 0",
          textAlign: "center",
          padding: "0px 100px",
        }}
      >
        {t("login:forgot_password.please_enter_the_email")}
      </Text>

      <Controller
        name="email_address"
        rules={EMAIL_VALIDATION_RULES}
        control={control}
        render={({ field, fieldState }) => {
          return (
            <>
              <Input
                value={hasValidValue(field.value) ? field.value : ""}
                type="text"
                onChange={(e) =>
                  setFormValue({
                    field: field.name,
                    value: e.target.value.trim(),
                  })
                }
                inputRef={field.ref}
                name={field.name}
                id={field.name}
                variant="outlined"
                size="small"
                label={t("login:forgot_password.email_address")}
                style={{ marginBottom: 12 }}
                error={fieldState.invalid || emailInvalidity}
              />
              {(fieldState.invalid || emailInvalidity) && (
                <Text $color={STATE_OFF} style={{ textAlign: "center" }}>
                  {t("login:forgot_password.email_is_invalid")}
                </Text>
              )}
            </>
          );
        }}
      />

      <SubmitButton
        type="submit"
        variant="contained"
        color="primary"
        disabled={!isValid}
      >
        {t("login:forgot_password.done")}
      </SubmitButton>
      <IconButton
        style={{ position: "absolute", top: 32, left: 0 }}
        onClick={() => props.setLoginFormShown(true)}
      >
        <ArrowBackIcon htmlColor={COLOR_PRIMARY} />
      </IconButton>
    </ForgetPasswordFormContainer>
  );
};

export default React.memo(ForgetPasswordForm);
