import React from "react";
import { Link } from "react-router-dom";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

import Text from "../Text";
import { Container, StyledBreadcrumbs } from "./styles";
import { COLOR_PRIMARY } from "../../themes/colors";

type BreadcrumbsHeaderItem = {
  path?: string;
  label: string;
};

type BreadcrumbsHeaderProp = {
  items: Array<BreadcrumbsHeaderItem>;
};

const BreadcrumbsHeader = (props: BreadcrumbsHeaderProp) => {
  return (
    <Container style={{ paddingTop: "10px" }}>
      <StyledBreadcrumbs
        separator={<NavigateNextIcon htmlColor="#212121" />}
        aria-label="breadcrumb"
      >
        {props.items.map((item) => {
          if (!item.label) {
            return;
          }
          if (item.path) {
            return (
              <Link key={item.label} to={item.path}>
                <Text
                  $size="md"
                  $weight="bold"
                  $color={COLOR_PRIMARY}
                  style={{ textDecorationLine: "none" }}
                >
                  {item.label}
                </Text>
              </Link>
            );
          }
          return (
            <Text $size="md" key={item.label}>
              {item.label}
            </Text>
          );
        })}
      </StyledBreadcrumbs>
    </Container>
  );
};

export default React.memo(BreadcrumbsHeader);
