import React, { useState } from "react";

import "./Blogs.css";
import SearchBox from "../components/SearchBox";

const Blogs = () => {
  const [inputs, setInputs] = useState({ searchText: "", category: "all" });

  return (
    <main className="page-blogs">
      <SearchBox inputs={inputs} setInputs={setInputs} />
      <section className="blogs__container"></section>
    </main>
  );
};

export default Blogs;
