import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { x_mark } from "../../assets/images";
import { selectHistories } from "../../reducers/histories";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { History } from "../../types";
import { isNone } from "../../utils/formValidator";
import Text from "../Text";
import CreatedEvent from "./components/CreatedEvent";
import UpdatedEvent from "./components/UpdatedEvent";
import {
  CloseIcon,
  GridItem,
  HistoryDialog,
  HistoryDialogContent,
  HistoryDialogTitle,
  UserAvatar,
} from "./styles";

interface HistoryModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  getHistoryAction: any;
  id: number;
}

const HistoryModal = (props: HistoryModalProps) => {
  const { histories } = useAppSelector(selectHistories);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (props.open) {
      dispatch(props.getHistoryAction(props.id));
    }
  }, [props.open]);

  const getTextForChangedItem = useCallback(
    (changed_item: string, value: string): string => {
      if (isNone(value)) {
        value = t("company:edit_history.null");
      } else if (changed_item.includes("weightage")) {
        value += "%";
      } else if (!changed_item.includes("score")) {
        value = `"${value}"`;
      }

      return value;
    },
    []
  );

  const isCreatedEvent = useCallback((event: History): boolean => {
    const regex = /^created/;
    return regex.test(event.data_type);
  }, []);

  return (
    <HistoryDialog open={props.open} maxWidth={false}>
      <CloseIcon
        alt="close"
        src={x_mark}
        width={14}
        height={14}
        onClick={() => props.setOpen(false)}
      />
      <HistoryDialogTitle>
        <Text $size="md" $weight="bold">
          {t("company:edit_history.edit_history")}
        </Text>
      </HistoryDialogTitle>

      <HistoryDialogContent>
        {histories.map((event) => {
          if (isCreatedEvent(event)) {
            return (
              <React.Fragment key={event.id}>
                <GridItem item xs={3} sm={2} md={1}>
                  <UserAvatar
                    alt={`${event.member.first_name.slice(
                      0,
                      1
                    )}${event.member.last_name.slice(0, 1)}`}
                  >{`${event.member.first_name.slice(0, 1)}`}</UserAvatar>
                </GridItem>
                <CreatedEvent event={event} />
              </React.Fragment>
            );
          }
          return (
            <React.Fragment key={event.id}>
              <GridItem item xs={3} sm={2} md={1}>
                <UserAvatar
                  alt={`${event.member.first_name.slice(
                    0,
                    1
                  )}${event.member.last_name.slice(0, 1)}`}
                >{`${event.member.first_name.slice(
                  0,
                  1
                )}${event.member.last_name.slice(0, 1)}`}</UserAvatar>
              </GridItem>
              <UpdatedEvent
                event={event}
                getTextForChangedItem={getTextForChangedItem}
              />
            </React.Fragment>
          );
        })}
      </HistoryDialogContent>
    </HistoryDialog>
  );
};

export default React.memo(HistoryModal);
