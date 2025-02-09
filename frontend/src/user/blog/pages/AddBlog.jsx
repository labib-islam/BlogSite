import axios from "axios";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { Editor } from "../components/Editor";
import { format } from "date-fns";

import "./AddBlog.css";
import DragDropImageUploader from "../components/DragDropImageUploader";
import AuthContext from "../../shared/contexts/AuthContext";
import UserAvatar from "../../user/components/UserAvatar";
import { useNavigate } from "react-router";

const AddBlog = () => {
  const { username, image: userImage } = useContext(AuthContext);

  const [inputs, setInputs] = useState({
    title: "",
    content: {},
    category: "tech",
  });

  const [image, setImage] = useState();

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "title") {
      setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      e.target.style.height = "auto"; // Reset height to recalculate
      e.target.style.height = event.target.scrollHeight + "px"; // Set new height
    } else if (e.target.name === "image") {
      setInputs((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
    } else setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEditorChange = (newContent) => {
    setInputs((prev) => ({
      ...prev,
      content: newContent,
    }));
  };

  const handleSubmit = async (e, status) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", inputs.title);
      formData.append("image", image.file);
      formData.append("content", JSON.stringify(inputs.content));
      formData.append("category", inputs.category);
      const res = await axios.post(
        `http://localhost:5000/api/blogs/new?status=${status}`,
        formData
      );
      navigate("/user/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="page-margin blog__container">
      <form className="add-blog__form">
        <div className="blog-title__container">
          <textarea
            className="blog-title"
            type="text"
            name="title"
            onChange={handleChange}
            placeholder="Title"
            rows={1}
          />
        </div>
        <hr />
        <div className="avatar-date__container">
          <UserAvatar author={username} image={userImage} />
          <span className="date">{format(new Date(), "MMM d, yyyy")}</span>
        </div>
        <hr />
        <div className="category__container">
          <label htmlFor="">Category: </label>

          <select name="category" id="category" onChange={handleChange}>
            <option value="tech">Tech</option>
            <option value="business">Business</option>
            <option value="science">Science</option>
            <option value="travel">Travel</option>
          </select>
        </div>
        <div>
          <DragDropImageUploader image={image} setImage={setImage} />
        </div>
        <Editor handleChange={handleEditorChange} />

        <button
          className="form-submit__button"
          onClick={(e) => handleSubmit(e, "pending")}
        >
          Create
        </button>
        <button
          className="form-submit-outline__button"
          onClick={(e) => handleSubmit(e, "draft")}
        >
          Save as draft
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
