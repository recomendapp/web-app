import { Database } from '@recomendapp/types';
import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';
import { SUPABASE_ANON_KEY, SUPABASE_URL } from '../env';

export const createMiddlewareClient = ({
  request,
  response,
}: {
  request: NextRequest;
  response: NextResponse;
}) => {
  return createServerClient<Database>(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );
};


