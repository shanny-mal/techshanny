import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaFilePdf, FaFileVideo, FaFileAlt } from "react-icons/fa";
import "./Resources.css";

export default function ResourceCard({ resource, onDownload }) {
  const {
    id,
    title,
    description,
    download_url,
    topic = "General",
    year = "",
  } = resource;

  // pick icon
  let Icon = FaFileAlt;
  if (download_url) {
    if (/\.(mp4|webm)$/i.test(download_url)) Icon = FaFileVideo;
    else if (/\.pdf$/i.test(download_url)) Icon = FaFilePdf;
  }

  return (
    <Card className="h-100 shadow-sm resource-card">
      <Card.Body className="d-flex flex-column">
        <div className="res-icon mb-3">
          <Icon size="2em" />
        </div>
        <Card.Title as="h5">{title}</Card.Title>
        <Card.Text className="flex-grow-1">
          {description || <em>No description provided.</em>}
        </Card.Text>
        <Button
          variant="primary"
          onClick={() => onDownload(resource)}
          disabled={!download_url}
          aria-disabled={!download_url}
        >
          {download_url ? "Download" : "Unavailable"}
        </Button>
      </Card.Body>
      <Card.Footer className="text-muted small">
        {topic}
        {year && <> — {year}</>}
      </Card.Footer>
    </Card>
  );
}
