import React from "react";
import { Table } from "@chakra-ui/react";

import "./BlogList.css";

const BlogList = () => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Image</td>
            <td>Title</td>
            <td>Author</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BlogList;
