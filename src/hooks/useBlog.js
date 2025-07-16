// src/hooks/useBlog.js
import { useState, useEffect } from "react";
import { useApi } from "../context/ApiContext";

export function useBlogList() {
  const { baseUrl } = useApi();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(`${baseUrl}/api/blog/`)
      .then((r) => r.json())
      .then(setPosts)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [baseUrl]);
  return { posts, loading, error };
}

export function useBlogPost(slug) {
  const { baseUrl } = useApi();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(`${baseUrl}/api/blog/${slug}/`)
      .then((r) => r.json())
      .then(setPost)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [baseUrl, slug]);
  return { post, loading, error };
}
