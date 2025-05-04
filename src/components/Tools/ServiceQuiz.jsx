// src/components/Tools/ServiceQuiz.jsx
import React, { useState } from "react";
import {
  Container,
  Card,
  Button,
  ProgressBar,
  Form,
  Alert,
} from "react-bootstrap";

const QUESTIONS = [
  {
    question: "What is your primary goal?",
    options: [
      { label: "Increase website traffic", value: "web" },
      { label: "Boost IT security", value: "security" },
      { label: "Streamline business processes", value: "automation" },
    ],
  },
  {
    question: "How big is your team?",
    options: [
      { label: "Just me / small (< 5)", value: "small" },
      { label: "Medium (5-20)", value: "medium" },
      { label: "Large (> 20)", value: "large" },
    ],
  },
  {
    question: "What’s your timeline?",
    options: [
      { label: "Immediate (1-3 months)", value: "immediate" },
      { label: "Short-term (3-6 months)", value: "short" },
      { label: "Long-term (6+ months)", value: "long" },
    ],
  },
];

const RECOMMENDATIONS = {
  web: {
    title: "Web Development Services",
    description:
      "We’ll build or revamp your website to attract more visitors and convert them into customers.",
  },
  security: {
    title: "Cybersecurity Assessment",
    description:
      "Protect your business with a thorough security audit and continuous monitoring.",
  },
  automation: {
    title: "Business Process Automation",
    description:
      "We’ll streamline repetitive tasks so your team can focus on strategic work.",
  },
};

const ServiceQuiz = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const current = QUESTIONS[step];

  const handleOptionChange = (value) => {
    setAnswers((prev) => ({ ...prev, [step]: value }));
  };

  const handleNext = () => {
    if (answers[step] == null) return;
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  // Simple logic: recommend by first answer
  const recommended = RECOMMENDATIONS[answers[0]];

  return (
    <Container className="py-5">
      <h2 className="mb-4">Which Service Is Right for You?</h2>
      <Card className="p-4">
        {!showResult ? (
          <>
            <ProgressBar
              now={((step + 1) / QUESTIONS.length) * 100}
              className="mb-4"
            />
            <h5>{current.question}</h5>
            <Form className="mt-3">
              {current.options.map((opt) => (
                <Form.Check
                  key={opt.value}
                  type="radio"
                  id={`q${step}-${opt.value}`}
                  name={`question-${step}`}
                  label={opt.label}
                  value={opt.value}
                  checked={answers[step] === opt.value}
                  onChange={() => handleOptionChange(opt.value)}
                  className="mb-2"
                />
              ))}
            </Form>
            <div className="d-flex justify-content-between mt-4">
              <Button
                variant="secondary"
                onClick={handlePrev}
                disabled={step === 0}
              >
                Previous
              </Button>
              <Button
                variant="primary"
                onClick={handleNext}
                disabled={answers[step] == null}
              >
                {step < QUESTIONS.length - 1 ? "Next" : "See Recommendation"}
              </Button>
            </div>
          </>
        ) : (
          <div>
            <h4>Your Recommended Service:</h4>
            {recommended ? (
              <>
                <h5 className="mt-3">{recommended.title}</h5>
                <p>{recommended.description}</p>
              </>
            ) : (
              <Alert variant="info">
                Based on your answers, we recommend discussing your needs with
                our team to tailor the perfect solution.
              </Alert>
            )}
            <Button
              variant="outline-primary"
              className="mt-4"
              onClick={() => {
                setStep(0);
                setAnswers({});
                setShowResult(false);
              }}
            >
              Retake Quiz
            </Button>
          </div>
        )}
      </Card>
    </Container>
  );
};

export default ServiceQuiz;
