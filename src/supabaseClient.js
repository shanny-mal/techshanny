// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

// These env vars must be set in your .env
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    "Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in your environment"
  );
}

// Use a global to avoid re-creating on HMR or multiple imports
const globalRef = typeof window !== "undefined" ? window : globalThis;
const __supabase =
  globalRef.__supabase || createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
if (!globalRef.__supabase) globalRef.__supabase = __supabase;

export const supabase = __supabase;
