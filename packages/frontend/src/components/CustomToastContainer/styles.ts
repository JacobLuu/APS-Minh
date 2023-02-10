import styled from "styled-components";

import { COLOR_PRIMARY, WHITE } from "../../themes/colors";

export const ToastMessageContainer = styled.div`
  display: flex;
  align-items: center;
  width: 320px;
  height: 65px;
  background: ${WHITE};
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  box-shadow: 0 3px 7px rgb(0 0 0 / 10%);

  &::before {
    content: "";
    height: 100%;
    width: 4px;
    border-radius: 2px;
    background: ${COLOR_PRIMARY};
  }
`;

export const ToastIconBox = styled.div`
  width: 25px;
  height: 25px;
  min-width: 25px;
  border-radius: 50%;
  color: ${WHITE};
  background: ${COLOR_PRIMARY};
  margin: 0 18px;
  text-align: center;
  line-height: 24px;
  .MuiSvgIcon-root {
    font-size: 1.1rem;
  }
`;

export const ToastContent = styled.div`
  display: flex;
  flex-direction: column;
`;
