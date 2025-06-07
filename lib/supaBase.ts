// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)


export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: number;
          email: string;
          password_hash: string;
          created_at: string;      // timestamptz
        };
        Insert: {
          email: string;
          password_hash: string;
          // created_at 는 DEFAULT NOW() 이므로 선택적(optional)
          created_at?: string;
        };
        Update: {
          email?: string;
          password_hash?: string;
          created_at?: string;
        };
      };
      profiles: {
        Row: {
          user_id: number;
          username: string | null;
          full_name: string | null;
          avatar_url: string | null;
        };
        Insert: {
          user_id: number;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
        };
        Update: {
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}