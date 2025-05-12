// src/components/Blog/BlogPostDetail.jsx
import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Container, Button, Spinner, Alert } from "react-bootstrap";
import {
  FaEdit,
  FaTrash,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext.jsx";
import { supabase } from "../../supabaseClient.js";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "./BlogPostDetail.css";

export default function BlogPostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, deletePost } = useAuth();
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const contentRef = useRef();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        // Fetch post
        let { data: p, error: pErr } = await supabase
          .from("posts")
          .select(
            `id, title, content, excerpt, image_url, published_at, author_id`
          )
          .eq("id", id)
          .single();
        if (pErr) throw pErr;
        setPost(p);

        // Fetch author profile
        let { data: prof, error: profErr } = await supabase
          .from("profiles")
          .select(`full_name, avatar_url, bio`)
          .eq("user_id", p.author_id)
          .single();
        if (profErr) throw profErr;
        setAuthor(prof);

        // Highlight code blocks and build TOC
        Prism.highlightAll();
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this post?")) return;
    try {
      await deletePost(id);
      navigate("/blog");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading)
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    );
  if (error)
    return (
      <Alert variant="danger" className="my-5">
        {error}
      </Alert>
    );
  if (!post)
    return (
      <Alert variant="warning" className="my-5">
        Post not found
      </Alert>
    );

  // Generate a simple Table of Contents
  const headings = Array.from(
    contentRef.current?.querySelectorAll("h2, h3") || []
  ).map((h) => ({
    id: (h.id = h.textContent.toLowerCase().replace(/\s+/g, "-")),
    text: h.textContent,
    tag: h.tagName,
  }));

  return (
    <Container fluid className="blog-post-detail">
      {/* Featured Image */}
      {post.image_url && (
        <div className="featured-img-wrapper">
          <img
            src={post.image_url}
            alt={post.title}
            className="featured-image"
          />
        </div>
      )}

      <Container className="post-layout">
        {/* TOC sidebar */}
        <nav className="toc-sidebar">
          <h5>On this page</h5>
          <ul>
            {headings.map((h) => (
              <li key={h.id} className={h.tag.toLowerCase()}>
                <a href={`#${h.id}`}>{h.text}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Main content */}
        <article className="post-main">
          <h1 className="post-title">{post.title}</h1>
          <p className="post-meta">
            By <strong>{author.full_name || "Unknown"}</strong> on{" "}
            {new Date(post.published_at).toLocaleDateString()}
          </p>

          {/* Action buttons */}
          {user?.id === post.author_id && (
            <div className="action-bar">
              <Button
                variant="outline-secondary"
                as={Link}
                to={`/blog/edit/${id}`}
              >
                <FaEdit /> Edit
              </Button>
              <Button variant="outline-danger" onClick={handleDelete}>
                <FaTrash /> Delete
              </Button>
            </div>
          )}

          {/* Content */}
          <div
            className="post-content"
            ref={contentRef}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Pull-quote example */}
          <blockquote className="pull-quote">“{post.excerpt}”</blockquote>

          {/* Back link */}
          <Button as={Link} to="/blog" variant="secondary" className="mt-4">
            ← Back to Blog
          </Button>
        </article>

        {/* Sticky social share */}
        <aside className="social-share">
          <a
            href={`https://facebook.com/sharer/sharer.php?u=${window.location.href}`}
            target="_blank"
            rel="noopener"
          >
            <FaFacebookF />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
            target="_blank"
            rel="noopener"
          >
            <FaTwitter />
          </a>
          <a
            href={`https://www.linkedin.com/shareArticle?url=${window.location.href}`}
            target="_blank"
            rel="noopener"
          >
            <FaLinkedinIn />
          </a>
        </aside>

        {/* Author bio */}
        <aside className="author-bio">
          {author.avatar_url && (
            <img src={author.avatar_url} alt={author.full_name} />
          )}
          <h5>{author.full_name}</h5>
          <p>{author.bio}</p>
        </aside>
      </Container>
    </Container>
  );
}
