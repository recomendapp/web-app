import type { Database } from '@/types/type.db';

declare global {
  type Database = Database;
}
