import React, { useEffect, useState } from "react";

import "./UserList.css";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router";
import SearchBox from "../../shared/components/SearchBox";
import UserTable from "../components/UserTable";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import ErrorCard from "../../shared/components/ErrorCard";

const UserList = () => {
  const [inputs, setInputs] = useState({
    searchText: "",
  });
  const [loadedUsers, setLoadedUsers] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUsers = async (e) => {
    if (e) e.preventDefault();
    try {
      setIsLoading(true);
      const responseData = await axios.get(
        `/api/user?search=${inputs.searchText}`
      );
      setLoadedUsers(responseData.data.users);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setError(err);
    }
  };

  useEffect(() => {
    if (location.state) {
      setLoadedUsers(location.state.loadedUsers);
    } else {
      fetchUsers();
    }
  }, []);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {error && <ErrorCard error={error} />}

      {!error && !isLoading && (
        <main className="page-user-list">
          <section className="user-count__container">
            <header>Total Users</header>
            <p>-</p>
            {loadedUsers && <span>{loadedUsers.length}</span>}
          </section>
          <hr />
          <SearchBox
            inputs={inputs}
            setInputs={setInputs}
            fetchData={fetchUsers}
          />

          {loadedUsers && loadedUsers.length === 0 ? (
            <span>No Users Found</span>
          ) : (
            <UserTable loadedUsers={loadedUsers} />
          )}
        </main>
      )}
    </>
  );
};

export default UserList;
