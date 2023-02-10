import styled from "styled-components";
import Tab, { TabProps } from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import {
  COLOR_PRIMARY,
  COLOR_TEXT_PRIMARY,
  WHITE,
  COLOR_BORDER,
  COLOR_BOX_SHADOW,
} from "../../themes/colors";
import { defaultFontFamily } from "../../themes/themes";

interface SettingsTabProps {
  $active: boolean;
}

export const StyledContainer = styled.div`
  font-family: ${defaultFontFamily};
  .container_panel {
    background-color: ${WHITE};
    margin-top: 20px;
    border-radius: 8px;
    padding-left: 33px;
    margin-bottom: 30px;
    box-shadow: ${COLOR_BOX_SHADOW};
    button.MuiTab-root {
      font-size: 14px;
      font-weight: 600;
    }
  }

  .column_index {
    width: 42px;
    text-align: left;
  }

  .column_head {
    width: 200px;
  }

  .column_body {
    text-align: center;
    width: 80px;
  }

  .content_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 0;
    color: ${COLOR_TEXT_PRIMARY};
    > div:first-of-type {
      font-weight: 600;
      font-size: 16px;
    }
    > div:nth-of-type(2) {
      background-color: #f3f7fa;
      padding: 16px;
      span {
        font-weight: 600;
        font-size: 14px;
        margin-left: 55px;
        &:first-of-type {
          margin-left: 0;
        }
      }
    }
    > div:nth-of-type(3) {
      font-weight: 400;
      font-size: 14px;

      .MuiInputBase-input {
        color: ${COLOR_TEXT_PRIMARY};
      }

      span {
        margin-right: 20px;
      }
    }
  }

  table.MuiTable-root {
    table-layout: fixed;
    overflow-x: auto;
    th {
      border: none;
    }
  }

  .MuiTabs-indicator {
    height: 2px;
    background-color: ${COLOR_PRIMARY};
  }

  .MuiTypography-h5 {
    font-size: 16px;
    padding-left: 14px;
    font-weight: 600;
    color: ${COLOR_TEXT_PRIMARY};
  }

  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: ${COLOR_BORDER};
  }

  .metric_label {
    border-right: 1px solid ${COLOR_BORDER};
    color: ${COLOR_TEXT_PRIMARY};
  }

  .MuiTab-root {
    text-transform: none;
  }

  .wrap_content {
    overflow-x: auto;
  }

  .content_header {
    padding-bottom: 14px;
    .MuiSelect-outlined.MuiSelect-outlined {
      padding: 15px 82px 15px 24px;
      width: 120px;
    }
  }

  .group_btn_decision {
    text-align: right;
    margin-top: 32px;
    button {
      width: 92px;
      height: 44px;
      &.MuiButton-outlined {
        border: 1px solid ${COLOR_PRIMARY};
        color: ${COLOR_PRIMARY};
      }
      &.MuiButton-contained {
        margin-left: 12px;
        background-color: ${COLOR_PRIMARY};
        color: ${WHITE};
      }
    }
  }

  .hidden {
    visibility: hidden;
  }

  .MuiOutlinedInput-root.select_weight {
    height: 40px;
    width: 50%;
    .MuiInputBase-input {
      color: ${COLOR_TEXT_PRIMARY};
    }
  }

  .wrap_child_table {
    border: 1px solid ${COLOR_BORDER};
    border-radius: 8px;
    margin-top: 10px;
    padding: 16px;
    box-sizing: content-box;
    color: ${COLOR_TEXT_PRIMARY};

    &:first-of-type {
      margin-top: 0;
      border: none;
      padding-top: 0;
      padding-bottom: 0;
      table.MuiTable-root td {
        font-weight: 600;
        font-size: 14px;
      }
    }
  }

  .child_table_header,
  tbody tr:last-child td {
    border-bottom: none;
  }

  .PrivateTabIndicator-colorSecondary-8 {
    background-color: ${COLOR_PRIMARY};
  }

  .txt_framework_name input.MuiInput-input {
    font-size: 19px;
    font-weight: 600;
    color: ${COLOR_TEXT_PRIMARY};
  }
  .txt_desc {
    margin-top: 8px;
    font-size: 14px;
    font-weight: 400;
    color: ${COLOR_TEXT_PRIMARY};
  }

  .MuiTab-textColorInherit {
    opacity: 1;
  }

  .PrivateNotchedOutline-legendNotched-4 {
    display: none;
  }

  button.MuiTab-root {
    font-size: 16px;
    font-weight: 600;
  }

  button .MuiSvgIcon-root {
    color: ${COLOR_PRIMARY};
  }

  .MuiInput-underline.Mui-disabled:before {
    display: none;
  }

  .MuiTableCell-body {
    color: ${COLOR_TEXT_PRIMARY};
  }

  .MuiTableCell-body > p {
    color: ${COLOR_TEXT_PRIMARY};
  }
`;

export const TabContainer = styled(Tabs)`
  display: flex;
  align-items: center;
  background-color: ${WHITE};
  width: 220px;
  height: 55px;
  border-radius: 4px;
  margin: 10px 0px;
  box-shadow: ${COLOR_BOX_SHADOW};
  .MuiTabs-flexContainer {
    justify-content: center;
  }
  .MuiTab-root {
    min-height: 35px;
    width: 103px;
    @media (min-width: 600px) {
      min-width: 103px;
    }
  }
`;
export const TabContainerESG = styled(Tabs)`
  display: flex;
  align-items: center;
  width: 310px;
  height: 55px;
  border-radius: 4px;
  .MuiTabs-flexContainer {
    justify-content: center;
  }
  .MuiTab-root {
    min-height: 35px;
    width: 103px;
    @media (min-width: 600px) {
      min-width: 103px;
    }
  }
`;

export const SettingsTab = styled(Tab)<SettingsTabProps & TabProps>`
  background-color: ${(props) => (props.$active ? COLOR_PRIMARY : WHITE)};
  color: ${(props) => (props.$active ? WHITE : COLOR_TEXT_PRIMARY)};
  font-size: 14px;
  font-weight: 600;
  border-radius: 4px;
  width: max-content;
  height: 35px;
  text-transform: capitalize;
  &:focus {
    outline: none;
  }
  .MuiTab-wrapper {
    min-width: 100px;
    color: inherit;
  }
`;
