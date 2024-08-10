import type { Database as DBSupabase } from '@/types/__generated__/type.db';

type OverriddenDBSupabase = DBSupabase & {
  public: {
    Views: {
      movies: {
        Row: Omit<DBSupabase['public']['Views']['movies']['Row'], 'id'> & {
          id: number;
        };
      };
      movie: {
        Row: Omit<DBSupabase['public']['Views']['movie']['Row'], 'id'> & {
          id: number;
        };
      };
    };
  };
};

declare global {
  type Database = OverriddenDBSupabase;
}
