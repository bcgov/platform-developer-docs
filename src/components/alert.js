import * as React from "react";
import styled from "styled-components";

import SvgCircleCheck from "../images/fa-circle-check-solid.svg";
import SvgCircleExclamation from "../images/fa-circle-exclamation-solid.svg";
import SvgCircleInfo from "../images/fa-circle-info-solid.svg";
import SvgTriangleExclamation from "../images/fa-triangle-exclamation-solid.svg";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  background-color: white;
  border: 1px solid transparent;
  border-radius: 4px;
  color: #313132;
  font-weight: 700;
  margin-bottom: 20px;
  padding: 15px;

  svg {
    height: 20px;
    margin-right: 10px;
  }

  &.success {
    background-color: #dff0d8;
    border-color: #d6e9c6;
    color: #2d4821;
  }

  &.error {
    background-color: #f2dede;
    border-color: #ebccd1;
    color: #a12622;
  }

  &.warning {
    background-color: #f9f1c6;
    border-color: #faebcc;
    color: #6c4a00;
  }

  &.info {
    background-color: #d9eaf7;
  }
`;

export default function Alert({ children, type, ...props }) {
  function getClassName() {
    switch (type) {
      case "success":
        return "success";
      case "error":
        return "error";
      case "warning":
        return "warning";
      case "info":
      default:
        return "info";
    }
  }

  function getSvgIcon() {
    switch (type) {
      case "success":
        return <SvgCircleCheck />;
      case "error":
        return <SvgCircleExclamation />;
      case "warning":
        return <SvgTriangleExclamation />;
      case "info":
      default:
        return <SvgCircleInfo />;
    }
  }

  return (
    <StyledDiv className={getClassName()} {...props}>
      {getSvgIcon()}
      <div>{children}</div>
    </StyledDiv>
  );
}
