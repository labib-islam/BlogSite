import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import UserIcon from "../../assets/icons/user-icon.svg?react";
import { HiMenuAlt1 } from "react-icons/hi";
import { MdExpandLess } from "react-icons/md";

import "./AdminLayout.css";
import AuthContext from "../../shared/contexts/AuthContext";

const AdminLayout = () => {
  const { username, image, getLoggedOut } = useContext(AuthContext);

  const [sideBarStatus, setSideBarStatus] = useState("hide");
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const sideBarStatusHandler = (event) => {
    event.stopPropagation();
    sideBarStatus === "show"
      ? setSideBarStatus("hide")
      : setSideBarStatus("show");
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    const closeSideBarHandler = (event) => {
      setSideBarStatus("hide");
    };
    document.addEventListener("click", closeSideBarHandler);
    window.addEventListener("scroll", closeSideBarHandler);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("click", closeSideBarHandler);
      window.removeEventListener("scroll", closeSideBarHandler);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sideBarStatus]);

  return (
    <div className="admin-layout__container">
      <nav className={`admin-navigation ${sideBarStatus}`}>
        <section className="admin-profile__container">
          <figure>
            {image ? (
              <img src={image} alt="Not Found" />
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
          <li>
            <NavLink to="/admin/categories">Categories</NavLink>
          </li>
          <li>
            <Link to="/" onClick={getLoggedOut}>
              Logout
            </Link>
          </li>
        </ul>
      </nav>
      <section className="admin-navbar">
        <figure
          className="admin-menu-icon__container"
          onClick={sideBarStatusHandler}
        >
          <HiMenuAlt1 className="admin-menu-icon" />
        </figure>
      </section>
      <main>
        <Outlet />
      </main>
      <figure
        className={`scroll-to-top__container ${showScrollToTop ? "show" : ""}`}
        onClick={scrollToTop}
      >
        <MdExpandLess className="up-arrow-icon" />
      </figure>
    </div>
  );
};

export default AdminLayout;
