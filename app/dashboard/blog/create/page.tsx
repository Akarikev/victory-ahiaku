"use client";

import React from "react";
import BlogForm from "../../components/blog-form";
import { BlogSchemaType } from "../../schema";
import { createBlog } from "@/lib/actions/blog";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

function Page() {
  const { toast } = useToast();

  const router = useRouter();
  const handleCreateBlog = async (data: BlogSchemaType) => {
    const getSendBlog = await createBlog(data);

    const { error } = JSON.parse(getSendBlog);

    if (error?.message) {
      toast({
        variant: "destructive",
        title: "error",
        description: error?.message,
      });
    } else {
      toast({
        title: "succesfully added blog",
      });
      router.push("/dashboard");
    }
    console.log(data);
  };
  return <BlogForm onHandleSubmit={handleCreateBlog} />;
}

export default Page;
