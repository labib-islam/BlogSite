import React, { useContext, useEffect, useState } from "react";

import "./BlogItem.css";
import UserCard from "../../user/components/UserCard";
import CategoryCard from "../components/CategoryCard";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import { format } from "date-fns";
import axios from "axios";
import { Editor } from "../components/Editor";
import AuthContext from "../contexts/AuthContext";

const BlogItem = () => {
  const { userId, role } = useContext(AuthContext);
  const [blog, setBlog] = useState();
  const bid = useParams().bid;
  const location = useLocation();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const responseData = await axios.delete(`/api/blog/${bid}`);
      navigate("/user/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  const fetchBlog = async () => {
    try {
      const responseData = await axios.get(`/api/blog/${bid}`);
      setBlog(responseData.data.blog);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (location.state) {
      setBlog(location.state.blog);
    } else {
      fetchBlog();
    }
  }, []);

  return (
    <main className="page-blog">
      {blog && (
        <section className="blog__container">
          <header>{blog.title}</header>
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
          <Editor readOnly={true} content={blog.content.blocks} />
          {userId === blog.author._id && (
            <div className="blog-buttons__container">
              <Link
                to={`/user/blogs/edit/${blog._id}`}
                state={{ blog }}
                className="yellow-button"
              >
                Edit
              </Link>
              <button className="red-button" onClick={handleDelete}>
                Delete
              </button>
            </div>
          )}
          {role === "admin" && (
            <>
              <div className="blog-buttons__container">
                <button className="yellow-button">Archive</button>
                <button className="green-button">Publish</button>
              </div>
              <form className="feedback-form">
                <textarea name="" id="" placeholder="Write feedback here..." />
                <button>Send Feedback</button>
              </form>
            </>
          )}
        </section>
      )}
    </main>
  );
};

export default BlogItem;
