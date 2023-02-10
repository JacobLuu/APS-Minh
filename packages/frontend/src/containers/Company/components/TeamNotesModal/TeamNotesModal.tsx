import moment from "moment";
import React, { useEffect, useState } from "react";
import { Control, Controller, useForm, UseFormSetValue } from "react-hook-form";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";

import { t } from "i18next";
import Button from "../../../../components/Button";
import Modal from "../../../../components/Modal";
import Text from "../../../../components/Text";
import { isToday } from "../../../../utils/date";
import {
  getTeamNotesRequested,
  updateTeamNotesRequested,
  selectTeamNotes,
} from "../../../../reducers/team_notes";
import { selectUser } from "../../../../reducers/user";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  COLOR_BORDER,
  COLOR_ENVIRONMENT,
  COLOR_PRIMARY,
  COLOR_TEXT_SECONDARY,
  STATE_OFF,
} from "../../../../themes/colors";
import { MAX_500_CHARACTERS_VALIDATION_RULES } from "../../../../utils/formValidator";
import { capitalizeText } from "../../../../utils/miscellaneous";
import type { Category } from "../../../../types";

const Header = () => {
  const teamNotes = useAppSelector(selectTeamNotes);
  return (
    <Box display="flex" flexDirection="column">
      <Box px={3} pt={2} pb={1}>
        <Text $size="lg" $weight="bold">
          Team Notes
        </Text>
      </Box>
      <Box px={3}>
        <Text $weight="bold" $color={COLOR_TEXT_SECONDARY}>
          {`${teamNotes.total_count} Notes`}
        </Text>
      </Box>
      <Box
        borderBottom={`1px solid ${COLOR_BORDER}`}
        width="fill-available"
        mx={3}
        mt={1}
        alignSelf="center"
      />
    </Box>
  );
};

interface BodyProps {
  control: Control<Form>;
  category: Category;
  isEditing: boolean;
  setIsEditing: (state: boolean) => void;
  defaultTeamNoteContent: string;
  setValue: UseFormSetValue<Form>;
}

const Body = (props: BodyProps) => {
  const {
    control,
    category,
    isEditing,
    setIsEditing,
    defaultTeamNoteContent,
    setValue,
  } = props;
  const dispatch = useAppDispatch();
  const teamNotes = useAppSelector(selectTeamNotes);
  const user = useAppSelector(selectUser);
  const categoryScoreId = category.category_score.id;

  useEffect(() => {
    if (categoryScoreId) {
      dispatch(
        getTeamNotesRequested({
          category_score_id: categoryScoreId,
        })
      );
    }
  }, [categoryScoreId, teamNotes.requestState]);

  const handleClose = () => {
    setIsEditing(false);
  };

  return (
    <Box overflow="hidden">
      <Box display="flex">
        <Text $weight="bold">Category:&nbsp;&nbsp;&nbsp;&nbsp;</Text>
        <Text $weight="bold" $color={COLOR_ENVIRONMENT}>
          {capitalizeText(category.category_label)}
        </Text>
      </Box>

      <Box maxHeight={350} overflow="auto" pr={2}>
        {teamNotes.list.map((team_note) => {
          return (
            <Box key={team_note.member.id} mt={2}>
              <Box display="flex" justifyContent="space-between">
                <Box display="flex" mb={1}>
                  <Box mr={2}>
                    <Text $weight="bold">
                      {team_note.member.first_name}
                      &nbsp;
                      {team_note.member.last_name}
                    </Text>
                  </Box>

                  <Box
                    style={{
                      cursor: user.id === team_note.member.id ? "pointer" : "",
                    }}
                    onClick={() => {
                      if (user.id === team_note.member.id) setIsEditing(true);
                      setValue("answer", defaultTeamNoteContent);
                    }}
                  >
                    {user.id === team_note.member.id && (
                      <Text
                        $weight="bold"
                        $color={
                          isEditing ? COLOR_TEXT_SECONDARY : COLOR_PRIMARY
                        }
                      >
                        Edit
                      </Text>
                    )}
                  </Box>
                </Box>

                <Box>
                  <Text $color={COLOR_TEXT_SECONDARY}>
                    {isToday(team_note.updated_at)
                      ? `${t("login:login.today")}, ${moment
                          .unix(team_note.updated_at)
                          .format("HH:mm")}`
                      : moment
                          .unix(team_note.updated_at)
                          .format("DD/MM/YYYY HH:mm")}
                  </Text>
                </Box>
              </Box>

              <Box>
                {isEditing && user.id === team_note.member.id ? (
                  <Controller
                    name="answer"
                    control={control}
                    rules={MAX_500_CHARACTERS_VALIDATION_RULES}
                    render={({ field, fieldState }) => {
                      return (
                        <Box mt={0.5}>
                          <TextField
                            value={field.value}
                            onChange={(e) => {
                              field.onChange(e.target.value);
                            }}
                            multiline
                            inputRef={field.ref}
                            name={field.name}
                            id={field.name}
                            variant="outlined"
                            fullWidth
                            minRows={2}
                            placeholder="Enter your note here"
                            error={fieldState?.error?.message?.length > 0}
                          />
                          {fieldState.error && (
                            <Text $color={STATE_OFF} $weight="bold" $size="sm">
                              {fieldState.error.message}
                            </Text>
                          )}
                        </Box>
                      );
                    }}
                  />
                ) : (
                  <Text>{team_note.content}</Text>
                )}
              </Box>

              {isEditing && user.id === team_note.member.id && (
                <Box display="flex" justifyContent="flex-end" mt={2}>
                  <Box mr={1.5}>
                    <Button
                      onClick={handleClose}
                      $label="Cancel"
                      $category="cancel"
                    />
                  </Box>
                  <Button type="submit" $label="Save" $category="confirm" />
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export interface Form {
  answer: string;
}

interface TeamNotesModalProps {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  category: Category;
}

const TeamNotesModal = (props: TeamNotesModalProps) => {
  const { isOpen, setIsOpen, category } = props;
  const [isEditing, setIsEditing] = useState(false);
  const teamNotes = useAppSelector(selectTeamNotes);
  const user = useAppSelector(selectUser);
  const currentUserTeamNote = teamNotes.list.find(
    (teamNote) => teamNote.member.id === user.id
  );
  const dispatch = useAppDispatch();

  const defaultTeamNoteContent = React.useMemo(() => {
    return currentUserTeamNote?.content;
  }, [currentUserTeamNote?.content]);

  const { control, handleSubmit, setValue } = useForm<Form>({
    defaultValues: {
      answer: defaultTeamNoteContent,
    },
  });

  const handleClose = () => {
    setIsOpen(false);
  };

  const save = (data: Form) => {
    setIsEditing(false);
    dispatch(
      updateTeamNotesRequested({
        id: currentUserTeamNote?.id,
        content: data.answer,
      })
    );
    setIsEditing(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      handleSubmit={handleSubmit(save)}
      handleClose={handleClose}
      headerJSX={<Header />}
      bodyJSX={
        <Body
          control={control}
          category={category}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          defaultTeamNoteContent={defaultTeamNoteContent}
          setValue={setValue}
        />
      }
    />
  );
};

export default React.memo(TeamNotesModal);
