import React from "react";
import Text from "../Text";
import { ToastContent, ToastIconBox, ToastMessageContainer } from "./styles";
import { COLOR_PRIMARY } from "../../themes/colors";

interface CustomToastContainerProps {
  Icon: JSX.Element;
  title: string;
  message: string;
  linkTitle?: string;
  handleClickLink?: () => void;
}

const CustomToastContainer = (props: CustomToastContainerProps) => {
  return (
    <ToastMessageContainer>
      <ToastIconBox>{props.Icon}</ToastIconBox>
      <ToastContent>
        <Text $size="md" $weight="bold" style={{ lineHeight: "20px" }}>
          {props.title}
        </Text>
        <Text $size="xs" style={{ lineHeight: "20px" }}>
          {props.message}
        </Text>
        {props.linkTitle && (
          <Text
            $size="lg"
            $color={COLOR_PRIMARY}
            $hasCursor
            onClick={props.handleClickLink}
          >
            {props.linkTitle}
          </Text>
        )}
      </ToastContent>
    </ToastMessageContainer>
  );
};

CustomToastContainer.defaultProps = {
  linkTitle: "",
  handleClickLink: () => {},
};

export default React.memo(CustomToastContainer);
