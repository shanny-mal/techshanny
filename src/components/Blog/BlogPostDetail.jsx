// src/components/Blog/BlogPostDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Container, Button, Spinner, Alert } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext.jsx";
import { supabase } from "../../supabaseClient.js";
import "./BlogPostDetail.css";

export default function BlogPostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, deletePost } = useAuth();

  const [post, setPost] = useState(null);
  const [authorName, setAuthorName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch post and then author name
    (async () => {
      setLoading(true);
      try {
        // 1) Load the post
        const { data: p, error: pErr } = await supabase
          .from("posts")
          .select(
            "id, title, content, excerpt, image_url, published_at, author_id"
          )
          .eq("id", id)
          .single();
        if (pErr) throw pErr;
        setPost(p);

        // 2) Load author’s profile
        const { data: profile, error: profErr } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", p.author_id)
          .single();
        if (profErr && profErr.code !== "PGRST116") throw profErr;
        setAuthorName(profile?.full_name ?? user.email);
      } catch (err) {
        console.error("Error loading post or author:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, user.email]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this post?")) return;
    try {
      await deletePost(id);
      navigate("/blog");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="my-5">
        {error}
      </Alert>
    );
  }

  if (!post) {
    return (
      <Alert variant="warning" className="my-5">
        Post not found
      </Alert>
    );
  }

  return (
    <Container className="blog-post-detail py-5">
      <h1 className="post-title">{post.title}</h1>
      <p className="meta">
        By {authorName} on {new Date(post.published_at).toLocaleDateString()}
      </p>

      {user?.id === post.author_id && (
        <div className="mb-3">
          <Button
            variant="outline-secondary"
            as={Link}
            to={`/blog/edit/${id}`}
            className="me-2"
          >
            <FaEdit /> Edit
          </Button>
          <Button variant="outline-danger" onClick={handleDelete}>
            <FaTrash /> Delete
          </Button>
        </div>
      )}

      {post.image_url && (
        <img
          src={post.image_url}
          alt={post.title}
          className="detail-image mb-4"
          loading="lazy"
        />
      )}

      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <Button as={Link} to="/blog" variant="secondary" className="mt-4">
        ← Back to Blog
      </Button>
    </Container>
  );
}
