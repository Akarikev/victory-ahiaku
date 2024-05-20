import { ReadBlogsContent } from "@/lib/actions/blog";
import React from "react";
import EditForm from "./components/edit-form";

async function EditPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { data: blog } = await ReadBlogsContent(params.id);

  return <EditForm blog={blog} />;
}

export default EditPage;
