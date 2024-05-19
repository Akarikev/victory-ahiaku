"use client";

import { useUser } from "@/lib/store/user";
import Image from "next/image";
import React from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import Link from "next/link";
import { BaggageClaim, LogOut } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { ModeToggle } from "./mood-toggle";
function Profile() {
  const user = useUser((state) => state.user);
  const Setuser = useUser((state) => state.setUser);
  const loadingState = useUser((state) => state.loading);

  const client = createClient();
  const userAdmin = createClient();

  const handleLogout = async () => {
    await client.auth.signOut();
    Setuser(undefined);
  };

  const isAdmin = user?.user_metadata.role;

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Image
            src={`${user?.user_metadata.avatar_url}`}
            width={35}
            height={35}
            alt={"user image"}
            className="rounded-full shadow-md ring-2 ring-blue-500"
          />
        </PopoverTrigger>
        <PopoverContent>
          <div className=" space-y-2 px-2 text-sm divide-y">
            <p className="font-semibold">{user?.user_metadata.full_name}</p>
            <p className="text-gray-400 py-2">{user?.email}</p>
            {isAdmin === "admin" && (
              <Link href={"/dashboard/"} className="block">
                <Button
                  variant={"link"}
                  className="w-full inline-flex -ml-4 items-center justify-between "
                >
                  Dashboard
                  <BaggageClaim className="w-4 h-4" />
                </Button>
              </Link>
            )}

            <button
              onClick={handleLogout}
              // variant={"link"}
              className="w-full inline-flex pt-2
               items-center justify-between text-red-400 hover:underline"
            >
              Logout
              <LogOut className="w-4 h-4" />
            </button>

            <ModeToggle />
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}

export default Profile;
