import { createRouteHandlerClient } from '@/lib/supabase/route';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  try {
    const code = requestUrl.searchParams.get('code');
    const next = requestUrl.searchParams.get('next') ?? '/';
    
    if (!code) throw new Error('No code provided');
    const supabase = createRouteHandlerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) throw error;
    
    // URL to redirect to after sign in process completes
    return NextResponse.redirect(new URL(next, requestUrl));
  
  } catch (error) {
    console.error(`error [${new Date().toISOString()}]:`, error);
    // return the user to the error page
    return NextResponse.redirect(new URL('/auth/error', requestUrl));
  }
}
