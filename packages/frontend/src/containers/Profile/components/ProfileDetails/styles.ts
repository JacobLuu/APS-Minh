import styled from "styled-components";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import { Container, TextField, Button } from "@material-ui/core";
import { COLOR_PRIMARY, COLOR_BOX_SHADOW } from "../../../../themes/colors";

export const ProfileDetailsContainer = styled(Container)`
  position: relative;
  width: 480px;
  height: 288px;
  padding: 24px;
  margin-left: 0;
  background-color: white;
  box-shadow: ${COLOR_BOX_SHADOW};
`;

export const EditProfileIcon = styled(EditIcon)`
  position: absolute;
  top: 30px;
  right: 30px;
  width: 19px;
  height: 19px;
  margin: 0 0 2px 4px;
  color: ${COLOR_PRIMARY};
  cursor: pointer;
`;

export const Input = styled(TextField)`
  input {
    padding: 16px 12px;
    ::-ms-reveal {
      display: none;
    }
  }
  .MuiInputLabel-outlined.MuiInputLabel-marginDense {
    transform: translate(14px, 18px) scale(1);
  }

  .MuiInputLabel-outlined.MuiInputLabel-shrink {
    transform: translate(14px, -6px) scale(0.75);
  }
`;

export const ColoredLink = styled(Link)`
  color: ${COLOR_PRIMARY};
`;

export const CancelButton = styled(Button)`
  font-weight: 700;
  font-size: 16px;
  border-radius: 20px;
  margin-right: 16px;
`;

export const SaveButton = styled(Button)`
  font-size: 16px;
  font-weight: 600;
  width: 84px;
  border-radius: 20px;
  text-transform: capitalize;
`;

export const ErrorMessageContainer = styled.div`
  margin-left: 10px;
`;
