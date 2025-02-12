import React, { useEffect, useState } from "react";

import "./BlogList.css";
import axios from "axios";
import { Link } from "react-router";
import BlogCard from "../components/BlogCard";
import BlogCards from "../components/BlogCards";
import FilterBar from "../components/FilterBar";

const BlogList = () => {
  const [loadedBlogs, setLoadedBlogs] = useState();

  const [inputs, setInputs] = useState({
    searchText: "",
    category: "all",
  });

  const fetchBlogs = async (e) => {
    if (e) e.preventDefault();
    try {
      const responseData = await axios.get(
        `http://localhost:5000/api/blogs/published?search=${inputs.searchText}&cat=${inputs.category}`
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
      <FilterBar
        inputs={inputs}
        setInputs={setInputs}
        fetchBlogs={fetchBlogs}
      />
      <BlogCards loadedBlogs={loadedBlogs} />
    </div>
  );
};

export default BlogList;
