import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../common/Button";
import { motion } from "framer-motion";

const schema = yup.object().shape({
  email: yup.string().required().email(),
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
      className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-4"
    >
      <motion.div variants={item}>
        <div className="relative">
          <input
            id="newsletter-email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            className="w-full px-5 py-3 rounded-lg border-2 border-transparent focus:outline-none focus:border-white focus:ring-0 bg-white/20 placeholder-white/70 text-white"
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-300">{errors.email.message}</p>
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
        <motion.p
          variants={item}
          className="sm:col-span-2 text-center text-green-200 mt-4"
        >
          Thanks for subscribing!
        </motion.p>
      )}
    </motion.form>
  );
}
