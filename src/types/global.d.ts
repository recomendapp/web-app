import type { Database as DBSupabase } from '@/types/__generated__/type.db';

declare global {
  type Database = DBSupabase;
}
