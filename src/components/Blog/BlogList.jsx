// src/components/Blog/BlogList.jsx
import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Card, Button, Spinner, Row, Col } from "react-bootstrap";
import { FaTrash, FaEdit } from "react-icons/fa";
import { supabase } from "../../supabaseClient.js";
import { useAuth } from "../../context/AuthContext.jsx";
import "./Blog.css";

const PAGE_SIZE = 6;

const BlogList = () => {
  const { user, deletePost } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const from = (page - 1) * PAGE_SIZE;
    const to = page * PAGE_SIZE - 1;

    const { data, error } = await supabase
      .from("posts")
      .select("id, title, excerpt, image_url, published_at, author_id")
      .order("published_at", { ascending: false })
      .range(from, to);

    if (error) console.error(error);
    else {
      setPosts((prev) => {
        const existing = new Set(prev.map((p) => p.id));
        const newPosts = data.filter((p) => !existing.has(p.id));
        return [...prev, ...newPosts];
      });
      if (data.length < PAGE_SIZE) setHasMore(false);
    }
    setLoading(false);
  }, [page]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await deletePost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete post.");
    }
  };

  return (
    <section id="blog" className="blog-section py-5">
      <Container fluid>
        <h2 className="blog-heading text-center mb-4">Latest Insights</h2>
        <Row className="g-4">
          {posts.map((post) => (
            <Col key={post.id} xs={12} sm={6} lg={4}>
              <Card className="blog-card h-100">
                {post.image_url && (
                  <Card.Img
                    variant="top"
                    src={post.image_url}
                    alt={post.title}
                    loading="lazy"
                    className="blog-card-img"
                  />
                )}
                <Card.Body className="d-flex flex-column">
                  <Card.Title as="h3" className="h5">
                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                  </Card.Title>
                  <Card.Text className="flex-grow-1">{post.excerpt}</Card.Text>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <Button
                      variant="primary"
                      as={Link}
                      to={`/blog/${post.id}`}
                      className="read-more-btn"
                    >
                      Read More
                    </Button>
                    {user?.id === post.author_id && (
                      <div className="action-icons">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          as={Link}
                          to={`/blog/edit/${post.id}`}
                          className="edit-btn me-2"
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(post.id)}
                          className="delete-btn"
                        >
                          <FaTrash />
                        </Button>
                      </div>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {hasMore && (
          <div className="text-center mt-4">
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
};

export default BlogList;
