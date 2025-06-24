import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../common/Button";
import { motion } from "framer-motion";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .max(100, "Maximum 100 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Must be a valid email"),
  company: yup.string().max(100, "Maximum 100 characters"),
  message: yup
    .string()
    .required("Message is required")
    .max(1000, "Maximum 1000 characters"),
});

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [submitError, setSubmitError] = useState("");
  const onSubmit = async (data) => {
    setSubmitError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }
      reset();
    } catch (err) {
      setSubmitError("Failed to send message. Please try again later.");
    }
  };
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={container}
    >
      <motion.div variants={item}>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Name<span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          {...register("name")}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          aria-invalid={errors.name ? "true" : "false"}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </motion.div>

      <motion.div variants={item}>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Email<span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </motion.div>

      <motion.div variants={item}>
        <label
          htmlFor="company"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Company
        </label>
        <input
          id="company"
          type="text"
          {...register("company")}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          aria-invalid={errors.company ? "true" : "false"}
        />
        {errors.company && (
          <p className="mt-1 text-sm text-red-600">{errors.company.message}</p>
        )}
      </motion.div>

      <motion.div variants={item}>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Message<span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          rows="5"
          {...register("message")}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          aria-invalid={errors.message ? "true" : "false"}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </motion.div>

      <motion.div variants={item}>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </motion.div>

      {submitError && (
        <motion.p variants={item} className="text-center text-sm text-red-600">
          {submitError}
        </motion.p>
      )}
      {isSubmitSuccessful && !submitError && (
        <motion.p
          variants={item}
          className="text-center text-sm text-green-600 dark:text-green-400"
        >
          Thank you! Your message has been sent.
        </motion.p>
      )}
    </motion.form>
  );
}
