import React from "react";
import BlogCard from "./BlogCard";

import "./BlogCards.css";

const BlogCards = ({ blogs }) => {
  return (
    <ul className="blogcards__container">
      {blogs.map((blog) => (
        <BlogCard blog={blog} key={blog._id} />
      ))}
    </ul>
  );
};

export default BlogCards;
