"use client";

import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import MarkdownPreview from "./markdown/markdown-preview";

function BlogContent({ blogId }: { blogId: string }) {
  const [readBlogs, setReadBlogs] = useState<{
    blog_id: string;
    content: string;
    created_at: string;
  } | null>();
  const supabase = createClient();

  const readBlogsContent = async () => {
    const { data } = await supabase
      .from("blog_content")
      .select("*")
      .eq("blog_id", blogId)
      .single();
    setReadBlogs(data);
  };

  useEffect(() => {
    readBlogsContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <MarkdownPreview content={readBlogs?.content || ""} />;
}

export default BlogContent;
