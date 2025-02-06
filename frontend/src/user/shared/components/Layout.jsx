import React, { useContext } from "react";
import { Link, NavLink, Outlet } from "react-router";

import "./Layout.css";
import AuthContext from "../contexts/AuthContext";
import UserAvatar from "../../user/components/UserAvatar";

const Layout = () => {
  const { loggedIn, username, image, getLoggedOut } = useContext(AuthContext);
  const navItems = [
    {
      name: "Home",
      path: "/",
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
              <li key={navItem.name} className="nav-item">
                <NavLink to={navItem.path}>{navItem.name}</NavLink>
              </li>
            ))}
            {!loggedIn && (
              <li className="nav-item">
                <NavLink to="/login">Login</NavLink>
              </li>
            )}
            {loggedIn && (
              <>
                <li className="nav-item">
                  <NavLink to="/login" onClick={getLoggedOut}>
                    Logout
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/user/dashboard">
                    <UserAvatar author={username} image={image} />
                  </NavLink>
                </li>
              </>
            )}
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
