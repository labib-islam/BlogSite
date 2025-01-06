import axios from "axios";
import React, { useMemo, useRef, useState } from "react";
import JoditEditor from "jodit-react";

const AddBlog = () => {
  const [inputs, setInputs] = useState({
    title: "",
    image: "",
    content: "",
    category: "tech",
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
    console.log(inputs);
    try {
      const formData = new FormData();
      formData.append("title", inputs.title);
      formData.append("image", inputs.image);
      formData.append("content", inputs.content);
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
    <div className="page-margin">
      <form>
        <div>
          <label htmlFor="">Title</label>
          <input type="text" name="title" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="">Image</label>
          <input type="file" name="image" onChange={handleChange} />
        </div>
        <JoditEditor
          ref={editor}
          value={inputs.content}
          config={config}
          tabIndex={1} // tabIndex of textarea
          onChange={handleEditorChange}
        />
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
