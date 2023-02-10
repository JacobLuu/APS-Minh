import React from "react";

import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import theme from "../../themes/themes";
import ChipStatus from "./ChipStatus";

export default {
  title: "ChipStatus",
  component: ChipStatus,
  decorators: [
    (Story) => (
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Story />
        </ThemeProvider>
      </StylesProvider>
    ),
  ],
} as ComponentMeta<typeof ChipStatus>;

export const Template: ComponentStory<typeof ChipStatus> = (arg) => {
  return <ChipStatus {...arg} />;
};

export const Active = Template.bind({});
export const Inactive = Template.bind({});

Active.args = {
  children: "active",
};

Inactive.args = {
  children: "inactive",
};
