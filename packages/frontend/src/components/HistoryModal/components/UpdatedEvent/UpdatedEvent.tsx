import React from "react";
import { useTranslation } from "react-i18next";

import { useLabelTranslation } from "../../../../utils/customHooks";
import { getDateTimeFromUnixTimestamp } from "../../../../utils/date";
import { BoldText, GridItem, SmallText, Text } from "./styles";

import type { History } from "../../../../types";

interface UpdatedEventProps {
  event: History;
  getTextForChangedItem: (changed_item: string, before_value: string) => string;
}

const UpdatedEvent = (props: UpdatedEventProps) => {
  const { event } = props;
  const { t } = useTranslation();
  const { translateCategoryLabel } = useLabelTranslation();

  const renderChangedItemText = (changed_item): string => {
    if (changed_item.includes("weightage")) {
      return t("company:edit_history.weightage");
    }
    if (changed_item.includes("score")) {
      return t("company:edit_history.score");
    }
    if (changed_item.trim().includes("a Score")) {
      return t("company:edit_history.a_score");
    }
    if (changed_item.includes("a Source")) {
      return t("company:edit_history.a_source");
    }
    if (changed_item.includes("a new answer text:")) {
      return t("company:edit_history.new_answer_text");
    }
    if (changed_item.includes("a new Disclosure:")) {
      return t("company:edit_history.new_disclosure");
    }
    return changed_item;
  };

  return (
    <GridItem item xs={9} sm={10} md={11} style={{ marginBottom: 24 }}>
      <GridItem item xs={12}>
        <BoldText component="span">{event.member.first_name}</BoldText>
        <Text component="span">{` ${t("company:edit_history.changed")} `}</Text>
        <Text component="span">{`${renderChangedItemText(
          event.changed_item
        )}`}</Text>
        {event.label ? (
          <React.Fragment>
            <Text component="span">{` ${t("company:edit_history.of")} `}</Text>
            <BoldText component="span">{`${translateCategoryLabel(
              event.label.toLowerCase()
            )}`}</BoldText>
          </React.Fragment>
        ) : null}{" "}
        <Text component="span">{` ${t("company:edit_history.from")} `}</Text>
        <BoldText component="span">{`${props.getTextForChangedItem(
          event.changed_item,
          event.before_value
        )} `}</BoldText>
        <Text component="span">{` ${t("company:edit_history.to")} `}</Text>
        <BoldText component="span">{` ${props.getTextForChangedItem(
          event.changed_item,
          event.after_value
        )}.`}</BoldText>
      </GridItem>
      <GridItem item xs={12} style={{ marginBottom: 12 }}>
        <Text style={{ fontSize: 14 }}>{`${t(
          "company:edit_history.reasons_for_change"
        )} ${event.change_reason}`}</Text>
      </GridItem>
      <GridItem item xs={12}>
        <SmallText>{`${t(
          "company:edit_history.last_updated_on"
        )} ${getDateTimeFromUnixTimestamp(event.created_at)}`}</SmallText>
      </GridItem>
    </GridItem>
  );
};

export default React.memo(UpdatedEvent);
