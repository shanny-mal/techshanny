import { useState, useEffect } from "react";

export default function useGoogleReviews({ placeId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Wait until the SDK has loaded
    function waitForSdk() {
      return new Promise((resolve, reject) => {
        if (window.google?.maps?.places) {
          resolve();
        } else {
          const interval = setInterval(() => {
            if (window.google?.maps?.places) {
              clearInterval(interval);
              resolve();
            }
          }, 100);
          // optional timeout after e.g. 5s
          setTimeout(() => {
            clearInterval(interval);
            reject(new Error("Google Maps SDK load timeout"));
          }, 5000);
        }
      });
    }

    async function fetchReviews() {
      setLoading(true);
      try {
        await waitForSdk();
        // Create an off-DOM div for the service
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
