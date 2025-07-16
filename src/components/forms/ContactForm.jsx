import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../common/Button";
import { motion } from "framer-motion";
import "./ContactForm.css";

const schema = yup.object().shape({
  name: yup.string().required("Name is required").max(100),
  email: yup.string().required("Email is required").email("Invalid email"),
  company: yup.string().max(100),
  message: yup.string().required("Message is required").max(1000),
});

export default function ContactForm() {
  const [submitError, setSubmitError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setSubmitError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      reset();
    } catch {
      setSubmitError("Failed to send. Please try again.");
    }
  };

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };
  const item = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial="hidden"
      animate="visible"
      variants={container}
      className="contact-form-grid"
    >
      {[
        {
          id: "name",
          type: "text",
          placeholder: "Your Name",
          error: errors.name,
          register: register("name"),
        },
        {
          id: "email",
          type: "email",
          placeholder: "Your Email",
          error: errors.email,
          register: register("email"),
        },
        {
          id: "company",
          type: "text",
          placeholder: "Company (optional)",
          error: errors.company,
          register: register("company"),
        },
      ].map(({ id, type, placeholder, error, register }) => (
        <motion.div key={id} variants={item}>
          <input
            id={id}
            type={type}
            placeholder={placeholder}
            {...register}
            className="contact-input"
            aria-invalid={error ? "true" : "false"}
          />
          {error && <p className="contact-error">{error.message}</p>}
        </motion.div>
      ))}
      <motion.div variants={item}>
        <textarea
          id="message"
          rows="5"
          placeholder="Your Message"
          {...register("message")}
          className="contact-textarea"
          aria-invalid={errors.message ? "true" : "false"}
        />
        {errors.message && (
          <p className="contact-error">{errors.message.message}</p>
        )}
      </motion.div>
      <motion.div variants={item}>
        <Button
          type="submit"
          variant="secondary"
          size="lg"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Submit"}
        </Button>
      </motion.div>
      {submitError && (
        <motion.p variants={item} className="contact-error-center">
          {submitError}
        </motion.p>
      )}
      {isSubmitSuccessful && !submitError && (
        <motion.p variants={item} className="contact-success-center">
          Thank you! We'll be in touch soon.
        </motion.p>
      )}
    </motion.form>
  );
}
