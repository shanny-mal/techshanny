// src/components/Blog/BlogPost.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "../../supabaseClient.js";
import { Container, Button } from "react-bootstrap";
import "./BlogPostDetail.css";

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select(
          "id, title, content, excerpt, image_url, published_at, author_id ( name )"
        )
        .eq("id", id)
        .single();

      if (error) console.error(error);
      else setPost(data);
      setLoading(false);
    };
    fetchPost();
  }, [id]);

  if (loading) return <p>Loading…</p>;
  if (!post) return <p>Post not found</p>;

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
      <h1>{post.title}</h1>
      <p className="meta">
        By {post.author_id.name} on{" "}
        {new Date(post.published_at).toLocaleDateString()}
      </p>
      <img
        src={post.image_url}
        alt={post.title}
        className="detail-image mb-4"
        loading="lazy"
      />
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      <Button as={Link} to="/blog" variant="secondary" className="mt-4">
        Back to Blog
      </Button>
    </Container>
  );
};

export default BlogPost;
