import React from "react";

import "./CategoryCard.css";

const CategoryCard = ({ categoryList, category }) => {
  const getCategoryColor = (categoryName) => {
    const category = categoryList.find((cat) => cat.category === categoryName);
    return category ? category.color : "#d3d3d3"; // Default color
  };

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
