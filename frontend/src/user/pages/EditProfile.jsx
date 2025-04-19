import React, { useContext, useState } from "react";

import "./EditProfile.css";
import AuthContext from "../../shared/contexts/AuthContext";
import DragDropImageUploader from "../components/DragDropImageUploader";
import { useNavigate } from "react-router";
import axios from "axios";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import ErrorCard from "../../shared/components/ErrorCard";
import { toast } from "sonner";

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
      url: userImage,
      file: "default",
    };
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || image.file == "default") {
      navigate(`/user/${userId}/blogs`);
      return;
    }
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("image", image.file);
      const res = await axios.patch(`/api/user/${userId}`, formData);
      getLoggedIn();
      setIsLoading(false);
      toast.success("Profile Updated");
      navigate(`/user/${userId}/blogs`);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      setError(err);
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {error && <ErrorCard error={error} />}

      {!error && !isLoading && (
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
      )}
    </>
  );
};

export default EditProfile;
