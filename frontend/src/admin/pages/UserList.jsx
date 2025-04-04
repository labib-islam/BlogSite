import React, { useEffect, useState } from "react";
import testImage from "../../assets/images/home-image.jpg";
import UserIcon from "../../assets/icons/user-icon.svg?react";

import "./UserList.css";
import axios from "axios";

const UserList = () => {
  const [loadedUsers, setLoadedUsers] = useState();

  const fetchUsers = async () => {
    try {
      const responseData = await axios.get("/api/user");
      setLoadedUsers(responseData.data.users);
      console.log(responseData.data.users);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <main className="page-user-list">
      <section className="user-count__container">
        <header>Total Users</header>
        <p>-</p>
        {loadedUsers && <span>{loadedUsers.length}</span>}
      </section>
      <hr />
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
                    <figure>
                      {user.imageUrl ? (
                        <img src={`/api/${user.imageUrl}`} alt="Not Found" />
                      ) : (
                        <UserIcon className="user-icon" />
                      )}
                    </figure>
                    <span>{user.username}</span>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.blogCount}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default UserList;
