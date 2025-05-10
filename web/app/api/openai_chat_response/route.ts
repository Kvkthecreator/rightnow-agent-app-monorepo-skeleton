console.log('👉 Render dispatch hit this handler', {
  url: process.env.NEXT_PUBLIC_API_URL,
  incoming: true,
})


import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabaseServerClient'

export async function POST(req: NextRequest) {
  const payload = await req.json()

  const supabaseAdmin = getSupabaseAdmin()

  const { data, error } = await supabaseAdmin
    .from('agent_messages')
    .insert([{
      task_id:         payload.task_id,
      user_id:         payload.user_id,
      agent_type:      payload.agent_type,
      message_type:    payload.message_type,
      message_content: payload.message_content,
      created_at:      payload.created_at,
    }])

  if (error) {
    console.error('Supabase insert error:', error)
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 })
  }

  return NextResponse.json({ ok: true, record: data![0] })
}
