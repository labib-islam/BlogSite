import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router";
import UserIcon from "../../assets/icons/user-icon.svg?react";

import "./AdminLayout.css";
import AuthContext from "../../shared/contexts/AuthContext";

const AdminLayout = () => {
  const { username, image } = useContext(AuthContext);

  return (
    <div className="admin-layout__container">
      <nav className="admin-navigation">
        <section className="admin-profile__container">
          <figure>
            {image ? (
              <img src={`/api/${image}`} alt="Not Found" />
            ) : (
              <UserIcon className="user-icon" />
            )}
          </figure>
          <header>{username}</header>
        </section>
        <ul className="admin-nav-list__container">
          <li>
            <NavLink to="/">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/admin/blogs">Blogs</NavLink>
          </li>
          <li>
            <NavLink to="/admin/users">Users</NavLink>
          </li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
