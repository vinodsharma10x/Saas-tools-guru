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
      tools: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          logo: string
          description: string
          founder: string
          features: Json
          pricing: Json
          website: string
          video_url: string | null
          screenshots: Json
          how_to_use: string
          pros: Json
          cons: Json
          best_for: Json
          category: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          logo: string
          description: string
          founder: string
          features: Json
          pricing: Json
          website: string
          video_url?: string | null
          screenshots: Json
          how_to_use: string
          pros: Json
          cons: Json
          best_for: Json
          category: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          logo?: string
          description?: string
          founder?: string
          features?: Json
          pricing?: Json
          website?: string
          video_url?: string | null
          screenshots?: Json
          how_to_use?: string
          pros?: Json
          cons?: Json
          best_for?: Json
          category?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}