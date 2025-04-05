import React from "react";
import { CiImageOff } from "react-icons/ci";
import UserIcon from "../../assets/icons/user-icon.svg?react";

import "./BlogTable.css";
import { Link, useNavigate } from "react-router";
import CategoryCard from "./CategoryCard";

const BlogTable = ({ blogs }) => {
  const navigate = useNavigate();
  return (
    <section className="blog-table__container">
      <table className="blog-list-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {blogs &&
            blogs.map((blog) => (
              <tr key={blog._id} onClick={() => navigate(`/blogs/${blog._id}`)}>
                <td>
                  <div className="multi-item__container">
                    <figure className="blog-image__container">
                      {blog.imageUrl ? (
                        <img src={`/api/${blog.imageUrl}`} alt="Not Found" />
                      ) : (
                        <CiImageOff className="no-image-icon" />
                      )}
                    </figure>
                    <span title={blog.title}>{blog.title}</span>
                  </div>
                </td>
                <td>
                  <div className="multi-item__container">
                    <figure className="user-image__container">
                      {blog.author.imageUrl ? (
                        <img
                          src={`/api/${blog.author.imageUrl}`}
                          alt="Not Found"
                        />
                      ) : (
                        <UserIcon className="user-icon" />
                      )}
                    </figure>
                    <span>{blog.author.username}</span>
                  </div>
                </td>
                <td>
                  <CategoryCard category={blog.category} />
                </td>
                <td>{blog.status}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
};

export default BlogTable;
