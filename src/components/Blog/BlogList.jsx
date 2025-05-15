// src/components/Blog/BlogList.jsx
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Spinner } from "react-bootstrap";
import { FaTrash, FaEdit } from "react-icons/fa";
import api from "../../services/api.js";
import { useAuth } from "../../context/AuthContext.jsx";
import "./Blog.css";

const PAGE_SIZE = 6;

export default function BlogList() {
  const { user, deletePost } = useAuth();
  const [posts, setPosts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Fetch a page of posts from DRF: GET /posts/?limit=PAGE_SIZE&offset=offset
  const fetchPosts = useCallback(async (currentOffset) => {
    setLoading(true);
    try {
      const data = await api.getList("posts", {
        limit: PAGE_SIZE,
        offset: currentOffset,
      });
      if (data.length < PAGE_SIZE) {
        setHasMore(false);
      }
      // Append de‐duplicated
      setPosts((prev) => {
        const existingIds = new Set(prev.map((p) => p.id));
        const newOnes = data.filter((p) => !existingIds.has(p.id));
        return [...prev, ...newOnes];
      });
    } catch (err) {
      console.error("Failed to load posts:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load & whenever offset changes
  useEffect(() => {
    fetchPosts(offset);
  }, [offset, fetchPosts]);

  // Prefetch next page
  useEffect(() => {
    if (hasMore && !loading) {
      fetchPosts(offset + PAGE_SIZE).catch(() => {});
    }
  }, [posts, hasMore, loading, offset, fetchPosts]);

  // Delete handler
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    try {
      // call your context deletePost (which invokes api.remove under the hood)
      await deletePost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
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
                    {user?.id === post.author.id && (
                      <div className="action-icons">
                        <Link
                          to={`/blog/edit/${post.id}`}
                          className="edit-btn"
                          aria-label="Edit post"
                        >
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
              onClick={() => setOffset((o) => o + PAGE_SIZE)}
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
