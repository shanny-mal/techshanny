// src/hooks/useGoogleReviews.js
import { useState, useEffect } from "react";

export default function useGoogleReviews({ placeId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!placeId) {
      setError("No placeId provided");
      setLoading(false);
      return;
    }

    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
    if (!apiKey) {
      setError("Google API key missing");
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchReviews() {
      setLoading(true);
      setError(null);

      try {
        // Use the REST Place Details endpoint
        const url = new URL(
          "https://maps.googleapis.com/maps/api/place/details/json"
        );
        url.searchParams.set("place_id", placeId);
        url.searchParams.set("fields", "reviews"); // only pull reviews
        url.searchParams.set("key", apiKey);

        const resp = await fetch(url.toString(), { signal });
        if (!resp.ok) {
          throw new Error(`HTTP ${resp.status}`);
        }

        const data = await resp.json();
        if (data.status !== "OK") {
          // API returned an error
          const msg = data.error_message
            ? `${data.status}: ${data.error_message}`
            : data.status;
          throw new Error(msg);
        }

        // Normalize or annotate reviews if you like
        setReviews(
          (data.result.reviews || []).map((r) => ({
            author_name: r.author_name,
            author_url: r.author_url,
            rating: r.rating,
            time: r.relative_time_description,
            text: r.text,
            profile_photo_url: r.profile_photo_url,
          }))
        );
      } catch (e) {
        if (e.name !== "AbortError") {
          setError(e.message);
          setReviews([]);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();

    return () => controller.abort();
  }, [placeId]);

  return { reviews, loading, error };
}
