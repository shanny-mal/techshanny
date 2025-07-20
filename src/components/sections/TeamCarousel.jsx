// src/components/sections/TeamCarousel.jsx
import { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import teamMembers from "../../data/teamData";

export default function TeamCarousel() {
  const containerRef = useRef(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  // Update arrow-state whenever scroll position or size changes
  const updateArrows = () => {
    const el = containerRef.current;
    if (!el) return;
    setCanScrollPrev(el.scrollLeft > 0);
    setCanScrollNext(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  useEffect(() => {
    const el = containerRef.current;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, []);

  const scrollByWidth = (dir = 1) => {
    const el = containerRef.current;
    if (!el) return;
    const offset = el.clientWidth; // scroll by one “page”
    el.scrollBy({ left: dir * offset, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Prev button */}
      <button
        onClick={() => scrollByWidth(-1)}
        disabled={!canScrollPrev}
        aria-label="Previous"
        className={`
          absolute top-1/2 left-2 transform -translate-y-1/2
          p-2 bg-white dark:bg-gray-800 rounded-full shadow focus:outline-none
          ${
            !canScrollPrev
              ? "opacity-30 cursor-default"
              : "hover:bg-gray-100 dark:hover:bg-gray-700"
          }
        `}
      >
        <FaChevronLeft />
      </button>

      {/* Scroll container */}
      <div
        ref={containerRef}
        className="
          overflow-x-auto scroll-smooth snap-x snap-mandatory
          flex gap-6 py-4
          scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700
        "
      >
        {teamMembers.map((m) => (
          <div
            key={m.id}
            className="
              snap-start
              flex-shrink-0
              w-[80%] sm:w-1/2 lg:w-1/3
              bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg
              transition-transform hover:scale-[1.03]
            "
          >
            <img
              src={m.avatar}
              alt={m.name}
              className="mx-auto h-24 w-24 rounded-full object-cover mb-4"
              loading="lazy"
            />
            <h4 className="font-heading text-lg text-gray-900 dark:text-gray-100">
              {m.name}
            </h4>
            <p className="text-indigo-600 dark:text-indigo-400">{m.role}</p>
          </div>
        ))}
      </div>

      {/* Next button */}
      <button
        onClick={() => scrollByWidth(+1)}
        disabled={!canScrollNext}
        aria-label="Next"
        className={`
          absolute top-1/2 right-2 transform -translate-y-1/2
          p-2 bg-white dark:bg-gray-800 rounded-full shadow focus:outline-none
          ${
            !canScrollNext
              ? "opacity-30 cursor-default"
              : "hover:bg-gray-100 dark:hover:bg-gray-700"
          }
        `}
      >
        <FaChevronRight />
      </button>
    </div>
  );
}
