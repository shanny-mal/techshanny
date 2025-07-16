// src/components/sections/BlogDetail.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/blog/${slug}/`)
      .then((r) => {
        if (!r.ok) throw new Error("Post not found");
        return r.json();
      })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="py-16 flex justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="w-8 h-8 border-4 border-teal-500 border-dashed rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return <p className="py-16 text-center text-red-500">{error}</p>;
  }

  return (
    <motion.article
      className="py-16 px-4 lg:px-0 max-w-3xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-4xl font-extrabold mb-6 text-gray-900 dark:text-white">
        {post.title}
      </h1>
      <div
        className="prose dark:prose-dark max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <Link
        to="/blog"
        className="mt-8 inline-block text-teal-600 hover:underline font-medium"
      >
        ← Back to Blog
      </Link>
    </motion.article>
  );
}
