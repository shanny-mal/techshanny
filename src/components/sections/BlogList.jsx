// src/components/sections/BlogList.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Blog.css";

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/blog/")
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const ct = res.headers.get("content-type") || "";
        if (!ct.includes("application/json"))
          throw new Error("Unexpected format");
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setError(e.message || "Failed to load posts");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="py-16 flex justify-center">
        <motion.div
          className="pulse-loader"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 1 }}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => {
            setLoading(true);
            setError("");
            setPosts([]);
          }}
          className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <section className="blog-list py-16 px-4 lg:px-8">
      <motion.h2
        className="blog-list__heading"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Blog
      </motion.h2>
      <motion.div
        className="blog-list__grid"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.2 } },
        }}
      >
        {posts.map((p) => (
          <motion.article
            key={p.id}
            className="blog-card"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
            }}
          >
            <h3 className="blog-card__title">{p.title}</h3>
            <p className="blog-card__excerpt line-clamp-3">
              {p.content.slice(0, 120)}…
            </p>
            <Link to={`/blog/${p.slug}`} className="blog-card__link">
              Read more →
            </Link>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
