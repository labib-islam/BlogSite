import React, { useEffect, useState } from "react";

import "./CategoryCard.css";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";

const CategoryCard = ({ category }) => {
  const [loadedCategories, setLoadedCategories] = useState();

  const getCategoryColor = (categoryName) => {
    const category = loadedCategories.find(
      (cat) => cat.category === categoryName
    );
    return category ? category.color : "#e6e6e6"; // Default color
  };

  const fetchCategories = async () => {
    try {
      const responseData = await axios.get(`/api/category`);
      setLoadedCategories(responseData.data.categories);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      {loadedCategories && (
        <span
          className="category-card"
          style={{ backgroundColor: getCategoryColor(category) }}
        >
          {category ? category : "Not Found"}
        </span>
      )}
    </>
  );
};

export default CategoryCard;
