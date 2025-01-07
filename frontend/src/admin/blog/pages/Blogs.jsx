import React, { useEffect, useState } from "react";
import AdminBlogList from "../components/AdminBlogList";
import axios from "axios";

const Blogs = () => {
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

  return <>{loadedBlogs && <AdminBlogList blogs={loadedBlogs} />}</>;
};

export default Blogs;
