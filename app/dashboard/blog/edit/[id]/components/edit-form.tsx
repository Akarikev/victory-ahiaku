"use client";

import BlogForm from "@/app/dashboard/components/blog-form";
import { BlogSchemaType } from "@/app/dashboard/schema";
import { useToast } from "@/components/ui/use-toast";
import { UpdateBlogsDetailsById } from "@/lib/actions/blog";
import { BlogDetails } from "@/lib/types/data";
import { useRouter } from "next/navigation";
import React from "react";

function EditForm({ blog }: { blog: BlogDetails }) {
  const { toast } = useToast();

  const router = useRouter();
  const ohandleEditBlog = async (data: BlogSchemaType) => {
    const getblogDetailbyId = await UpdateBlogsDetailsById(blog?.id!, data);

    const { error } = JSON.parse(getblogDetailbyId);

    if (error?.message) {
      toast({
        variant: "destructive",
        title: "error",
        description: error?.message,
      });
    } else {
      toast({
        title: "succesfully updated blog",
      });
      router.push("/dashboard");
    }
    console.log(data);
  };

  return <BlogForm onHandleSubmit={ohandleEditBlog} blog={blog} />;
}

export default EditForm;
