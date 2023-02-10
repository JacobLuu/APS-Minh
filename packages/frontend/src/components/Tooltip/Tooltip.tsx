import React from "react";

import { Container, TooltipBox } from "./styles";

type Props = {
  title: string;
  placement: string;
  children: React.ReactNode;
};

const Tooltip = (props: Props) => {
  return (
    <Container>
      <TooltipBox title={props.title} placement={props.placement}>
        {props.children}
      </TooltipBox>
    </Container>
  );
};

export default Tooltip;
