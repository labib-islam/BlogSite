import { useContext, useState } from "react";
import { Routes, Route } from "react-router";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "axios";
import "./App.css";
import Home from "./user/shared/pages/home";
import Login from "./user/auth/pages/Login";
import Signup from "./user/auth/pages/Signup";
import BlogList from "./user/blog/pages/BlogList";
import AddBlog from "./user/blog/pages/AddBlog";
import BlogItem from "./user/blog/pages/BlogItem";
import Layout from "./user/shared/components/Layout";
import BlogCard from "./user/blog/components/BlogCard";
import Test from "./Test";
import { UpdateBlog } from "./user/blog/pages/UpdateBlog";
import AuthContext from "./user/shared/contexts/AuthContext";
import { AdminSignup } from "./admin/auth/AdminSignup";
import AdminLayout from "./admin/shared/components/AdminLayout";
import Blogs from "./admin/blog/pages/Blogs";
import Dashboard from "./user/user/pages/Dashboard";
import MyBlogList from "./user/blog/pages/MyBlogList";

axios.defaults.withCredentials = true;

function App() {
  const { loggedIn, role } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={role === "admin" ? <AdminLayout /> : <Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="blogs" element={<BlogList />} />
        <Route path="temp" element={<BlogCard />} />
        <Route path="blogs/new" element={<AddBlog />} />
        <Route path="blogs/:bid/edit" element={<UpdateBlog />} />
        <Route path="blogs/:bid" element={<BlogItem />} />
        <Route path="user/dashboard" element={<Dashboard />} />
        <Route path="user/blogs/:status" element={<MyBlogList />} />
        <Route path="user/pending-blogs" element={<Dashboard />} />
        <Route path="user/rejected-blogs" element={<Dashboard />} />
        <Route path="user/drafts" element={<Dashboard />} />

        <Route path="test" element={<Test />} />

        <Route path="admin/signup" element={<AdminSignup />} />
        {role === "admin" && <Route path="admin/blogs" element={<Blogs />} />}
      </Route>
    </Routes>
  );
}

export default App;
