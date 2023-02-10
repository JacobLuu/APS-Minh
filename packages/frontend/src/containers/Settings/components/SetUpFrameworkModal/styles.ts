import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import {
  COLOR_BORDER,
  ERROR_COLOR,
  COLOR_PRIMARY,
  COLOR_TEXT_PRIMARY,
} from "../../../../themes/colors";

export const DialogContainer = styled(Dialog)`
  font-family: "Source Sans Pro";
  font-style: normal;
  .MuiDialog-paperWidthSm {
    padding: 45px 50px 0;
    max-width: 717px;
    min-height: 640px;
  }

  .MuiTypography-h6 {
    color: ${COLOR_TEXT_PRIMARY};
    font-weight: 600;
    font-size: 24px;
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

  .action {
    margin-top: 35px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .input-name {
      outline: none;
      border: 1px solid ${COLOR_BORDER};
      &:focus {
        outline: none;
        box-shadow: 0px 0px 2px ${COLOR_PRIMARY};
        border: 2px solid ${COLOR_PRIMARY};
      }
    }

    .error {
      outline: none;
      border: 2px solid ${ERROR_COLOR};
      &:focus {
        outline: none;
        box-shadow: 0px 0px 2px ${ERROR_COLOR};
        border: 2px solid ${ERROR_COLOR};
      }
    }

    .field-name-container {
      width: 100%;
      height: 95px;
    }

    .field-description-container {
      width: 100%;
      height: 140px;
    }

    .form-label {
      font-weight: 400;
      font-size: 16px;
      line-height: 16px;
      color: ${COLOR_TEXT_PRIMARY};
      text-align: left;
      margin-bottom: 10px;
      width: 100%;
      span {
        font-weight: 700;
        color: ${COLOR_PRIMARY};
        text-decoration: underline;
        cursor: pointer;
      }
    }

    .browsing-button {
      height: 35px;
      width: 135px;
      border: 2px solid ${COLOR_PRIMARY};
      border-radius: 5px;
      font-weight: 700;
      font-size: 12px;
      line-height: 20px;
      letter-spacing: 1.5px;
      align-self: flex-start;
      margin: 10px 0 15px;
    }

    .upload-wrapper {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      margin-top: 5px;
      .upload-detail {
        width: 75%;
        margin-left: 15px;
      }
      div > p {
        font-size: 16px;
        font-weight: 400;
        &:nth-child(even) {
          margin-bottom: 5px;
          font-size: 14px;
          font-weight: 600;
        }
      }
    }

    button {
      width: 105px;
      height: 44px;
      border-radius: 4px;
      font-weight: 600;
      font-size: 18px;
      line-height: 20px;
      text-transform: capitalize;
      margin-top: 40px;
    }
  }
`;

export const FrameworkNameField = styled.input`
  font-family: "Source Sans Pro";
  font-style: normal;
  height: 38px;
  border-radius: 5px;
  width: 100%;
  padding-left: 10px;
`;

export const DescriptionField = styled.textarea`
  font-family: "Source Sans Pro";
  font-style: normal;
  border-color: lightgrey;
  width: 100%;
  height: 80px;
  border: 1px solid ${COLOR_BORDER};
  border-radius: 5px;
  margin-bottom: -5px;
  padding: 10px;
  outline: none;
  &:focus {
    outline: none;
    box-shadow: 0px 0px 2px ${COLOR_PRIMARY};
    border: 2px solid ${COLOR_PRIMARY};
  }
`;
