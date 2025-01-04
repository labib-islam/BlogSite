import React from "react";
import { Link, NavLink, Outlet } from "react-router";

import "./Layout.css";

const Layout = () => {
  const navItems = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Login",
      path: "/login",
    },
    {
      name: "Blogs",
      path: "/blogs",
    },
  ];

  return (
    <div>
      <header className="navigation-container">
        <h1>Blog App</h1>
        <nav>
          <ul>
            {navItems.map((navItem) => (
              <li className="nav-item">
                <NavLink to={navItem.path}>{navItem.name}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
