// src/hooks/useGoogleReviews.js
import { useState, useEffect } from "react";

export default function useGoogleReviews({ placeId, apiKey }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchReviews() {
      setLoading(true);
      try {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`;
        const res = await fetch(url);
        const json = await res.json();
        if (json.status !== "OK") throw new Error(json.status);
        setReviews(json.result.reviews || []);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, [placeId, apiKey]);

  return { reviews, loading, error };
}
