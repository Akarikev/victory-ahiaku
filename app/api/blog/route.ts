import { Database } from "@/lib/types/supabase";
import { createClient } from "@/utils/supabase/client";

export async function GET(req: Request) {
  const supabase = createClient();

  const { searchParams } = new URL(req.url);

  const id = searchParams.get("id");

  if (id === "*") {
    const result = await supabase.from("blogs").select("id").limit(10);
    return Response.json({ ...result });
  } else if (id) {
    const result = await supabase
      .from("blogs")
      .select("*")
      .eq("id", id)
      .single();

    return Response.json({ ...result });
  }

  return Response.json({});
}
