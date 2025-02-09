import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import AuthContext from "../../shared/contexts/AuthContext";
import { useParams } from "react-router";
import AdminBlogList from "../../../admin/blog/components/AdminBlogList";
import BlogCards from "../components/BlogCards";
import FilterBar from "../components/FilterBar";

const MyBlogList = () => {
  const { userId } = useContext(AuthContext);

  const { status } = useParams();
  const [loadedBlogs, setLoadedBlogs] = useState();

  const [inputs, setInputs] = useState({
    searchText: "",
    category: "all",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(inputs);
  };

  const handleClear = () => {
    setInputs({ searchText: "", category: "all" });
    fetchBlogs();
  };

  const fetchBlogs = async (e) => {
    if (e) e.preventDefault();
    try {
      const responseData = await axios.get(
        `http://localhost:5000/api/blogs/user/${userId}/${status}?search=${inputs.searchText}&cat=${inputs.category}`
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
    <>
      <div className="blog-list__container">
        <FilterBar
          inputs={inputs}
          setInputs={setInputs}
          handleChange={handleChange}
          fetchBlogs={fetchBlogs}
          handleClear={handleClear}
        />
        <BlogCards loadedBlogs={loadedBlogs} />
      </div>
    </>
  );
};

export default MyBlogList;
