import React from "react";

import "./FilterBar.css";

const FilterBar = ({
  inputs,
  setInputs,
  fetchBlogs,
  handleChange,
  handleClear,
}) => {
  return (
    <form className="filter__container">
      <div className="search-box__container">
        <input
          type="text"
          name="searchText"
          value={inputs.searchText}
          placeholder="Search"
          onChange={handleChange}
        />
      </div>
      <div className="category__container">
        <label htmlFor="">Category: </label>

        <select
          name="category"
          id="category"
          onChange={handleChange}
          value={inputs.category}
        >
          <option value="all">All</option>
          <option value="tech">Tech</option>
          <option value="business">Business</option>
          <option value="science">Science</option>
          <option value="travel">Travel</option>
        </select>
      </div>
      <button className="filter__button" onClick={fetchBlogs}>
        Filter
      </button>
      <button className="clear__button" onClick={handleClear}>
        Clear
      </button>
    </form>
  );
};

export default FilterBar;
