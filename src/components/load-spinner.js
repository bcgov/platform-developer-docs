import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const LoadSpinnerGroupContainer = styled.div`
  width: 100%;
`;

const StyledSpinner = styled.div`
  height: auto;
  padding: 0.8em 1em;
  width: 100%;

  div {
    border-radius: 0.5em;
    margin-bottom: 0.5em;
    animation: pulse 1s infinite;

    &.url {
      height: 0.8em;
      width: 80%;
    }
    &.title {
      height: 1.2em;
      width: 60%;
    }
    &.snippet {
      height: 3em;
      width: 100%;
    }
  }

  @keyframes pulse {
    0% {
      background-color: #f8f8f8;
    }
    50% {
      background-color: #e8e8e8;
    }
    100% {
      background-color: #f8f8f8;
    }
  }
`;

const Spinner = () => {
  return (
    <StyledSpinner>
      <div className="url" />
      <div className="title" />
      <div className="snippet" />
    </StyledSpinner>
  );
};

export default function LoadSpinnerGroup({ count }) {
  return (
    <LoadSpinnerGroupContainer>
      {[...Array(count)].map((e, i) => {
        return <Spinner key={`spinner-${i}`} />;
      })}
    </LoadSpinnerGroupContainer>
  );
}

LoadSpinnerGroup.propTypes = {
  count: PropTypes.number.isRequired,
};
