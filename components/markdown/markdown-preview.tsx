import { cn } from "@/lib/utils";
import React from "react";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "hylight.js/styles/atom-one-dark.min.css";

function MarkdownPreview({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  return (
    <Markdown
      className={cn("space-y-6", className)}
      components={{
        h1: ({ node, ...props }) => {
          return (
            <h1
              {...props}
              className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight"
            />
          );
        },
        h2: ({ node, ...props }) => {
          return (
            <h2
              {...props}
              className="text-xl md:text-xl lg:text-2xl font-semibold tracking-tight"
            />
          );
        },
        h3: ({ node, ...props }) => {
          return <h3 {...props} className="text-xl" />;
        },
        a: ({ node, ...props }) => {
          return <a {...props} className="underline text-gray-400" />;
        },
      }}
      rehypePlugins={[rehypeHighlight]}
    >
      {content}
    </Markdown>
  );
}

export default MarkdownPreview;
