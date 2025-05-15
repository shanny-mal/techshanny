import React from "react";

export default function Layout({ header, footer, children }) {
  return (
    <>
      {header}
      <main id="main-content">{children}</main>
      {footer}
    </>
  );
}
