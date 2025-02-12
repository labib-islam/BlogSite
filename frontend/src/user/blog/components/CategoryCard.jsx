import React, { useEffect, useState } from "react";

import "./CategoryCard.css";
import axios from "axios";

const CategoryCard = ({ categoryList, category }) => {
  const [loadedCategoryList, setLoadedCategoryList] = useState(
    categoryList || []
  );

  const getCategoryColor = (categoryName) => {
    const category = loadedCategoryList.find(
      (cat) => cat.category === categoryName
    );
    return category ? category.color : "#d3d3d3"; // Default color
  };

  const fetchCategories = async () => {
    try {
      const responseData = await axios.get(
        `http://localhost:5000/api/category`
      );
      setLoadedCategoryList(responseData.data.categories);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!categoryList) fetchCategories();
  }, []);

  return (
    <span
      className="category"
      style={{ backgroundColor: getCategoryColor(category) }}
    >
      {category}
    </span>
  );
};

export default CategoryCard;
