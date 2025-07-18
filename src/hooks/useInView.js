// src/hooks/useInView.js
import { useRef, useState, useEffect } from "react";

export function useInView({ threshold = 0.3 } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold,
    });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
}


