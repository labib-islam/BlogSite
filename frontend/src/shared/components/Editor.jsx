import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import EditorjsList from "@editorjs/list";

import "./Editor.css";

export const Editor = ({ handleChange, content, readOnly = false }) => {
  const isReady = useRef(false);

  const config = {
    placeholder: "Let's write an awesome blog!",
    autofocus: !readOnly,
    data: content ? { blocks: content } : {},
    readOnly: readOnly,

    tools: {
      header: Header,
      list: EditorjsList,
    },

    onChange: async (api, event) => {
      // console.log("Now I know that Editor's content changed!", event);
      const savedData = await api.saver.save(); // Fetch the content
      // console.log("Saved Content:", savedData);
      handleChange(savedData); // Update the parent state with the new content
    },
  };

  const initEditor = () => {
    const editor = new EditorJS(config);
  };
  useEffect(() => {
    if (!isReady.current) {
      initEditor();
      isReady.current = true;
    }
  }, []);

  return <div id="editorjs"></div>;
};
