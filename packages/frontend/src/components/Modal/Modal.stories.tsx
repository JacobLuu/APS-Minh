import React from "react";

import Box from "@material-ui/core/Box";
import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { COLOR_BORDER, COLOR_TEXT_SECONDARY } from "../../themes/colors";
import theme from "../../themes/themes";
import Button from "../Button";
import Text from "../Text";
import Modal from "./Modal";

export default {
  title: "Modal",
  component: Modal,
  decorators: [
    (Story) => (
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Story />
        </ThemeProvider>
      </StylesProvider>
    ),
  ],
} as ComponentMeta<typeof Modal>;

export const Template: ComponentStory<typeof Modal> = (arg) => {
  return <Modal {...arg} />;
};

export const Default = Template.bind({});
export const BasicForm = Template.bind({});

Default.args = {
  isOpen: true,
  handleSubmit: () => {},
  handleClose: () => {},
  headerJSX: (
    <Box>
      <p>this is the header</p>
    </Box>
  ),
  bodyJSX: (
    <Box>
      <p>this is the body</p>
    </Box>
  ),
  actionJSX: (
    <Box>
      <p>this is the action</p>
    </Box>
  ),
};

BasicForm.args = {
  isOpen: true,
  handleSubmit: () => {},
  handleClose: () => {},
  headerJSX: (
    <Box display="flex" flexDirection="column">
      <Box px={3} pt={2} pb={1}>
        <Text $size="lg" $weight="bold">
          Team Notes
        </Text>
      </Box>
      <Box px={3}>
        <Text $weight="bold" $color={COLOR_TEXT_SECONDARY}>
          5 Notes
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
  ),
  bodyJSX: (
    <Box>
      <p>this is the body</p>
    </Box>
  ),
  actionJSX: (
    <>
      <Button $label="Cancel" $category="cancel" />
      <Button type="submit" $label="Save" $category="confirm" />
    </>
  ),
};
