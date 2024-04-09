import { createRouteHandlerClient } from '@/lib/supabase/route';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  const redirectTo = request.nextUrl.clone()
  redirectTo.pathname = next
  redirectTo.searchParams.delete('code')

  try {
    if (!code) throw new Error('No code provided')
      const supabase = createRouteHandlerClient()
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      if (error) throw error
      return NextResponse.redirect(redirectTo)
  } catch (error) {
    // return the user to the error page
    const errorUrl = new URL('/auth/error', request.nextUrl)
    errorUrl.searchParams.set('error', `${error}`)
    return NextResponse.redirect(errorUrl)
  }
}

// export async function GET(request: NextRequest) {
//   const requestUrl = new URL(request.url);
//   try {
//     const code = requestUrl.searchParams.get('code');
//     const next = requestUrl.searchParams.get('next') ?? '/';
    
//     if (!code) throw new Error('No code provided');
//     const supabase = createRouteHandlerClient();
//     const { error } = await supabase.auth.exchangeCodeForSession(code);
//     if (error) throw error;
    
//     // URL to redirect to after sign in process completes
//     return NextResponse.redirect(new URL(next, requestUrl));
  
//   } catch (error) {
//     console.error(`error [${new Date().toISOString()}]:`, error);
//     // return the user to the error page
//     return NextResponse.redirect(new URL('/auth/error', requestUrl));
//   }
// }
