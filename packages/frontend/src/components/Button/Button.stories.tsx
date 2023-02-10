import React from "react";

import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import theme from "../../themes/themes";
import Button from "./Button";

export default {
  title: "Button",
  component: Button,
  decorators: [
    (Story) => (
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Story />
        </ThemeProvider>
      </StylesProvider>
    ),
  ],
} as ComponentMeta<typeof Button>;

export const Template: ComponentStory<typeof Button> = (arg) => {
  return <Button {...arg} />;
};

export const Confirm = Template.bind({});
export const Cancel = Template.bind({});
export const Disabled = Template.bind({});

Confirm.args = {
  $label: "Save",
  $category: "confirm",
};

Cancel.args = {
  $label: "Cancel",
  $category: "cancel",
};

Disabled.args = {
  $label: "Save",
  $category: "confirm",
  disabled: true,
};
