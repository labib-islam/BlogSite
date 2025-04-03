import React, { useEffect, useState } from "react";

import "./AdminDashboard.css";
import axios from "axios";

const AdminDashboard = () => {
  const [blogsCountbyStatus, setBlogsCountbyStatus] = useState();
  const fetchBlogsCountbyStatus = async () => {
    try {
      const res = await axios.get("/api/blog/admin/count");
      setBlogsCountbyStatus(res.data.blogsCountbyStatus);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBlogsCountbyStatus();
  }, []);

  return (
    <main className="page-admin-dashboard">
      <section className="blogs-type-count__container">
        {blogsCountbyStatus &&
          blogsCountbyStatus.map((status) => (
            <div
              key={status._id}
              className={`blog-type-count__container ${status._id}`}
            >
              <span>{status.count}</span>
              <header>{status._id}</header>
            </div>
          ))}
      </section>
    </main>
  );
};

export default AdminDashboard;
