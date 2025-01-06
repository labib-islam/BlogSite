import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import AuthContext from "../../shared/contexts/AuthContext";
import UserAvatar from "../../user/components/UserAvatar";

const BlogItem = () => {
  const { userId } = useContext(AuthContext);
  const [loadedBlog, setLoadedBlog] = useState();
  const bid = useParams().bid;

  const fetchBlog = async () => {
    try {
      const responseData = await axios.get(
        `http://localhost:5000/api/blogs/${bid}`
      );

      setLoadedBlog(responseData.data.blog);
      console.log(responseData.data.blog);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <div className="page-margin">
      {loadedBlog && (
        <>
          <h2>{loadedBlog.title}</h2>
          <div className="blog-image__container">
            <img
              src={`http://localhost:5000/${loadedBlog.imageUrl}`}
              alt="Blog Image"
              className="blog-image"
            />
          </div>
          <UserAvatar
            author={loadedBlog.author.username}
            image={loadedBlog.author.imageUrl}
          />
          <div dangerouslySetInnerHTML={{ __html: loadedBlog.content }} />
          {userId === loadedBlog.author._id && (
            <>
              <Link to={`/blogs/${loadedBlog._id}/edit`}>Edit</Link>
              <button>Delete</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default BlogItem;
