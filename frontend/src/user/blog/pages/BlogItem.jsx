import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import AuthContext from "../../shared/contexts/AuthContext";
import UserAvatar from "../../user/components/UserAvatar";
import { Editor } from "../components/Editor";
import { format } from "date-fns";

import "./BlogItem.css";

const BlogItem = () => {
  const { userId, role } = useContext(AuthContext);
  const [feedback, setFeedback] = useState();
  const [loadedBlog, setLoadedBlog] = useState();
  const bid = useParams().bid;

  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const responseData = await axios.delete(
        `http://localhost:5000/api/blogs/${bid}`
      );
      navigate("/blogs");
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatus = async (status) => {
    try {
      const responseData = await axios.patch(
        `http://localhost:5000/api/blogs/status/${bid}/${status}`
      );
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const handleFeedback = async () => {
    try {
      console.log(feedback);
      const responseData = await axios.patch(
        `http://localhost:5000/api/blogs/feedback/${bid}`,
        { feedback }
      );
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const fetchBlog = async () => {
    try {
      const responseData = await axios.get(
        `http://localhost:5000/api/blogs/${bid}`
      );

      setLoadedBlog(responseData.data.blog);
      setFeedback(responseData.data.blog.feedback);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <div className="page-margin blog__container">
      {loadedBlog && (
        <div className="blog">
          <h2 className="blog-title">{loadedBlog.title}</h2>
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
            <span className="category">{loadedBlog.category}</span>
          </div>
          <div className="blog-image__container">
            <img
              src={`http://localhost:5000/${loadedBlog.imageUrl}`}
              alt="Blog Image"
              className="blog-image"
            />
          </div>
          <Editor readOnly={true} content={loadedBlog.content.blocks} />
          <hr />
          {userId === loadedBlog.author._id && (
            <>
              <h3>Status: {loadedBlog.status}</h3>
              {loadedBlog.feedback && (
                <span>Feedback: {loadedBlog.feedback}</span>
              )}
              <button
                className="edit__button"
                onClick={() => navigate(`/blogs/${loadedBlog._id}/edit`)}
              >
                Edit
              </button>
              <button className="delete__button" onClick={handleDelete}>
                Delete
              </button>
            </>
          )}
          {role === "admin" && (
            <>
              <button
                className="default__button"
                onClick={() => handleStatus("archived")}
              >
                Archive
              </button>
              <button
                className="default__button"
                onClick={() => handleStatus("published")}
              >
                Publish
              </button>

              <div className="feedback-area">
                <textarea
                  name="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={4}
                />
                <button onClick={handleFeedback}>Submit Feedback</button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogItem;
