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

    const controller = new AbortController();
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
    if (!apiKey) {
      setError("Google API key missing");
      setLoading(false);
      return;
    }

    async function fetchReviews() {
      setLoading(true);
      setError(null);
      try {
        const url = new URL(
          "https://maps.googleapis.com/maps/api/place/details/json"
        );
        url.searchParams.set("place_id", placeId);
        url.searchParams.set("fields", "reviews");
        url.searchParams.set("key", apiKey);

        const resp = await fetch(url.toString(), {
          signal: controller.signal,
        });
        if (!resp.ok) {
          throw new Error(`HTTP ${resp.status}`);
        }
        const data = await resp.json();
        if (data.status !== "OK") {
          throw new Error(
            data.status + (data.error_message ? `: ${data.error_message}` : "")
          );
        }
        setReviews(data.result.reviews || []);
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

    return () => {
      controller.abort();
    };
  }, [placeId]);

  return { reviews, loading, error };
}
