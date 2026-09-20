import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL || "https://placeholder.supabase.co";
const key = process.env.SUPABASE_SERVICE_KEY || "placeholder-service-key";

// Service role client — server-only, never exposed to the browser
export const supabaseAdmin = createClient(url, key, {
  auth: { persistSession: false },
});
