import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import AuthContext from "../../shared/contexts/AuthContext";
import UserAvatar from "../../user/components/UserAvatar";

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
      navigate("/");
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
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <div className="page-margin">
      {loadedBlog && (
        <>
          <h2>{loadedBlog.title}</h2>
          <div className="blog-image__container">
            <img
              src={`http://localhost:5000/${loadedBlog.imageUrl}`}
              alt="Blog Image"
              className="blog-image"
            />
          </div>
          <UserAvatar
            author={loadedBlog.author.username}
            image={loadedBlog.author.imageUrl}
          />
          <div dangerouslySetInnerHTML={{ __html: loadedBlog.content }} />
          {userId === loadedBlog.author._id && (
            <>
              <Link to={`/blogs/${loadedBlog._id}/edit`}>Edit</Link>
              <button onClick={handleDelete}>Delete</button>
            </>
          )}
          {role === "admin" && (
            <>
              <button onClick={() => handleStatus("archived")}>Archive</button>
              <button onClick={() => handleStatus("published")}>Publish</button>

              <textarea
                name="feedback"
                value={loadedBlog.feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={5}
              />
              <button onClick={handleFeedback}>Submit Feedback</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default BlogItem;
