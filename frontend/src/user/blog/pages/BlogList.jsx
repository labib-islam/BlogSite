import React, { useEffect, useState } from "react";

import "./BlogList.css";
import axios from "axios";
import { Link } from "react-router";
import BlogCard from "../components/BlogCard";

const BlogList = () => {
  const [loadedBlogs, setLoadedBlogs] = useState();

  const fetchBlogs = async () => {
    try {
      const responseData = await axios.get(`http://localhost:5000/api/blogs/`);
      setLoadedBlogs(responseData.data.blogs);
      console.log(responseData.data.blogs);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <div className="blog-list__container">
      {loadedBlogs && loadedBlogs.map((blog) => <BlogCard item={blog} />)}
    </div>
  );
};

export default BlogList;
