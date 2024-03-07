import { createRouteHandlerClient } from '@/lib/supabase/route';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = createRouteHandlerClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  console.log('request', request)

  // URL to redirect to after sign in process completes
  return NextResponse.redirect('/');
}
