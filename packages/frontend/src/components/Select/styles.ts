import styled from "styled-components";
import Select from "@material-ui/core/Select";
import { COLOR_TEXT_PRIMARY } from "../../themes/colors";

export const SelectPrimary = styled(Select)`
  min-width: 100px;
  .MuiSelect-icon {
    color: ${COLOR_TEXT_PRIMARY};
  }
`;
