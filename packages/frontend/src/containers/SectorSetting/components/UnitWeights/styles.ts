import styled from "styled-components";
import {
  COLOR_BORDER,
  COLOR_PRIMARY,
  COLOR_TEXT_PRIMARY,
  FRAME_BACKGROUND,
} from "../../../../themes/colors";

const Container = styled.div`
  font-family: "Source Sans Pro";
  width: 100%;
  min-height: 100px;
  border: 1px solid ${COLOR_BORDER};
  border-radius: 8px;
  padding: 10px;
  .unit-weight-header {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${COLOR_TEXT_PRIMARY};
    .unit-weight-action {
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      width: 150px;
      .edit-button {
        padding-left: 7px;
        height: 40px;
        width: 40px;
        line-height: 40px;
        border-radius: 40px;
        color: ${COLOR_PRIMARY};
      }

      .edit-button:hover {
        transition: 0.2s;
        background-color: ${COLOR_BORDER};
      }
    }

    .unit-weight-annotation {
      padding: 0 25px;
      min-width: 385px;
      min-height: 100%;
      background-color: ${FRAME_BACKGROUND};
      font-weight: 600;
      font-size: 14px;
      line-height: 18px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      border-radius: 4px;
      @media (max-width: 600px) {
        min-width: 30%;
      }
    }
  }
`;

export default Container;
