import React, { useEffect, useState } from "react";
import AddCategory from "../components/AddCategory";
import axios from "axios";

import "./Categories.css";

const Categories = () => {
  const [loadedCategories, setLoadedCategories] = useState();

  const fetchCategories = async () => {
    try {
      const responseData = await axios.get(
        `http://localhost:5000/api/category`
      );
      setLoadedCategories(responseData.data.categories);
      console.log(responseData.data.categories);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:5000/api/category/${categoryId}`);
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
    <div className="page-margin">
      <AddCategory fetchCategories={fetchCategories} />
      <div className="category-list__container">
        {loadedCategories &&
          loadedCategories.map((cat) => (
            <div key={cat._id} className="single-category__container">
              <span
                className="category"
                style={{
                  backgroundColor: cat.color,
                  fontSize: "1rem",
                }}
              >
                {cat.category}
              </span>
              <span
                className="delete-category__button"
                onClick={() => handleDelete(cat._id)}
              >
                &times;
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Categories;
