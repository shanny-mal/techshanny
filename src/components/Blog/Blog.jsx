import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./Blog.css";

const blogPosts = [
  {
    id: 1,
    title: "Innovative Trends in Web Development",
    excerpt:
      "Discover the latest trends and technologies shaping the future of web development.",
    image: "/logo.png",
    link: "#",
  },
  {
    id: 2,
    title: "Optimizing Network Performance",
    excerpt:
      "Learn how to design and implement network solutions for maximum efficiency.",
    image: "/logo.png",
    link: "#",
  },
  {
    id: 3,
    title: "Effective IT Consulting Strategies",
    excerpt:
      "Explore strategies that drive business success through innovative IT consulting.",
    image: "/logo.png",
    link: "#",
  },
];

const Blog = () => {
  return (
    <section id="blog" className="blog-section py-5" data-aos="fade-up">
      <Container>
        <h2 className="blog-heading text-center mb-4">Latest Insights</h2>
        <Row>
          {blogPosts.map((post) => (
            <Col md={4} key={post.id}>
              <Card className="blog-card mb-4">
                <Card.Img variant="top" src={post.image} loading="lazy" />
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>{post.excerpt}</Card.Text>
                  <Button variant="primary" href={post.link}>
                    Read More
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
