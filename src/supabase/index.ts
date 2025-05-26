import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zagneidczofriydkrmcn.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphZ25laWRjem9mcml5ZGtybWNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxOTg3NjIsImV4cCI6MjA2Mjc3NDc2Mn0.azo2-bS9GbkBjQ0nIY7RfV2DgIyeP0FevQ0AR2zu8jk";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
