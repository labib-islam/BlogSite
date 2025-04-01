import React, { useEffect, useState } from "react";

import "./Blogs.css";
import SearchBox from "../components/SearchBox";
import BlogCards from "../components/BlogCards";
import axios from "axios";

const Blogs = () => {
  const [inputs, setInputs] = useState({ searchText: "", category: "all" });
  const [loadedBlogs, setLoadedBlogs] = useState();

  const fetchBlogs = async (e) => {
    if (e) e.preventDefault();
    try {
      const responseData = await axios.get(
        `/api/blog/published?search=${inputs.searchText}&cat=${inputs.category}`
      );
      setLoadedBlogs(responseData.data.blogs);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <main className="page-blogs">
      <SearchBox
        inputs={inputs}
        setInputs={setInputs}
        fetchBlogs={fetchBlogs}
      />
      <section className="blogs__container">
        {loadedBlogs && <BlogCards blogs={loadedBlogs} />}
      </section>
    </main>
  );
};

export default Blogs;
