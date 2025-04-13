import axios from "axios";
import React, { useEffect, useState } from "react";
import Blogs from "../../shared/components/Blogs";
import { useParams } from "react-router";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import ErrorCard from "../../shared/components/ErrorCard";

const AdminBlogs = () => {
  const [inputs, setInputs] = useState({
    searchText: "",
    category: "all",
    status: "all",
  });

  const [loadedBlogs, setLoadedBlogs] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const { status } = useParams();

  const fetchBlogs = async (e) => {
    if (e) e.preventDefault();
    try {
      setIsLoading(true);
      const responseData = await axios.get(
        `/api/blog/admin/blogs?search=${inputs.searchText}&cat=${inputs.category}&status=${inputs.status}`
      );
      setLoadedBlogs(responseData.data.blogs);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      setError(err);
    }
  };

  useEffect(() => {
    if (status) inputs.status = status;

    fetchBlogs();
  }, []);

  return (
    <>
      {error && <ErrorCard error={error} />}

      {!error && loadedBlogs && (
        <Blogs
          inputs={inputs}
          setInputs={setInputs}
          fetchBlogs={fetchBlogs}
          showStatus={true}
          loadedBlogs={loadedBlogs}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default AdminBlogs;
