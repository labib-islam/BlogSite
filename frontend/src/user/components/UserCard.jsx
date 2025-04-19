import React from "react";
import UserIcon from "../../assets/icons/user-icon.svg?react";

import "./UserCard.css";
import { Link, useNavigate } from "react-router";

const UserCard = ({ name, image, userId }) => {
  const navigate = useNavigate();
  return (
    <article
      className="user-card"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        navigate(`/user/${userId}/blogs`);
      }}
    >
      <figure>
        {image ? (
          <img src={image} alt="" />
        ) : (
          <UserIcon className="user-icon" />
        )}
      </figure>
      <span>{name ? name : "Name Not Found"}</span>
    </article>
  );
};

export default UserCard;
