import styled from "styled-components";
import {
  COLOR_BOX_SHADOW,
  COLOR_FRAMEWORK_NAME,
  COLOR_PRIMARY,
  COLOR_TEXT_PRIMARY,
  TEXT_COLOR_BLUE,
  WHITE,
} from "../../../../themes/colors";

const Container = styled.div`
  font-family: "Source Sans Pro";
  font-style: normal;
  width: 100%;
  min-height: 435px;
  background-color: ${WHITE};
  border-radius: 8px;
  padding: 15px 35px;
  box-shadow: ${COLOR_BOX_SHADOW};
  .language-setting-title {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: ${COLOR_TEXT_PRIMARY};
  }
  .frameworks-wrapper {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    @media (max-width: 1020px) {
      display: flex;
      justify-content: center;
    }
  }
  .framework-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 395px;
    height: 260px;
    background: rgba(122, 153, 248, 0.05);
    border-radius: 10px;
    margin: 45px 20px;
    box-shadow: ${COLOR_BOX_SHADOW};
  }

  .framework-container-selected {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 395px;
    height: 260px;
    background: rgba(122, 153, 248, 0.05);
    border: 2px solid ${COLOR_PRIMARY};
    border-radius: 10px;
    margin: 45px 20px;
  }

  .framework-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 345px;
    height: 208px;
    background: ${WHITE};
    border-radius: 10px;
    padding: 35px 20px 30px;
    .buttons-wrapper {
      width: 100%;
      display: flex;
      justify-content: space-evenly;
    }
  }

  .name {
    display: flex;
    justify-content: center;
    width: 100%;
    font-family: "Source Sans Pro";
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 20px;
    color: ${COLOR_FRAMEWORK_NAME};
    div:last-child {
      font-weight: 700;
      font-size: 10px;
      line-height: 20px;
      text-transform: capitalize;
      color: ${COLOR_PRIMARY};
      width: 45px;
      height: 21px;
      border: 1px solid ${COLOR_PRIMARY};
      border-radius: 5px;
      margin-left: 10px;
      padding: 0 0 5px 5px;
    }
  }

  .content {
    margin: 20px 0 25px;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    color: #28596b;
  }

  button {
    width: 133px;
    height: 32px;
    background: ${COLOR_PRIMARY};
    border-radius: 4px;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    text-transform: capitalize;
    color: ${WHITE};
  }

  button:hover {
    background-color: ${TEXT_COLOR_BLUE};
  }

  .applied-button {
    opacity: 0.5;
  }
`;

export default Container;
