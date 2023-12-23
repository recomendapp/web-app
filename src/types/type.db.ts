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
            isOneToOne: true
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
            isOneToOne: false
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
            isOneToOne: false
            referencedRelation: "playlist"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "playlist_guest_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
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
            isOneToOne: false
            referencedRelation: "film"
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
            isOneToOne: false
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
            isOneToOne: false
            referencedRelation: "prices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      user: {
        Row: {
          avatar_url: string | null
          background_url: string | null
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
          premium: boolean
          updated_at: string | null
          username: string
          username_updated_at: string | null
          verified: boolean
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          background_url?: string | null
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
          premium?: boolean
          updated_at?: string | null
          username: string
          username_updated_at?: string | null
          verified?: boolean
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          background_url?: string | null
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
          premium?: boolean
          updated_at?: string | null
          username?: string
          username_updated_at?: string | null
          verified?: boolean
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_id_fkey"
            columns: ["id"]
            isOneToOne: true
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
            isOneToOne: false
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
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      user_movie_activity: {
        Row: {
          created_at: string
          date: string
          film_id: number
          id: number
          is_liked: boolean
          rating: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          date?: string
          film_id: number
          id?: number
          is_liked?: boolean
          rating?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          film_id?: number
          id?: number
          is_liked?: boolean
          rating?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_movie_activity_film_id_fkey"
            columns: ["film_id"]
            isOneToOne: false
            referencedRelation: "film"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_activity_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      user_movie_guidelist: {
        Row: {
          comment: string | null
          created_at: string
          film_id: number
          id: number
          receiver_user_id: string
          sender_user_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          film_id: number
          id?: number
          receiver_user_id: string
          sender_user_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          film_id?: number
          id?: number
          receiver_user_id?: string
          sender_user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_movie_guidelist_film_id_fkey"
            columns: ["film_id"]
            isOneToOne: false
            referencedRelation: "film"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_guidelist_sender_user_id_fkey"
            columns: ["sender_user_id"]
            isOneToOne: false
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
          film_id: number
          id: number
          likes_count: number
          title: string
          updated_at: string | null
          user_id: string
          views_count: number
        }
        Insert: {
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
            foreignKeyName: "user_movie_review_film_id_fkey"
            columns: ["film_id"]
            isOneToOne: false
            referencedRelation: "film"
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
            foreignKeyName: "user_movie_review_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      user_movie_watchlist: {
        Row: {
          created_at: string
          film_id: number
          id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          film_id: number
          id?: number
          user_id: string
        }
        Update: {
          created_at?: string
          film_id?: number
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_movie_watchlist_film_id_fkey"
            columns: ["film_id"]
            isOneToOne: false
            referencedRelation: "film"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_movie_watchlist_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
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
