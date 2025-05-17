import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jllsbwezzxedlebssvej.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsbHNid2V6enhlZGxlYnNzdmVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1MDI4NjAsImV4cCI6MjA2MzA3ODg2MH0.zW1ZP6FP6TGgv0gIvPNGXKzGDBvYUVXQ9ipc75EPJsM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
