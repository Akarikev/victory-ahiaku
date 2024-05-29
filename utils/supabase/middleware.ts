import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      // Configure cookies
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: "", ...options });
        },
      },
    }
  );

  await supabase.auth.getUser();

  const { data } = await supabase.auth.getUser();
  console.log("User role:", data.user?.user_metadata.role);

  if (data.user?.user_metadata.role === "admin") {
    // If the user is an admin, allow them to access the dashboard
    // return NextResponse.next();
  } else {
    // If the user is not an admin or is not logged in, redirect to the homepage
    // return NextResponse.redirect(new URL("/", request.url));
  }
}
