import axios from "axios";
import React, { useEffect, useState } from "react";
import Blogs from "../../shared/components/Blogs";
import { useParams } from "react-router";

const AdminBlogs = () => {
  const [inputs, setInputs] = useState({
    searchText: "",
    category: "all",
    status: "all",
  });

  const [loadedBlogs, setLoadedBlogs] = useState();
  const { status } = useParams();

  const fetchBlogs = async (e) => {
    if (e) e.preventDefault();
    try {
      const responseData = await axios.get(
        `/api/blog/admin/blogs?search=${inputs.searchText}&cat=${inputs.category}&status=${inputs.status}`
      );
      setLoadedBlogs(responseData.data.blogs);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (status) inputs.status = status;

    fetchBlogs();
  }, []);

  return (
    <>
      {loadedBlogs && (
        <Blogs
          inputs={inputs}
          setInputs={setInputs}
          fetchBlogs={fetchBlogs}
          showStatus={true}
          loadedBlogs={loadedBlogs}
        />
      )}
    </>
  );
};

export default AdminBlogs;
