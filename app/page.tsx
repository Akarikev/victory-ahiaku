import { Button } from "@/components/ui/button";
import { ReadBlogs } from "@/lib/actions/blog";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const { data: blogs } = await ReadBlogs();
  return (
    <main className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 p-5 xl:p-0">
      {blogs?.map((blog, index) => {
        return (
          <Link
            href={"/blogs/" + blog.id}
            key={index}
            className="w-full border rounded-md bg-gradient-dark p-5 hover:ring-2 ring-green-500 transition-all cursor-pointer space-y-5 first:lg:col-span-2  first:md:col-span-3"
          >
            <div className="relative w-full h-72 md:h-64 xl:h-95">
              <Image
                priority
                src={blog.image_url}
                alt="image_url"
                fill
                className="rounded-md object-cover object-center"
                sizes="(max-width: 768px) 100vw, (max-width:1200px):50vw, 33vw"
              />
            </div>
            <div>
              <p className="text-sm text-gray-400">
                {new Date(blog.created_at).toDateString()}
              </p>

              <h1 className="text-xl tracking-tight font-bold">{blog.title}</h1>
            </div>
          </Link>
        );
      })}
    </main>
  );
}
