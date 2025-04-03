import React, { useContext, useEffect, useState } from "react";

import "./Blogs.css";
import SearchBox from "./SearchBox";
import BlogCards from "./BlogCards";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";

const Blogs = ({
  inputs,
  setInputs,
  fetchBlogs,
  loadedBlogs,
  showStatus = false,
}) => {
  const { role } = useContext(AuthContext);
  const statusList = [
    "all",
    "published",
    "pending",
    "rejected",
    "archived",
    ...(role === "user" ? ["draft"] : []),
  ];

  const handleStatus = (e, status) => {
    setInputs((prev) => ({ ...prev, status: status }));
    fetchBlogs(e, status);
  };

  return (
    <main className="page-blogs">
      <SearchBox
        inputs={inputs}
        setInputs={setInputs}
        fetchBlogs={fetchBlogs}
      />
      {showStatus && (
        <>
          <ul className="status__container">
            {statusList.map((status) => (
              <li
                key={status}
                className={`status-card ${
                  inputs.status === status ? "active" : ""
                }`}
                onClick={(e) => handleStatus(e, status)}
              >
                {status}
              </li>
            ))}
          </ul>
        </>
      )}
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
