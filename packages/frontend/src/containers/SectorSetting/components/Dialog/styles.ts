import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import { COLOR_BORDER, COLOR_TEXT_PRIMARY } from "../../../../themes/colors";

export const DialogContainer = styled(Dialog)`
  font-style: normal;
  .MuiDialog-paperWidthSm {
    padding: 30px 35px 15px;
    max-width: 535px;
    height: 235px;
  }

  .MuiTypography-h6 {
    color: ${COLOR_TEXT_PRIMARY};
    font-weight: 600;
    font-size: 16px;
    line-height: 28px;
  }

  .MuiDialogTitle-root {
    padding: 0;
  }

  .MuiDialogContent-root {
    padding: 0;
  }

  .close-icon {
    position: absolute;
    top: 25px;
    right: 25px;
    border-radius: 50%;
    &:hover {
      scale: 1.3;
      transition: 0.3s;
      background-color: ${COLOR_BORDER};
    }
  }

  .content {
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: flex-start;

    .field-name-container {
      width: 80%;
      font-size: 14px;
      align-self: flex-start;
      text-align: left;
    }
  }
  .action {
    margin-top: 20px;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;

    button {
      width: 83px;
      height: 45px;
      border-radius: 4px;
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      text-transform: capitalize;
      margin-right: 15px;
    }
  }
`;
