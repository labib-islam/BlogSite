import React, { useContext } from "react";
import AuthContext from "./shared/contexts/AuthContext";
import { Route, Routes } from "react-router";
import UserLayout from "./user/components/UserLayout";
import Home from "./user/pages/Home";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminLayout from "./admin/components/AdminLayout";
import Auth from "./shared/pages/Auth";
import Blogs from "./shared/components/Blogs";
import BlogItem from "./shared/pages/BlogItem";
import Dashboard from "./user/pages/Dashboard";
import PublishedBlogs from "./shared/pages/PublishedBlogs";
import UserBlogs from "./user/pages/UserBlogs";
import AddBlog from "./user/pages/AddBlog";
import UpdateBlog from "./user/pages/UpdateBlog";
import EditProfile from "./user/pages/EditProfile";

const AppRoutes = () => {
  const { role } = useContext(AuthContext);
  if (role === undefined) {
    return (
      <div className="full-page">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <Routes>
      {role === "user" ? (
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="user/dashboard" element={<Dashboard />} />
          <Route path="user/edit-profile" element={<EditProfile />} />
          <Route path="blogs" element={<PublishedBlogs />} />
          <Route path="user/blogs/new" element={<AddBlog />} />
          <Route path="user/blogs/edit/:bid" element={<UpdateBlog />} />
          <Route path="user/blogs/:status" element={<UserBlogs />} />
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
          <Route path="blogs" element={<PublishedBlogs />} />
          <Route path="blogs/:bid" element={<BlogItem />} />
        </Route>
      )}
    </Routes>
  );
};

export default AppRoutes;
