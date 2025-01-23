import axios from "axios";
import React, { useEffect, useMemo, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { Editor } from "../components/Editor";

import "./AddBlog.css";

const AddBlog = () => {
  const [inputs, setInputs] = useState({
    title: "",
    image: "",
    content: {},
    category: "tech",
  });

  const editorr = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: "Start typing...",
    }),
    []
  );

  const handleChange = (e) => {
    if (e.target.name === "image")
      setInputs((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
    else setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEditorChange = (newContent) => {
    setInputs((prev) => ({
      ...prev,
      content: newContent,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", inputs.title);
      formData.append("image", inputs.image);
      formData.append("content", JSON.stringify(inputs.content));
      formData.append("category", inputs.category);
      const res = await axios.post(
        "http://localhost:5000/api/blogs/new",
        formData
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="page-margin add-blog__container">
      <form>
        <div>
          <label htmlFor="">Title</label>
          <input type="text" name="title" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="">Image</label>
          <input type="file" name="image" onChange={handleChange} />
        </div>
        {/* <JoditEditor
          ref={editorr}
          value={inputs.content}
          config={config}
          tabIndex={1} // tabIndex of textarea
          onChange={handleEditorChange}
        /> */}
        <Editor handleChange={handleEditorChange} />
        <div>
          <label htmlFor="">Category</label>

          <select name="category" id="category" onChange={handleChange}>
            <option value="tech">Tech</option>
            <option value="business">Business</option>
            <option value="science">Science</option>
            <option value="travel">Travel</option>
          </select>
        </div>
        <button onClick={handleSubmit}>Create</button>
      </form>
    </div>
  );
};

export default AddBlog;
