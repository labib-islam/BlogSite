import axios from "axios";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import AuthContext from "../../shared/contexts/AuthContext";
import { useParams } from "react-router";
import JoditEditor from "jodit-react";

import "./UpdateBlog.css";

export const UpdateBlog = () => {
  const { userId } = useContext(AuthContext);
  const [loadedBlog, setLoadedBlog] = useState();
  const bid = useParams().bid;

  const [inputs, setInputs] = useState({
    title: "",
    content: "",
  });

  const editor = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: "Start typing...",
    }),
    []
  );

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEditorChange = (newContent) => {
    setInputs((prev) => ({
      ...prev,
      content: newContent,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/blogs/${bid}`,
        inputs
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBlog = async () => {
    try {
      const responseData = await axios.get(
        `http://localhost:5000/api/blogs/${bid}`
      );

      setLoadedBlog(responseData.data.blog);
      inputs.title = responseData.data.blog.title;
      inputs.content = responseData.data.blog.content;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <>
      {loadedBlog && (
        <div className="page-margin">
          <form>
            <div>
              <label htmlFor="">Title</label>
              <input
                type="text"
                name="title"
                value={inputs.title}
                onChange={handleChange}
              />
            </div>
            <div className="blog-image__container">
              <img
                src={`http://localhost:5000/${loadedBlog.imageUrl}`}
                alt="Blog Image"
                className="blog-image"
              />
            </div>
            <JoditEditor
              ref={editor}
              value={inputs.content}
              config={config}
              tabIndex={1} // tabIndex of textarea
              onChange={handleEditorChange}
            />
            <div>
              <label htmlFor="">Category: {loadedBlog.category}</label>
            </div>
            <button onClick={handleSubmit}>Update</button>
          </form>
        </div>
      )}
    </>
  );
};
