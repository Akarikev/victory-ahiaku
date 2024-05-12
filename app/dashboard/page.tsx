import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import BlogTable from "./components/blog-table";

function Dashboard() {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mt-6">
        <h1 className="text-2xl tracking-tight font-bold">Blogs</h1>
        <Link
          href={"/dashboard/blog/create"}
          className={buttonVariants({
            variant: "outline",
          })}
        >
          Create a new blog
        </Link>
      </div>
      <BlogTable />
    </div>
  );
}

export default Dashboard;
