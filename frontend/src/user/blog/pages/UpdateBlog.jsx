import axios from "axios";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import AuthContext from "../../shared/contexts/AuthContext";
import { useNavigate, useParams } from "react-router";
import JoditEditor from "jodit-react";

import "./UpdateBlog.css";
import { Editor } from "../components/Editor";
import UserAvatar from "../../user/components/UserAvatar";
import { format } from "date-fns";
import CategoryCard from "../components/CategoryCard";

export const UpdateBlog = () => {
  const { userId } = useContext(AuthContext);
  const [loadedBlog, setLoadedBlog] = useState();
  const [loadedCategories, setLoadedCategories] = useState();

  const bid = useParams().bid;

  const [inputs, setInputs] = useState({
    title: "",
    content: {},
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEditorChange = (newContent) => {
    setInputs((prev) => ({
      ...prev,
      content: newContent,
    }));
  };

  const handleSubmit = async (e, status) => {
    e.preventDefault();
    console.log(inputs);
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/blogs/${bid}?status=${status}`,
        inputs
      );
      navigate("/blogs");
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBlog = async () => {
    try {
      const [blogResponse, categoriesResponse] = await Promise.all([
        axios.get(`http://localhost:5000/api/blogs/${bid}`), // Fetch blogs
        axios.get(`http://localhost:5000/api/category`), // Fetch categories
      ]);

      setLoadedBlog(blogResponse.data.blog);
      setLoadedCategories(categoriesResponse.data.categories);
      inputs.title = blogResponse.data.blog.title;
      inputs.content = blogResponse.data.blog.content;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <>
      {loadedBlog && (
        <div className="page-margin">
          <form className="add-blog__form">
            <span className="edit-icon">Editing Mode</span>

            <div className="blog-title__container">
              <textarea
                className="blog-title"
                type="text"
                name="title"
                onChange={handleChange}
                placeholder="Title"
                value={inputs.title}
              />
            </div>
            <hr />
            <div className="avatar-date__container">
              <UserAvatar
                author={loadedBlog.author.username}
                image={loadedBlog.author.imageUrl}
              />
              <span className="date">
                {format(loadedBlog.publication_date, "MMM d, yyyy")}
              </span>
            </div>

            <hr />
            <div className="category__container">
              <CategoryCard
                categoryList={loadedCategories}
                category={loadedBlog.category}
              />
            </div>
            <div className="blog-image__container">
              <img
                src={`http://localhost:5000/${loadedBlog.imageUrl}`}
                alt="Blog Image"
                className="blog-image"
              />
            </div>
            <Editor
              handleChange={handleEditorChange}
              content={inputs.content.blocks}
            />

            <button
              className="form-submit__button"
              onClick={(e) => handleSubmit(e, "pending")}
            >
              Update & Send For Reviews
            </button>
            <button
              className="form-submit-outline__button"
              onClick={(e) => handleSubmit(e, "draft")}
            >
              Save as draft
            </button>
          </form>
        </div>
      )}
    </>
  );
};
