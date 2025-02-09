import React, { useEffect, useState } from "react";

import "./BlogList.css";
import axios from "axios";
import { Link } from "react-router";
import BlogCard from "../components/BlogCard";
import BlogCards from "../components/BlogCards";

const BlogList = () => {
  const [loadedBlogs, setLoadedBlogs] = useState();

  const fetchBlogs = async () => {
    try {
      const responseData = await axios.get(
        `http://localhost:5000/api/blogs/published`
      );
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
      <BlogCards loadedBlogs={loadedBlogs} />
    </div>
  );
};

export default BlogList;
