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
import AdminBlogs from "./admin/pages/AdminBlogs";
import UserList from "./admin/pages/UserList";
import UserPage from "./shared/pages/UserPage";

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
      <Route
        path="/"
        element={role === "admin" ? <AdminLayout /> : <UserLayout />}
      >
        <Route
          index
          element={role === "admin" ? <AdminDashboard /> : <Home />}
        />
        <Route path="auth" element={<Auth />} />
        <Route path="blogs" element={<PublishedBlogs />} />
        <Route path="blogs/:bid" element={<BlogItem />} />
        <Route path="user/:uid/blogs/:status?" element={<UserPage />} />

        {role === "user" && (
          <>
            <Route path="user/dashboard" element={<Dashboard />} />
            <Route path="user/edit-profile" element={<EditProfile />} />
            <Route path="user/blogs/new" element={<AddBlog />} />
            <Route path="user/blogs/edit/:bid" element={<UpdateBlog />} />
            <Route path="user/blogs/:status?" element={<UserBlogs />} />
          </>
        )}
        {role === "admin" && (
          <>
            <Route path="admin/blogs/:status?" element={<AdminBlogs />} />
            <Route path="admin/users" element={<UserList />} />
          </>
        )}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
