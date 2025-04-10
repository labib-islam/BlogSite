import axios from "axios";
import React, { useEffect, useState } from "react";
import Blogs from "../components/Blogs";
import { useLocation } from "react-router";
import { toast } from "sonner";
import ErrorCard from "../components/ErrorCard";
import LoadingSpinner from "../components/LoadingSpinner";

const PublishedBlogs = () => {
  const location = useLocation();
  const [inputs, setInputs] = useState({
    searchText: "",
    category: location.state?.category || "all",
  });
  const [loadedBlogs, setLoadedBlogs] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const fetchBlogs = async (e) => {
    if (e) e.preventDefault();
    try {
      setIsLoading(true);
      const responseData = await axios.get(
        `/api/blog/published?search=${inputs.searchText}&cat=${inputs.category}`
      );
      setLoadedBlogs(responseData.data.blogs);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {error && <ErrorCard error={error} />}
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
