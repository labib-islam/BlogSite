import React, { useContext, useEffect, useState } from "react";
import { BsGrid } from "react-icons/bs";
import { LuTableOfContents } from "react-icons/lu";
import "./Blogs.css";
import SearchBox from "./SearchBox";
import BlogCards from "./BlogCards";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import BlogTable from "./BlogTable";

const Blogs = ({
  inputs,
  setInputs,
  fetchBlogs,
  loadedBlogs,
  showStatus = false,
  userId = null,
}) => {
  const { role } = useContext(AuthContext);
  const [isCardsView, setIsCardsView] = useState(true);
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
        <section>
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
        </section>
      )}
      <section className="blog-view-switcher">
        <span
          className={`${isCardsView ? "active-card" : "active-table"}`}
        ></span>
        <div
          className={`card-view ${isCardsView && "active"}`}
          onClick={() => setIsCardsView(true)}
        >
          <BsGrid />
          <span>Cards</span>
        </div>
        <div
          className={`table-view ${!isCardsView && "active"}`}
          onClick={() => setIsCardsView(false)}
        >
          <LuTableOfContents />
          <span>Table</span>
        </div>
      </section>
      <section className="blogs__container">
        {loadedBlogs.length === 0 ? (
          <span>No Blogs Found</span>
        ) : isCardsView ? (
          <BlogCards blogs={loadedBlogs} />
        ) : (
          <BlogTable blogs={loadedBlogs} showStatus={showStatus} />
        )}
      </section>
    </main>
  );
};

export default Blogs;
