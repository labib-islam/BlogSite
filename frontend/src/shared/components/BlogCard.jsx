import React from "react";
import testImage from "../../assets/images/home-image.jpg";
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
          <img src={`/api/${blog.imageUrl}`} alt="Image Not Found" />
        </figure>
        <section>
          <header>{blog.title}</header>
          <footer>
            <UserCard
              name={blog.author.username}
              image={blog.author.imageUrl}
            />
            <CategoryCard category={blog.category} />
          </footer>
        </section>
      </li>
    </Link>
  );
};

export default BlogCard;
