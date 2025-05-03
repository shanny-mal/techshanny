// src/components/ResourceLibrary/ResourceCard.jsx
// =======================================
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import NewsletterForm from "../Newsletter/NewsletterForm";

const ResourceCard = ({ resource }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="resource-card">
        <h3>{resource.title}</h3>
        <p>{resource.description}</p>
        <Button onClick={() => setShowModal(true)}>Download</Button>
      </div>

      {/* Gated download modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Get Access</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Enter your email to download:</p>
          <NewsletterForm onSuccess={() => window.open(resource.downloadUrl)} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ResourceCard;
