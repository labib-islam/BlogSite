import axios from "axios";
import React, { useEffect, useState } from "react";

import "./Categories.css";

const Categories = () => {
  const [loadedCategories, setLoadedCategories] = useState();
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
      const res = await axios.post("/api/category/new", inputs);

      setInputs({ category: "", color: "#e9e9e9" });
      fetchCategories();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const responseData = await axios.get(`/api/category`);
      setLoadedCategories(responseData.data.categories);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      await axios.delete(`/api/category/${categoryId}`);
      setLoadedCategories((prev) =>
        prev.filter((cat) => cat._id !== categoryId)
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <main className="page-categories">
      <section>
        <header>Add Category</header>
        <hr />
        <form className="add-category-form">
          <input
            type="text"
            name="category"
            placeholder="Category"
            style={{ backgroundColor: inputs.color }}
            onChange={handleChange}
          />
          <label
            htmlFor="color-picker"
            className="color-picker-label"
            style={{ backgroundColor: inputs.color }}
          >
            Color
            <input
              type="color"
              id="color-picker"
              name="color"
              value={inputs.color}
              onChange={handleChange}
            />
          </label>
          <button onClick={handleSubmit}>Create</button>
        </form>
      </section>
      <section>
        <header>Category List</header>
        <hr />
        <ul className="category-list">
          {loadedCategories &&
            loadedCategories.map((cat) => (
              <li key={cat._id} style={{ backgroundColor: cat.color }}>
                {cat.category}
                <span onClick={() => handleDelete(cat._id)}>&times;</span>
              </li>
            ))}
        </ul>
      </section>
    </main>
  );
};

export default Categories;
