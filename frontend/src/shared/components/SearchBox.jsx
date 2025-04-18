import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchIcon from "../../assets/icons/search-icon.svg?react";
import CrossIcon from "../../assets/icons/cross-icon.svg?react";
import DownArrowIcon from "../../assets/icons/down-arrow-icon.svg?react";

import "./SearchBox.css";

const SearchBox = ({ inputs, setInputs, fetchData }) => {
  const [loadedCategories, setLoadedCategories] = useState();

  const fetchCategories = async () => {
    try {
      const responseData = await axios.get(`/api/category`);
      setLoadedCategories(responseData.data.categories);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClear = () => {
    // setInputs((prev) => ({ ...prev, searchText: "", category: "all" }));
    inputs.searchText = "";
    if (inputs.category) inputs.category = "all";
    fetchData();
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <section className="search-box__container">
      <form className="search-box__form" onSubmit={fetchData}>
        <input
          type="text"
          name="searchText"
          placeholder="Search"
          value={inputs.searchText}
          onChange={handleChange}
        />
        <div className="second-row__container">
          {inputs.category && (
            <div className="select__container">
              <select
                name="category"
                value={inputs.category}
                onChange={handleChange}
              >
                <option key="all" value="all">
                  All
                </option>
                {loadedCategories &&
                  loadedCategories.map((cat) => (
                    <option key={cat.category} value={cat.category}>
                      {cat.category}
                    </option>
                  ))}
              </select>
              <div className="down-arrow__container">
                <DownArrowIcon className="down-arrow" />
              </div>
            </div>
          )}
          <div className="search-icon__container" onClick={fetchData}>
            <SearchIcon className="search-icon" />
          </div>
          <div className="cross-icon__container" onClick={handleClear}>
            <CrossIcon className="cross-icon" />
          </div>
        </div>
      </form>
    </section>
  );
};

export default SearchBox;
