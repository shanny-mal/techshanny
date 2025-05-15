// src/components/Blog/BlogPostDetail.jsx

import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Container,
  Button,
  Spinner,
  Alert,
  Modal,
  Form,
} from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import api from "../../services/api.js";
import { useAuth } from "../../context/AuthContext.jsx";
import "./BlogPostDetail.css";

export default function BlogPostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, updatePost, deletePost } = useAuth();

  const [post, setPost] = useState(null);
  const [authorName, setAuthorName] = useState("");
  const [loading, setLoading] = useState(true);

  const [showEdit, setShowEdit] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    image_url: "",
  });
  const [error, setError] = useState(null);
  const formRef = useRef();

  // ─── Fetch the post & author on mount ───────────────────────────────────────
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // 1) get the post
        const p = await api.getOne("posts", id);
        setPost(p);

        // 2) get the author details
        const author = await api.getOne("users", p.author.id);
        setAuthorName(
          [author.first_name, author.last_name].filter(Boolean).join(" ") ||
            author.email
        );
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // ─── Delete handler ─────────────────────────────────────────────────────────
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await deletePost(id);
      navigate("/blog");
    } catch (err) {
      console.error("Delete error:", err);
      setError(err.message);
    }
  };

  // ─── Open edit modal and prefill ────────────────────────────────────────────
  const openEdit = () => {
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      image_url: post.image_url,
    });
    setShowEdit(true);
  };

  // ─── Save edits ─────────────────────────────────────────────────────────────
  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updatePost(id, formData);
      setPost((prev) => ({ ...prev, ...formData }));
      setShowEdit(false);
    } catch (err) {
      console.error("Update error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ─── Trap focus in modal ────────────────────────────────────────────────────
  useEffect(() => {
    if (showEdit && formRef.current) {
      formRef.current.querySelector("input,textarea")?.focus();
    }
  }, [showEdit]);

  // ─── Loading / error / missing ──────────────────────────────────────────────
  if (loading)
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    );
  if (error)
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  if (!post)
    return (
      <Container className="py-5">
        <Alert variant="warning">Post not found</Alert>
      </Container>
    );

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <Container className="blog-post-detail py-5">
      <Helmet>
        <title>{post.title} – ShannyTechSolutions</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <h1 className="post-title">{post.title}</h1>
      <p className="meta">
        {authorName && <>By {authorName} on </>}
        {new Date(post.published_at).toLocaleDateString()}
      </p>

      {user?.id === post.author.id && (
        <div className="mb-4 action-bar">
          <Button
            variant="outline-secondary"
            className="me-2"
            onClick={openEdit}
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

      {/* ─── Edit Modal ──────────────────────────────────────────────────────────── */}
      <Modal
        show={showEdit}
        onHide={() => setShowEdit(false)}
        centered
        aria-labelledby="edit-modal-title"
      >
        <Form ref={formRef} onSubmit={handleSave}>
          <Modal.Header closeButton>
            <Modal.Title id="edit-modal-title">Edit Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, title: e.target.value }))
                }
                required
              />
            </Form.Group>

            <Form.Group controlId="formExcerpt" className="mb-3">
              <Form.Label>Excerpt</Form.Label>
              <Form.Control
                type="text"
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, excerpt: e.target.value }))
                }
              />
            </Form.Group>

            <Form.Group controlId="formImageUrl" className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="url"
                value={formData.image_url}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, image_url: e.target.value }))
                }
              />
            </Form.Group>

            <Form.Group controlId="formContent" className="mb-3">
              <Form.Label>Content (HTML/Markdown)</Form.Label>
              <Form.Control
                as="textarea"
                rows={8}
                value={formData.content}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, content: e.target.value }))
                }
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEdit(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Saving…" : "Save Changes"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}
