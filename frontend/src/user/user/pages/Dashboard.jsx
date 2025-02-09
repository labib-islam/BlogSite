import React from "react";

import "./Dashboard.css";
import { Link } from "react-router";

const Dashboard = () => {
  return (
    <div className="dashboard__container">
      <Link to="/blogs/new" className="dashboard-link">
        New Blog
      </Link>
      <Link to="/user/blogs/all" className="dashboard-link">
        My Blogs
      </Link>
      <Link to="/user/blogs/published" className="dashboard-link">
        Published Blogs
      </Link>
      <Link to="/user/blogs/pending" className="dashboard-link">
        Pending Blogs
      </Link>
      <Link to="/user/blogs/rejected" className="dashboard-link">
        Rejected Blogs
      </Link>
      <Link to="/user/blogs/draft" className="dashboard-link">
        Drafts
      </Link>
    </div>
  );
};

export default Dashboard;
