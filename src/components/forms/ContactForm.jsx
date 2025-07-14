// src/components/forms/ContactForm.jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../common/Button";
import { motion } from "framer-motion";

const schema = yup.object().shape({
  name: yup.string().required().max(100),
  email: yup.string().required().email(),
  company: yup.string().max(100),
  message: yup.string().required().max(1000),
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
      className="grid grid-cols-1 gap-6"
    >
      <motion.div variants={item}>
        <label htmlFor="name" className="sr-only">
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Your Name"
          {...register("name")}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-transparent focus:outline-none focus:border-teal-500 transition placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-100"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </motion.div>
      <motion.div variants={item}>
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Your Email"
          {...register("email")}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-transparent focus:outline-none focus:border-teal-500 transition placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-100"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </motion.div>
      <motion.div variants={item}>
        <label htmlFor="company" className="sr-only">
          Company
        </label>
        <input
          id="company"
          type="text"
          placeholder="Company (optional)"
          {...register("company")}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-transparent focus:outline-none focus:border-teal-500 transition placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-100"
        />
        {errors.company && (
          <p className="mt-1 text-sm text-red-500">{errors.company.message}</p>
        )}
      </motion.div>
      <motion.div variants={item}>
        <label htmlFor="message" className="sr-only">
          Message
        </label>
        <textarea
          id="message"
          rows="5"
          placeholder="Your Message"
          {...register("message")}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-transparent focus:outline-none focus:border-teal-500 transition placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-100"
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
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
        <motion.p variants={item} className="text-center text-red-500">
          {submitError}
        </motion.p>
      )}
      {isSubmitSuccessful && !submitError && (
        <motion.p variants={item} className="text-center text-green-500">
          Thank you! We'll be in touch soon.
        </motion.p>
      )}
    </motion.form>
  );
}
