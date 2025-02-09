import React from "react";

import "./BlogCards.css";
import BlogCard from "./BlogCard";

const BlogCards = ({ loadedBlogs }) => {
  return (
    <>
      {loadedBlogs &&
        loadedBlogs.map((blog) => <BlogCard item={blog} key={blog._id} />)}
    </>
  );
};

export default BlogCards;
