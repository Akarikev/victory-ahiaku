import { create } from "zustand";
import { User } from "@supabase/supabase-js";
interface UserState {
  user?: User | undefined;
  setUser: (user: User | undefined) => void;
  loading: boolean;
}

export const useUser = create<UserState>()((set) => ({
  user: undefined,
  loading: false,
  setUser: (user) =>
    set(() => ({
      user,
    })),
}));
