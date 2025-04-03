import axios from "axios";
import React, { useEffect, useState } from "react";
import Blogs from "../../shared/components/Blogs";

const AdminBlogs = () => {
  const [inputs, setInputs] = useState({
    searchText: "",
    category: "all",
    status: "all",
  });

  const [loadedBlogs, setLoadedBlogs] = useState();

  const fetchBlogs = async (e, status = "all") => {
    if (e) e.preventDefault();
    try {
      const responseData = await axios.get(
        `/api/blog/admin/blogs?search=${inputs.searchText}&cat=${inputs.category}&status=${status}`
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
          showStatus={true}
          loadedBlogs={loadedBlogs}
        />
      )}
    </>
  );
};

export default AdminBlogs;
