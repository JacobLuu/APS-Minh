import React, { ReactElement } from "react";

import { AccordionContainer } from "./styles";

export interface AccordionProps {
  isExpanded: boolean;
  handleExpand: () => void;
  headerJSX: ReactElement;
  children: ReactElement;
}

const Accordion = (props: AccordionProps) => {
  const { headerJSX, isExpanded, handleExpand, children } = props;

  return (
    <>
      <AccordionContainer onClick={handleExpand}>
        {headerJSX}
      </AccordionContainer>

      {isExpanded && children}
    </>
  );
};

export default Accordion;
