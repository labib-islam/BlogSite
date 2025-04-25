import React, { useContext, useEffect, useState } from "react";

import "./AddBlog.css";
import AuthContext from "../../shared/contexts/AuthContext";
import UserCard from "../components/UserCard";
import { format } from "date-fns";
import axios from "axios";
import DragDropImageUploader from "../components/DragDropImageUploader";
import { Editor } from "../../shared/components/Editor";
import { useNavigate } from "react-router";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import ErrorCard from "../../shared/components/ErrorCard";
import { toast } from "sonner";

const AddBlog = () => {
  const { username, userId, image: userImage } = useContext(AuthContext);
  const [loadedCategoryList, setLoadedCategoryList] = useState();
  const [categoryColor, setCategoryColor] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [inputs, setInputs] = useState({
    title: "",
    content: {},
    category: "",
  });

  const [image, setImage] = useState();
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "title") {
      setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      e.target.style.height = "auto"; // Reset height to recalculate
      e.target.style.height = e.target.scrollHeight + "px"; // Set new height
    } else if (e.target.name === "image") {
      setInputs((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
    } else if (e.target.name === "category") {
      setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      const categoryData = loadedCategoryList.find(
        (cat) => cat.category === e.target.value
      );
      setCategoryColor(categoryData ? categoryData.color : ""); // Set background color
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
    let messages = [];

    if (!inputs.title) messages.push("• Title");
    if (!image) messages.push("• Image");
    if (inputs.content.blocks.length === 0) messages.push("• Blog Content");
    if (!inputs.category) messages.push("• Category");

    if (messages.length > 0) {
      toast.error(
        <>
          <b>The following field(s) cannot be empty:</b>
          <br />
          {messages.map((msg, idx) => (
            <div key={idx}>{msg}</div>
          ))}
        </>
      );
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("title", inputs.title);
      formData.append("image", image.file);
      formData.append("content", JSON.stringify(inputs.content));
      formData.append("category", inputs.category);
      const res = await axios.post(
        `/api/blog/user/new?status=${status}`,
        formData
      );
      setIsLoading(false);
      toast.success("Blog Added");
      navigate(`/user/${userId}/blogs`);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setError(err);
    }
  };

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const responseData = await axios.get(`/api/category`);
      setLoadedCategoryList(responseData.data.categories);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      setError(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {error && <ErrorCard error={error} />}

      {!error && !isLoading && loadedCategoryList && (
        <main className="page-add-blog">
          <form className="add-blog__container">
            <textarea
              type="text"
              name="title"
              className="blog-title"
              placeholder="Title"
              value={inputs.title}
              onChange={handleChange}
              rows={1}
            />
            <hr />
            <div className="user-date__container">
              <UserCard name={username} image={userImage} />
              <span className="date">{format(new Date(), "MMM d, yyyy")}</span>
            </div>
            <hr />
            <select
              className="blog-category-selector"
              name="category"
              id="category"
              onChange={handleChange}
              defaultValue={""}
              style={{ backgroundColor: categoryColor }}
            >
              <option value="" disabled>
                Category
              </option>
              {loadedCategoryList &&
                loadedCategoryList.map((cat) => (
                  <option
                    key={cat._id}
                    value={cat.category}
                    style={{ "--cat-color": cat.color }}
                  >
                    {cat.category}
                  </option>
                ))}
            </select>

            <figure className="blog-image__container input">
              <DragDropImageUploader image={image} setImage={setImage} />
            </figure>
            <Editor handleChange={handleEditorChange} />
            <div className="blog-buttons__container">
              <button
                className="yellow-button"
                onClick={(e) => handleSubmit(e, "draft")}
              >
                Save as Draft
              </button>
              <button
                className="green-button"
                onClick={(e) => handleSubmit(e, "pending")}
              >
                Send For Review
              </button>
            </div>
          </form>
        </main>
      )}
    </>
  );
};

export default AddBlog;
