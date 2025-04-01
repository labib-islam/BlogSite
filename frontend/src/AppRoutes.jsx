import React, { useContext } from "react";
import AuthContext from "./shared/contexts/AuthContext";
import { Route, Routes } from "react-router";
import UserLayout from "./user/components/UserLayout";
import Home from "./user/pages/Home";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminLayout from "./admin/components/AdminLayout";
import Auth from "./shared/pages/Auth";
import Blogs from "./shared/pages/Blogs";
import BlogItem from "./shared/pages/BlogItem";
import Dashboard from "./user/pages/Dashboard";

const AppRoutes = () => {
  const { role } = useContext(AuthContext);
  return (
    <Routes>
      {role === "user" ? (
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="blogs/:bid" element={<BlogItem />} />
        </Route>
      ) : role === "admin" ? (
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
        </Route>
      ) : (
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="auth" element={<Auth />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="blogs/:bid" element={<BlogItem />} />
        </Route>
      )}
    </Routes>
  );
};

export default AppRoutes;
