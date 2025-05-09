import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const payload = await req.json();
  console.log("Clarification payload:", payload);
  // TODO: store it
  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}
