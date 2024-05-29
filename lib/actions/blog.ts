"use server";

import { BlogSchemaType } from "@/app/dashboard/schema";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

const DASHBOARD = "/dashboard";

export async function createBlog(data: BlogSchemaType) {
  const server = createClient();
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
  const server = createClient();
  return server
    .from("blogs")
    .select("*")
    .eq("is_published", true)
    .order("created_at", {
      ascending: true,
    });
}

export async function ReadBlogsByAdmin() {
  const server = createClient();
  return server
    .from("blogs")
    .select("*")

    .order("created_at", {
      ascending: true,
    });
}

export async function DeleteBlogsById(blogId: string) {
  const server = createClient();
  const res = await server.from("blogs").delete().eq("id", blogId);

  revalidatePath("/blogs/" + blogId);
  revalidatePath(DASHBOARD);

  return JSON.stringify(res);
}

export async function UpdateBlogsById(blogId: string, data: BlogSchemaType) {
  const server = createClient();
  const res = await server.from("blogs").update(data).eq("id", blogId);

  revalidatePath(DASHBOARD);
  revalidatePath(`/blogs/${blogId}`);
  console.log(`/blogs/${blogId}`);

  return JSON.stringify(res);
}

export async function ReadBlogsContent(blogId: string) {
  const server = createClient();
  return server
    .from("blogs")
    .select("*, blog_content(*)")
    .eq("id", blogId)
    .single();
}

export async function UpdateBlogsDetailsById(
  blogId: string,
  data: BlogSchemaType
) {
  const server = createClient();

  const { ["content"]: excludeKey, ...blog } = data;

  const resBlog = await server.from("blogs").update(blog).eq("id", blogId);

  if (resBlog.error) {
    return JSON.stringify(resBlog);
  } else {
    const res = await server
      .from("blog_content")
      .update({ content: data.content })
      .eq("blog_id", blogId);
    revalidatePath(DASHBOARD);
    revalidatePath(`/blogs/${blogId}`);
    return JSON.stringify(res);
  }
}
