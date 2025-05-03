// src/components/Blog/BlogList.jsx
import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const from = (page - 1) * PAGE_SIZE;
      const to = page * PAGE_SIZE - 1;
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, excerpt, image_url")
        .order("published_at", { ascending: false })
            .range(0, 5); // instead of offset/limit
        
      if (error) console.error(error);
      else {
        setPosts((prev) => [...prev, ...data]);
        if (data.length < PAGE_SIZE) setHasMore(false);
      }
      setLoading(false);
    };
    fetchPosts();
  }, [page]);

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
        <div className="blog-grid">
          {posts.map((post) => (
            <article key={post.id} className="blog-card">
              <img
                src={post.image_url}
                alt={post.title}
                loading="lazy"
                className="blog-card-img"
              />
              <div className="blog-card-body">
                <h3>
                  <Link to={`/blog/${post.id}`}>{post.title}</Link>
                </h3>
                <p>{post.excerpt}</p>
                <Link
                  to={`/blog/${post.id}`}
                  className="read-more-btn"
                  onMouseEnter={() => {
                    if (!loading && hasMore) setPage((p) => p + 1);
                  }}
                >
                  Read More
                </Link>
              </div>
            </article>
          ))}
        </div>
        {hasMore && (
          <div className="text-center mt-4">
            <button
              className="btn btn-primary"
              onClick={() => setPage((prev) => prev + 1)}
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
