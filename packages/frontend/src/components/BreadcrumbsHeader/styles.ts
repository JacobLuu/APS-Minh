import styled from "styled-components";

import { Breadcrumbs } from "@material-ui/core";

import { COLOR_PRIMARY } from "../../themes/colors";

export const Container = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
`;

export const StyledBreadcrumbs = styled(Breadcrumbs)`
  .MuiSvgIcon-root {
    color: ${COLOR_PRIMARY};
  }

  .MuiBreadcrumbs-separator {
    margin: 0;
  }
` as typeof Breadcrumbs;
