import React, { useState } from "react";
import axios from "axios";

import "./AddCategory.css";

const AddCategory = ({ fetchCategories }) => {
  const [inputs, setInputs] = useState({
    category: "",
    color: "#e9e9e9",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/category/new",
        inputs
      );

      setInputs({ category: "", color: "#e9e9e9" });
      if (fetchCategories) fetchCategories();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="category-form">
      <input
        className="category-text-input"
        type="text"
        name="category"
        placeholder="category"
        value={inputs.category}
        onChange={handleChange}
        style={{ backgroundColor: inputs.color }}
      />
      <input
        className="category-color-input"
        type="color"
        name="color"
        value={inputs.color}
        onChange={handleChange}
      />
      <button className="category-submit-button" onClick={handleSubmit}>
        Add
      </button>
    </form>
  );
};

export default AddCategory;
