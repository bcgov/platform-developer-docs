import * as React from "react";
import { useState } from "react";
import { navigate } from "gatsby";
import styled from "styled-components";

import SearchIcon from "../images/fa-magnifying-glass-solid.svg";

const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  margin: 0;
  padding-bottom: 20px;

  // https://www.w3.org/WAI/tutorials/forms/labels/#note-on-hiding-elements
  label.visually-hidden {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  input {
    flex-grow: 1;
    border: 2px solid #606060;
    padding: 5px;
    width: 100%;
  }

  button {
    background-color: #003366;
    border: 0;
    color: white;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    font-weight: 700;
    height: 44px;
    width: 44px;

    &:focus,
    &:hover {
      background-color: #336699;
    }

    svg {
      fill: white;
      height: 20px;
      width: 20px;
    }
  }
`;

const SearchBar = () => {
  const [query, setQuery] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (query) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <label htmlFor="input-search" className="visually-hidden">
        Search
      </label>
      <input
        id="input-search"
        type="text"
        placeholder="Search"
        onChange={e => setQuery(e.target.value)}
      />
      <button type="submit" aria-label="Search">
        <SearchIcon />
      </button>
    </StyledForm>
  );
};

export default SearchBar;
