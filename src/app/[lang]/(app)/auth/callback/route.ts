import { createRouteHandlerClient } from '@/lib/supabase/route';
import { createServerClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') ?? '/';

  if (code) {
    const supabase = createRouteHandlerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
        // URL to redirect to after sign in process completes
      return NextResponse.redirect(next);
    }
  }

  // console.log('request', request)

  // return the user to the error page
  return NextResponse.redirect('/auth/error');
}
