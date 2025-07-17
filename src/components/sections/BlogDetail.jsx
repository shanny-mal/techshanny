// src/components/sections/BlogDetail.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Blog.css";

export default function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/blog/${slug}/`)
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const ct = res.headers.get("content-type") || "";
        if (!ct.includes("application/json"))
          throw new Error("Unexpected format");
        return res.json();
      })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setError(e.message || "Failed to load post");
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="py-16 flex justify-center">
        <motion.div
          className="loader"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <Link
          to="/blog"
          className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition"
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <motion.article
      className="blog-detail py-16 px-4 lg:px-0 max-w-3xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="blog-detail__title">{post.title}</h1>
      <div
        className="blog-detail__content prose dark:prose-dark"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <Link to="/blog" className="blog-detail__back">
        ← Back to Blog
      </Link>
    </motion.article>
  );
}
