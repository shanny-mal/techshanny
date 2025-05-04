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
import { supabase } from "../../supabaseClient.js";
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
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, excerpt, image_url")
        .order("published_at", { ascending: false })
        .limit(3);

      if (!isMounted) return;
      if (error) {
        console.error(error);
        setError("Failed to load posts");
      } else {
        setPosts(data || []);
      }
      setLoading(false);
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
            <Col key={`${post.id}-${idx}`} xs={12} md={6} lg={4}>
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
