import React, { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../shared/contexts/AuthContext";
import { useLocation, useNavigate, useParams } from "react-router";
import axios from "axios";
import UserCard from "../components/UserCard";
import CategoryCard from "../../shared/components/CategoryCard";
import { format } from "date-fns";
import { Editor } from "../../shared/components/Editor";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import ErrorCard from "../../shared/components/ErrorCard";
import { toast } from "sonner";

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

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
      setIsLoading(true);
      const res = await axios.patch(
        `/api/blog/user/${bid}?status=${status}`,
        inputs
      );
      setIsLoading(false);
      toast.success("Blog Updated");
      navigate("/blogs");
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setError(err);
    }
  };

  const fetchBlog = async () => {
    try {
      setIsLoading(true);
      const responseData = await axios.get(`/api/blog/${bid}`);
      setBlog(responseData.data.blog);
      setInputs((prev) => ({
        ...prev,
        title: responseData.data.blog.title,
        content: responseData.data.blog.content,
      }));
      console.log(responseData.data.blog);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      setError(err);
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
    <>
      {isLoading && <LoadingSpinner />}
      {error && <ErrorCard error={error} />}

      {!error && !isLoading && (
        <main className="page-add-blog">
          {blog && blog.author._id === userId && (
            <form className="add-blog__container">
              <textarea
                type="text"
                name="title"
                className="blog-title"
                placeholder="Title"
                value={inputs.title}
                onChange={handleChange}
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
              <p className="blog-status">
                Status: <span>{blog.status}</span>
              </p>
              {blog.feedback && (
                <section className="feedback__container">
                  <header>Feedback</header>
                  <span>{blog.feedback}</span>
                </section>
              )}
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
      )}
    </>
  );
};

export default UpdateBlog;
