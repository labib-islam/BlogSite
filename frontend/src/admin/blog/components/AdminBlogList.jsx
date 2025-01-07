import React from "react";

import "./AdminBlogList.css";
import { Link, useNavigate } from "react-router";
import UserAvatar from "../../../user/user/components/UserAvatar";

const AdminBlogList = (props) => {
  const navigate = useNavigate();
  return (
    <div className="table-container v-center">
      <table className="content-table">
        <thead>
          <tr>
            <th>Author</th>
            <th>Title</th>
            <th>Category</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {props.blogs.map((blog) => (
            <tr key={blog._id} onClick={() => navigate(`/blogs/${blog._id}`)}>
              <td>
                <UserAvatar
                  author={blog.author.username}
                  image={blog.author.imageUrl}
                />
              </td>
              <td>{blog.title}</td>
              <td>{blog.category}</td>

              <td>{blog.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBlogList;
