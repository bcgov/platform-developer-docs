import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import SvgChevronLeft from "../images/fa-chevron-left-solid.svg";
import SvgChevronRight from "../images/fa-chevron-right-solid.svg";

const StyledDiv = styled.div`
  display: flex;
  width: 100%;

  ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    list-style: none;
    margin: 0 auto;

    li {
      margin: 0 2px 10px 2px;

      button {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        background: none;
        border: none;
        color: #1a5a96;
        cursor: pointer;
        min-height: 44px;
        min-width: 44px;
        text-decoration: none;

        .arrow {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100px;
        }

        svg {
          color: #1a5a96;
          height: 20px;
        }

        &:hover {
          text-decoration: underline;
        }
      }

      span.current-page {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        min-height: 44px;
        min-width: 44px;
        background-color: lightgrey;
        border-radius: 50%;
      }
    }
  }
`;

export default function Pagination({ current, max, onPageChange }) {
  const pages = [];

  for (let x = 0; x < max; x++) {
    pages.push(parseInt(x + 1));
  }

  return (
    <StyledDiv>
      <ul>
        {current > 1 && (
          <li>
            <button
              className="arrow prev"
              onClick={() => onPageChange(current - 1)}
            >
              <SvgChevronLeft />
              Previous
            </button>
          </li>
        )}
        {pages.map((page, i) => {
          return (
            <li key={`pagination-page-${page}`}>
              {current === i + 1 ? (
                <span className="current-page" aria-label={`Page ${page}`}>
                  {`${page}`}
                </span>
              ) : (
                <button
                  aria-label={`Page ${page}`}
                  onClick={() => onPageChange(i + 1)}
                >
                  {`${page}`}
                </button>
              )}
            </li>
          );
        })}
        {current < max && (
          <li>
            <button
              className="arrow next"
              onClick={() => onPageChange(current + 1)}
            >
              <SvgChevronRight />
              Next
            </button>
          </li>
        )}
      </ul>
    </StyledDiv>
  );
}

Pagination.propTypes = {
  current: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
