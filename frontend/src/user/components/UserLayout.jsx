import React from "react";

import "./UserLayout.css";
import { Outlet } from "react-router";

const UserLayout = () => {
  return (
    <div className="layout__container">
      <nav className="user-navigation">
        <header>BlogSite</header>
        <ul className="nav-list__container">
          <li>Home</li>
          <li>Blogs</li>
          <li>Dashboard</li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
