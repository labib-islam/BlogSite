import React, { useRef, useState } from "react";

import "./DragDropImageUploader.css";

const DragDropImageUploader = ({ image, setImage, canDrag }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const selectFiles = () => {
    fileInputRef.current.click();
  };

  const onFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file || file.type.split("/")[0] !== "image") return;
    setImage({
      name: file.name,
      url: URL.createObjectURL(file),
      file: file,
    });
  };

  const deleteImage = (index) => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
    e.dataTransfer.dropEffect = "copy";
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0]; // Only take the first file
    if (!file || file.type.split("/")[0] !== "image") return;

    setImage({
      name: file.name,
      url: URL.createObjectURL(file),
      file: file,
    });
  };

  return (
    <div
      className="drag-area"
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {isDragging ? (
        <span className="select">Drop Images Here</span>
      ) : (
        !image && (
          <>
            <span className="highlight">Drag & Drop Image here</span>
            <span>or</span>
            <span className="select highlight" onClick={selectFiles}>
              Browse
            </span>
          </>
        )
      )}

      <input type="file" onChange={onFileSelect} ref={fileInputRef} />

      {image && (
        <>
          <span className="delete" onClick={deleteImage}>
            &times;
          </span>
          <img src={image.url} alt={image.name} />
        </>
      )}
    </div>
  );
};

export default DragDropImageUploader;
