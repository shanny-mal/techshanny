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

export default function BlogPost() {
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

  // Fetch post + author
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 1) fetch the post
        const { data: p, error: postErr } = await supabase
          .from("posts")
          .select(
            "id, title, excerpt, content, image_url, published_at, author_id"
          )
          .eq("id", id)
          .single();
        if (postErr) throw postErr;
        setPost(p);

        // 2) fetch the author profile
        const { data: prof, error: profErr } = await supabase
          .from("profiles")
          // your FK column is user_id in profiles
          .select("name, full_name")
          .eq("user_id", p.author_id)
          .maybeSingle();
        if (!profErr && prof) {
          // use whichever field you actually have
          setAuthorName(prof.full_name || prof.name || "");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

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

  // Trap focus when modal opens
  useEffect(() => {
    if (showEdit && formRef.current) {
      formRef.current.querySelector("input, textarea")?.focus();
    }
  }, [showEdit]);

  if (loading) return <Spinner className="m-5" />;

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

      {user?.id === post.author_id && (
        <div className="mb-4 action-bar">
          <Button
            variant="outline-secondary"
            className="me-2 edit-btn"
            onClick={openEdit}
          >
            <FaEdit /> Edit
          </Button>
          <Button
            variant="outline-danger"
            className="delete-btn"
            onClick={handleDelete}
          >
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
