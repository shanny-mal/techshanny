// src/services/emailService.js
// ============================
import { supabase } from "./api";

/**
 * Add an email to the newsletter_subscribers table
 * Make sure you have a table named `newsletter_subscribers`
 * with at least { id: uuid, email: text, subscribed_at: timestamp }
 */
export async function subscribeNewsletter(email) {
  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .insert({ email })
    .select();
  if (error) throw error;
  return data;
}
