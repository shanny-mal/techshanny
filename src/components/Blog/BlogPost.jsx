// src/components/Blog/BlogPost.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import "./BlogPostDetail.css";

const API_URL = process.env.REACT_APP_CMS_API_URL;

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/posts/${id}`).then((res) => setPost(res.data));
  }, [id]);

  if (!post) return <p>Loading…</p>;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    image: post.image,
    datePublished: post.published_at,
    author: { "@type": "Person", name: post.author.name },
    mainEntityOfPage: { "@type": "WebPage", "@id": window.location.href },
  };

  return (
    <Container className="blog-post-detail py-5">
      <Helmet>
        <title>{post.title} – ShannyTechSolutions</title>
        <meta name="description" content={post.excerpt} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <h1>{post.title}</h1>
      <p className="meta">
        By {post.author.name} on{" "}
        {new Date(post.published_at).toLocaleDateString()}
      </p>
      <img
        src={post.image}
        alt={post.title}
        className="detail-image mb-4"
        loading="lazy"
      />
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      <Link to="/blog" className="btn btn-secondary mt-4">
        Back to Blog
      </Link>
    </Container>
  );
};

export default BlogPost;
