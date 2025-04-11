import React, { useContext } from "react";
import AuthContext from "./shared/contexts/AuthContext";
import { Route, Routes } from "react-router";
import UserLayout from "./user/components/UserLayout";
import Home from "./user/pages/Home";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminLayout from "./admin/components/AdminLayout";
import Auth from "./shared/pages/Auth";
import BlogItem from "./shared/pages/BlogItem";
import PublishedBlogs from "./shared/pages/PublishedBlogs";
import AddBlog from "./user/pages/AddBlog";
import UpdateBlog from "./user/pages/UpdateBlog";
import EditProfile from "./user/pages/EditProfile";
import AdminBlogs from "./admin/pages/AdminBlogs";
import UserList from "./admin/pages/UserList";
import UserPage from "./shared/pages/UserPage";
import Categories from "./admin/pages/Categories";
import ErrorCard from "./shared/components/ErrorCard";

const AppRoutes = () => {
  const { role } = useContext(AuthContext);

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
            <Route path="user/edit-profile" element={<EditProfile />} />
            <Route path="user/blogs/new" element={<AddBlog />} />
            <Route path="user/blogs/edit/:bid" element={<UpdateBlog />} />
            {/* <Route path="user/blogs/:status?" element={<UserBlogs />} /> */}
          </>
        )}
        {role === "admin" && (
          <>
            <Route path="admin/blogs/:status?" element={<AdminBlogs />} />
            <Route path="admin/users" element={<UserList />} />
            <Route path="admin/categories" element={<Categories />} />
          </>
        )}

        <Route
          path="*"
          element={
            <ErrorCard
              error={{
                message: "404 - Page Not Found",
                response: {
                  data: {
                    message: "The page you're looking for doesn't exist",
                  },
                },
              }}
            />
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
