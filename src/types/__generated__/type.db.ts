export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      app_config: {
        Row: {
          key: string
          value: string
        }
        Insert: {
          key: string
          value: string
        }
        Update: {
          key?: string
          value?: string
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
      playlist: {
        Row: {
          created_at: string
          description: string
          featured: boolean
          id: number
          items_count: number
          likes_count: number
          poster_url: string | null
          private: boolean
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          description: string
          featured?: boolean
          id?: number
          items_count?: number
          likes_count?: number
          poster_url?: string | null
          private?: boolean
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string
          featured?: boolean
          id?: number
          items_count?: number
          likes_count?: number
          poster_url?: string | null
          private?: boolean
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "playlist_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "playlist_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "playlist_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          },
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
            isOneToOne: false
            referencedRelation: "playlist"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "playlist_guest_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "playlist_guest_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "playlist_guest_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          },
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
            isOneToOne: false
            referencedRelation: "movie"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "playlist_item_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "tmdb_movie"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "playlist_item_playlist_id_fkey"
            columns: ["playlist_id"]
            isOneToOne: false
            referencedRelation: "playlist"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "playlist_item_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "playlist_item_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "playlist_item_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      playlist_like: {
        Row: {
          created_at: string
          id: number
          playlist_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          playlist_id: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          playlist_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "playlist_like_playlist_id_fkey"
            columns: ["playlist_id"]
            isOneToOne: false
            referencedRelation: "playlist"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "playlist_like_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "playlist_like_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "playlist_like_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          },
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
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
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
      sync_logs: {
        Row: {
          created_at: string
          date: string
          id: number
          status: Database["public"]["Enums"]["sync_logs_status"]
          type: Database["public"]["Enums"]["sync_logs_type"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          date?: string
          id?: number
          status?: Database["public"]["Enums"]["sync_logs_status"]
          type: Database["public"]["Enums"]["sync_logs_type"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          date?: string
          id?: number
          status?: Database["public"]["Enums"]["sync_logs_status"]
          type?: Database["public"]["Enums"]["sync_logs_type"]
          updated_at?: string | null
        }
        Relationships: []
      }
      tmdb_collection: {
        Row: {
          id: number
          name: string | null
        }
        Insert: {
          id?: number
          name?: string | null
        }
        Update: {
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      tmdb_collection_image: {
        Row: {
          aspect_ratio: number | null
          collection: number
          file_path: string
          height: number | null
          id: number
          iso_639_1: string | null
          type: Database["public"]["Enums"]["image_type"]
          vote_average: number | null
          vote_count: number | null
          width: number | null
        }
        Insert: {
          aspect_ratio?: number | null
          collection: number
          file_path: string
          height?: number | null
          id?: number
          iso_639_1?: string | null
          type: Database["public"]["Enums"]["image_type"]
          vote_average?: number | null
          vote_count?: number | null
          width?: number | null
        }
        Update: {
          aspect_ratio?: number | null
          collection?: number
          file_path?: string
          height?: number | null
          id?: number
          iso_639_1?: string | null
          type?: Database["public"]["Enums"]["image_type"]
          vote_average?: number | null
          vote_count?: number | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tmdb_collection_image_collection_fkey"
            columns: ["collection"]
            isOneToOne: false
            referencedRelation: "collection"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tmdb_collection_image_collection_fkey"
            columns: ["collection"]
            isOneToOne: false
            referencedRelation: "tmdb_collection"
            referencedColumns: ["id"]
          },
        ]
      }
      tmdb_collection_translation: {
        Row: {
          collection: number
          homepage: string | null
          id: number
          iso_3166_1: string
          iso_639_1: string
          overview: string | null
          title: string | null
        }
        Insert: {
          collection: number
          homepage?: string | null
          id?: number
          iso_3166_1: string
          iso_639_1: string
          overview?: string | null
          title?: string | null
        }
        Update: {
          collection?: number
          homepage?: string | null
          id?: number
          iso_3166_1?: string
          iso_639_1?: string
          overview?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tmdb_collection_translation_collection_fkey"
            columns: ["collection"]
            isOneToOne: false
            referencedRelation: "collection"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tmdb_collection_translation_collection_fkey"
            columns: ["collection"]
            isOneToOne: false
            referencedRelation: "tmdb_collection"
            referencedColumns: ["id"]
          },
        ]
      }
      tmdb_company: {
        Row: {
          description: string | null
          headquarters: string | null
          homepage: string | null
          id: number
          name: string | null
          origin_country: string | null
          parent_company: number | null
        }
        Insert: {
          description?: string | null
          headquarters?: string | null
          homepage?: string | null
          id?: number
          name?: string | null
          origin_country?: string | null
          parent_company?: number | null
        }
        Update: {
          description?: string | null
          headquarters?: string | null
          homepage?: string | null
          id?: number
          name?: string | null
          origin_country?: string | null
          parent_company?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tmdb_company_parent_company_fkey"
            columns: ["parent_company"]
            isOneToOne: false
            referencedRelation: "company"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tmdb_company_parent_company_fkey"
            columns: ["parent_company"]
            isOneToOne: false
            referencedRelation: "tmdb_company"
            referencedColumns: ["id"]
          },
        ]
      }
      tmdb_company_alternative_name: {
        Row: {
          company: number
          id: number
          name: string
        }
        Insert: {
          company: number
          id?: number
          name: string
        }
        Update: {
          company?: number
          id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "tmdb_company_alternative_name_company_fkey"
            columns: ["company"]
            isOneToOne: false
            referencedRelation: "company"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tmdb_company_alternative_name_company_fkey"
            columns: ["company"]
            isOneToOne: false
            referencedRelation: "tmdb_company"
            referencedColumns: ["id"]
          },
        ]
      }
      tmdb_company_image: {
        Row: {
          aspect_ratio: number | null
          company: number
          file_path: string
          file_type: string
          height: number | null
          id: string
          vote_average: number | null
          vote_count: number | null
          width: number | null
        }
        Insert: {
          aspect_ratio?: number | null
          company: number
          file_path: string
          file_type: string
          height?: number | null
          id: string
          vote_average?: number | null
          vote_count?: number | null
          width?: number | null
        }
        Update: {
          aspect_ratio?: number | null
          company?: number
          file_path?: string
          file_type?: string
          height?: number | null
          id?: string
          vote_average?: number | null
          vote_count?: number | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tmdb_company_image_company_fkey"
            columns: ["company"]
            isOneToOne: false
            referencedRelation: "company"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tmdb_company_image_company_fkey"
            columns: ["company"]
            isOneToOne: false
            referencedRelation: "tmdb_company"
            referencedColumns: ["id"]
          },
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
          language: Database["public"]["Enums"]["language_app"]
          name: string
        }
        Insert: {
          id?: number
          iso_3166_1: string
          language: Database["public"]["Enums"]["language_app"]
          name: string
        }
        Update: {
          id?: number
          iso_3166_1?: string
          language?: Database["public"]["Enums"]["language_app"]
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "tmdb_country_translation_iso_3166_1_fkey"
            columns: ["iso_3166_1"]
            isOneToOne: false
            referencedRelation: "tmdb_country"
            referencedColumns: ["iso_3166_1"]
          },
        ]
      }
      tmdb_department: {
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
      tmdb_department_translation: {
        Row: {
          department: string
          id: number
          language: Database["public"]["Enums"]["language_app"]
        }
        Insert: {
          department: string
          id?: number
          language: Database["public"]["Enums"]["language_app"]
        }
        Update: {
          department?: string
          id?: number
          language?: Database["public"]["Enums"]["language_app"]
        }
        Relationships: []
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
          language: Database["public"]["Enums"]["language_app"]
          name: string
        }
        Insert: {
          gender: number
          id?: number
          language: Database["public"]["Enums"]["language_app"]
          name: string
        }
        Update: {
          gender?: number
          id?: number
          language?: Database["public"]["Enums"]["language_app"]
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "tmdb_gender_translation_gender_fkey"
            columns: ["gender"]
            isOneToOne: false
            referencedRelation: "tmdb_gender"
            referencedColumns: ["id"]
          },
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
            isOneToOne: false
            referencedRelation: "tmdb_genre"
            referencedColumns: ["id"]
          },
        ]
      }
      tmdb_job: {
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
      tmdb_job_translation: {
        Row: {
          department_id: number
          id: number
          job: string
          language: Database["public"]["Enums"]["language_app"]
        }
        Insert: {
          department_id: number
          id?: number
          job: string
          language: Database["public"]["Enums"]["language_app"]
        }
        Update: {
          department_id?: number
          id?: number
          job?: string
          language?: Database["public"]["Enums"]["language_app"]
        }
        Relationships: [
          {
            foreignKeyName: "tmdb_job_translation_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "tmdb_department"
            referencedColumns: ["id"]
          },
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
          language: Database["public"]["Enums"]["language_app"]
          name: string
        }
        Insert: {
          id?: number
          iso_639_1: string
          language: Database["public"]["Enums"]["language_app"]
          name: string
        }
        Update: {
          id?: number
          iso_639_1?: string
          language?: Database["public"]["Enums"]["language_app"]
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "tmdb_language_translation_iso_639_1_fkey"
            columns: ["iso_639_1"]
            isOneToOne: false
            referencedRelation: "tmdb_language"
            referencedColumns: ["iso_639_1"]
          },
        ]
      }
      tmdb_movie: {
        Row: {
          adult: boolean
          backdrop_path: string | null
          budget: number | null
          collection: number | null
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
          updated_at: string | null
          vote_average: number | null
          vote_count: number | null
        }
        Insert: {
          adult?: boolean
          backdrop_path?: string | null
          budget?: number | null
          collection?: number | null
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
          updated_at?: string | null
          vote_average?: number | null
          vote_count?: number | null
        }
        Update: {
          adult?: boolean
          backdrop_path?: string | null
          budget?: number | null
          collection?: number | null
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
          updated_at?: string | null
          vote_average?: number | null
          vote_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tmdb_movie_collection_fkey"
            columns: ["collection"]
            isOneToOne: false
            referencedRelation: "collection"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tmdb_movie_collection_fkey"
            columns: ["collection"]
            isOneToOne: false
            referencedRelation: "tmdb_collection"
            referencedColumns: ["id"]
          },
        ]
      }
      tmdb_movie_alternative_title: {
        Row: {
          id: number
          iso_3166_1: string
          movie: number
          title: string
          type: string
        }
        Insert: {
          id?: number
          iso_3166_1: string
          movie: number
          title: string
          type: string
        }
        Update: {
          id?: number
          iso_3166_1?: string
          movie?: number
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "tmdb_movie_alternative_title_movie_fkey"
            columns: ["movie"]
            isOneToOne: false
            referencedRelation: "movie"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tmdb_movie_alternative_title_movie_fkey"
            columns: ["movie"]
            isOneToOne: false
            referencedRelation: "tmdb_movie"
            referencedColumns: ["id"]
          },
        ]
      }
      tmdb_movie_country: {
        Row: {
          country: string
          id: number
          movie: number
        }
        Insert: {
          country: string
          id?: number
          movie: number
        }
        Update: {
          country?: string
          id?: number
          movie?: number
        }
        Relationships: [
          {
            foreignKeyName: "tmdb_movie_country_country_id_fkey"
            columns: ["country"]
            isOneToOne: false
            referencedRelation: "tmdb_country"
            referencedColumns: ["iso_3166_1"]
          },
          {
            foreignKeyName: "tmdb_movie_country_movie_id_fkey"
            columns: ["movie"]
            isOneToOne: false
            referencedRelation: "movie"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tmdb_movie_country_movie_id_fkey"
            columns: ["movie"]
            isOneToOne: false
            referencedRelation: "tmdb_movie"
            referencedColumns: ["id"]
          },
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
            isOneToOne: false
            referencedRelation: "movie"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tmdb_movie_credits_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "tmdb_movie"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tmdb_movie_credits_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "person"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tmdb_movie_credits_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "person_full"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tmdb_movie_credits_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "tmdb_person"
            referencedColumns: ["id"]
          },
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
            isOneToOne: false
            referencedRelation: "tmdb_genre"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tmdb_movie_genre_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movie"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tmdb_movie_genre_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "tmdb_movie"
            referencedColumns: ["id"]
          },
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
            isOneToOne: false
            referencedRelation: "tmdb_keyword"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tmdb_movie_keyword_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movie"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tmdb_movie_keyword_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "tmdb_movie"
            referencedColumns: ["id"]
          },
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
            isOneToOne: false
            referencedRelation: "tmdb_language"
            referencedColumns: ["iso_639_1"]
          },
          {
            foreignKeyName: "tmdb_movie_language_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movie"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tmdb_movie_language_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "tmdb_movie"
            referencedColumns: ["id"]
          },
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
            isOneToOne: false
            referencedRelation: "company"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tmdb_movie_production_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "tmdb_company"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tmdb_movie_production_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movie"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tmdb_movie_production_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "tmdb_movie"
            referencedColumns: ["id"]
          },
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
            isOneToOne: true
            referencedRelation: "tmdb_movie_credits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tmdb_movie_role_credit_id_fkey"
            columns: ["credit_id"]
            isOneToOne: true
            referencedRelation: "tmdb_movie_credits_random"
            referencedColumns: ["id"]
          },
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
            isOneToOne: false
            referencedRelation: "movie"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tmdb_movie_translation_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "tmdb_movie"
            referencedColumns: ["id"]
          },
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
            isOneToOne: false
            referencedRelation: "tmdb_country"
            referencedColumns: ["iso_3166_1"]
          },
          {
            foreignKeyName: "tmdb_movie_videos_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movie"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tmdb_movie_videos_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "tmdb_movie"
            referencedColumns: ["id"]
          },
        ]
      }
      tmdb_person: {
        Row: {
          adult: boolean
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
        }
        Insert: {
          adult?: boolean
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
        }
        Update: {
          adult?: boolean
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
        }
        Relationships: [
          {
            foreignKeyName: "tmdb_person_gender_fkey"
            columns: ["gender"]
            isOneToOne: false
            referencedRelation: "tmdb_gender"
            referencedColumns: ["id"]
          },
        ]
      }
      tmdb_person_also_known_as: {
        Row: {
          id: number
          name: string
          person: number
        }
        Insert: {
          id?: number
          name: string
          person: number
        }
        Update: {
          id?: number
          name?: string
          person?: number
        }
        Relationships: [
          {
            foreignKeyName: "tmdb_person_also_known_as_person_fkey"
            columns: ["person"]
            isOneToOne: false
            referencedRelation: "person"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tmdb_person_also_known_as_person_fkey"
            columns: ["person"]
            isOneToOne: false
            referencedRelation: "person_full"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tmdb_person_also_known_as_person_fkey"
            columns: ["person"]
            isOneToOne: false
            referencedRelation: "tmdb_person"
            referencedColumns: ["id"]
          },
        ]
      }
      tmdb_person_external_id: {
        Row: {
          id: number
          person: number
          source: string
          value: string
        }
        Insert: {
          id?: number
          person: number
          source: string
          value: string
        }
        Update: {
          id?: number
          person?: number
          source?: string
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "tmdb_person_external_id_person_fkey"
            columns: ["person"]
            isOneToOne: false
            referencedRelation: "person"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tmdb_person_external_id_person_fkey"
            columns: ["person"]
            isOneToOne: false
            referencedRelation: "person_full"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tmdb_person_external_id_person_fkey"
            columns: ["person"]
            isOneToOne: false
            referencedRelation: "tmdb_person"
            referencedColumns: ["id"]
          },
        ]
      }
      tmdb_person_image: {
        Row: {
          aspect_ratio: number | null
          file_path: string
          height: number | null
          id: number
          person: number
          vote_average: number | null
          vote_count: number | null
          width: number | null
        }
        Insert: {
          aspect_ratio?: number | null
          file_path: string
          height?: number | null
          id?: number
          person: number
          vote_average?: number | null
          vote_count?: number | null
          width?: number | null
        }
        Update: {
          aspect_ratio?: number | null
          file_path?: string
          height?: number | null
          id?: number
          person?: number
          vote_average?: number | null
          vote_count?: number | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tmdb_person_image_person_fkey"
            columns: ["person"]
            isOneToOne: false
            referencedRelation: "person"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tmdb_person_image_person_fkey"
            columns: ["person"]
            isOneToOne: false
            referencedRelation: "person_full"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tmdb_person_image_person_fkey"
            columns: ["person"]
            isOneToOne: false
            referencedRelation: "tmdb_person"
            referencedColumns: ["id"]
          },
        ]
      }
      tmdb_person_translation: {
        Row: {
          biography: string | null
          id: number
          iso_3166_1: string | null
          iso_639_1: string | null
          person: number | null
        }
        Insert: {
          biography?: string | null
          id?: number
          iso_3166_1?: string | null
          iso_639_1?: string | null
          person?: number | null
        }
        Update: {
          biography?: string | null
          id?: number
          iso_3166_1?: string | null
          iso_639_1?: string | null
          person?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tmdb_person_translation_person_fkey"
            columns: ["person"]
            isOneToOne: false
            referencedRelation: "person"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tmdb_person_translation_person_fkey"
            columns: ["person"]
            isOneToOne: false
            referencedRelation: "person_full"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tmdb_person_translation_person_fkey"
            columns: ["person"]
            isOneToOne: false
            referencedRelation: "tmdb_person"
            referencedColumns: ["id"]
          },
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
          bio: string | null
          created_at: string
          favorite_color: string | null
          followers_count: number
          following_count: number
          full_name: string
          id: string
          language: string
          premium: boolean
          private: boolean
          username: string
          username_updated_at: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          background_url?: string | null
          bio?: string | null
          created_at?: string
          favorite_color?: string | null
          followers_count?: number
          following_count?: number
          full_name: string
          id: string
          language?: string
          premium?: boolean
          private?: boolean
          username: string
          username_updated_at?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          background_url?: string | null
          bio?: string | null
          created_at?: string
          favorite_color?: string | null
          followers_count?: number
          following_count?: number
          full_name?: string
          id?: string
          language?: string
          premium?: boolean
          private?: boolean
          username?: string
          username_updated_at?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_language_fkey"
            columns: ["language"]
            isOneToOne: false
            referencedRelation: "supported_languages"
            referencedColumns: ["language"]
          },
        ]
      }
      user_billing: {
        Row: {
          billing_address: Json | null
          payment_method: Json | null
          user_id: string
        }
        Insert: {
          billing_address?: Json | null
          payment_method?: Json | null
          user_id: string
        }
        Update: {
          billing_address?: Json | null
          payment_method?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_billing_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_billing_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_billing_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      user_follower: {
        Row: {
          created_at: string
          followee_id: string
          id: number
          is_pending: boolean
          user_id: string
        }
        Insert: {
          created_at?: string
          followee_id: string
          id?: number
          is_pending?: boolean
          user_id: string
        }
        Update: {
          created_at?: string
          followee_id?: string
          id?: number
          is_pending?: boolean
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_follower_followee_id_fkey"
            columns: ["followee_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_follower_followee_id_fkey"
            columns: ["followee_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_follower_followee_id_fkey"
            columns: ["followee_id"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_follower_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_follower_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_follower_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      user_friend: {
        Row: {
          created_at: string
          friend_id: string
          id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          friend_id: string
          id?: number
          user_id: string
        }
        Update: {
          created_at?: string
          friend_id?: string
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_friend_friend_id_fkey"
            columns: ["friend_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_friend_friend_id_fkey"
            columns: ["friend_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_friend_friend_id_fkey"
            columns: ["friend_id"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_friend_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_friend_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_friend_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          },
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
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          date?: string
          id?: number
          is_liked?: boolean
          movie_id: number
          rating?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: number
          is_liked?: boolean
          movie_id?: number
          rating?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_movie_activity_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movie"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_activity_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "tmdb_movie"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_activity_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_activity_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_activity_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      user_movie_favorite: {
        Row: {
          created_at: string
          id: number
          movie_id: number
          position: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          movie_id: number
          position: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          movie_id?: number
          position?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_movie_favorite_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movie"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_favorite_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "tmdb_movie"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_favorite_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_favorite_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_favorite_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      user_movie_guidelist: {
        Row: {
          comment: string | null
          created_at: string
          id: number
          movie_id: number
          sender_id: string
          status: Database["public"]["Enums"]["guidelist_status"]
          user_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: number
          movie_id: number
          sender_id: string
          status?: Database["public"]["Enums"]["guidelist_status"]
          user_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: number
          movie_id?: number
          sender_id?: string
          status?: Database["public"]["Enums"]["guidelist_status"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_movie_guidelist_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movie"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_guidelist_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "tmdb_movie"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_guidelist_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_guidelist_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_guidelist_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_guidelist_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_guidelist_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_guidelist_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      user_movie_review: {
        Row: {
          body: string
          comments_count: number
          created_at: string
          id: number
          likes_count: number
          title: string
          updated_at: string | null
          views_count: number
        }
        Insert: {
          body: string
          comments_count?: number
          created_at?: string
          id?: number
          likes_count?: number
          title: string
          updated_at?: string | null
          views_count?: number
        }
        Update: {
          body?: string
          comments_count?: number
          created_at?: string
          id?: number
          likes_count?: number
          title?: string
          updated_at?: string | null
          views_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_movie_review_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "user_movie_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_review_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "user_movie_activity_feed"
            referencedColumns: ["id"]
          },
        ]
      }
      user_movie_review_comment: {
        Row: {
          comment: string
          comments_count: number
          created_at: string
          id: number
          likes_count: number
          parent_comment_id: number | null
          review_id: number
          user_id: string
        }
        Insert: {
          comment: string
          comments_count?: number
          created_at?: string
          id?: number
          likes_count?: number
          parent_comment_id?: number | null
          review_id: number
          user_id: string
        }
        Update: {
          comment?: string
          comments_count?: number
          created_at?: string
          id?: number
          likes_count?: number
          parent_comment_id?: number | null
          review_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_movie_review_comment_parent_comment_id_fkey"
            columns: ["parent_comment_id"]
            isOneToOne: false
            referencedRelation: "user_movie_review_comment"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_review_comment_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "user_movie_review"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_review_comment_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "user_movie_review_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_review_comment_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_review_comment_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_review_comment_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      user_movie_review_comment_like: {
        Row: {
          comment_id: number
          created_at: string
          id: number
          user_id: string
        }
        Insert: {
          comment_id: number
          created_at?: string
          id?: number
          user_id: string
        }
        Update: {
          comment_id?: number
          created_at?: string
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_movie_review_comment_like_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "user_movie_review_comment"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_review_comment_like_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_review_comment_like_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_review_comment_like_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      user_movie_review_like: {
        Row: {
          created_at: string
          id: number
          review_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          review_id: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          review_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_movie_review_like_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "user_movie_review"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_review_like_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "user_movie_review_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_review_like_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_review_like_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_review_like_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      user_movie_watchlist: {
        Row: {
          created_at: string
          id: number
          movie_id: number
          status: Database["public"]["Enums"]["watchlist_status"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          movie_id: number
          status?: Database["public"]["Enums"]["watchlist_status"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          movie_id?: number
          status?: Database["public"]["Enums"]["watchlist_status"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_movie_watchlist_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movie"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_watchlist_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "tmdb_movie"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_watchlist_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_watchlist_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_watchlist_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      user_person_follower: {
        Row: {
          created_at: string
          id: number
          person_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          person_id: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          person_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_person_follower_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "person"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_person_follower_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "person_full"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_person_follower_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "tmdb_person"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_person_follower_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_person_follower_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_person_follower_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      user_subscriptions: {
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
            foreignKeyName: "user_subscriptions_price_id_fkey"
            columns: ["price_id"]
            isOneToOne: false
            referencedRelation: "prices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      _view: {
        Row: {
          foreign_keys: string[] | null
          indices: string[] | null
          primary_keys: string[] | null
          table_name: string | null
        }
        Relationships: []
      }
      collection: {
        Row: {
          backdrop_path: string | null
          homepage: string | null
          id: number | null
          name: string | null
          overview: string | null
          poster_path: string | null
        }
        Relationships: []
      }
      company: {
        Row: {
          alternative_names: Json | null
          description: string | null
          headquarters: string | null
          homepage: string | null
          id: number | null
          logo_path: string | null
          name: string | null
          origin_country: string | null
          parent_company: Json | null
        }
        Relationships: []
      }
      guidelist: {
        Row: {
          created_at: string | null
          movie_id: number | null
          senders: Json[] | null
          status: Database["public"]["Enums"]["guidelist_status"] | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_movie_guidelist_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "tmdb_movie"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_guidelist_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movie"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_guidelist_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_guidelist_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_guidelist_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      guidelist_random: {
        Row: {
          created_at: string | null
          movie_id: number | null
          senders: Json[] | null
          status: Database["public"]["Enums"]["guidelist_status"] | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_movie_guidelist_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "tmdb_movie"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_guidelist_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movie"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_guidelist_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_guidelist_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_guidelist_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      movie: {
        Row: {
          adult: boolean | null
          backdrop_path: string | null
          budget: number | null
          collection_id: number | null
          directors: Json[] | null
          follower_avg_rating: number | null
          genres: Json[] | null
          homepage: string | null
          id: number | null
          imdb_id: string | null
          original_language: string | null
          original_title: string | null
          overview: string | null
          popularity: number | null
          poster_path: string | null
          release_date: string | null
          revenue: number | null
          runtime: number | null
          status: string | null
          tagline: string | null
          title: string | null
          vote_average: number | null
          vote_count: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tmdb_movie_collection_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "tmdb_collection"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tmdb_movie_collection_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collection"
            referencedColumns: ["id"]
          },
        ]
      }
      movies_recommended: {
        Row: {
          movie_id: number | null
          recommendation_count: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_movie_guidelist_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "tmdb_movie"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_guidelist_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movie"
            referencedColumns: ["id"]
          },
        ]
      }
      movies_trending: {
        Row: {
          activity_count: number | null
          movie_id: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_movie_activity_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "tmdb_movie"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_activity_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movie"
            referencedColumns: ["id"]
          },
        ]
      }
      person: {
        Row: {
          gender: number | null
          id: number | null
          known_for_department: string | null
          name: string | null
          popularity: number | null
          profile_path: string | null
        }
        Insert: {
          gender?: number | null
          id?: number | null
          known_for_department?: string | null
          name?: string | null
          popularity?: number | null
          profile_path?: never
        }
        Update: {
          gender?: number | null
          id?: number | null
          known_for_department?: string | null
          name?: string | null
          popularity?: number | null
          profile_path?: never
        }
        Relationships: [
          {
            foreignKeyName: "tmdb_person_gender_fkey"
            columns: ["gender"]
            isOneToOne: false
            referencedRelation: "tmdb_gender"
            referencedColumns: ["id"]
          },
        ]
      }
      person_full: {
        Row: {
          adult: boolean | null
          also_known_as: Json | null
          backdrop_path: string | null
          biography: string | null
          birthday: string | null
          deathday: string | null
          departments: string[] | null
          gender: number | null
          homepage: string | null
          id: number | null
          imdb_id: string | null
          known_for_department: string | null
          name: string | null
          place_of_birth: string | null
          popularity: number | null
          profile_path: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tmdb_person_gender_fkey"
            columns: ["gender"]
            isOneToOne: false
            referencedRelation: "tmdb_gender"
            referencedColumns: ["id"]
          },
        ]
      }
      profile: {
        Row: {
          avatar_url: string | null
          background_url: string | null
          bio: string | null
          created_at: string | null
          favorite_color: string | null
          followers_count: number | null
          following_count: number | null
          full_name: string | null
          id: string | null
          language: string | null
          premium: boolean | null
          private: boolean | null
          username: string | null
          username_updated_at: string | null
          visible: boolean | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          background_url?: string | null
          bio?: string | null
          created_at?: string | null
          favorite_color?: string | null
          followers_count?: number | null
          following_count?: number | null
          full_name?: string | null
          id?: string | null
          language?: string | null
          premium?: boolean | null
          private?: boolean | null
          username?: string | null
          username_updated_at?: string | null
          visible?: never
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          background_url?: string | null
          bio?: string | null
          created_at?: string | null
          favorite_color?: string | null
          followers_count?: number | null
          following_count?: number | null
          full_name?: string | null
          id?: string | null
          language?: string | null
          premium?: boolean | null
          private?: boolean | null
          username?: string | null
          username_updated_at?: string | null
          visible?: never
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_language_fkey"
            columns: ["language"]
            isOneToOne: false
            referencedRelation: "supported_languages"
            referencedColumns: ["language"]
          },
        ]
      }
      tmdb_movie_credits_random: {
        Row: {
          department: string | null
          id: string | null
          job: string | null
          movie_id: number | null
          person_id: number | null
        }
        Insert: {
          department?: string | null
          id?: string | null
          job?: string | null
          movie_id?: number | null
          person_id?: number | null
        }
        Update: {
          department?: string | null
          id?: string | null
          job?: string | null
          movie_id?: number | null
          person_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tmdb_movie_credits_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "tmdb_movie"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tmdb_movie_credits_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movie"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tmdb_movie_credits_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "tmdb_person"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tmdb_movie_credits_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "person"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tmdb_movie_credits_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "person_full"
            referencedColumns: ["id"]
          },
        ]
      }
      tmdb_person_department: {
        Row: {
          department: string | null
          person_id: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tmdb_movie_credits_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "tmdb_person"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tmdb_movie_credits_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "person"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tmdb_movie_credits_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "person_full"
            referencedColumns: ["id"]
          },
        ]
      }
      user_movie_activity_feed: {
        Row: {
          created_at: string | null
          date: string | null
          id: number | null
          is_liked: boolean | null
          movie_id: number | null
          rating: number | null
          updated_at: string | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_movie_activity_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "tmdb_movie"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_activity_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movie"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_activity_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_activity_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_activity_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      user_movie_guidelist_random: {
        Row: {
          created_at: string | null
          movie_id: number | null
          senders: Json[] | null
          status: Database["public"]["Enums"]["guidelist_status"] | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_movie_guidelist_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "tmdb_movie"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_guidelist_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movie"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_guidelist_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_guidelist_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_guidelist_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      user_movie_guidelist_view: {
        Row: {
          created_at: string | null
          movie_id: number | null
          senders: Json[] | null
          status: Database["public"]["Enums"]["guidelist_status"] | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_movie_guidelist_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "tmdb_movie"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_guidelist_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movie"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_guidelist_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_guidelist_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_guidelist_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      user_movie_review_view: {
        Row: {
          body: string | null
          comments_count: number | null
          created_at: string | null
          id: number | null
          is_liked: boolean | null
          likes_count: number | null
          movie_id: number | null
          rating: number | null
          title: string | null
          updated_at: string | null
          user_id: string | null
          views_count: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_movie_activity_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "tmdb_movie"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_activity_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movie"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_activity_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_activity_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_activity_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_review_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "user_movie_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_review_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "user_movie_activity_feed"
            referencedColumns: ["id"]
          },
        ]
      }
      user_movie_watchlist_random: {
        Row: {
          created_at: string | null
          id: number | null
          movie_id: number | null
          status: Database["public"]["Enums"]["watchlist_status"] | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number | null
          movie_id?: number | null
          status?: Database["public"]["Enums"]["watchlist_status"] | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number | null
          movie_id?: number | null
          status?: Database["public"]["Enums"]["watchlist_status"] | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_movie_watchlist_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "tmdb_movie"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_watchlist_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movie"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_watchlist_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_watchlist_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_watchlist_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profile: {
        Row: {
          avatar_url: string | null
          background_url: string | null
          bio: string | null
          created_at: string | null
          favorite_color: string | null
          followers_count: number | null
          following_count: number | null
          full_name: string | null
          id: string | null
          language: string | null
          premium: boolean | null
          private: boolean | null
          username: string | null
          username_updated_at: string | null
          visible: boolean | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          background_url?: string | null
          bio?: string | null
          created_at?: string | null
          favorite_color?: string | null
          followers_count?: number | null
          following_count?: number | null
          full_name?: string | null
          id?: string | null
          language?: string | null
          premium?: boolean | null
          private?: boolean | null
          username?: string | null
          username_updated_at?: string | null
          visible?: never
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          background_url?: string | null
          bio?: string | null
          created_at?: string | null
          favorite_color?: string | null
          followers_count?: number | null
          following_count?: number | null
          full_name?: string | null
          id?: string | null
          language?: string | null
          premium?: boolean | null
          private?: boolean | null
          username?: string | null
          username_updated_at?: string | null
          visible?: never
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_language_fkey"
            columns: ["language"]
            isOneToOne: false
            referencedRelation: "supported_languages"
            referencedColumns: ["language"]
          },
        ]
      }
      watchlist_random: {
        Row: {
          created_at: string | null
          id: number | null
          movie_id: number | null
          status: Database["public"]["Enums"]["watchlist_status"] | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number | null
          movie_id?: number | null
          status?: Database["public"]["Enums"]["watchlist_status"] | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number | null
          movie_id?: number | null
          status?: Database["public"]["Enums"]["watchlist_status"] | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_movie_watchlist_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "tmdb_movie"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_watchlist_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movie"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_watchlist_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_watchlist_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_watchlist_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          },
        ]
      }
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
      importer_best_match_movie: {
        Args: {
          lang: string
          search_title: string
          search_year?: number
          similarity_threshold?: number
        }
        Returns: {
          id: number
          title: string
          release_date: string
          language: string
          popularity: number
          directors: Json
        }[]
      }
      rls_playlist_guest: {
        Args: {
          p_playlist_id: number
          p_user_id: string
          p_action: string
        }
        Returns: boolean
      }
      rls_playlist_item: {
        Args: {
          p_playlist_id: number
          p_action: string
          p_user_id: string
        }
        Returns: boolean
      }
      rls_playlist_select: {
        Args: {
          p_playlist_id: number
          p_user_id: string
        }
        Returns: boolean
      }
      search_movies: {
        Args: {
          search_query: string
          lang: string
          page_number?: number
          page_size?: number
          similarity_threshold?: number
        }
        Returns: {
          id: number
          adult: boolean
          backdrop_path: string
          budget: number
          homepage: string
          imdb_id: string
          original_language: string
          original_title: string
          popularity: number
          release_date: string
          revenue: number
          runtime: number
          status: string
          vote_average: number
          vote_count: number
          collection_id: number
          language: Database["public"]["Enums"]["language_app"]
          overview: string
          poster_path: string
          tagline: string
          title: string
          follower_avg_rating: number
          directors: Json[]
          genres: Json[]
        }[]
      }
      user_movie_guidelist_insert: {
        Args: {
          movieid: number
          comment: string
          sender_user_id: string
          receiver_user_ids: string[]
        }
        Returns: undefined
      }
      utils_check_playlist_guest: {
        Args: {
          p_user_id: string
          p_playlist_id: number
        }
        Returns: boolean
      }
      utils_check_playlist_owner: {
        Args: {
          p_user_id: string
          p_playlist_id: number
        }
        Returns: boolean
      }
      utils_check_playlist_privacy: {
        Args: {
          p_playlist_id: number
        }
        Returns: boolean
      }
      utils_check_user_following: {
        Args: {
          p_follower_id: string
          p_followee_id: string
        }
        Returns: boolean
      }
      utils_check_user_friendship: {
        Args: {
          user_id_1: string
          user_id_2: string
        }
        Returns: boolean
      }
      utils_check_user_privacy: {
        Args: {
          user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      eventType: "INSERT" | "DELETE" | "UPDATE"
      guidelist_status: "active" | "completed" | "deleted"
      image_type: "backdrop" | "poster" | "logo" | "profile"
      language_app: "en-US" | "fr-FR"
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
      sync_logs_status:
        | "initialized"
        | "fetching_data"
        | "data_fetched"
        | "syncing_to_db"
        | "success"
        | "failed"
      sync_logs_type:
        | "tmdb_movie"
        | "tmdb_person"
        | "tmdb_collection"
        | "tmdb_keyword"
        | "tmdb_company"
        | "tmdb_language"
        | "tmdb_country"
        | "tmdb_genre"
      tmdb_update_logs_type:
        | "movie"
        | "person"
        | "collection"
        | "keyword"
        | "company"
        | "language"
        | "country"
        | "genre"
      watchlist_status: "active" | "completed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

