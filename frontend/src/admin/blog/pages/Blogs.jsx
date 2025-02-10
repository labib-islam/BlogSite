import React, { useEffect, useState } from "react";
import AdminBlogList from "../components/AdminBlogList";
import axios from "axios";

const Blogs = () => {
  const [loadedBlogs, setLoadedBlogs] = useState();
  const [loadedCategories, setLoadedCategories] = useState();

  const fetchBlogs = async () => {
    try {
      const [blogsResponse, categoriesResponse] = await Promise.all([
        axios.get(`http://localhost:5000/api/blogs/`), // Fetch blogs
        axios.get(`http://localhost:5000/api/category`), // Fetch categories
      ]);
      setLoadedBlogs(blogsResponse.data.blogs);
      setLoadedCategories(categoriesResponse.data.categories);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <>
      {loadedBlogs && (
        <AdminBlogList blogs={loadedBlogs} categories={loadedCategories} />
      )}
    </>
  );
};

export default Blogs;
