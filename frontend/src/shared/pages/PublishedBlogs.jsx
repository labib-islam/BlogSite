import axios from "axios";
import React, { useEffect, useState } from "react";
import Blogs from "../components/Blogs";
import { useLocation } from "react-router";
import { toast } from "sonner";

const PublishedBlogs = () => {
  const location = useLocation();
  const [inputs, setInputs] = useState({
    searchText: "",
    category: location.state?.category || "all",
  });
  const [loadedBlogs, setLoadedBlogs] = useState();

  const fetchBlogs = async (e) => {
    if (e) e.preventDefault();
    try {
      const responseData = await axios.get(
        `/api/blog/published?search=${inputs.searchText}&cat=${inputs.category}`
      );
      setLoadedBlogs(responseData.data.blogs);
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data ? err.response.data.message : "Something went wrong."
      );
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

export default PublishedBlogs;
