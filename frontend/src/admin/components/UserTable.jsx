import React from "react";
import { Link } from "react-router";
import UserIcon from "../../assets/icons/user-icon.svg?react";

import "./UserTable.css";

const UserTable = ({ loadedUsers }) => {
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
              <tr key={user._id}>
                <td className="username__container">
                  <Link
                    to={`/user/${user._id}/blogs`}
                    state={{ user }}
                    className="full-width-link"
                  >
                    <figure>
                      {user.imageUrl ? (
                        <img src={`/api/${user.imageUrl}`} alt="Not Found" />
                      ) : (
                        <UserIcon className="user-icon" />
                      )}
                    </figure>
                    <span>{user.username}</span>
                  </Link>
                </td>
                <td>
                  <Link
                    to={`/user/${user._id}/blogs`}
                    state={{ user }}
                    className="full-width-link"
                  >
                    {user.email}
                  </Link>
                </td>
                <td>
                  <Link
                    to={`/user/${user._id}/blogs`}
                    state={{ user }}
                    className="full-width-link"
                  >
                    {user.blogCount}
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
};

export default UserTable;
