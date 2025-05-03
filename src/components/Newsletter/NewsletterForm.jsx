// src/components/Newsletter/NewsletterForm.jsx
// =======================================
import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const NewsletterForm = ({ onSuccess }) => {
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(process.env.REACT_APP_MAILCHIMP_API, { email });
      toast.success("Thank you for subscribing!");
      setEmail("");
      onSuccess && onSuccess();
    } catch (err) {
      toast.error("Subscription failed. Try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Newsletter signup">
      <label htmlFor="newsletter-email">Email:</label>
      <input
        id="newsletter-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Subscribe</button>
    </form>
  );
};

export default NewsletterForm;
