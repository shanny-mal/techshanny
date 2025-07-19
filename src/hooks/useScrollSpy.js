import { useState, useEffect } from "react";

export default function useScrollSpy(ids, options = {}) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(e.target.id);
          }
        });
      },
      {
        rootMargin: options.rootMargin || "0px 0px -50% 0px",
        threshold: options.threshold ?? 0.1,
      }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids, options.rootMargin, options.threshold]);

  return active;
}
