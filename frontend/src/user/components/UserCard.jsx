import React from "react";
import UserIcon from "../../assets/icons/user-icon.svg?react";

import "./UserCard.css";

const UserCard = ({ name, image }) => {
  return (
    <article className="user-card">
      <figure>
        {image ? (
          <img src={`/api/${image}`} alt="" />
        ) : (
          <UserIcon className="user-icon" />
        )}
      </figure>
      <span>{name}</span>
    </article>
  );
};

export default UserCard;
