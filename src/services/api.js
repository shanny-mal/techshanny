// src/services/api.js
import { supabase } from "../supabaseClient.js";

// Utility wrapper for making RPC calls or direct queries
export default {
  auth: supabase.auth,
  from: (table) => supabase.from(table),
  rpc: (fnName, params) => supabase.rpc(fnName, params),
};
