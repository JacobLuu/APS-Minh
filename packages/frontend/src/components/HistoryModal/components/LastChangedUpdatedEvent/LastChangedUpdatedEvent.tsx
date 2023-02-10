import React from "react";
import { useTranslation } from "react-i18next";

import {
  TEXT_COLOR_BLUE,
  TEXT_COLOR_GREEN,
  TEXT_COLOR_RED,
} from "../../../../themes/colors";
import { Box, GridItem, HighLightText, SmallText } from "./styles";

import type { ActionInfo, CategoryLabel } from "../../../../types";

interface UpdatedEventProps {
  actionInfo: ActionInfo;
}

const LastChangedUpdatedEvent = (props: UpdatedEventProps) => {
  const {
    actionInfo: { category_score_updated, category_weightage_updated },
  } = props;
  const { t } = useTranslation();

  const renderHighLightCategoryText = (category_labels: CategoryLabel[]) => {
    const highlightCategoriesElement = category_labels.map(
      (category_label, index, category_labels) => {
        switch (category_label) {
          case "environmental":
            return (
              <HighLightText key={category_label} color={TEXT_COLOR_GREEN}>
                &nbsp;E
              </HighLightText>
            );
          case "social":
            return (
              <React.Fragment key={category_label}>
                <SmallText component="span">
                  {index === 1 && category_labels.length === 2
                    ? ` ${t("login:dashboard_last_changed_companies.and")}`
                    : ""}
                  {index === 1 && category_labels.length > 2 ? "," : ""}
                </SmallText>
                <HighLightText color={TEXT_COLOR_RED}>
                  &nbsp;S&nbsp;
                </HighLightText>
              </React.Fragment>
            );
          case "governance":
            return (
              <React.Fragment key={category_label}>
                <SmallText component="span">
                  {index >= 1 && category_labels.length >= 2
                    ? ` ${t("login:dashboard_last_changed_companies.and")}`
                    : ""}
                  {index === 1 && category_labels.length > 2 ? "," : ""}
                </SmallText>
                <HighLightText key={category_label} color={TEXT_COLOR_BLUE}>
                  &nbsp;G
                </HighLightText>
              </React.Fragment>
            );
          default:
            return "";
        }
      }
    );

    return highlightCategoriesElement;
  };
  return (
    <GridItem item xs={9} sm={10} md={11}>
      <GridItem item xs={12}>
        {category_weightage_updated && category_weightage_updated.length > 0 ? (
          <Box>
            {renderHighLightCategoryText(category_weightage_updated)}
            {category_weightage_updated.length > 1 ? (
              <SmallText component="span">
                {` ${t(
                  "login:dashboard_last_changed_companies.weightage_have_updated"
                )}`}
              </SmallText>
            ) : (
              <SmallText component="span">
                {` ${t(
                  "login:dashboard_last_changed_companies.weightage_has_updated"
                )}`}
              </SmallText>
            )}
          </Box>
        ) : (
          <Box>
            {renderHighLightCategoryText(category_score_updated)}
            <SmallText component="span">{` ${t(
              "login:dashboard_last_changed_companies.score_has_updated"
            )}`}</SmallText>
          </Box>
        )}
      </GridItem>
    </GridItem>
  );
};

export default React.memo(LastChangedUpdatedEvent);
