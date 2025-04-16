import React, { useContext, useEffect, useState } from "react";
import { MdExpandMore } from "react-icons/md";
import { MdExpandLess } from "react-icons/md";
import "./UserLayout.css";
import { Link, NavLink, Outlet } from "react-router";
import AuthContext from "../../shared/contexts/AuthContext";
import UserCard from "./UserCard";

const UserLayout = () => {
  const { loggedIn, username, image, getLoggedOut, userId } =
    useContext(AuthContext);

  const [dropdownStatus, setDropdownStatus] = useState("inactive");
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const dropdownStatusHandler = (event) => {
    event.stopPropagation();
    dropdownStatus === "active"
      ? setDropdownStatus("inactive")
      : setDropdownStatus("active");
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

    const closeDropdownHandler = (event) => {
      setDropdownStatus("inactive");
    };
    document.addEventListener("click", closeDropdownHandler);
    window.addEventListener("scroll", closeDropdownHandler);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("click", closeDropdownHandler);
      window.removeEventListener("scroll", closeDropdownHandler);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dropdownStatus]);

  return (
    <div className="layout__container">
      <nav className="user-navigation">
        <header>
          <Link to="/">BlogSite</Link>
        </header>
        <section>
          <ul className={`nav-list__container`}>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/blogs">Blogs</NavLink>
            </li>
          </ul>

          <figure
            className={`expand-icon__container ${dropdownStatus}`}
            onClick={dropdownStatusHandler}
          >
            <MdExpandMore className="expand-icon" />
          </figure>

          <ul className={`side-bar-list__container ${dropdownStatus}`}>
            <li className="mobile-view">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="mobile-view">
              <NavLink to="/blogs">Blogs</NavLink>
            </li>
            {loggedIn ? (
              <>
                <li>
                  <NavLink to={`/user/${userId}/blogs`}>dashboard</NavLink>
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
        </section>
      </nav>
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

export default UserLayout;
