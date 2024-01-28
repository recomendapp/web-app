export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  pgbouncer: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_auth: {
        Args: {
          p_usename: string
        }
        Returns: {
          username: string
          password: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      app_settings: {
        Row: {
          id: number
          maintenance_mode: boolean
        }
        Insert: {
          id?: number
          maintenance_mode?: boolean
        }
        Update: {
          id?: number
          maintenance_mode?: boolean
        }
        Relationships: []
      }
      customers: {
        Row: {
          id: string
          stripe_customer_id: string | null
        }
        Insert: {
          id: string
          stripe_customer_id?: string | null
        }
        Update: {
          id?: string
          stripe_customer_id?: string | null
        }
        Relationships: []
      }
      film: {
        Row: {
          fr: Json | null
          id: number
          slug: string | null
        }
        Insert: {
          fr?: Json | null
          id?: number
          slug?: string | null
        }
        Update: {
          fr?: Json | null
          id?: number
          slug?: string | null
        }
        Relationships: []
      }
      person: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      playlist: {
        Row: {
          created_at: string
          description: string
          featured: boolean
          id: number
          is_public: boolean
          items_count: number
          likes_count: number
          poster_url: string | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          description: string
          featured?: boolean
          id?: number
          is_public?: boolean
          items_count?: number
          likes_count?: number
          poster_url?: string | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string
          featured?: boolean
          id?: number
          is_public?: boolean
          items_count?: number
          likes_count?: number
          poster_url?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "playlist_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      playlist_guest: {
        Row: {
          created_at: string
          edit: boolean
          id: number
          playlist_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          edit?: boolean
          id?: number
          playlist_id: number
          user_id: string
        }
        Update: {
          created_at?: string
          edit?: boolean
          id?: number
          playlist_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "playlist_guest_playlist_id_fkey"
            columns: ["playlist_id"]
            referencedRelation: "playlist"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "playlist_guest_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      playlist_item: {
        Row: {
          comment: string | null
          created_at: string
          id: number
          movie_id: number
          playlist_id: number
          rank: number
          user_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: number
          movie_id: number
          playlist_id: number
          rank: number
          user_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: number
          movie_id?: number
          playlist_id?: number
          rank?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "playlist_item_movie_id_fkey"
            columns: ["movie_id"]
            referencedRelation: "tmdb_movie"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "playlist_item_playlist_id_fkey"
            columns: ["playlist_id"]
            referencedRelation: "playlist"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "playlist_item_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      prices: {
        Row: {
          active: boolean | null
          currency: string | null
          description: string | null
          id: string
          interval: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count: number | null
          metadata: Json | null
          product_id: string | null
          trial_period_days: number | null
          type: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount: number | null
        }
        Insert: {
          active?: boolean | null
          currency?: string | null
          description?: string | null
          id: string
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count?: number | null
          metadata?: Json | null
          product_id?: string | null
          trial_period_days?: number | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount?: number | null
        }
        Update: {
          active?: boolean | null
          currency?: string | null
          description?: string | null
          id?: string
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count?: number | null
          metadata?: Json | null
          product_id?: string | null
          trial_period_days?: number | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "prices_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products"
            referencedColumns: ["id"]
          }
        ]
      }
      products: {
        Row: {
          active: boolean | null
          description: string | null
          features: Json | null
          id: string
          image: string | null
          metadata: Json | null
          name: string | null
        }
        Insert: {
          active?: boolean | null
          description?: string | null
          features?: Json | null
          id: string
          image?: string | null
          metadata?: Json | null
          name?: string | null
        }
        Update: {
          active?: boolean | null
          description?: string | null
          features?: Json | null
          id?: string
          image?: string | null
          metadata?: Json | null
          name?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          cancel_at: string | null
          cancel_at_period_end: boolean | null
          canceled_at: string | null
          created: string
          current_period_end: string
          current_period_start: string
          ended_at: string | null
          id: string
          metadata: Json | null
          price_id: string | null
          quantity: number | null
          status: Database["public"]["Enums"]["subscription_status"] | null
          trial_end: string | null
          trial_start: string | null
          user_id: string
        }
        Insert: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id: string
          metadata?: Json | null
          price_id?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          trial_end?: string | null
          trial_start?: string | null
          user_id: string
        }
        Update: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id?: string
          metadata?: Json | null
          price_id?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          trial_end?: string | null
          trial_start?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_price_id_fkey"
            columns: ["price_id"]
            referencedRelation: "prices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      tmdb_collection: {
        Row: {
          backdrop_path: string | null
          id: number
        }
        Insert: {
          backdrop_path?: string | null
          id?: number
        }
        Update: {
          backdrop_path?: string | null
          id?: number
        }
        Relationships: []
      }
      tmdb_collection_translation: {
        Row: {
          collection: number
          id: number
          language: string
          name: string
          overview: string | null
          poster_path: string | null
        }
        Insert: {
          collection: number
          id?: number
          language: string
          name: string
          overview?: string | null
          poster_path?: string | null
        }
        Update: {
          collection?: number
          id?: number
          language?: string
          name?: string
          overview?: string | null
          poster_path?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tmdb_collection_translation_collection_fkey"
            columns: ["collection"]
            referencedRelation: "tmdb_collection"
            referencedColumns: ["id"]
          }
        ]
      }
      tmdb_company: {
        Row: {
          description: string | null
          headquarters: string | null
          homepage: string | null
          id: number
          logo_path: string | null
          name: string | null
          origin_country: string | null
          parent_company: number | null
        }
        Insert: {
          description?: string | null
          headquarters?: string | null
          homepage?: string | null
          id?: number
          logo_path?: string | null
          name?: string | null
          origin_country?: string | null
          parent_company?: number | null
        }
        Update: {
          description?: string | null
          headquarters?: string | null
          homepage?: string | null
          id?: number
          logo_path?: string | null
          name?: string | null
          origin_country?: string | null
          parent_company?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tmdb_company_parent_company_fkey"
            columns: ["parent_company"]
            referencedRelation: "tmdb_company"
            referencedColumns: ["id"]
          }
        ]
      }
      tmdb_country: {
        Row: {
          iso_3166_1: string
        }
        Insert: {
          iso_3166_1: string
        }
        Update: {
          iso_3166_1?: string
        }
        Relationships: []
      }
      tmdb_country_translation: {
        Row: {
          id: number
          iso_3166_1: string
          iso_639_1: string
          name: string
        }
        Insert: {
          id?: number
          iso_3166_1: string
          iso_639_1: string
          name: string
        }
        Update: {
          id?: number
          iso_3166_1?: string
          iso_639_1?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "tmdb_country_translation_iso_3166_1_fkey"
            columns: ["iso_3166_1"]
            referencedRelation: "tmdb_country"
            referencedColumns: ["iso_3166_1"]
          }
        ]
      }
      tmdb_gender: {
        Row: {
          id: number
        }
        Insert: {
          id?: number
        }
        Update: {
          id?: number
        }
        Relationships: []
      }
      tmdb_gender_translation: {
        Row: {
          gender: number
          id: number
          language: string
          name: string
        }
        Insert: {
          gender: number
          id?: number
          language: string
          name: string
        }
        Update: {
          gender?: number
          id?: number
          language?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "tmdb_gender_translation_gender_fkey"
            columns: ["gender"]
            referencedRelation: "tmdb_gender"
            referencedColumns: ["id"]
          }
        ]
      }
      tmdb_genre: {
        Row: {
          id: number
        }
        Insert: {
          id?: number
        }
        Update: {
          id?: number
        }
        Relationships: []
      }
      tmdb_genre_translation: {
        Row: {
          genre: number
          id: number
          language: string
          name: string
        }
        Insert: {
          genre: number
          id?: number
          language: string
          name: string
        }
        Update: {
          genre?: number
          id?: number
          language?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "tmdb_genre_translation_genre_fkey"
            columns: ["genre"]
            referencedRelation: "tmdb_genre"
            referencedColumns: ["id"]
          }
        ]
      }
      tmdb_keyword: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      tmdb_language: {
        Row: {
          iso_639_1: string
          name_in_native_language: string | null
        }
        Insert: {
          iso_639_1: string
          name_in_native_language?: string | null
        }
        Update: {
          iso_639_1?: string
          name_in_native_language?: string | null
        }
        Relationships: []
      }
      tmdb_language_translation: {
        Row: {
          id: number
          iso_639_1: string
          language: string
          name: string
        }
        Insert: {
          id?: number
          iso_639_1: string
          language: string
          name: string
        }
        Update: {
          id?: number
          iso_639_1?: string
          language?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "tmdb_language_translation_iso_639_1_fkey"
            columns: ["iso_639_1"]
            referencedRelation: "tmdb_language"
            referencedColumns: ["iso_639_1"]
          }
        ]
      }
      tmdb_movie: {
        Row: {
          adult: boolean
          backdrop_path: string | null
          budget: number | null
          collection_id: number | null
          homepage: string | null
          id: number
          imdb_id: string | null
          original_language: string | null
          original_title: string | null
          popularity: number | null
          release_date: string | null
          revenue: number | null
          runtime: number | null
          status: string | null
          vote_average: number | null
          vote_count: number | null
        }
        Insert: {
          adult?: boolean
          backdrop_path?: string | null
          budget?: number | null
          collection_id?: number | null
          homepage?: string | null
          id?: number
          imdb_id?: string | null
          original_language?: string | null
          original_title?: string | null
          popularity?: number | null
          release_date?: string | null
          revenue?: number | null
          runtime?: number | null
          status?: string | null
          vote_average?: number | null
          vote_count?: number | null
        }
        Update: {
          adult?: boolean
          backdrop_path?: string | null
          budget?: number | null
          collection_id?: number | null
          homepage?: string | null
          id?: number
          imdb_id?: string | null
          original_language?: string | null
          original_title?: string | null
          popularity?: number | null
          release_date?: string | null
          revenue?: number | null
          runtime?: number | null
          status?: string | null
          vote_average?: number | null
          vote_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tmdb_movie_collection_id_fkey"
            columns: ["collection_id"]
            referencedRelation: "tmdb_collection"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tmdb_movie_original_language_fkey"
            columns: ["original_language"]
            referencedRelation: "tmdb_language"
            referencedColumns: ["iso_639_1"]
          }
        ]
      }
      tmdb_movie_country: {
        Row: {
          country_id: string
          id: number
          movie_id: number
        }
        Insert: {
          country_id: string
          id?: number
          movie_id: number
        }
        Update: {
          country_id?: string
          id?: number
          movie_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "tmdb_movie_country_country_id_fkey"
            columns: ["country_id"]
            referencedRelation: "tmdb_country"
            referencedColumns: ["iso_3166_1"]
          },
          {
            foreignKeyName: "tmdb_movie_country_movie_id_fkey"
            columns: ["movie_id"]
            referencedRelation: "tmdb_movie"
            referencedColumns: ["id"]
          }
        ]
      }
      tmdb_movie_credits: {
        Row: {
          department: string
          id: string
          job: string
          movie_id: number
          person_id: number
        }
        Insert: {
          department: string
          id: string
          job: string
          movie_id: number
          person_id: number
        }
        Update: {
          department?: string
          id?: string
          job?: string
          movie_id?: number
          person_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "tmdb_movie_credits_movie_id_fkey"
            columns: ["movie_id"]
            referencedRelation: "tmdb_movie"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tmdb_movie_credits_person_id_fkey"
            columns: ["person_id"]
            referencedRelation: "tmdb_person"
            referencedColumns: ["id"]
          }
        ]
      }
      tmdb_movie_genre: {
        Row: {
          genre_id: number
          id: number
          movie_id: number
        }
        Insert: {
          genre_id: number
          id?: number
          movie_id: number
        }
        Update: {
          genre_id?: number
          id?: number
          movie_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "tmdb_movie_genre_genre_id_fkey"
            columns: ["genre_id"]
            referencedRelation: "tmdb_genre"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tmdb_movie_genre_movie_id_fkey"
            columns: ["movie_id"]
            referencedRelation: "tmdb_movie"
            referencedColumns: ["id"]
          }
        ]
      }
      tmdb_movie_keyword: {
        Row: {
          id: number
          keyword_id: number
          movie_id: number
        }
        Insert: {
          id?: number
          keyword_id: number
          movie_id: number
        }
        Update: {
          id?: number
          keyword_id?: number
          movie_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "tmdb_movie_keyword_keyword_id_fkey"
            columns: ["keyword_id"]
            referencedRelation: "tmdb_keyword"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tmdb_movie_keyword_movie_id_fkey"
            columns: ["movie_id"]
            referencedRelation: "tmdb_movie"
            referencedColumns: ["id"]
          }
        ]
      }
      tmdb_movie_language: {
        Row: {
          id: number
          language_id: string
          movie_id: number
        }
        Insert: {
          id?: number
          language_id: string
          movie_id: number
        }
        Update: {
          id?: number
          language_id?: string
          movie_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "tmdb_movie_language_language_id_fkey"
            columns: ["language_id"]
            referencedRelation: "tmdb_language"
            referencedColumns: ["iso_639_1"]
          },
          {
            foreignKeyName: "tmdb_movie_language_movie_id_fkey"
            columns: ["movie_id"]
            referencedRelation: "tmdb_movie"
            referencedColumns: ["id"]
          }
        ]
      }
      tmdb_movie_production: {
        Row: {
          company_id: number
          id: number
          movie_id: number
        }
        Insert: {
          company_id: number
          id?: number
          movie_id: number
        }
        Update: {
          company_id?: number
          id?: number
          movie_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "tmdb_movie_production_company_id_fkey"
            columns: ["company_id"]
            referencedRelation: "tmdb_company"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tmdb_movie_production_movie_id_fkey"
            columns: ["movie_id"]
            referencedRelation: "tmdb_movie"
            referencedColumns: ["id"]
          }
        ]
      }
      tmdb_movie_role: {
        Row: {
          character: string | null
          credit_id: string
          order: number | null
        }
        Insert: {
          character?: string | null
          credit_id: string
          order?: number | null
        }
        Update: {
          character?: string | null
          credit_id?: string
          order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tmdb_movie_role_credit_id_fkey"
            columns: ["credit_id"]
            referencedRelation: "tmdb_movie_credits"
            referencedColumns: ["id"]
          }
        ]
      }
      tmdb_movie_translation: {
        Row: {
          id: number
          language_id: string
          movie_id: number
          overview: string | null
          poster_path: string | null
          tagline: string | null
          title: string
        }
        Insert: {
          id?: number
          language_id: string
          movie_id: number
          overview?: string | null
          poster_path?: string | null
          tagline?: string | null
          title: string
        }
        Update: {
          id?: number
          language_id?: string
          movie_id?: number
          overview?: string | null
          poster_path?: string | null
          tagline?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "tmdb_movie_translation_movie_id_fkey"
            columns: ["movie_id"]
            referencedRelation: "tmdb_movie"
            referencedColumns: ["id"]
          }
        ]
      }
      tmdb_movie_videos: {
        Row: {
          created_at: string
          id: string
          iso_3166_1: string
          iso_639_1: string
          key: string
          movie_id: number
          name: string
          official: boolean
          site: string
          size: number
          type: string
        }
        Insert: {
          created_at?: string
          id: string
          iso_3166_1: string
          iso_639_1: string
          key: string
          movie_id: number
          name: string
          official: boolean
          site: string
          size: number
          type: string
        }
        Update: {
          created_at?: string
          id?: string
          iso_3166_1?: string
          iso_639_1?: string
          key?: string
          movie_id?: number
          name?: string
          official?: boolean
          site?: string
          size?: number
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "tmdb_movie_videos_iso_3166_1_fkey"
            columns: ["iso_3166_1"]
            referencedRelation: "tmdb_country"
            referencedColumns: ["iso_3166_1"]
          },
          {
            foreignKeyName: "tmdb_movie_videos_iso_639_1_fkey"
            columns: ["iso_639_1"]
            referencedRelation: "tmdb_language"
            referencedColumns: ["iso_639_1"]
          },
          {
            foreignKeyName: "tmdb_movie_videos_movie_id_fkey"
            columns: ["movie_id"]
            referencedRelation: "tmdb_movie"
            referencedColumns: ["id"]
          }
        ]
      }
      tmdb_person: {
        Row: {
          adult: boolean
          also_known_as: string[] | null
          birthday: string | null
          deathday: string | null
          gender: number | null
          homepage: string | null
          id: number
          imdb_id: string | null
          known_for_department: string | null
          name: string | null
          place_of_birth: string | null
          popularity: number | null
          profile_path: string | null
        }
        Insert: {
          adult?: boolean
          also_known_as?: string[] | null
          birthday?: string | null
          deathday?: string | null
          gender?: number | null
          homepage?: string | null
          id?: number
          imdb_id?: string | null
          known_for_department?: string | null
          name?: string | null
          place_of_birth?: string | null
          popularity?: number | null
          profile_path?: string | null
        }
        Update: {
          adult?: boolean
          also_known_as?: string[] | null
          birthday?: string | null
          deathday?: string | null
          gender?: number | null
          homepage?: string | null
          id?: number
          imdb_id?: string | null
          known_for_department?: string | null
          name?: string | null
          place_of_birth?: string | null
          popularity?: number | null
          profile_path?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tmdb_person_gender_fkey"
            columns: ["gender"]
            referencedRelation: "tmdb_gender"
            referencedColumns: ["id"]
          }
        ]
      }
      tmdb_person_translation: {
        Row: {
          biography: string | null
          id: number
          language: string
          person: number | null
        }
        Insert: {
          biography?: string | null
          id?: number
          language: string
          person?: number | null
        }
        Update: {
          biography?: string | null
          id?: number
          language?: string
          person?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tmdb_person_translation_person_fkey"
            columns: ["person"]
            referencedRelation: "tmdb_person"
            referencedColumns: ["id"]
          }
        ]
      }
      tmdb_update_logs: {
        Row: {
          created_at: string
          date: string
          id: number
          success: boolean
          type: Database["public"]["Enums"]["tmdb_update_logs_type"]
        }
        Insert: {
          created_at?: string
          date: string
          id?: number
          success: boolean
          type: Database["public"]["Enums"]["tmdb_update_logs_type"]
        }
        Update: {
          created_at?: string
          date?: string
          id?: number
          success?: boolean
          type?: Database["public"]["Enums"]["tmdb_update_logs_type"]
        }
        Relationships: []
      }
      user: {
        Row: {
          avatar_url: string | null
          background_url: string | null
          billing_address: Json | null
          bio: string | null
          created_at: string
          favorite_color: string | null
          followers_count: number
          following_count: number
          friends_count: number
          full_name: string
          id: string
          language: string
          payment_method: Json | null
          updated_at: string | null
          username: string
          username_updated_at: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          background_url?: string | null
          billing_address?: Json | null
          bio?: string | null
          created_at?: string
          favorite_color?: string | null
          followers_count?: number
          following_count?: number
          friends_count?: number
          full_name: string
          id: string
          language?: string
          payment_method?: Json | null
          updated_at?: string | null
          username: string
          username_updated_at?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          background_url?: string | null
          billing_address?: Json | null
          bio?: string | null
          created_at?: string
          favorite_color?: string | null
          followers_count?: number
          following_count?: number
          friends_count?: number
          full_name?: string
          id?: string
          language?: string
          payment_method?: Json | null
          updated_at?: string | null
          username?: string
          username_updated_at?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_follower: {
        Row: {
          followee_id: string
          id: number
          user_id: string
        }
        Insert: {
          followee_id: string
          id?: number
          user_id: string
        }
        Update: {
          followee_id?: string
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_follower_followee_id_fkey"
            columns: ["followee_id"]
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      user_friend: {
        Row: {
          friend_id: string
          id: number
          user_id: string
        }
        Insert: {
          friend_id: string
          id?: number
          user_id: string
        }
        Update: {
          friend_id?: string
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_friend_friend_id_fkey"
            columns: ["friend_id"]
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      user_movie_activity: {
        Row: {
          created_at: string
          date: string
          id: number
          is_liked: boolean
          movie_id: number
          rating: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          date?: string
          id?: number
          is_liked?: boolean
          movie_id: number
          rating?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: number
          is_liked?: boolean
          movie_id?: number
          rating?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_movie_activity_movie_id_fkey"
            columns: ["movie_id"]
            referencedRelation: "tmdb_movie"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_activity_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      user_movie_favorite: {
        Row: {
          id: number
          movie_id: number
          order: number
          user_id: string
        }
        Insert: {
          id?: number
          movie_id: number
          order: number
          user_id: string
        }
        Update: {
          id?: number
          movie_id?: number
          order?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_movie_favorite_movie_id_fkey"
            columns: ["movie_id"]
            referencedRelation: "tmdb_movie"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_favorite_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      user_movie_guidelist: {
        Row: {
          created_at: string
          id: number
          movie_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          movie_id: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          movie_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_movie_guidelist_movie_id_fkey"
            columns: ["movie_id"]
            referencedRelation: "tmdb_movie"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_guidelist_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      user_movie_guidelist_bkp: {
        Row: {
          comment: string | null
          created_at: string
          id: number
          movie_id: number
          receiver_user_id: string
          sender_user_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: number
          movie_id: number
          receiver_user_id: string
          sender_user_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: number
          movie_id?: number
          receiver_user_id?: string
          sender_user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_movie_guidelist_bkp_movie_id_fkey"
            columns: ["movie_id"]
            referencedRelation: "tmdb_movie"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_guidelist_bkp_receiver_user_id_fkey"
            columns: ["receiver_user_id"]
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_guidelist_bkp_sender_user_id_fkey"
            columns: ["sender_user_id"]
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      user_movie_guidelist_item: {
        Row: {
          comment: string | null
          created_at: string
          guidelist_id: number
          id: number
          user_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          guidelist_id: number
          id?: number
          user_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          guidelist_id?: number
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_movie_guidelist_item_guidelist_id_fkey"
            columns: ["guidelist_id"]
            referencedRelation: "user_movie_guidelist"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_guidelist_item_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      user_movie_review: {
        Row: {
          body: string
          comments_count: number
          created_at: string
          id: number
          likes_count: number
          movie_id: number
          title: string
          updated_at: string | null
          user_id: string
          views_count: number
        }
        Insert: {
          body: string
          comments_count?: number
          created_at?: string
          id?: number
          likes_count?: number
          movie_id: number
          title: string
          updated_at?: string | null
          user_id: string
          views_count?: number
        }
        Update: {
          body?: string
          comments_count?: number
          created_at?: string
          id?: number
          likes_count?: number
          movie_id?: number
          title?: string
          updated_at?: string | null
          user_id?: string
          views_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_movie_review_id_fkey"
            columns: ["id"]
            referencedRelation: "user_movie_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_review_movie_id_fkey"
            columns: ["movie_id"]
            referencedRelation: "tmdb_movie"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_review_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      user_movie_watchlist: {
        Row: {
          created_at: string
          id: number
          movie_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          movie_id: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          movie_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_movie_watchlist_movie_id_fkey"
            columns: ["movie_id"]
            referencedRelation: "tmdb_movie"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_watchlist_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_avatar: {
        Args: {
          avatar_url: string
        }
        Returns: Record<string, unknown>
      }
      delete_playlist_poster: {
        Args: {
          poster_url: string
        }
        Returns: Record<string, unknown>
      }
      delete_storage_object: {
        Args: {
          bucket: string
          object: string
        }
        Returns: Record<string, unknown>
      }
      generate_username: {
        Args: {
          user_details: unknown
        }
        Returns: string
      }
      insert_user_movie_guidelist: {
        Args: {
          movieid: number
          comment: string
          sender_user_id: string
          receiver_user_ids: string[]
        }
        Returns: undefined
      }
    }
    Enums: {
      eventType: "INSERT" | "DELETE" | "UPDATE"
      pricing_plan_interval: "day" | "week" | "month" | "year"
      pricing_type: "one_time" | "recurring"
      subscription_status:
        | "trialing"
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "unpaid"
      tmdb_update_logs_type:
        | "movie"
        | "person"
        | "collection"
        | "keyword"
        | "company"
        | "language"
        | "country"
        | "genre"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
