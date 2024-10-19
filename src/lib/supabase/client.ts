import { createBrowserClient } from '@supabase/ssr';

export const supabase = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);


// const createBrowserClient = () => {
//   return createBrowserClientSupabase<Database>(
//       process.env.NEXT_PUBLIC_SUPABASE_URL!,
//       process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     );
// };

// export const supabase = createBrowserClient();