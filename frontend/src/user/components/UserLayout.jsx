import React, { useContext } from "react";

import "./UserLayout.css";
import { Link, NavLink, Outlet } from "react-router";
import AuthContext from "../../shared/contexts/AuthContext";
import UserCard from "./UserCard";

const UserLayout = () => {
  const { loggedIn, username, image, getLoggedOut } = useContext(AuthContext);

  return (
    <div className="layout__container">
      <nav className="user-navigation">
        <header>
          <Link to="/">BlogSite</Link>
        </header>
        <ul className="nav-list__container">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/blogs">Blogs</NavLink>
          </li>
          {loggedIn ? (
            <>
              <li>
                <NavLink to="/dashboard">dashboard</NavLink>
              </li>
              <li>
                <Link to="/" onClick={getLoggedOut}>
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <li>
              <NavLink to="/auth">Login</NavLink>
            </li>
          )}
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
