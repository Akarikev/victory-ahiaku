"use server";

import { BlogSchemaType } from "@/app/dashboard/schema";
import { createClient } from "@/utils/supabase/server";

const server = createClient();

export async function createBlog(data: BlogSchemaType) {
  const { ["content"]: excludeKey, ...blog } = data;
  const resB = await server.from("blogs").insert(blog).select("id").single();

  if (resB.error) {
    return JSON.stringify(resB);
  } else {
    const resA = await server
      .from("blog_content")
      .insert({ blog_id: resB.data.id!, content: data.content });

    return JSON.stringify(resA);
  }
}

export async function ReadBlogs() {
  return server.from("blogs").select("*").order("created_at", {
    ascending: true,
  });
}
