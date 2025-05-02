// src/components/Blog/BlogList.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import "./Blog.css";

const API_URL = process.env.REACT_APP_CMS_API_URL;

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/posts`, {
          params: { _page: page, _limit: 6 },
        });
        setPosts((prev) => [...prev, ...res.data]);
        if (res.data.length < 6) setHasMore(false);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchPosts();
  }, [page]);

  const prefetchNext = () => {
    if (hasMore && !loading) setPage((prev) => prev + 1);
  };

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
                src={post.image}
                srcSet={`${post.imageSmall} 600w, ${post.imageMedium} 900w, ${post.image} 1200w`}
                sizes="(max-width: 600px) 100vw, 33vw"
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
                  onMouseEnter={prefetchNext}
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
