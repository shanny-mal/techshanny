// src/components/Blog/Blog.jsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Button,
  Spinner,
  Alert,
  Row,
  Col,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import api from "../../services/api.js";
import "./Blog.css";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchLatest = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch all posts (backend orders by -published_at by default)
        const data = await api.getList("posts");
        if (!isMounted) return;
        // Take the first three
        setPosts(data.slice(0, 3));
      } catch (err) {
        console.error("Failed to load posts:", err);
        if (isMounted) setError("Failed to load posts");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchLatest();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <section className="blog-section py-5 text-center">
        <Spinner animation="border" role="status" />
      </section>
    );
  }

  if (error) {
    return (
      <section className="blog-section py-5 text-center">
        <Alert variant="danger">{error}</Alert>
      </section>
    );
  }

  return (
    <section id="blog" className="blog-section py-5">
      <Container>
        <h2 className="blog-heading text-center mb-4">Latest Insights</h2>
        <Row className="blog-grid">
          {posts.map((post, idx) => (
            <Col key={post.id} xs={12} md={6} lg={4}>
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
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text className="flex-grow-1">{post.excerpt}</Card.Text>
                  <Button
                    variant="primary"
                    as={Link}
                    to={`/blog/${post.id}`}
                    className="read-more-btn mt-3 align-self-start"
                  >
                    Read More →
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Blog;
