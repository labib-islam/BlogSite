import React from "react";
import blogImage from "../../../assets/post-image.jpeg";
import avatarImage from "../../../assets/user.jpg";

import "./BlogCard.css";
import { Link } from "react-router";

const BlogCard = (props) => {
  return (
    <Link to={`/blogs/${props.item._id}`}>
      <div class="blog-card__container">
        <div className="blog-card__image">
          <img
            src={`http://localhost:5000/${props.item.imageUrl}`}
            alt="Blog Image"
            class="blog-image"
          />
        </div>
        <div class="blog-card__content">
          <h2 class="blog-card__title">{props.item.title}</h2>
          <div
            class="blog-card__preview"
            dangerouslySetInnerHTML={{ __html: props.item.content }}
          />
          <div class="blog-card__footer">
            <div className="blog-card__avatar-image">
              <img src={avatarImage} alt="Blog Image" class="blog-image" />
            </div>
            <span class="blog-card__author">{props.item.author.username}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
