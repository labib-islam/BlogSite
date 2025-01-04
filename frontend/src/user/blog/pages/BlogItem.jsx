import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import AuthContext from "../../shared/contexts/AuthContext";

const BlogItem = () => {
  const { userId } = useContext(AuthContext);
  const [loadedBlogs, setLoadedBlogs] = useState();
  const bid = useParams().bid;

  const fetchBlogs = async () => {
    try {
      const responseData = await axios.get(
        `http://localhost:5000/api/blogs/${bid}`
      );

      setLoadedBlogs(responseData.data.blog);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      {loadedBlogs && (
        <>
          <h2>{loadedBlogs.title}</h2>
          <span>{loadedBlogs.author.username}</span>
          <div dangerouslySetInnerHTML={{ __html: loadedBlogs.content }} />
          {userId === loadedBlogs.author._id && (
            <>
              <button>Edit</button>
              <button>Delete</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default BlogItem;
