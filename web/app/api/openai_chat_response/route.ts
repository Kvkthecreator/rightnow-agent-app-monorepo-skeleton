import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const payload = await req.json();
  console.log("Return payload:", payload);
  // TODO: write to Supabase or whatever
  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}
