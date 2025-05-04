import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
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
import { supabase } from "../../supabaseClient.js";
import { useAuth } from "../../context/AuthContext.jsx";
import "./BlogPostDetail.css";

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
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

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("posts")
        .select(
          "id, title, excerpt, content, image_url, published_at, author_id"
        )
        .eq("id", id)
        .single();
      if (error) setError(error.message);
      else setPost(data);
      setLoading(false);
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this post?")) return;
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) setError(error.message);
    else navigate("/blog");
  };

  const openEdit = () => {
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      image_url: post.image_url,
    });
    setShowEdit(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase
      .from("posts")
      .update({ ...formData })
      .eq("id", id);
    if (error) setError(error.message);
    else {
      setPost({ ...post, ...formData });
      setShowEdit(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (showEdit && formRef.current) {
      formRef.current.querySelector("input, textarea")?.focus();
    }
  }, [showEdit]);

  if (loading) return <Spinner className="m-5" />;
  if (error)
    return (
      <Alert className="m-5" variant="danger">
        {error}
      </Alert>
    );
  if (!post) return <Alert className="m-5">Post not found</Alert>;

  return (
    <Container className="blog-post-detail py-5">
      <Helmet>
        <title>{post.title} – ShannyTechSolutions</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <h1 className="post-title">{post.title}</h1>
      <p className="meta">
        Published on {new Date(post.published_at).toLocaleDateString()}
      </p>

      {user && user.id === post.author_id && (
        <div className="mb-3">
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

      {/* Edit Modal */}
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
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="url"
                value={formData.image_url}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, image_url: e.target.value }))
                }
              />
            </Form.Group>
            <Form.Group controlId="formContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
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
};

export default BlogPost;
