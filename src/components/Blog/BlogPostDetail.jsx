import React from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import "./BlogPostDetail.css";

const posts = {
  1: {
    title: "Innovative Trends in Web Development",
    content: "Detailed article about innovative trends in web development...",
    image: "/blog1.jpg",
  },
  2: {
    title: "Optimizing Network Performance",
    content:
      "In-depth discussion on optimizing network performance with modern strategies...",
    image: "/blog2.jpg",
  },
  3: {
    title: "Effective IT Consulting Strategies",
    content:
      "Exploration of effective IT consulting strategies that drive success...",
    image: "/blog3.jpg",
  },
};

const BlogPostDetail = () => {
  const { id } = useParams();
  const post = posts[id];

  if (!post) {
    return (
      <Container className="py-5">
        <h2>Post not found</h2>
        <Button as={Link} to="/blog" variant="primary">
          Back to Blog
        </Button>
      </Container>
    );
  }

  return (
    <Container className="blog-post-detail py-5">
      <h1>{post.title}</h1>
      <img src={post.image} alt={post.title} className="detail-image" />
      <p>{post.content}</p>
      <Button as={Link} to="/blog" variant="primary">
        Back to Blog
      </Button>
    </Container>
  );
};

export default BlogPostDetail;
