import envConfig from "@/lib/env";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(envConfig.VITE_SUPABASE_URL, envConfig.VITE_SUPABASE_ANON_KEY);
