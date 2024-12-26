import React, { useState } from "react";
import { Link } from "react-router";

const Signup = () => {
  const [inputs, setInputs] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <span className="span-text">Signup</span>
        <form>
          <div className="form-input-item">
            <label htmlFor="">First Name</label>
            <input type="firstname" name="firstname" onChange={handleChange} />
          </div>
          <div className="form-input-item">
            <label htmlFor="">Last Name</label>
            <input type="lastname" name="lastname" onChange={handleChange} />
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
