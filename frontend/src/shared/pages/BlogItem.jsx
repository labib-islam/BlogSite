import React, { useEffect, useState } from "react";

import "./BlogItem.css";
import UserCard from "../../user/components/UserCard";
import CategoryCard from "../components/CategoryCard";
import { useLocation, useParams } from "react-router";
import { format } from "date-fns";
import axios from "axios";
import { Editor } from "../components/Editor";

const BlogItem = () => {
  const [blog, setBlog] = useState();
  const bid = useParams().bid;
  const location = useLocation();

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
        </section>
      )}
    </main>
  );
};

export default BlogItem;
