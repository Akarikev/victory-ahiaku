"use client";

import BlogForm from "@/app/dashboard/components/blog-form";
import { BlogSchemaType } from "@/app/dashboard/schema";
import { useToast } from "@/components/ui/use-toast";
import { BlogDetails } from "@/lib/types/data";
import React from "react";

function EditForm({ blog }: { blog: BlogDetails }) {
  const { toast } = useToast();

  return <BlogForm onHandleSubmit={() => {}} blog={blog} />;
}

export default EditForm;
