import React, { useState } from "react";
import { Link } from "react-router";
import axios from "axios";

const Signup = () => {
  const [inputs, setInputs] = useState({
    username: "",
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
        "http://localhost:5000/api/auth/signup",
        inputs
      );
      console.log(res.data);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <span className="span-text">Signup</span>
        <form>
          <div className="form-input-item">
            <label htmlFor="">Username</label>
            <input type="text" name="username" onChange={handleChange} />
          </div>
          <div className="form-input-item">
            <label htmlFor="">Email</label>
            <input type="email" name="email" onChange={handleChange} />
          </div>
          <div className="form-input-item">
            <label htmlFor="">Password</label>
            <input type="password" name="password" onChange={handleChange} />
          </div>
          <button onClick={handleSubmit}>Signup</button>
        </form>
        <span className="span-text">
          Already a member? <Link to="/login">Login</Link>
        </span>
      </div>
    </div>
  );
};

export default Signup;
