import React, { useContext } from "react";
import AuthContext from "../../../user/shared/contexts/AuthContext";
import { NavLink, Outlet } from "react-router";
import "./AdminLayout.css";

const AdminLayout = () => {
  const { loggedIn, username, getLoggedOut } = useContext(AuthContext);
  const navItems = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Blogs",
      path: "/admin/blogs",
    },
  ];

  return (
    <div className="admin-panel-container">
      <header className="admin-navigation-container">
        <h1>{username}</h1>
        <nav>
          <ul>
            {navItems.map((navItem) => (
              <li key={navItem.name} className="admin-nav-item">
                <NavLink to={navItem.path}>{navItem.name}</NavLink>
              </li>
            ))}
            {!loggedIn && (
              <li className="admin-nav-item">
                <NavLink to="/login">Login</NavLink>
              </li>
            )}
            {loggedIn && (
              <>
                <li className="admin-nav-item">
                  <NavLink to="/" onClick={getLoggedOut}>
                    Logout
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

export default AdminLayout;
