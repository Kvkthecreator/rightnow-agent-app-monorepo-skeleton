import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseServerClient';

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    console.log('Received profile report:', payload);

    // Optional: insert into Supabase. Adjust table name and payload shape as needed.
    const supabase = getSupabaseAdmin();
    /*
    const { data, error } = await supabase
      .from('profile_reports')
      .insert([{ ...payload }]);
    if (error) {
      console.error('Supabase insert error:', error);
    }
    */

    return NextResponse.json({ status: 'ok' }, { status: 200 });
  } catch (error: any) {
    console.error('Error in receive_report route:', error);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}