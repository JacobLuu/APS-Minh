import { toast, ToastContainer } from "react-toastify";
import styled from "styled-components";

const WrappedToastContainer = styled(ToastContainer).attrs({
  // custom props
})`
  .Toastify__toast-container {
    color: red;
    width: 320px;
    height: 65px;
  }
  .Toastify__toast {
    padding: 0;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  .Toastify__toast--default {
    background: unset;
    color: #aaa;
  }
  .Toastify__toast--error {
  }
  .Toastify__toast--warning {
  }
  .Toastify__toast--success {
    color: black;
  }
  .Toastify__toast-body {
  }
  .Toastify__progress-bar {
  }
`;

toast.configure();

export default WrappedToastContainer;
