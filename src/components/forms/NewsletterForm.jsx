// src/components/forms/NewsletterForm.jsx
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../common/Button";
import { motion } from "framer-motion";
import "./NewsletterForm.css";

const schema = yup.object().shape({
  email: yup.string().required("Email is required").email("Invalid email"),
});

export default function NewsletterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      reset();
    } catch {
      alert("Subscription failed. Please try again.");
    }
  };

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
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
      className="newsletter-form grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-4"
    >
      <motion.div variants={item}>
        <div className="relative">
          <input
            id="newsletter-email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            className="newsletter-input"
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && (
            <p className="newsletter-error">{errors.email.message}</p>
          )}
        </div>
      </motion.div>
      <motion.div variants={item}>
        <Button
          type="submit"
          variant="outline"
          size="lg"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </Button>
      </motion.div>
      {isSubmitSuccessful && (
        <motion.p variants={item} className="newsletter-success sm:col-span-2">
          Thanks for subscribing!
        </motion.p>
      )}
    </motion.form>
  );
}
