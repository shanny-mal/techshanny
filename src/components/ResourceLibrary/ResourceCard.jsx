// src/components/Resources/ResourceCard.jsx
import React from "react";
import { Card, Button } from "react-bootstrap";

const ResourceCard = ({ resource, onDownload }) => {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Body className="d-flex flex-column">
        <Card.Title as="h5">{resource.title}</Card.Title>
        <Card.Text className="flex-grow-1">{resource.description}</Card.Text>
        <Button variant="primary" onClick={() => onDownload(resource)}>
          Download
        </Button>
      </Card.Body>
      {resource.category && (
        <Card.Footer className="text-muted">
          Category: {resource.category}
        </Card.Footer>
      )}
    </Card>
  );
};

export default ResourceCard;
