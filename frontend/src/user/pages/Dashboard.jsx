import React, { useContext } from "react";

import "./Dashboard.css";
import { Link } from "react-router";
import AuthContext from "../../shared/contexts/AuthContext";

const Dashboard = () => {
  const { username, image, userEmail } = useContext(AuthContext);
  return (
    <main className="page-dashboard">
      <div className="dashboard__container">
        <section className="user-info__container">
          <figure>
            <img src={`/api/${image}`} alt="" />
          </figure>
          <article>
            <header>{username}</header>
            <span>{userEmail}</span>
          </article>
        </section>
        <Link to="/user/edit-profile" className="user-edit-button">
          Edit Profile
        </Link>
        <hr />
        <section className="dashboard-buttons__container">
          <Link to="/user/blogs/new">New Blog</Link>
          <Link to="/user/blogs/all">My Blogs</Link>
          <Link to="/user/blogs/published">Published Blogs</Link>
          <Link to="/user/blogs/pending">Pending Blogs</Link>
          <Link to="/user/blogs/rejected">Rejected Blogs</Link>
          <Link to="/user/blogs/draft">Drafts</Link>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
