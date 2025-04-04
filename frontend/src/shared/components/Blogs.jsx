import React, { useContext, useEffect, useState } from "react";

import "./Blogs.css";
import SearchBox from "./SearchBox";
import BlogCards from "./BlogCards";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router";

const Blogs = ({
  inputs,
  setInputs,
  fetchBlogs,
  loadedBlogs,
  showStatus = false,
  userId = null,
}) => {
  const { role } = useContext(AuthContext);
  const navigate = useNavigate();
  const statusList = [
    "all",
    "published",
    "pending",
    "rejected",
    "archived",
    ...(role === "user" ? ["draft"] : []),
  ];

  const handleStatus = (e, status) => {
    // setInputs((prev) => ({ ...prev, status: status }));
    inputs.status = status;

    userId
      ? navigate(`/user/${userId}/blogs/${status}`)
      : navigate(`/admin/blogs/${status}`);

    fetchBlogs();
  };

  return (
    <main className="page-blogs">
      <SearchBox inputs={inputs} setInputs={setInputs} fetchData={fetchBlogs} />
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
