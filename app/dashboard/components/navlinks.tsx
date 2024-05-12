"use client";

import { cn } from "@/lib/utils";
import { BookIcon, Plus, User2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function NavLinks() {
  const pathname = usePathname();
  const links = [
    {
      href: "/dashboard",
      text: "dashboard",
      Icon: BookIcon,
    },
    {
      href: "/dashboard/user",
      text: "user",
      Icon: User2,
    },
    {
      href: "/dashboard/blog/create",
      text: "create blog",
      Icon: Plus,
    },
  ];
  return (
    <div className="flex items-center gap-5">
      {links.map(({ href, text, Icon }, i) => {
        return (
          <Link
            key={i}
            href={href}
            className={cn(
              "inline-flex items-center gap-1 hover:underline transition-all",
              { "text-blue-500 underline": pathname === href }
            )}
          >
            <Icon className="w-4 h-4" />
            {text}
          </Link>
        );
      })}
    </div>
  );
}

export default NavLinks;
