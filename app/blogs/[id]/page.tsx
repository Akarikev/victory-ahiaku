import BlogContent from "@/components/blog-content";
import { BlogD } from "@/lib/types/data";
import React from "react";

async function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { data: blogs } = (await fetch(
    "http://localhost:3000/api/blog?id=" + params.id
  ).then((res) => res.json())) as { data: BlogD };

  if (!blogs?.id) {
    return <h1>Not found</h1>;
  }

  return (
    <div className="max-w-5xl mx-auto min-h-screen pt-10 space-y-10">
      <div>
        <h1>{blogs?.title}</h1>

        <BlogContent blogId={blogs.id} />
      </div>
    </div>
  );
}

export default Page;
