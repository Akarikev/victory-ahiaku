"use client";

import React from "react";
import { Button } from "./ui/button";
import { LogIn } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { usePathname } from "next/navigation";

function Login() {
  const client = createClient();

  const pathname = usePathname();

  const LogUserIn = async () => {
    client.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: location.origin + "/auth/callback?next=" + pathname,
      },
    });
  };
  return (
    <>
      <Button
        variant={"outline"}
        className="inline-flex gap-1"
        onClick={LogUserIn}
      >
        <LogIn className="w-4 h-4" />
        Login
      </Button>
    </>
  );
}

export default Login;
