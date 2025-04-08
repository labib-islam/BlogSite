import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router";
import UserIcon from "../../assets/icons/user-icon.svg?react";

import "./UserPage.css";
import Blogs from "../components/Blogs";
import AuthContext from "../contexts/AuthContext";

const UserPage = () => {
  const { userId, role } = useContext(AuthContext);
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
  }, [uid]);
  return (
    <main className="page-user-dashboard">
      <div className="dashboard__container">
        {loadedUser && (
          <section className="user-info__container">
            <figure>
              {loadedUser.imageUrl ? (
                <img src={`/api/${loadedUser.imageUrl}`} alt="" />
              ) : (
                <UserIcon className="user-icon" />
              )}
            </figure>
            <article>
              <header>{loadedUser.username}</header>
              {loadedUser._id === userId && <span>{loadedUser.email}</span>}
            </article>
          </section>
        )}
        <Link to="/user/edit-profile" className="user-edit-button">
          Edit Profile
        </Link>
        <Link to="/user/blogs/new" className="new-blog-button">
          New Blog
        </Link>
        <hr />
        {loadedBlogs && (
          <Blogs
            inputs={inputs}
            setInputs={setInputs}
            fetchBlogs={fetchBlogs}
            showStatus={
              role === "admin" || loadedUser._id === userId ? true : false
            }
            loadedBlogs={loadedBlogs}
            userId={uid}
          />
        )}
      </div>
    </main>
  );
};

export default UserPage;
