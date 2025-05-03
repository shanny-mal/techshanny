// src/components/Blog/Blog.jsx
import React, { useState, useEffect } from "react";
import { Container, Card, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { supabase } from "../../supabaseClient.js";
import "./Blog.css";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatest = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, excerpt, image_url")
        .order("published_at", { ascending: false })
        .limit(3);

      if (error) {
        console.error(error);
        setError("Failed to load posts");
      } else {
        setPosts(data);
      }
      setLoading(false);
    };

    fetchLatest();
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
        <p className="text-danger">{error}</p>
      </section>
    );
  }

  return (
    <section id="blog" className="blog-section py-5">
      <Container>
        <h2 className="blog-heading text-center mb-4">Latest Insights</h2>
        <div className="blog-grid">
          {posts.map((post) => (
            <Card key={post.id} className="blog-card">
              <Card.Img
                variant="top"
                src={post.image_url}
                loading="lazy"
                alt={post.title}
              />
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.excerpt}</Card.Text>
                <Button
                  variant="primary"
                  as={Link}
                  to={`/blog/${post.id}`}
                  className="read-more-btn"
                >
                  Read More
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Blog;
