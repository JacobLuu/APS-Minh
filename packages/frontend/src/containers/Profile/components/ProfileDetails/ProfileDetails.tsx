import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Text from "../../../../components/Text";
import {
  ProfileDetailsContainer,
  EditProfileIcon,
  Input,
  ColoredLink,
  CancelButton,
  SaveButton,
  ErrorMessageContainer,
} from "./styles";
import { PROFILE_NAME_VALIDATION_RULES } from "../../../../utils/formValidator";
import { useAppSelector, useAppDispatch } from "../../../../store/hooks";
import { selectUser, updateUserRequested } from "../../../../reducers/user";
import { UpdateUserForm } from "../../../../types";
import { PROFILE_UPDATE_PASSWORD_PATH } from "../../../../constants/paths";
import {
  ProfileFirstNameErrorMessage,
  ProfileLastNameErrorMessage,
  RequiredErrorMessage,
} from "../../../../components/ErrorMessage";
import { TEXT_COLOR_GREY } from "../../../../themes/colors";

const ProfileDetails = () => {
  const [editMode, setEditMode] = useState(false);
  const user = useAppSelector(selectUser);
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    formState: { isValid, errors },
  } = useForm<UpdateUserForm>({
    defaultValues: {
      first_name: "",
      last_name: "",
    },
    mode: "onChange",
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    setValue("first_name", user.first_name);
    setValue("last_name", user.last_name);
  }, [user]);

  const cancelEdit = () => {
    setEditMode(false);
    setValue("first_name", user.first_name);
    setValue("last_name", user.last_name);
    trigger();
  };

  const update = (data) => {
    data.first_name = data.first_name.trim();
    data.last_name = data.last_name.trim();
    dispatch(updateUserRequested(data));
    setEditMode(false);
  };
  const setTextValue = (data: { field: any; value: string }) => {
    let dataValue = data.value.trim();
    if (dataValue.length !== 0) {
      dataValue = data.value;
    }
    setValue(data.field, dataValue);
    trigger();
  };

  return (
    <ProfileDetailsContainer maxWidth={false}>
      <form onSubmit={handleSubmit(update)}>
        <Grid container>
          <Grid item xs={12} style={{ marginBottom: 6 }}>
            {editMode && (
              <Text
                $size="lg"
                $weight="bold"
                $color={TEXT_COLOR_GREY}
                style={{ marginBottom: 12 }}
              >
                {t("profile:my_details_edit.my_details")}
              </Text>
            )}
          </Grid>

          <Grid item xs={6}>
            {editMode ? (
              <>
                <>
                  <Controller
                    name="first_name"
                    rules={PROFILE_NAME_VALIDATION_RULES}
                    control={control}
                    render={({ field, fieldState }) => {
                      return (
                        <Input
                          onChange={(e) =>
                            setTextValue({
                              field: field.name,
                              value: e.target.value,
                            })
                          }
                          value={field.value}
                          type="text"
                          inputRef={field.ref}
                          name={field.name}
                          id={field.name}
                          label={t("profile:my_details_edit.first_name")}
                          variant="outlined"
                          size="small"
                          error={fieldState.invalid}
                        />
                      );
                    }}
                  />
                </>
                <ErrorMessageContainer>
                  {errors.first_name &&
                    errors.first_name.type === "required" && (
                      <RequiredErrorMessage />
                    )}
                  {errors.first_name &&
                    errors.first_name.type === "maxLength" && (
                      <ProfileFirstNameErrorMessage />
                    )}
                </ErrorMessageContainer>
              </>
            ) : (
              <>
                <Text $color={TEXT_COLOR_GREY}>
                  {t("profile:my_details.first_name")}
                </Text>
                <Text $size="md" $color={TEXT_COLOR_GREY}>
                  {user.first_name}
                </Text>
              </>
            )}
          </Grid>

          <Grid item xs={6}>
            {editMode ? (
              <>
                <Controller
                  name="first_name"
                  rules={PROFILE_NAME_VALIDATION_RULES}
                  control={control}
                  render={({ field, fieldState }) => {
                    return (
                      <Input
                        onChange={(e) =>
                          setTextValue({
                            field: field.name,
                            value: e.target.value,
                          })
                        }
                        value={field.value}
                        type="text"
                        inputRef={field.ref}
                        name={field.name}
                        id={field.name}
                        label={t("profile:my_details_edit.first_name")}
                        variant="outlined"
                        size="small"
                        error={fieldState.invalid}
                      />
                    );
                  }}
                />
              </>
            ) : (
              <>
                <Text $color={TEXT_COLOR_GREY}>
                  {t("profile:my_details.last_name")}
                </Text>
                <Text $size="md" $color={TEXT_COLOR_GREY}>
                  {user.last_name}
                </Text>
              </>
            )}
          </Grid>

          <Grid item xs={6} style={{ marginTop: 30 }}>
            <Grid item xs={12}>
              <Text $color={TEXT_COLOR_GREY}>
                {t("profile:my_details.email_address")}
              </Text>
            </Grid>
            <Grid item xs={12}>
              <Text $size="md" $color={TEXT_COLOR_GREY}>
                {user.email_address}
              </Text>
            </Grid>
          </Grid>

          <Grid item xs={6} />

          {editMode ? (
            <Grid container justifyContent="flex-end" style={{ marginTop: 12 }}>
              <CancelButton onClick={cancelEdit} color="primary" type="button">
                {t("profile:my_details_edit.cancel")}
              </CancelButton>
              <SaveButton
                disabled={!isValid}
                color="primary"
                variant="contained"
                type="submit"
              >
                {t("profile:my_details_edit.save")}
              </SaveButton>
            </Grid>
          ) : (
            <Grid item xs={6} style={{ marginTop: 36 }}>
              <ColoredLink to={`${PROFILE_UPDATE_PASSWORD_PATH}`}>
                {t("profile:my_details.change_password")}
              </ColoredLink>
            </Grid>
          )}
        </Grid>

        {!editMode && <EditProfileIcon onClick={() => setEditMode(true)} />}
      </form>
    </ProfileDetailsContainer>
  );
};

export default React.memo(ProfileDetails);
