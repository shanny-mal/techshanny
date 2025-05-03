// src/components/Tools/ServiceQuiz.jsx
// =======================================
import React, { useState } from "react";

const questions = [
  { q: "Do you need a website?", opts: ["Yes", "No"] },
  { q: "Do you require network setup?", opts: ["Yes", "No"] },
  { q: "Interested in IT consulting?", opts: ["Yes", "No"] },
];

const ServiceQuiz = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const handleAnswer = (ans) => {
    setAnswers([...answers, ans]);
    setStep(step + 1);
  };

  if (step >= questions.length) {
    const recommendation =
      answers[0] == "Yes"
        ? "Web Development"
        : answers[1] == "Yes"
        ? "Networking"
        : "IT Consulting";
    return <p>We recommend: {recommendation}</p>;
  }

  const { q, opts } = questions[step];
  return (
    <section aria-labelledby="quiz-heading">
      <h2 id="quiz-heading">Service Quiz</h2>
      <p>{q}</p>
      {opts.map((opt) => (
        <button key={opt} onClick={() => handleAnswer(opt)}>
          {opt}
        </button>
      ))}
    </section>
  );
};

export default ServiceQuiz;
