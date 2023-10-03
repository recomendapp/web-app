import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = String(process.env.NEXT_PUBLIC_SUPABASE_URL);
const supabaseAnonKey = String(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

// export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const supabase = createClientComponentClient();