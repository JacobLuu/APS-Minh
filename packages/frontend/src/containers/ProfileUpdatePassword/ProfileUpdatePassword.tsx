import React, { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import InputAdornment from "@material-ui/core/InputAdornment";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

import CustomToastContainer from "../../components/CustomToastContainer";
import { ACCESS_TOKEN } from "../../constants/localStorage";
import PATHS from "../../constants/paths";
import {
  clearError,
  selectUser,
  updatePasswordRequested,
} from "../../reducers/user";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { LoginStatus } from "../../types";
import { PASSWORD_VALIDATION_RULES } from "../../utils/formValidator";
import { hasValidValue } from "../../utils/inputHelpers";
import Text from "../../components/Text";
import {
  Box,
  ErrorMessage,
  Form,
  FormContainer,
  Icon,
  Input,
  ResetPasswordContainer,
  SubmitButton,
} from "./styles";
import { COLOR_PRIMARY } from "../../themes/colors";

const ProfileUpdatePassword = () => {
  const [oldPasswordVisibility, setOldPasswordVisibility] =
    useState<boolean>(false);
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
  const [repeatedPasswordVisibility, setRepeatedPasswordVisibility] =
    useState<boolean>(false);
  const { t } = useTranslation();

  const {
    control,
    watch,
    handleSubmit,
    setValue,
    trigger,
    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      old_password: "",
      new_password: "",
      repeatedPassword: "",
    },
  });

  const fields = watch();

  const history = useHistory();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const isOldPasswordError = useMemo(
    () => hasValidValue(fields.old_password) && errors.old_password,
    [fields]
  );

  const isNewPasswordError = useMemo(
    () => hasValidValue(fields.new_password) && errors.new_password,
    [fields]
  );

  const isOldAndNewPasswordEqualError = useMemo(() => {
    return (
      fields.old_password === fields.new_password &&
      !errors.old_password &&
      !errors.new_password &&
      hasValidValue(fields.old_password) &&
      hasValidValue(fields.new_password)
    );
  }, [fields]);

  const isNewAndRepeatedPasswordEqual = useMemo(
    () => fields.new_password === fields.repeatedPassword,
    [fields]
  );

  const isNewAndRepeatedPasswordEqualError =
    hasValidValue(fields.repeatedPassword) && !isNewAndRepeatedPasswordEqual;

  const resetPassword = async (data) => {
    dispatch(
      updatePasswordRequested({
        old_password: data.old_password,
        new_password: data.new_password,
      })
    );
  };

  useEffect(() => {
    if (user.loginStatus === LoginStatus.Revoked) {
      toast(
        <CustomToastContainer
          Icon={<PriorityHighIcon />}
          title="Info"
          message={t("profile:change_password.password_reset_success")}
        />,
        {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: false,
          onClose: () => {
            localStorage.removeItem(ACCESS_TOKEN);
            history.replace(PATHS.LOGIN_PATH);
          },
        }
      );
    }
  }, [user.loginStatus]);

  const setFormValue = async (name, value) => {
    setValue(name, value, {
      shouldValidate: true,
    });
    await trigger();
  };

  return (
    <ResetPasswordContainer>
      <Box>
        <FormContainer>
          <Text
            $size="xl"
            $weight="bold"
            $color={COLOR_PRIMARY}
            style={{ textAlign: "center", margin: "12px 0 18px" }}
          >
            {t("profile:change_password.change_password")}
          </Text>
          <Text
            $size="lg"
            style={{
              textAlign: "center",
              padding: "0px 48px",
              marginBottom: 24,
            }}
          >
            {t("profile:change_password.format_password_message")}
          </Text>

          <Form onSubmit={handleSubmit(resetPassword)}>
            <Controller
              name="old_password"
              rules={PASSWORD_VALIDATION_RULES}
              control={control}
              render={({ field, fieldState }) => {
                return (
                  <div style={{ position: "relative", marginBottom: 30 }}>
                    <Input
                      value={field.value}
                      type={oldPasswordVisibility ? "text" : "password"}
                      onChange={(e) => {
                        setFormValue(field.name, e.target.value.trim());
                        dispatch(clearError());
                      }}
                      inputRef={field.ref}
                      name={field.name}
                      id={field.name}
                      variant="outlined"
                      size="small"
                      label={t("profile:change_password.old_password")}
                      style={{
                        marginBottom: isOldPasswordError || user.error ? 0 : 12,
                      }}
                      error={
                        (hasValidValue(field.value) && fieldState.invalid) ||
                        user.error !== null
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon
                              onClick={() =>
                                setOldPasswordVisibility(!oldPasswordVisibility)
                              }
                              style={{ padding: "0px", border: "none" }}
                            >
                              {oldPasswordVisibility ? (
                                <VisibilityIcon />
                              ) : (
                                <VisibilityOffIcon />
                              )}
                            </Icon>
                          </InputAdornment>
                        ),
                      }}
                    />
                    {isOldPasswordError && (
                      <ErrorMessage>
                        {t("profile:change_password.password_not_match_format")}
                      </ErrorMessage>
                    )}
                    {user.error && <ErrorMessage>{user.error}</ErrorMessage>}
                  </div>
                );
              }}
            />

            <Controller
              name="new_password"
              rules={PASSWORD_VALIDATION_RULES}
              control={control}
              render={({ field, fieldState }) => {
                return (
                  <div style={{ position: "relative", marginBottom: 30 }}>
                    <Input
                      value={field.value}
                      type={passwordVisibility ? "text" : "password"}
                      onChange={(e) =>
                        setFormValue(field.name, e.target.value.trim())
                      }
                      inputRef={field.ref}
                      name={field.name}
                      id={field.name}
                      variant="outlined"
                      size="small"
                      label={t("profile:change_password.new_password")}
                      style={{ marginBottom: isNewPasswordError ? 0 : 12 }}
                      error={
                        (hasValidValue(field.value) && fieldState.invalid) ||
                        isOldAndNewPasswordEqualError
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon
                              onClick={() =>
                                setPasswordVisibility(!passwordVisibility)
                              }
                              style={{ padding: "0px", border: "none" }}
                            >
                              {passwordVisibility ? (
                                <VisibilityIcon />
                              ) : (
                                <VisibilityOffIcon />
                              )}
                            </Icon>
                          </InputAdornment>
                        ),
                      }}
                    />
                    {isNewPasswordError && (
                      <ErrorMessage>
                        {t("profile:change_password.password_not_match_format")}
                      </ErrorMessage>
                    )}
                    {isOldAndNewPasswordEqualError && (
                      <ErrorMessage>
                        {t(
                          "profile:change_password.new_password_cant_same_old_password"
                        )}
                      </ErrorMessage>
                    )}
                  </div>
                );
              }}
            />

            <Controller
              name="repeatedPassword"
              rules={PASSWORD_VALIDATION_RULES}
              control={control}
              render={({ field }) => {
                return (
                  <div
                    style={{
                      position: "relative",
                      marginBottom: isNewAndRepeatedPasswordEqualError ? 0 : 12,
                    }}
                  >
                    <Input
                      value={field.value}
                      type={repeatedPasswordVisibility ? "text" : "password"}
                      onChange={(e) =>
                        setFormValue(field.name, e.target.value.trim())
                      }
                      inputRef={field.ref}
                      name={field.name}
                      id={field.name}
                      variant="outlined"
                      size="small"
                      label={t("profile:change_password.repeat_new_password")}
                      style={{
                        marginBottom: isNewAndRepeatedPasswordEqualError
                          ? 0
                          : 12,
                      }}
                      error={isNewAndRepeatedPasswordEqualError}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon
                              onClick={() =>
                                setRepeatedPasswordVisibility(
                                  !repeatedPasswordVisibility
                                )
                              }
                              style={{ padding: "0px" }}
                            >
                              {repeatedPasswordVisibility ? (
                                <VisibilityIcon />
                              ) : (
                                <VisibilityOffIcon />
                              )}
                            </Icon>
                          </InputAdornment>
                        ),
                      }}
                    />
                    {isNewAndRepeatedPasswordEqualError && (
                      <ErrorMessage>
                        {t("profile:change_password.repeat_password_wrong")}
                      </ErrorMessage>
                    )}
                  </div>
                );
              }}
            />
            <SubmitButton
              type="submit"
              variant="contained"
              color="primary"
              disabled={
                !isValid ||
                !isNewAndRepeatedPasswordEqual ||
                isOldAndNewPasswordEqualError
              }
            >
              {t("profile:change_password.save")}
            </SubmitButton>
          </Form>
        </FormContainer>
      </Box>
    </ResetPasswordContainer>
  );
};

export default React.memo(ProfileUpdatePassword);
