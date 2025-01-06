import React, { useState } from "react";
import { EditorContent, EditorRoot } from "novel";

const Test = () => {
  const [content, setContent] = useState(null);
  return (
    <EditorRoot>
      <EditorContent
      // initialContent={content}
      // onUpdate={({ editor }) => {
      //   const json = editor.getJSON();
      //   setContent(json);
      // }}
      />
    </EditorRoot>
  );
};

export default Test;
