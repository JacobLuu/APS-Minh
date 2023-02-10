import React from "react";

import Box from "@material-ui/core/Box";
import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { COLOR_BORDER } from "../../themes/colors";
import theme from "../../themes/themes";
import Accordion from "./Accordion";

export default {
  title: "Accordion",
  component: Accordion,
  decorators: [
    (Story) => (
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Story />
        </ThemeProvider>
      </StylesProvider>
    ),
  ],
} as ComponentMeta<typeof Accordion>;

export const Template: ComponentStory<typeof Accordion> = (arg) => {
  return <Accordion {...arg} />;
};

export const Close = Template.bind({});
export const Open = Template.bind({});

Close.args = {
  label: "Carbon Footprint (Greenhouse Emissions)",
  score: 10,
  weightage: 50,
  isExpanded: false,
  handleExpand: () => {},
  headerJSX: (
    <Box borderColor={COLOR_BORDER} border="1px solid" width="100%">
      <p>this is the header</p>
    </Box>
  ),
  children: <p>this is a child component</p>,
};

Open.args = {
  label: "Carbon Footprint (Greenhouse Emissions)",
  score: 10,
  weightage: 50,
  isExpanded: true,
  handleExpand: () => {},
  headerJSX: (
    <Box borderColor={COLOR_BORDER} border="1px solid" width="100%">
      <p>this is the header</p>
    </Box>
  ),
  children: (
    <Box>
      <p>this is a child component</p>
    </Box>
  ),
};
