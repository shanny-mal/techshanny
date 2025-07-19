import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <motion.form
      role="search"
      aria-label="Site search"
      onSubmit={submit}
      className="relative"
      initial={{ width: 120 }}
      whileFocus={{ width: 240 }}
      transition={{ duration: 0.3 }}
    >
      <label htmlFor="nav-search" className="sr-only">
        Search site
      </label>
      <input
        id="nav-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="🔍 Search…"
        className="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100
                   placeholder-gray-500 dark:placeholder-gray-400 px-3 py-1 rounded-full
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      />
    </motion.form>
  );
}
