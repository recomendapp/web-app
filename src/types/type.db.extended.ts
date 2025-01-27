
import { Database as PostgresSchema } from './__generated__/type.db';
import { Media, MediaType, Person, User } from './type.db';
import { JSONContent } from '@tiptap/react';

type PostgresTables = PostgresSchema['public']['Tables'];
type PostgresViews = PostgresSchema['public']['Views'];

// THIS IS THE ONLY THING YOU EDIT
// <START>
type TableExtensions = { 
  /**
  my_existing_table_name: {
    my_json_column_override: {
      tel: string;
      name?: string;
      preset_id?: number;
    };
  };
  **/
  user_review: {
    body: JSONContent;
  }
};

type ViewExtensions = {
  /**
  my_existing_view_name: {
	my_json_column_override: {
	  tel: string;
	  name?: string;
	  preset_id?: number;
	};
  };
  **/
 /* ---------------------------------- MEDIA --------------------------------- */
 media_movie: {
  id: number,
  directors?: Person[],
  genres?: {
      id: number
      name: string
    }[],
    media_type: MediaType,
  },
  media_tv_serie: {
    id: number,
    created_by?: Person[],
    genres?: {
      id: number
      name: string
    }[],
    media_type: MediaType,
  },
  media_person: {
    id: number,
    media_type: MediaType,
  },
  media_person_combined_credits: {
    media: Media,
}
 /* -------------------------------------------------------------------------- */
  movie: {
    id: number,
    directors?: Person[],
    genres?: {
      id: number
      name: string
    }[],
  },
  tv_serie: {
    id: number,
    created_by?: Person[],
    genres?: {
      id: number
      name: string
    }[],
  },
  person: {
    id: number,
  },
  /* -------------------------------- ACTIVITY -------------------------------- */
  user_activity_media: {
    media?: Media,
  },
  /* -------------------------------------------------------------------------- */
  /* --------------------------------- REVIEW --------------------------------- */
  user_review_media_activity: {
    media?: Media,
  }
  /* -------------------------------------------------------------------------- */
  user_recos_aggregated: {
    media?: Media,
    senders: {
      user: User,
      comment?: string | null,
      created_at: string,
    }[],
  },
  user_watchlist_media: {
    media?: Media,
  },
  /* --------------------------------- WIDGETS -------------------------------- */
  widget_most_recommended: {
    media?: Media,
  },
  /* -------------------------------------------------------------------------- */
};
// <END>
// ☝️ this is the only thing you edit

type TakeDefinitionFromSecond<T extends object, P extends object> = Omit<
  T,
  keyof P
> &
  P;

type NewTables = {
  [k in keyof PostgresTables]: {
    Row: k extends keyof TableExtensions
      ? TakeDefinitionFromSecond<
          PostgresTables[k]['Row'],
          TableExtensions[k]
        >
      : PostgresTables[k]['Row'];
    Insert: k extends keyof TableExtensions
      ? TakeDefinitionFromSecond<
          PostgresTables[k]['Insert'],
          TableExtensions[k]
        >
      : PostgresTables[k]['Insert'];
    Update: k extends keyof TableExtensions
      ? Partial<
          TakeDefinitionFromSecond<
            PostgresTables[k]['Update'],
            TableExtensions[k]
          >
        >
      : PostgresTables[k]['Update'];
	Relationships: PostgresTables[k]['Relationships'];
  };
};

type NewViews = {
  [k in keyof PostgresViews]: {
	Row: k extends keyof ViewExtensions
	  ? TakeDefinitionFromSecond<
		  PostgresViews[k]['Row'],
		  ViewExtensions[k]
		>
	  : PostgresViews[k]['Row'];
	Relationships: PostgresViews[k]['Relationships'];
  };
};

export type Database = {
  public: Omit<PostgresSchema['public'], 'Tables' | 'Views'> & {
    Tables: NewTables;
	Views: NewViews;
  };
};

export type TableName = keyof Database['public']['Tables'];
export type TableRow<T extends TableName> =
  Database['public']['Tables'][T]['Row'];

export type ViewName = keyof Database['public']['Views'];
export type ViewRow<View extends ViewName> =
  Database['public']['Views'][View]['Row'];

