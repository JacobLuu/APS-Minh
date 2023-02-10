import React, { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import InputAdornment from "@material-ui/core/InputAdornment";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

import CustomToastContainer from "../../components/CustomToastContainer";
import PATHS from "../../constants/paths";
import membersService from "../../services/members";
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

const ResetPassword = () => {
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
  const [repeatedPasswordVisibility, setRepeatedPasswordVisibility] =
    useState<boolean>(false);
  const { t } = useTranslation();

  const query = new URLSearchParams(useLocation().search);

  const {
    control,
    watch,
    handleSubmit,
    setValue,
    trigger,
    formState: { isValid, errors },
  } = useForm({
    defaultValues: {
      password: "",
      repeatedPassword: "",
    },
  });

  const fields = watch();

  const history = useHistory();

  const isPasswordEqual = useMemo(
    () => fields.password === fields.repeatedPassword,
    [fields]
  );

  const isPasswordError = useMemo(
    () => hasValidValue(fields.password) && "password" in errors,
    [fields]
  );

  const isPasswordEqualError = useMemo(
    () => hasValidValue(fields.repeatedPassword) && !isPasswordEqual,
    [fields]
  );

  const resetPassword = async (data) => {
    const response = await membersService.resetPassword({
      token: query.get("token"),
      password: data.password,
    });
    if (response.status === 200) {
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
            history.push(PATHS.LOGIN_PATH);
          },
        }
      );
    }
  };

  const setFormValue = async (name, value) => {
    setValue(name, value);
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
            style={{ textAlign: "center", margin: "24px 0 36px" }}
          >
            {t("login:login.forgot_password")}
          </Text>
          <Text
            $size="lg"
            style={{
              textAlign: "center",
              padding: "0px 48px",
              marginBottom: 36,
            }}
          >
            {t("profile:change_password.format_password_message")}
          </Text>

          <Form onSubmit={handleSubmit(resetPassword)}>
            <Controller
              name="password"
              rules={PASSWORD_VALIDATION_RULES}
              control={control}
              render={({ field, fieldState }) => {
                return (
                  <div
                    style={{
                      position: "relative",
                      marginBottom: isPasswordError ? 28 : 40,
                    }}
                  >
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
                      label={t("login:login.password")}
                      style={{ marginBottom: isPasswordError ? 0 : 12 }}
                      error={hasValidValue(field.value) && fieldState.invalid}
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
                    {isPasswordError ? (
                      <ErrorMessage>
                        {t("profile:change_password.password_not_match_format")}
                      </ErrorMessage>
                    ) : null}
                  </div>
                );
              }}
            />

            <Controller
              name="repeatedPassword"
              control={control}
              render={({ field }) => {
                return (
                  <div
                    style={{
                      position: "relative",
                      marginBottom: isPasswordEqualError ? 0 : 12,
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
                      label={t("profile:change_password.repeat_password")}
                      style={{ marginBottom: isPasswordEqualError ? 0 : 12 }}
                      error={isPasswordEqualError}
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
                    {isPasswordEqualError ? (
                      <ErrorMessage>
                        {t("profile:change_password.repeat_password_wrong")}
                      </ErrorMessage>
                    ) : null}
                  </div>
                );
              }}
            />
            <SubmitButton
              type="submit"
              variant="contained"
              color="primary"
              disabled={!isValid || !isPasswordEqual}
            >
              {t("profile:change_password.save")}
            </SubmitButton>
          </Form>
        </FormContainer>
      </Box>
    </ResetPasswordContainer>
  );
};

export default React.memo(ResetPassword);
