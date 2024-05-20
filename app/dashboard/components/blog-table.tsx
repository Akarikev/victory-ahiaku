import { Button } from "@/components/ui/button";
import { EyeIcon, PencilLine, TrashIcon } from "lucide-react";
import React from "react";
import { Switch } from "@/components/ui/switch";
import { ReadBlogs, UpdateBlogsById } from "@/lib/actions/blog";
import ALertDelete from "@/components/alert-delete";
import SwitchForm from "@/components/switch-form";
import { BlogSchemaType } from "../schema";
import Link from "next/link";

async function BlogTable() {
  const { data: blogs } = await ReadBlogs();

  return (
    <div className="overflow-x-auto">
      <div className="border bg-gradient-dark rounded-md w-[900px] md:w-full ">
        <div className="grid grid-cols-5 p-5 text-gray-500">
          <div className="col-span-2">Title</div>
          <div>Premium</div>
          <div>Publish</div>
        </div>

        {blogs?.map((blog, i) => {
          const isPremiumBlog = UpdateBlogsById.bind(null, blog.id, {
            is_premium: !blog.is_premium,
          } as BlogSchemaType);
          const isPublishedBlog = UpdateBlogsById.bind(null, blog.id, {
            is_published: !blog.is_published,
          } as BlogSchemaType);
          return (
            <div className="grid grid-cols-5 p-5" key={i}>
              <h1 className="col-span-2 ">{blog.title}</h1>
              {/* <Switch checked={blog.is_premium} />
              <Switch checked={blog.is_published} /> */}

              <SwitchForm
                checked={blog.is_premium}
                name="Premium"
                onToggle={isPremiumBlog}
              />
              <SwitchForm
                checked={blog.is_published}
                name="Published"
                onToggle={isPublishedBlog}
              />

              <Action blogId={blog.id} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BlogTable;

const Action = ({ blogId }: { blogId: string }) => {
  const actions = [];
  return (
    <div className="flex items-center gap-5 flex-wrap xl:flex-row">
      <Button
        variant={"link"}
        className="inline-flex items-center justify-center gap-x-1"
      >
        <EyeIcon className="w-4 h-4" /> view
      </Button>
      {/* add delete */}

      <ALertDelete blogId={blogId} />

      <Link href={"/dashboard/blog/edit/" + blogId}>
        <Button
          variant={"link"}
          className="inline-flex items-center justify-center gap-x-1"
        >
          <PencilLine className="w-4 h-4" /> Edit
        </Button>
      </Link>
    </div>
  );
};
