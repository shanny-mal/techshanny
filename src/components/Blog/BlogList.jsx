// src/components/Blog/BlogList.jsx
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Spinner } from "react-bootstrap";
import { FaTrash, FaEdit } from "react-icons/fa";
import { supabase } from "../../supabaseClient.js";
import { useAuth } from "../../context/AuthContext.jsx";
import "./Blog.css";

const PAGE_SIZE = 6;

export default function BlogList() {
  const { user, deletePost } = useAuth();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // fetch and prefetch
  const fetchPosts = useCallback(async (pageToFetch) => {
    const from = (pageToFetch - 1) * PAGE_SIZE;
    const to = pageToFetch * PAGE_SIZE - 1;
    const { data, error } = await supabase
      .from("posts")
      .select("id, title, excerpt, image_url, published_at, author_id")
      .order("published_at", { ascending: false })
      .range(from, to);

    if (error) console.error(error);
    else {
      setPosts((prev) => {
        const existing = new Set(prev.map((p) => p.id));
        const newOnes = data.filter((p) => !existing.has(p.id));
        return [...prev, ...newOnes];
      });
      if (data.length < PAGE_SIZE) setHasMore(false);
    }
  }, []);

  // initial & page changes
  useEffect(() => {
    setLoading(true);
    fetchPosts(page).finally(() => setLoading(false));
  }, [page, fetchPosts]);

  // prefetch next page
  useEffect(() => {
    if (hasMore) {
      fetchPosts(page + 1).catch(() => {});
    }
  }, [posts]); // runs after posts append

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    try {
      await deletePost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert("Failed to delete.");
    }
  };

  return (
    <section id="blog" className="blog-section">
      <Container>
        <h2 className="blog-heading">Latest Insights</h2>

        <div className="blog-grid">
          {posts.map((post, idx) => (
            <article
              key={post.id}
              className={`blog-card ${idx === 0 ? "featured" : ""}`}
            >
              {post.image_url && (
                <picture className="card-img-container">
                  <source
                    type="image/webp"
                    srcSet={`${post.image_url.replace(
                      /\.jpg$/,
                      ".webp"
                    )} 600w, ${post.image_url.replace(/\.jpg$/, ".webp")} 900w`}
                  />
                  <img
                    loading="lazy"
                    src={post.image_url}
                    alt={post.title}
                    className="blog-card-img"
                  />
                  <div className="metadata-overlay">
                    <time>
                      {new Date(post.published_at).toLocaleDateString()}
                    </time>
                    {user?.id === post.author_id && (
                      <div className="action-icons">
                        <Link to={`/blog/edit/${post.id}`} className="edit-btn">
                          <FaEdit />
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="delete-btn"
                          aria-label="Delete post"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </div>
                </picture>
              )}

              <div className="card-body">
                <h3 className="card-title">
                  <Link to={`/blog/${post.id}`}>{post.title}</Link>
                </h3>
                <p className="card-excerpt">{post.excerpt}</p>
                <Link to={`/blog/${post.id}`} className="read-more">
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {hasMore && (
          <div className="load-more-wrapper">
            <Button
              variant="outline-primary"
              onClick={() => setPage((p) => p + 1)}
              disabled={loading}
            >
              {loading ? <Spinner size="sm" /> : "Load More"}
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}
