import React, { useState, useEffect, createContext, useCallback } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [userId, setUserId] = useState();
  const [username, setUsername] = useState();
  const [userEmail, setUserEmail] = useState();
  const [image, setImage] = useState();
  const [role, setRole] = useState(undefined);

  const getLoggedIn = async () => {
    const loggedInRes = await axios.get("/api/auth/loggedIn");

    setLoggedIn(loggedInRes.data.verified);
    setUsername(loggedInRes.data.username);
    setUserId(loggedInRes.data.userId);
    setUserEmail(loggedInRes.data.userEmail);
    setImage(loggedInRes.data.image);
    setRole(loggedInRes.data.role);
  };

  const getLoggedOut = async () => {
    await axios.get("/api/auth/logout");
    getLoggedIn();
  };

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        userId,
        username,
        userEmail,
        image,
        role,
        getLoggedIn,
        getLoggedOut,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthContextProvider };
