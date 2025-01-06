import React, { useContext, useState } from "react";
import axios from "axios";

import "./Login.css";
import { Link } from "react-router";
import AuthContext from "../../shared/contexts/AuthContext";

const Login = () => {
  const { getLoggedIn } = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        inputs
      );
      getLoggedIn();
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <span className="span-text">Login</span>
        <form>
          <div className="form-input-item">
            <label htmlFor="">Email</label>
            <input type="email" name="email" onChange={handleChange} />
          </div>
          <div className="form-input-item">
            <label htmlFor="">Password</label>
            <input type="password" name="password" onChange={handleChange} />
          </div>
          <button onClick={handleSubmit}>Login</button>
        </form>
        <span>
          Not a member? <Link to="/signup">Signup</Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
