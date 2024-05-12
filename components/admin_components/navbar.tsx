"use client";

import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { LogIn } from "lucide-react";
import Login from "../login";
import { useUser } from "@/lib/store/user";
import Profile from "../profile";

import { usePathname } from "next/navigation";

function Navbar() {
  const pathname = usePathname();
  console.log(pathname);

  const user = useUser((state) => state.user);
  return (
    <nav className="flex items-center justify-between">
      <div className="group">
        <Link href={"/"} className=" lg:text-2xl font-bold">
          Victory-Ahiaku
        </Link>
        <div className="h-1 w-0 group-hover:w-full transition-all bg-blue-600"></div>
      </div>

      {user ? <Profile /> : <Login />}
    </nav>
  );
}

export default Navbar;
