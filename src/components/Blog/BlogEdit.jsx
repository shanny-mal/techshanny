// src/components/Blog/BlogEdit.jsx
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Button, Spinner, Alert } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext.jsx";
import { supabase } from "../../supabaseClient.js";
import "./BlogEdit.css";

export default function BlogEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, updatePost } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef();

  // form fields
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        setError(error.message);
      } else if (data.author_id !== user?.id) {
        setError("Not authorized to edit this post.");
      } else {
        setPost(data);
        setTitle(data.title);
        setExcerpt(data.excerpt);
        setImageUrl(data.image_url);
        setContent(data.content);
      }
      setLoading(false);
    })();
  }, [id, user]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updatePost(id, {
        title,
        excerpt,
        image_url: imageUrl,
        content,
      });
      navigate(`/blog/${id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // focus the first field
  useEffect(() => {
    if (!loading && formRef.current) {
      formRef.current.querySelector("input")?.focus();
    }
  }, [loading]);

  if (loading) return <Spinner className="m-5" />;
  if (error)
    return (
      <Alert className="m-5" variant="danger">
        {error}
      </Alert>
    );

  return (
    <Container className="blog-edit py-5">
      <h2>Edit Post</h2>
      <Form ref={formRef} onSubmit={handleSave}>
        <Form.Group controlId="editTitle" className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="editExcerpt" className="mb-3">
          <Form.Label>Excerpt</Form.Label>
          <Form.Control
            type="text"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="editImageUrl" className="mb-3">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="editContent" className="mb-3">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={8}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </Form.Group>
        <div className="d-flex justify-content-end">
          <Button
            variant="secondary"
            onClick={() => navigate(-1)}
            className="me-2"
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={saving}>
            {saving ? "Saving…" : "Save Changes"}
          </Button>
        </div>
      </Form>
    </Container>
  );
}
