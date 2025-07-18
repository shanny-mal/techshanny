// src/hooks/useOnClickOutside.js
import { useEffect } from "react";

/**
 * Call `handler` when a click or touch occurs outside any of the provided refs.
 * Also closes on Escape key by default.
 *
 * @param {React.RefObject|React.RefObject[]} refs   One or more refs to keep inside of.
 * @param {Function} handler                         Callback to run on outside click or Escape.
 * @param {Object}   [options]                       Optional config.
 * @param {boolean}  [options.disableEscape=false]   If true, ignore Escape key.
 */
export default function useOnClickOutside(refs, handler, options = {}) {
  const { disableEscape = false } = options;

  useEffect(() => {
    // Normalize to array
    const refList = Array.isArray(refs) ? refs : [refs];

    function listener(event) {
      // If click inside any ref → do nothing
      for (const ref of refList) {
        const el = ref.current;
        if (el && (el === event.target || el.contains(event.target))) {
          return;
        }
      }
      handler(event);
    }

    function keyListener(event) {
      if (!disableEscape && event.key === "Escape") {
        handler(event);
      }
    }

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    document.addEventListener("keydown", keyListener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
      document.removeEventListener("keydown", keyListener);
    };
  }, [refs, handler, disableEscape]);
}
