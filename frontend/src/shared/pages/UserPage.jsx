import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router";

import "./UserPage.css";
import Blogs from "../components/Blogs";

const UserPage = () => {
  const [inputs, setInputs] = useState({
    searchText: "",
    category: "all",
    status: "all",
  });

  const [loadedUser, setLoadedUser] = useState();
  const [loadedBlogs, setLoadedBlogs] = useState();
  const location = useLocation();
  const { uid, status } = useParams();

  const fetchUser = async () => {
    try {
      const responseData = await axios.get(`/api/user/${uid}`);
      console.log(responseData.data.user);
      setLoadedUser(responseData.data.user);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchBlogs = async (e) => {
    if (e) e.preventDefault();
    try {
      const responseData = await axios.get(
        `/api/blog/user/${uid}/blogs?search=${inputs.searchText}&cat=${inputs.category}&status=${inputs.status}`
      );
      setLoadedBlogs(responseData.data.blogs);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (status) inputs.status = status;

    if (location.state) {
      setLoadedUser(location.state.user);
    } else {
      fetchUser();
    }

    fetchBlogs();
  }, []);
  return (
    <main className="page-user-dashboard">
      <div className="dashboard__container">
        {loadedUser && (
          <section className="user-info__container">
            <figure>
              <img src={`/api/${loadedUser.imageUrl}`} alt="" />
            </figure>
            <article>
              <header>{loadedUser.username}</header>
              <span>{loadedUser.email}</span>
            </article>
          </section>
        )}
        <hr />
        {loadedBlogs && (
          <Blogs
            inputs={inputs}
            setInputs={setInputs}
            fetchBlogs={fetchBlogs}
            showStatus={true}
            loadedBlogs={loadedBlogs}
            userId={uid}
          />
        )}
      </div>
    </main>
  );
};

export default UserPage;
