import { useState } from "react";
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

axios.defaults.withCredentials = true;

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="blogs" element={<BlogList />} />
        <Route path="temp" element={<BlogCard />} />
        <Route path="blogs/new" element={<AddBlog />} />
        <Route path="blogs/:bid" element={<BlogItem />} />
      </Route>
    </Routes>
  );
}

export default App;
