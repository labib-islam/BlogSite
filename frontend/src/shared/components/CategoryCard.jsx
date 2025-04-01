import React, { useEffect, useState } from "react";

import "./CategoryCard.css";
import axios from "axios";

const CategoryCard = ({ category }) => {
  const [loadedCategories, setLoadedCategories] = useState();

  const getCategoryColor = (categoryName) => {
    const category = loadedCategories.find(
      (cat) => cat.category === categoryName
    );
    return category ? category.color : "#d3d3d3"; // Default color
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
          {category}
        </span>
      )}
    </>
  );
};

export default CategoryCard;
