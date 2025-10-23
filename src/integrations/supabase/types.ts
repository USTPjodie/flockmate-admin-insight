export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      alerts: {
        Row: {
          created_at: string
          farm: string
          farm_id: string | null
          id: string
          message: string
          read: boolean
          title: string
          type: string
        }
        Insert: {
          created_at?: string
          farm: string
          farm_id?: string | null
          id?: string
          message: string
          read?: boolean
          title: string
          type: string
        }
        Update: {
          created_at?: string
          farm?: string
          farm_id?: string | null
          id?: string
          message?: string
          read?: boolean
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "alerts_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
        ]
      }
      batches: {
        Row: {
          bird_count: number
          breed: string
          created_at: string
          current_age: number
          current_weight: number
          end_date: string | null
          farm_id: string
          id: string
          start_date: string
          status: string
          target_weight: number
          updated_at: string
        }
        Insert: {
          bird_count: number
          breed: string
          created_at?: string
          current_age?: number
          current_weight?: number
          end_date?: string | null
          farm_id: string
          id?: string
          start_date: string
          status?: string
          target_weight: number
          updated_at?: string
        }
        Update: {
          bird_count?: number
          breed?: string
          created_at?: string
          current_age?: number
          current_weight?: number
          end_date?: string | null
          farm_id?: string
          id?: string
          start_date?: string
          status?: string
          target_weight?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "batches_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
        ]
      }
      cost_breakdown: {
        Row: {
          amount: number
          created_at: string
          id: string
          name: string
          value: number
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          name: string
          value: number
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          name?: string
          value?: number
        }
        Relationships: []
      }
      dashboard_metrics: {
        Row: {
          change_percentage: string | null
          change_type: string | null
          created_at: string
          id: string
          metric_name: string
          metric_value: string
          updated_at: string
        }
        Insert: {
          change_percentage?: string | null
          change_type?: string | null
          created_at?: string
          id?: string
          metric_name: string
          metric_value: string
          updated_at?: string
        }
        Update: {
          change_percentage?: string | null
          change_type?: string | null
          created_at?: string
          id?: string
          metric_name?: string
          metric_value?: string
          updated_at?: string
        }
        Relationships: []
      }
      farm_performance: {
        Row: {
          avg_weight: number
          cost_per_kg: number
          created_at: string
          farm_id: string | null
          farm_name: string
          fcr: number
          id: string
          mortality: number
          updated_at: string
        }
        Insert: {
          avg_weight: number
          cost_per_kg: number
          created_at?: string
          farm_id?: string | null
          farm_name: string
          fcr: number
          id?: string
          mortality: number
          updated_at?: string
        }
        Update: {
          avg_weight?: number
          cost_per_kg?: number
          created_at?: string
          farm_id?: string | null
          farm_name?: string
          fcr?: number
          id?: string
          mortality?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "farm_performance_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
        ]
      }
      farms: {
        Row: {
          capacity: number
          coordinates: Json | null
          created_at: string
          id: string
          location: string
          manager: string
          name: string
          status: string
          updated_at: string
        }
        Insert: {
          capacity: number
          coordinates?: Json | null
          created_at?: string
          id?: string
          location: string
          manager: string
          name: string
          status?: string
          updated_at?: string
        }
        Update: {
          capacity?: number
          coordinates?: Json | null
          created_at?: string
          id?: string
          location?: string
          manager?: string
          name?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      financial_data: {
        Row: {
          cost: number
          created_at: string
          id: string
          margin: number
          month: string
          profit: number
          revenue: number
        }
        Insert: {
          cost: number
          created_at?: string
          id?: string
          margin: number
          month: string
          profit: number
          revenue: number
        }
        Update: {
          cost?: number
          created_at?: string
          id?: string
          margin?: number
          month?: string
          profit?: number
          revenue?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          role: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name: string
          id: string
          role: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      reports: {
        Row: {
          created_at: string
          created_by: string | null
          file_url: string | null
          format: string
          generated_at: string
          id: string
          parameters: Json | null
          size: string | null
          status: string
          title: string
          type: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          file_url?: string | null
          format: string
          generated_at?: string
          id?: string
          parameters?: Json | null
          size?: string | null
          status?: string
          title: string
          type: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          file_url?: string | null
          format?: string
          generated_at?: string
          id?: string
          parameters?: Json | null
          size?: string | null
          status?: string
          title?: string
          type?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "manager" | "technician"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "manager", "technician"],
    },
  },
} as const
