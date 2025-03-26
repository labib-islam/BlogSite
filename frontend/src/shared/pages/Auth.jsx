import React, { useRef, useState } from "react";
import UserIcon from "../../assets/icons/user-icon.svg?react";
import axios from "axios";

import "./Auth.css";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [image, setImage] = useState();
  const imageInputRef = useRef(null);
  const selectImage = () => {
    imageInputRef.current.click();
  };
  const onSelectImage = (e) => {
    const file = e.target.files[0];
    if (!file || file.type.split("/")[0] !== "image") return;
    setImage({
      name: file.name,
      url: URL.createObjectURL(file),
      file: file,
    });
  };
  const deleteImage = (e) => {
    e.stopPropagation();
    setImage(null);
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (isSignup) {
        const formData = new FormData();
        formData.append("username", inputs.username);
        formData.append("image", image.file);
        formData.append("email", inputs.email);
        formData.append("password", inputs.password);
        data = formData;
      } else {
        data = {
          email: inputs.email,
          password: inputs.password,
        };
      }

      const res = await axios.post(
        `/api/auth/${isSignup ? "signup" : "login"}`,
        data
      );
      getLoggedIn();
      navigate("/");
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <main className="page-auth">
      <section className="auth-section__container">
        <header className="auth-header">
          <h1>{isSignup ? "Signup" : "Login"}</h1>
        </header>

        <form className="auth-form" onSubmit={handleSubmit}>
          {isSignup && (
            <section className="image-username__container">
              <div className="image__container" onClick={selectImage}>
                <input
                  type="file"
                  ref={imageInputRef}
                  onChange={onSelectImage}
                />

                {image ? (
                  <>
                    <span className="delete" onClick={deleteImage}>
                      &times;
                    </span>
                    <img src={image.url} alt="" />
                  </>
                ) : (
                  <>
                    <span className="add">+</span>
                    <UserIcon className="user-icon" />
                  </>
                )}
              </div>
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
              />
            </section>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <button>{isSignup ? "Signup" : "Login"}</button>
        </form>

        <footer className="auth-footer">
          Don't have an account?{" "}
          <span onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Login" : "Signup"}
          </span>
        </footer>
      </section>
    </main>
  );
};

export default Auth;
