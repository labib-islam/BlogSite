import React from "react";
import testImage from "../../assets/images/home-image.jpg";
import { MdImageNotSupported } from "react-icons/md";
import { Link } from "react-router";

import "./BlogCard.css";
import UserCard from "../../user/components/UserCard";
import CategoryCard from "./CategoryCard";

const BlogCard = ({ blog }) => {
  return (
    <Link
      to={`/blogs/${blog._id}`}
      className="blog-card__link"
      state={{ blog }}
    >
      <li className="blog-card">
        <figure>
          {blog.imageUrl ? (
            <img src={`/api/${blog.imageUrl}`} alt="Image Not Found" />
          ) : (
            <MdImageNotSupported className="no-image-icon" />
          )}
        </figure>
        <section>
          <header>{blog.title}</header>
          <footer>
            <UserCard
              name={blog.author.username}
              image={blog.author.imageUrl}
              userId={blog.author._id}
            />
            <CategoryCard category={blog.category} />
          </footer>
        </section>
      </li>
    </Link>
  );
};

export default BlogCard;
