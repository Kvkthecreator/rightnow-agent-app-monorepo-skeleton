import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseServerClient";

export async function POST(req: Request) {
  
  console.log("▶️  GOT INTO VERCEL POST");
  console.log("▶️  ENV:", {
  SUPABASE_URL:      process.env.NEXT_PUBLIC_SUPABASE_URL,
  SERVICE_ROLE_KEY:  !!process.env.SUPABASE_SERVICE_ROLE_KEY,
  }); 

  let payload;
  try {
    payload = await req.json();
    console.log("👉 Vercel → incoming payload:", payload);
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // 1) spin up the admin client
  const supabase = getSupabaseAdmin();

  // 2) DEBUG: make sure envs really came through:
  console.log("⏺ Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log(
    "⏺ Service key (first 8 chars):",
    process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(0, 8) + "…"
  );

  // 3) do the insert
  const { data, error } = await supabase
    .from("agent_messages")
    .insert({
      task_id:         payload.task_id,
      user_id:         payload.user_id,
      agent_type:      payload.agent_type,
      message_type:    payload.message_type,
      message_content: payload.message_content,
    });

  if (error) {
    console.error("❌ Supabase insert error:", error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  console.log("✅ Supabase insert success:", data);
  return NextResponse.json({ ok: true }, { status: 200 });
}
