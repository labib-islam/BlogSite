import React from "react";
import { Link, useNavigate } from "react-router";
import UserIcon from "../../assets/icons/user-icon.svg?react";

import "./UserTable.css";

const UserTable = ({ loadedUsers }) => {
  const navigate = useNavigate();
  return (
    <section className="user-table__container">
      <table className="user-list-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Blogs</th>
          </tr>
        </thead>
        <tbody>
          {loadedUsers &&
            loadedUsers.map((user) => (
              <tr
                key={user._id}
                onClick={() => navigate(`/user/${user._id}/blogs`)}
              >
                <td>
                  <div className="multi-item__container">
                    <figure>
                      {user.imageUrl ? (
                        <img src={user.imageUrl} alt="Not Found" />
                      ) : (
                        <UserIcon className="user-icon" />
                      )}
                    </figure>
                    <span title={user.username}>{user.username}</span>
                  </div>
                </td>
                <td title={user.email}>{user.email}</td>
                <td>{user.blogCount}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
};

export default UserTable;
