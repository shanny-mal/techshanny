// src/pages/NotFound.jsx
import React from "react";
import { Helmet } from "react-helmet-async";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <>
      {/* SEO metadata for 404 page */}
      <Helmet>
        <title>404 Not Found – ShannyTechSolutions</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <Container className="not-found-container text-center py-5">
        <h1 className="display-1 mb-4">404</h1>
        <h2 className="mb-3">Page Not Found</h2>
        <p className="mb-4">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been
          moved.
        </p>
        <Button as={Link} to="/" variant="primary">
          Go Home
        </Button>
      </Container>
    </>
  );
};

export default NotFound;
