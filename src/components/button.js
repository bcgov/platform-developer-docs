import * as React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: #003366;
  border: 0;
  color: white;
  cursor: pointer;
  font-weight: 700;
  height: 44px;

  &:focus,
  &:hover {
    background-color: #336699;
  }
`;

const Button = { isPrimary };
