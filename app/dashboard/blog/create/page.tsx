"use client";

import React from "react";
import BlogForm from "../../components/blog-form";
import { BlogSchemaType } from "../../schema";

function page() {
  const handleCreateBlog = (data: BlogSchemaType) => {
    console.log(data);
  };
  return <BlogForm onHandleSubmit={handleCreateBlog} />;
}

export default page;
