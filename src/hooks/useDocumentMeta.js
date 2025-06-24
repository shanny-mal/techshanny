import { useEffect } from "react";

function setMetaTag({ selector, attributes }) {
  if (typeof document === "undefined") return;
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    for (const attrKey of ["name", "property", "httpEquiv", "charset"]) {
      if (attributes[attrKey]) {
        element.setAttribute(attrKey, attributes[attrKey]);
        break;
      }
    }
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    if (value != null) {
      element.setAttribute(key, value);
    }
  });
}

export function useDocumentMeta({
  title,
  description,
  viewport = "width=device-width, initial-scale=1",
  og = {},
  twitter = {},
} = {}) {
  useEffect(() => {
    if (typeof document === "undefined") return;

    if (title) {
      document.title = title;
    }

    if (viewport) {
      setMetaTag({
        selector: 'meta[name="viewport"]',
        attributes: { name: "viewport", content: viewport },
      });
    }

    if (description) {
      setMetaTag({
        selector: 'meta[name="description"]',
        attributes: { name: "description", content: description },
      });
    }

    Object.entries(og).forEach(([propertyKey, content]) => {
      if (content) {
        const property = `og:${propertyKey}`;
        setMetaTag({
          selector: `meta[property="${property}"]`,
          attributes: { property, content },
        });
      }
    });
//
    Object.entries(twitter).forEach(([nameKey, content]) => {
      if (content) {
        const name = `twitter:${nameKey}`;
        setMetaTag({
          selector: `meta[name="${name}"]`,
          attributes: { name, content },
        });
      }
    });
  }, [
    title,
    description,
    viewport,
    JSON.stringify(og),
    JSON.stringify(twitter),
  ]);
}
