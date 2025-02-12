import React from "react";
import blogImage from "../../../assets/post-image.jpeg";
import avatarImage from "../../../assets/user.jpg";

import "./BlogCard.css";
import { Link } from "react-router";
import UserAvatar from "../../user/components/UserAvatar";
import CategoryCard from "./CategoryCard";

const BlogCard = (props) => {
  return (
    <Link to={`/blogs/${props.item._id}`}>
      <div key={props.item._id} className="blog-card__container">
        <div className="blog-card__image">
          <img
            src={`http://localhost:5000/${props.item.imageUrl}`}
            alt="Blog Image"
          />
        </div>
        <div className="blog-card__content">
          <h2 className="blog-card__title">{props.item.title}</h2>
          {/* <div
            className="blog-card__preview"
            dangerouslySetInnerHTML={{ __html: props.item.content }}
          /> */}
          <div className="blog-card__avatar-container">
            <UserAvatar
              author={props.item.author.username}
              image={props.item.author.imageUrl}
            />
            <CategoryCard category={props.item.category} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
