import { createRouteHandlerClient } from '@/lib/supabase/route';
import { createServerClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';


export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const proto = new URL(request.url).protocol;
  const host = request.headers.get("host") ?? "";
  // return NextResponse.redirect(`${proto}//${host}${path}`);
  try {
    const code = requestUrl.searchParams.get('code');
    const next = requestUrl.searchParams.get('next') ?? '/';
    
    if (!code) throw new Error('No code provided');
    const supabase = createServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) throw error;
    
    // URL to redirect to after sign in process completes
    return NextResponse.redirect(`${proto}//${host}${next}`)
    // return NextResponse.redirect(new URL(next, request.url));
  } catch (error) {
    // return the user to the error page
    return NextResponse.redirect(`${proto}//${host}/auth/error?error=${error}`)
    // const errorUrl = new URL('/auth/error', request.url);
    // errorUrl.searchParams.set('error', `${error}`);
    // return NextResponse.redirect(errorUrl);
  }
}

// export async function GET(request: NextRequest) {
//   const { searchParams } = new URL(request.url)
//   const code = searchParams.get('code')
//   const next = searchParams.get('next') ?? '/'

//   const redirectTo = request.nextUrl.clone()
//   redirectTo.pathname = next
//   redirectTo.searchParams.delete('code')

//   try {
//     if (!code) throw new Error('No code provided')
//       const supabase = createRouteHandlerClient()
//       const { error } = await supabase.auth.exchangeCodeForSession(code)
//       if (error) throw error
//       return NextResponse.redirect(redirectTo)
//   } catch (error) {
//     // return the user to the error page
//     const errorUrl = new URL('/auth/error', request.nextUrl)
//     errorUrl.searchParams.set('error', `${error}`)
//     return NextResponse.redirect(errorUrl)
//   }
// }
