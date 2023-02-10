import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

import { DASHBOARD_PATH } from "../../../../constants/paths";
import { loginRequested, selectUser } from "../../../../reducers/user";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { LoginStatus } from "../../../../types/user";
import {
  EMAIL_VALIDATION_RULES,
  PASSWORD_VALIDATION_RULES,
} from "../../../../utils/formValidator";
import Text from "../../../../components/Text";
import { Icon, Input, LoginButton, LoginFormContainer } from "./styles";

import type { LoginForm as LoginFormInterface } from "../../../../types";
import { COLOR_PRIMARY, STATE_OFF } from "../../../../themes/colors";

interface LoginFormProps {
  setLoginFormShown: (shown: boolean) => void;
}

const LoginForm = (props: LoginFormProps) => {
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
  const [backendValidationResult, setBackendValidationResult] =
    useState<boolean>(true);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const history = useHistory();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInterface>({
    defaultValues: {
      email_address: "",
      password: "",
    },
    mode: "onChange",
  });

  const logIn = (data: LoginFormInterface) => {
    dispatch(loginRequested(data));
  };

  useEffect(() => {
    if (user.loginStatus === LoginStatus.Authorized) {
      history.push(DASHBOARD_PATH);
    } else if (user.loginStatus === LoginStatus.NotAuthorized) {
      setBackendValidationResult(false);
    }
  }, [user.loginStatus]);

  return (
    <LoginFormContainer onSubmit={handleSubmit(logIn)}>
      <Text $size="lg" style={{ margin: "36px 0" }}>
        {t("login:login.enter_your_credentials")}
      </Text>
      <Controller
        name="email_address"
        rules={EMAIL_VALIDATION_RULES}
        control={control}
        render={({ field, fieldState }) => {
          return (
            <Input
              value={field.value}
              type="text"
              onChange={(e) => {
                field.onChange(e.target.value.trim());
                setBackendValidationResult(true);
              }}
              inputRef={field.ref}
              name="email_address"
              id="email_address"
              variant="outlined"
              size="small"
              label={t("login:login.email_address")}
              style={{ marginBottom: 36 }}
              error={fieldState.invalid || !backendValidationResult}
            />
          );
        }}
      />

      <Controller
        name="password"
        rules={PASSWORD_VALIDATION_RULES}
        control={control}
        render={({ field, fieldState }) => {
          return (
            <div style={{ position: "relative" }}>
              <Input
                value={field.value}
                type={passwordVisibility ? "text" : "password"}
                onChange={(e) => {
                  field.onChange(e.target.value.trim());
                  setBackendValidationResult(true);
                }}
                inputRef={field.ref}
                name="password"
                id="password"
                variant="outlined"
                size="small"
                label={t("login:login.password")}
                style={{ marginBottom: 12 }}
                error={fieldState.invalid || !backendValidationResult}
              />
              <Icon
                onClick={() => setPasswordVisibility((prevState) => !prevState)}
              >
                {passwordVisibility ? (
                  <VisibilityIcon />
                ) : (
                  <VisibilityOffIcon />
                )}
              </Icon>
              {(errors.email_address ||
                errors.password ||
                !backendValidationResult) && (
                <Text $color={STATE_OFF} style={{ textAlign: "center" }}>
                  {t("login:login.email_or_password_is_invalid")}
                </Text>
              )}
            </div>
          );
        }}
      />

      <Text
        $size="lg"
        $weight="bold"
        $hasCursor
        $color={COLOR_PRIMARY}
        style={{ marginTop: "24px" }}
        onClick={() => props.setLoginFormShown(false)}
      >
        {t("login:login.forgot_password")}
      </Text>
      <LoginButton type="submit" variant="contained" color="primary">
        {t("login:login.login")}
      </LoginButton>
    </LoginFormContainer>
  );
};

export default React.memo(LoginForm);
