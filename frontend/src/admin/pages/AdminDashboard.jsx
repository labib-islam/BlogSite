import React, { useEffect, useState } from "react";

import "./AdminDashboard.css";
import axios from "axios";
import { Link } from "react-router";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import ErrorCard from "../../shared/components/ErrorCard";

const AdminDashboard = () => {
  const [blogsCountbyStatus, setBlogsCountbyStatus] = useState();
  const [loadedUsers, setLoadedUsers] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetchBlogsCountbyStatus = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/blog/admin/count");
      setBlogsCountbyStatus(res.data.blogsCountbyStatus);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      setError(err);
    }
  };

  const fetchUsers = async (e) => {
    if (e) e.preventDefault();
    try {
      setIsLoading(true);
      const responseData = await axios.get(`/api/user`);
      setLoadedUsers(responseData.data.users);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setError(err);
    }
  };

  useEffect(() => {
    fetchBlogsCountbyStatus();
    fetchUsers();
  }, []);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {error && <ErrorCard error={error} />}

      {!error && !isLoading && (
        <main className="page-admin-dashboard">
          <section>
            <header>Blogs</header>
            <hr />
            <div className="blogs-type-count__container">
              {blogsCountbyStatus &&
                blogsCountbyStatus.map((status) => (
                  <Link
                    to={`/admin/blogs/${status._id}`}
                    key={status._id}
                    className={`blog-type-count__container ${status._id}`}
                  >
                    <span>{status.count}</span>
                    <header>{status._id}</header>
                  </Link>
                ))}
            </div>
          </section>
          <section>
            <header>Users</header>
            <hr />
            <div className="blogs-type-count__container">
              <Link
                to={`/admin/users`}
                state={{ loadedUsers }}
                className={`blog-type-count__container ${status._id}`}
              >
                <span>{loadedUsers && loadedUsers.length}</span>
                <header>Users</header>
              </Link>
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default AdminDashboard;
