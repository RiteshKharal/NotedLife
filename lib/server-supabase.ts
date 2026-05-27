import { createClient } from "@supabase/supabase-js";

export const server_supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SERVICE_ROLE!,
)