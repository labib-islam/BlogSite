import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import AuthContext from "../../shared/contexts/AuthContext";
import { useParams } from "react-router";
import AdminBlogList from "../../../admin/blog/components/AdminBlogList";

const MyBlogList = () => {
  const { userId } = useContext(AuthContext);

  const { status } = useParams();
  const [loadedBlogs, setLoadedBlogs] = useState();

  const fetchBlogs = async () => {
    try {
      const responseData = await axios.get(
        `http://localhost:5000/api/blogs/user/${userId}/${status}`
      );
      setLoadedBlogs(responseData.data.blogs);
      console.log(responseData.data.blogs);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (userId) fetchBlogs();
  }, [userId]);
  return (
    <div className="blog-list__container">
      {loadedBlogs &&
        loadedBlogs.map((blog) => <BlogCard item={blog} key={blog._id} />)}
    </div>
  );
};

export default MyBlogList;
