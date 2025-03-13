import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Blog.css";

const blogPosts = [
  {
    id: 1,
    title: "Innovative Trends in Web Development",
    excerpt:
      "Discover the latest trends and technologies shaping the future of web development.",
    image: "/blog1.jpg",
  },
  {
    id: 2,
    title: "Optimizing Network Performance",
    excerpt:
      "Learn how to design and implement network solutions for maximum efficiency.",
    image: "/blog2.jpg",
  },
  {
    id: 3,
    title: "Effective IT Consulting Strategies",
    excerpt:
      "Explore strategies that drive business success through innovative IT consulting.",
    image: "/blog3.jpg",
  },
];

const Blog = () => {
  return (
    <section id="blog" className="blog-section py-5">
      <Container>
        <h2 className="blog-heading text-center mb-4">Latest Insights</h2>
        <div className="blog-grid">
          {blogPosts.map((post) => (
            <Card key={post.id} className="blog-card">
              <Card.Img variant="top" src={post.image} loading="lazy" />
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
