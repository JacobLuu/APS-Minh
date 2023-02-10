import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import SelectPrimary from "./SelectPrimary";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Select/ Select Primary",
  component: SelectPrimary,
  args: {
    value: "1",
    options: ["1", "2", "3", "4", "5", "6"],
  },
} as ComponentMeta<typeof SelectPrimary>;

export const WithArrayOfString: ComponentStory<typeof SelectPrimary> = (
  arg
) => {
  const [value, setValue] = React.useState(arg.value);
  return (
    <SelectPrimary
      {...arg}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const WithArrayOfObject = WithArrayOfString.bind({});

WithArrayOfObject.args = {
  value: "1",
  options: [
    {
      id: "1",
      value: "Option 1",
    },
    {
      id: "2",
      value: "Option 2",
    },
    {
      id: "3",
      value: "Option 3",
    },
    {
      id: "4",
      value: "Option 4",
    },
    {
      id: "5",
      value: "Option 5",
    },
    {
      id: "6",
      value: "Option 6",
    },
  ],
};
