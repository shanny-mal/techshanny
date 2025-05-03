// src/services/api.js
import { supabase } from "../supabaseClient.js";

// Re-export the Supabase client for direct use
export { supabase };

// Utility wrapper for making RPC calls or direct queries
const api = {
  auth: supabase.auth,
  from: (table) => supabase.from(table),
  rpc: (fnName, params) => supabase.rpc(fnName, params),
};

export default api;
