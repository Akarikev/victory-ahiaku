"use client";

import React, { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useUser } from "@/lib/store/user";
function SessionProvider() {
  const client = createClient();

  const setUser = useUser((state) => state.setUser);

  const readUsersSession = async () => {
    const { data } = await client.auth.getSession();

    setUser(data.session?.user);
  };

  useEffect(() => {
    readUsersSession();

    // eslint-disable-next-line
  }, []);
  return <></>;
}

export default SessionProvider;
