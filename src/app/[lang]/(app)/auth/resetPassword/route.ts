import { createRouteHandlerClient } from '@/lib/supabase/route';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  // const proto = new URL(request.url).protocol;
  // const host = request.headers.get("host") ?? "";
  try {
    const code = requestUrl.searchParams.get('code');
    if (!code) throw new Error('No code provided');
    const supabase = createRouteHandlerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) throw error;

    // URL to redirect to after sign in process completes
    // return NextResponse.redirect(`${proto}//${host}/settings/security`);
    return NextResponse.redirect(new URL('/settings/security', requestUrl));
  } catch (error) {
    // return the user to the password reset page
    // return NextResponse.redirect(`${proto}//${host}/auth/error?error=${error}`);
    const errorUrl = new URL('/auth/forgotPassword', requestUrl);
    errorUrl.searchParams.set('error', `${error}`);
    return NextResponse.redirect(errorUrl);
  }
}
