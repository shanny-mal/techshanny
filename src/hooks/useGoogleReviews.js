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

    // Wait until the Maps SDK has loaded
    const checkGoogle = () =>
      new Promise((resolve, reject) => {
        if (window.google?.maps?.places) {
          resolve();
        } else {
          const i = setInterval(() => {
            if (window.google?.maps?.places) {
              clearInterval(i);
              resolve();
            }
          }, 100);
          setTimeout(() => {
            clearInterval(i);
            reject(new Error("Google SDK load timeout"));
          }, 5000);
        }
      });

    async function fetchReviews() {
      setLoading(true);
      setError(null);

      try {
        await checkGoogle();
        const service = new window.google.maps.places.PlacesService(
          document.createElement("div")
        );
        service.getDetails(
          { placeId, fields: ["reviews"] },
          (result, status) => {
            if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
              setError(status);
              setReviews([]);
            } else {
              setReviews(result.reviews || []);
            }
            setLoading(false);
          }
        );
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    }

    fetchReviews();
  }, [placeId]);

  return { reviews, loading, error };
}
