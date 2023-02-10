import React from "react";

import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import theme from "../../themes/themes";
import { COLOR_PRIMARY } from "../../themes/colors";
import Text from "./Text";

export default {
  title: "Text",
  component: Text,
  decorators: [
    (Story) => (
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Story />
        </ThemeProvider>
      </StylesProvider>
    ),
  ],
} as ComponentMeta<typeof Text>;

export const Template: ComponentStory<typeof Text> = (arg) => {
  return <Text {...arg} />;
};

export const Normal = Template.bind({});
export const Bold = Template.bind({});
export const Large = Template.bind({});
export const ExtraLarge = Template.bind({});
export const BoldLarge = Template.bind({});
export const Primary = Template.bind({});

Normal.args = {
  children:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute pariatur",
};

Bold.args = {
  $weight: "bold",
  children:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute pariatur",
};

Large.args = {
  $size: "lg",
  children:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute pariatur",
};

ExtraLarge.args = {
  $size: "xl",
  children:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute pariatur",
};

BoldLarge.args = {
  $size: "lg",
  $weight: "bold",
  children:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute pariatur",
};

Primary.args = {
  $color: COLOR_PRIMARY,
  children:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute pariatur",
};
