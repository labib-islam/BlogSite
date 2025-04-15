import React, { useState, useEffect, createContext, useCallback } from "react";
import axios from "axios";
import { toast } from "sonner";

const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [userId, setUserId] = useState();
  const [username, setUsername] = useState();
  const [userEmail, setUserEmail] = useState();
  const [image, setImage] = useState();
  const [role, setRole] = useState(undefined);
  const [authError, setAuthError] = useState();

  const getLoggedIn = async () => {
    try {
      const loggedInRes = await axios.get("/api/auth/loggedIn");

      setLoggedIn(loggedInRes.data.verified);
      setUsername(loggedInRes.data.username);
      setUserId(loggedInRes.data.userId);
      setUserEmail(loggedInRes.data.userEmail);
      setImage(loggedInRes.data.image);
      setRole(loggedInRes.data.role);
      setAuthError(null);
    } catch (err) {
      setAuthError(err);
    }
  };

  const getLoggedOut = async () => {
    setRole(undefined);
    await axios.get("/api/auth/logout");
    getLoggedIn();
  };

  const switchRole = async () => {
    try {
      await axios.get("/api/auth/switch-role");
      toast.success("Role Switched");
      getLoggedIn();
    } catch (err) {
      setAuthError(err);
    }
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
        authError,
        getLoggedIn,
        getLoggedOut,
        switchRole,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthContextProvider };
