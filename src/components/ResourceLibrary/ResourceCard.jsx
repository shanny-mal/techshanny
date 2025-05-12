// src/components/Resources/ResourceCard.jsx
import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaFilePdf, FaFileVideo } from "react-icons/fa";
import "./Resources.css";

export default function ResourceCard({ resource, onDownload }) {
  // detect video vs PDF by file extension
  const isVideo = /\.(mp4|webm)$/i.test(resource.download_url);

  return (
    <Card className="h-100 shadow-sm resource-card">
      <Card.Body className="d-flex flex-column">
        <div className="res-icon mb-3">
          {isVideo ? <FaFileVideo /> : <FaFilePdf />}
        </div>
        <Card.Title as="h5">{resource.title}</Card.Title>
        <Card.Text className="flex-grow-1">{resource.description}</Card.Text>
        <Button variant="primary" onClick={() => onDownload(resource)}>
          Download
        </Button>
      </Card.Body>
      <Card.Footer className="text-muted small">
        {resource.topic} — {resource.year}
      </Card.Footer>
    </Card>
  );
}
