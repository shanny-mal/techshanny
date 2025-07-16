// src/components/sections/BlogList.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/blog/")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch posts");
        return r.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="py-16 flex justify-center">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="w-8 h-8 bg-teal-500 rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return <p className="py-16 text-center text-red-500">{error}</p>;
  }

  return (
    <section className="py-16 px-4 lg:px-8">
      <motion.h2
        className="text-4xl font-extrabold mb-8 text-center text-indigo-600 dark:text-indigo-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Blog
      </motion.h2>
      <motion.div
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
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
            whileHover={{
              scale: 1.03,
              boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
            }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            className="p-6 bg-white dark:bg-gray-800 rounded-2xl"
          >
            <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
              {p.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
              {p.content.slice(0, 120)}…
            </p>
            <Link
              to={`/blog/${p.slug}`}
              className="inline-block text-teal-600 hover:underline font-medium"
            >
              Read more →
            </Link>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
