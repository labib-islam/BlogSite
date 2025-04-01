import React, { useEffect, useState } from "react";

import "./Blogs.css";
import SearchBox from "./SearchBox";
import BlogCards from "./BlogCards";
import axios from "axios";

const Blogs = ({ inputs, setInputs, fetchBlogs, loadedBlogs }) => {
  return (
    <main className="page-blogs">
      <SearchBox
        inputs={inputs}
        setInputs={setInputs}
        fetchBlogs={fetchBlogs}
      />
      <section className="blogs__container">
        {loadedBlogs.length === 0 ? (
          <span>No Blogs Found</span>
        ) : (
          <BlogCards blogs={loadedBlogs} />
        )}
      </section>
    </main>
  );
};

export default Blogs;
