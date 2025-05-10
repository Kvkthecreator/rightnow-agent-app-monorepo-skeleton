import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseServerClient";

export async function POST(req: Request) {
  let payload;
  try {
    payload = await req.json();
    console.log("👉 Render → return_output payload:", payload);
  } catch (err) {
    console.error("Failed to parse JSON:", err);
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // instantiate the admin client
  const supabaseAdmin = getSupabaseAdmin();

  const { data, error } = await supabaseAdmin
    .from("agent_messages")
    .insert({
      task_id:        payload.task_id,
      user_id:        payload.user_id,
      agent_type:     payload.agent_type,
      message_type:   payload.message_type,
      message_content: payload.message_content,
    });

  if (error) {
    console.error("❌ Supabase insert error:", error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  console.log("✅ Inserted message:", data);
  return NextResponse.json({ ok: true });
}
