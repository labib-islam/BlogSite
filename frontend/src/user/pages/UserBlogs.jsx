import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../shared/contexts/AuthContext";
import { useParams } from "react-router";
import Blogs from "../../shared/components/Blogs";

const UserBlogs = () => {
  const { userId } = useContext(AuthContext);
  const { status } = useParams();
  const [inputs, setInputs] = useState({ searchText: "", category: "all" });
  const [loadedBlogs, setLoadedBlogs] = useState();

  const fetchBlogs = async (e) => {
    if (e) e.preventDefault();
    try {
      const responseData = await axios.get(
        `/api/blog/user/${userId}/${status}?search=${inputs.searchText}&cat=${inputs.category}`
      );
      setLoadedBlogs(responseData.data.blogs);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <>
      {loadedBlogs && (
        <Blogs
          inputs={inputs}
          setInputs={setInputs}
          fetchBlogs={fetchBlogs}
          loadedBlogs={loadedBlogs}
        />
      )}
    </>
  );
};

export default UserBlogs;
