export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
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
        Relationships: [
          {
            foreignKeyName: "customers_id_fkey"
            columns: ["id"]
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      film: {
        Row: {
          id: number
          slug: string | null
        }
        Insert: {
          id?: number
          slug?: string | null
        }
        Update: {
          id?: number
          slug?: string | null
        }
        Relationships: []
      }
      film_action: {
        Row: {
          created_at: string
          film_id: number
          id: number
          is_liked: boolean | null
          is_watched: boolean | null
          is_watchlisted: boolean | null
          rating: number | null
          review_id: number | null
          updated_at: string
          user_id: string
          watched_date: string
        }
        Insert: {
          created_at?: string
          film_id: number
          id?: number
          is_liked?: boolean | null
          is_watched?: boolean | null
          is_watchlisted?: boolean | null
          rating?: number | null
          review_id?: number | null
          updated_at?: string
          user_id: string
          watched_date?: string
        }
        Update: {
          created_at?: string
          film_id?: number
          id?: number
          is_liked?: boolean | null
          is_watched?: boolean | null
          is_watchlisted?: boolean | null
          rating?: number | null
          review_id?: number | null
          updated_at?: string
          user_id?: string
          watched_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "film_action_film_id_fkey"
            columns: ["film_id"]
            referencedRelation: "film"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "film_action_review_id_fkey"
            columns: ["review_id"]
            referencedRelation: "review"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "film_action_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      follower: {
        Row: {
          followee_id: string
          follower_id: string
          id: number
        }
        Insert: {
          followee_id: string
          follower_id: string
          id?: number
        }
        Update: {
          followee_id?: string
          follower_id?: string
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "follower_followee_id_fkey"
            columns: ["followee_id"]
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      friend: {
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
            foreignKeyName: "friend_friend_id_fkey"
            columns: ["friend_id"]
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      guidelist: {
        Row: {
          comment: string | null
          film_id: number
          id: number
          receiver_user_id: string
          sender_user_id: string
        }
        Insert: {
          comment?: string | null
          film_id: number
          id?: number
          receiver_user_id: string
          sender_user_id: string
        }
        Update: {
          comment?: string | null
          film_id?: number
          id?: number
          receiver_user_id?: string
          sender_user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "guidelist_film_id_fkey"
            columns: ["film_id"]
            referencedRelation: "film"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "guidelist_sender_user_id_fkey"
            columns: ["sender_user_id"]
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      person: {
        Row: {
          created_at: string
          followers_count: number | null
          id: number
        }
        Insert: {
          created_at?: string
          followers_count?: number | null
          id?: number
        }
        Update: {
          created_at?: string
          followers_count?: number | null
          id?: number
        }
        Relationships: []
      }
      playlist: {
        Row: {
          created_at: string
          description: string
          guest: string[] | null
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
          guest?: string[] | null
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
          guest?: string[] | null
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
      playlist_item: {
        Row: {
          comment: string | null
          created_at: string
          film_id: number
          id: number
          playlist_id: number
          rank: number
          user_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          film_id: number
          id?: number
          playlist_id: number
          rank?: number
          user_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          film_id?: number
          id?: number
          playlist_id?: number
          rank?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "playlist_item_film_id_fkey"
            columns: ["film_id"]
            referencedRelation: "film"
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
          id: string
          image: string | null
          metadata: Json | null
          name: string | null
        }
        Insert: {
          active?: boolean | null
          description?: string | null
          id: string
          image?: string | null
          metadata?: Json | null
          name?: string | null
        }
        Update: {
          active?: boolean | null
          description?: string | null
          id?: string
          image?: string | null
          metadata?: Json | null
          name?: string | null
        }
        Relationships: []
      }
      review: {
        Row: {
          action_id: number
          body: string
          comments_count: number
          created_at: string
          film_id: number
          id: number
          likes_count: number
          title: string
          updated_at: string | null
          user_id: string
          views_count: number
        }
        Insert: {
          action_id: number
          body: string
          comments_count?: number
          created_at?: string
          film_id: number
          id?: number
          likes_count?: number
          title: string
          updated_at?: string | null
          user_id: string
          views_count?: number
        }
        Update: {
          action_id?: number
          body?: string
          comments_count?: number
          created_at?: string
          film_id?: number
          id?: number
          likes_count?: number
          title?: string
          updated_at?: string | null
          user_id?: string
          views_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "review_action_id_fkey"
            columns: ["action_id"]
            referencedRelation: "film_action"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "review_film_id_fkey"
            columns: ["film_id"]
            referencedRelation: "film"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "review_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
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
      user: {
        Row: {
          avatar_url: string | null
          billing_address: Json | null
          bio: string | null
          created_at: string
          favorite_color: string | null
          favorite_films: number[] | null
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
          billing_address?: Json | null
          bio?: string | null
          created_at?: string
          favorite_color?: string | null
          favorite_films?: number[] | null
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
          billing_address?: Json | null
          bio?: string | null
          created_at?: string
          favorite_color?: string | null
          favorite_films?: number[] | null
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
      user_stats: {
        Row: {
          id: number
          total_runtime: number | null
        }
        Insert: {
          id?: number
          total_runtime?: number | null
        }
        Update: {
          id?: number
          total_runtime?: number | null
        }
        Relationships: []
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
    }
    Enums: {
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
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
