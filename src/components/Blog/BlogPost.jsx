import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "../../supabaseClient.js";
import { Container, Spinner, Alert, Button } from "react-bootstrap";
import "./BlogPostDetail.css";

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("posts")
        .select(
          `
          id,
          title,
          content,
          excerpt,
          image_url,
          published_at,
          author_id ( name )
        `
        )
        .eq("id", id)
        .maybeSingle();

      if (!isMounted) return;
      if (error) {
        console.error(error);
        setError("Failed to load post");
      } else if (!data) {
        setError("Post not found");
      } else {
        setPost(data);
      }
      setLoading(false);
    };
    fetchPost();
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <Container className="blog-post-detail py-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="blog-post-detail py-5">
        <Alert variant="danger">{error}</Alert>
        <div className="text-center mt-4">
          <Button as={Link} to="/blog" variant="secondary">
            ← Back to Blog
          </Button>
        </div>
      </Container>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    image: post.image_url,
    datePublished: post.published_at,
    author: { "@type": "Person", name: post.author_id.name },
    mainEntityOfPage: { "@type": "WebPage", "@id": window.location.href },
  };

  return (
    <Container className="blog-post-detail py-5">
      <Helmet>
        <title>{post.title} – ShannyTechSolutions</title>
        <meta name="description" content={post.excerpt} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <h1 className="post-title">{post.title}</h1>
      <p className="meta">
        By {post.author_id.name} on{" "}
        {new Date(post.published_at).toLocaleDateString()}
      </p>

      {post.image_url && (
        <img
          src={post.image_url}
          alt={post.title}
          className="detail-image mb-4"
          loading="lazy"
        />
      )}

      <article
        className="post-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className="mt-4">
        <Button as={Link} to="/blog" variant="secondary">
          ← Back to Blog
        </Button>
      </div>
    </Container>
  );
};

export default BlogPost;
