import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/__generated__/type.db';

export const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);
