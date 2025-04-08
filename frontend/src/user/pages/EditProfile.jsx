import React, { useContext, useState } from "react";

import "./EditProfile.css";
import AuthContext from "../../shared/contexts/AuthContext";
import DragDropImageUploader from "../components/DragDropImageUploader";
import { useNavigate } from "react-router";
import axios from "axios";

const EditProfile = () => {
  const {
    username,
    image: userImage,
    userEmail,
    userId,
    getLoggedIn,
  } = useContext(AuthContext);
  const [image, setImage] = useState(() => {
    if (!userImage) {
      return null;
    }
    return {
      name: "default",
      url: `/api/${userImage}`,
      file: "default",
    };
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || image.file == "default") {
      navigate(`/user/${userId}/blogs`);
      return;
    }
    try {
      const formData = new FormData();
      formData.append("image", image.file);
      const res = await axios.patch(`/api/user/${userId}`, formData);
      getLoggedIn();
      navigate(`/user/${userId}/blogs`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="page-edit-profile">
      <div className="edit-profile__container">
        <section className="user-info__container edit">
          <figure>
            <DragDropImageUploader
              image={image}
              setImage={setImage}
              canDrag={false}
            />
          </figure>
          <article>
            <header>{username}</header>
            <span>{userEmail}</span>
          </article>
        </section>
        <button className="save-button green-button" onClick={handleSubmit}>
          Save
        </button>
      </div>
    </main>
  );
};

export default EditProfile;
