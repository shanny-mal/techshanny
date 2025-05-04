// src/components/Blog/BlogList.jsx
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "../../supabaseClient.js";
import "./Blog.css";

const PAGE_SIZE = 6;

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState("");

  const fetchPosts = useCallback(async (pageNum) => {
    setLoading(true);
    setError("");
    try {
      // Calculate slice
      const from = (pageNum - 1) * PAGE_SIZE;
      const to = pageNum * PAGE_SIZE - 1;

      // Fetch a consistent slice sorted by published_at then id
      const { data, error: supaErr } = await supabase
        .from("posts")
        .select("id, title, excerpt, image_url, published_at")
        .order("published_at", { ascending: false })
        .order("id", { ascending: false }) // secondary sort assures stability
        .range(from, to);

      if (supaErr) throw supaErr;

      // If fewer than PAGE_SIZE returned, no more pages
      setHasMore(data.length === PAGE_SIZE);

      // Append only new items
      setPosts((prev) => {
        // Filter out any ids we already have (just in case)
        const existingIds = new Set(prev.map((p) => p.id));
        const filtered = data.filter((p) => !existingIds.has(p.id));
        return [...prev, ...filtered];
      });
    } catch (err) {
      console.error("Error loading posts:", err);
      setError(err.message || "Failed to load posts");
    } finally {
      setLoading(false);
    }
  }, []);

  // On mount & when `page` changes, fetch that page
  useEffect(() => {
    fetchPosts(page);
  }, [page, fetchPosts]);

  return (
    <section id="blog" className="blog-section py-5">
      <Helmet>
        <title>Blog – ShannyTechSolutions</title>
        <meta
          name="description"
          content="Latest articles and insights from ShannyTechSolutions."
        />
      </Helmet>

      <div className="container">
        <h2 className="blog-heading text-center mb-4">Latest Insights</h2>
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="blog-grid">
          {posts.map((post) => (
            <article key={post.id} className="blog-card">
              {post.image_url && (
                <img
                  src={post.image_url}
                  alt={post.title}
                  loading="lazy"
                  className="blog-card-img"
                />
              )}
              <div className="blog-card-body">
                <h3 className="blog-card-title">
                  <Link to={`/blog/${post.id}`}>{post.title}</Link>
                </h3>
                <p className="blog-card-excerpt">{post.excerpt}</p>
                <Link to={`/blog/${post.id}`} className="read-more-btn">
                  Read More
                </Link>
              </div>
              <footer className="blog-card-footer">
                <small className="text-muted">
                  {new Date(post.published_at).toLocaleDateString()}
                </small>
              </footer>
            </article>
          ))}
        </div>

        {hasMore && (
          <div className="text-center mt-4">
            <button
              className="btn btn-primary"
              onClick={() => setPage((p) => p + 1)}
              disabled={loading}
            >
              {loading ? "Loading…" : "Load More"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogList;
