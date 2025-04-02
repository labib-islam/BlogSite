import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../shared/contexts/AuthContext";
import { useLocation, useNavigate, useParams } from "react-router";
import axios from "axios";
import UserCard from "../components/UserCard";
import CategoryCard from "../../shared/components/CategoryCard";
import { format } from "date-fns";
import { Editor } from "../../shared/components/Editor";

const UpdateBlog = () => {
  const { userId, role } = useContext(AuthContext);
  const [blog, setBlog] = useState();
  const bid = useParams().bid;
  const location = useLocation();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    title: "",
    content: {},
  });

  const handleChange = (e) => {
    if (e.target.name === "title") {
      setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      e.target.style.height = "auto"; // Reset height to recalculate
      e.target.style.height = e.target.scrollHeight + "px"; // Set new height
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
      const res = await axios.patch(
        `/api/blog/user/${bid}?status=${status}`,
        inputs
      );
      navigate("/blogs");
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBlog = async () => {
    try {
      const responseData = await axios.get(`/api/blog/${bid}`);
      setBlog(responseData.data.blog);
      setInputs((prev) => ({
        ...prev,
        title: responseData.data.blog.title,
        content: responseData.data.blog.content,
      }));
      console.log(responseData.data.blog);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (location.state) {
      setBlog(location.state.blog);
      setInputs((prev) => ({
        ...prev,
        title: location.state.blog.title,
        content: location.state.blog.content,
      }));
    } else {
      fetchBlog();
    }
  }, []);

  return (
    <main className="page-add-blog">
      {blog && (
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
            <UserCard
              name={blog.author.username}
              image={blog.author.imageUrl}
            />
            <span className="date">
              {format(blog.publication_date, "MMM d, yyyy")}
            </span>
          </div>
          <hr />
          <CategoryCard category={blog.category} />
          <figure className="blog-image__container">
            <img src={`/api/${blog.imageUrl}`} alt="" />
          </figure>
          <Editor
            handleChange={handleEditorChange}
            content={inputs.content.blocks}
          />
          <div className="blog-buttons__container">
            <button
              className="yellow-button"
              onClick={(e) => handleSubmit(e, "draft")}
            >
              Save as draft
            </button>
            <button
              className="green-button"
              onClick={(e) => handleSubmit(e, "pending")}
            >
              Update & Send For Reviews
            </button>
          </div>
        </form>
      )}
    </main>
  );
};

export default UpdateBlog;
