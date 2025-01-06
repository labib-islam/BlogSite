import React from "react";
import avatarImage from "../../../assets/user.jpg";

import "./UserAvatar.css";

const UserAvatar = (props) => {
  return (
    <div className="user-avatar__container">
      <div className="user-avatar__image">
        <img
          src={`http://localhost:5000/${props.image}`}
          alt="Blog Image"
          className="blog-image"
        />
      </div>
      <span className="user-avatar__author">{props.author}</span>
    </div>
  );
};

export default UserAvatar;
