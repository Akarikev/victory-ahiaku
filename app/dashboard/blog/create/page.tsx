"use client";

import React from "react";
import BlogForm from "../../components/blog-form";
import { BlogSchemaType } from "../../schema";
import { createBlog } from "@/lib/actions/blog";

import { useToast } from "@/components/ui/use-toast";

function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { toast } = useToast();
  const handleCreateBlog = async (data: BlogSchemaType) => {
    const getSendBlog = await createBlog(data);

    const { error } = JSON.parse(getSendBlog);

    if (error?.message) {
      toast({
        title: "error",
        description: error?.message,
      });
    } else {
      toast({
        title: "succesfully added blog",
      });
    }
    console.log(data);
  };
  return <BlogForm onHandleSubmit={handleCreateBlog} />;
}

export default page;
