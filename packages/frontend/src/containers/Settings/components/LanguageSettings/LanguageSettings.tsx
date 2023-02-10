import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Box, Container, Typography } from "@material-ui/core";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";

import { Language as LanguageEnum } from "../../../../constants/enums";
import { selectUser, updateLanguageRequested } from "../../../../reducers/user";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { COLOR_BOX_SHADOW } from "../../../../themes/colors";
import { Language } from "../../../../types";
import { changeMomentLocale } from "../../../../utils/date";
import {
  LanguageCheckbox,
  LanguageInputLabel,
  SaveButton,
  SettingPaper,
} from "./styles";

const LanguageSettings = () => {
  const { language } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { isDirty },
  } = useForm<Language>({
    defaultValues: {
      language: LanguageEnum.english,
    },
  });

  const languageField = watch("language");

  useEffect(() => {
    reset({ language });
  }, [language]);

  const submit = () => {
    dispatch(
      updateLanguageRequested({
        language: languageField,
      })
    );
    changeMomentLocale(languageField);
  };

  return (
    <Container maxWidth={false} style={{ height: "100%", padding: "0px" }}>
      <SettingPaper
        style={{
          height: "100%",
          padding: "30px",
          boxShadow: `${COLOR_BOX_SHADOW}`,
        }}
      >
        <form onSubmit={handleSubmit(submit)}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography style={{ fontWeight: 600, marginBottom: "12px" }}>
              {t("settings:language.select_your_default_language")}
            </Typography>
            <SaveButton
              disabled={!isDirty}
              color="primary"
              variant="contained"
              type="submit"
            >
              {t("settings:language.save")}
            </SaveButton>
          </Box>

          <Box display="flex" alignItems="center">
            <Controller
              name="language"
              control={control}
              render={({ field }) => {
                return (
                  <LanguageCheckbox
                    checked={languageField === LanguageEnum.english}
                    onChange={() => field.onChange(LanguageEnum.english)}
                    color="primary"
                    id={LanguageEnum.english}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<RadioButtonCheckedIcon />}
                  />
                );
              }}
            />
            <LanguageInputLabel
              style={
                languageField === LanguageEnum.english
                  ? { fontWeight: "bold" }
                  : { fontWeight: "normal" }
              }
              htmlFor={LanguageEnum.english}
            >
              English
            </LanguageInputLabel>
          </Box>

          <Box display="flex" alignItems="center">
            <Controller
              name="language"
              control={control}
              render={({ field }) => {
                return (
                  <LanguageCheckbox
                    checked={languageField === LanguageEnum.chinese}
                    onChange={() => field.onChange(LanguageEnum.chinese)}
                    color="primary"
                    id={LanguageEnum.chinese}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<RadioButtonCheckedIcon />}
                  />
                );
              }}
            />
            <LanguageInputLabel
              style={
                languageField === LanguageEnum.chinese
                  ? { fontWeight: "bold" }
                  : { fontWeight: "normal" }
              }
              htmlFor={LanguageEnum.chinese}
            >
              简体中文
            </LanguageInputLabel>
          </Box>
        </form>
      </SettingPaper>
    </Container>
  );
};

export default React.memo(LanguageSettings);
