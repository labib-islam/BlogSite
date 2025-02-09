import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import AuthContext from "../../shared/contexts/AuthContext";

const Signup = () => {
  const { getLoggedIn } = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    image: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "image")
      setInputs((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
    else setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("username", inputs.username);
      formData.append("email", inputs.email);
      formData.append("image", inputs.image);
      formData.append("password", inputs.password);
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData
      );
      getLoggedIn();
      navigate("/");
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
          <div className="form-input-item">
            <label htmlFor="">Image</label>
            <input type="file" name="image" onChange={handleChange} />
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
