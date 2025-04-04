import React, { useEffect, useState } from "react";

import "./UserList.css";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import SearchBox from "../../shared/components/SearchBox";
import UserTable from "../components/UserTable";

const UserList = () => {
  const [inputs, setInputs] = useState({
    searchText: "",
  });
  const [loadedUsers, setLoadedUsers] = useState();
  const navigate = useNavigate();

  const fetchUsers = async (e) => {
    if (e) e.preventDefault();
    try {
      const responseData = await axios.get(
        `/api/user?search=${inputs.searchText}`
      );
      setLoadedUsers(responseData.data.users);
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
      <SearchBox inputs={inputs} setInputs={setInputs} fetchData={fetchUsers} />

      {loadedUsers && loadedUsers.length === 0 ? (
        <span>No Users Found</span>
      ) : (
        <UserTable loadedUsers={loadedUsers} />
      )}
    </main>
  );
};

export default UserList;
