// src/components/Tools/ServiceQuiz.jsx
import React, { useState, useMemo, useCallback } from "react";
import {
  Container,
  Card,
  Button,
  ProgressBar,
  Form,
  Alert,
} from "react-bootstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./ServiceQuiz.css";

const BASE_QUESTIONS = [
  {
    id: "goal",
    question: "What is your primary goal?",
    options: [
      { label: "Increase website traffic", value: "web" },
      { label: "Boost IT security", value: "security" },
      { label: "Streamline business processes", value: "automation" },
    ],
  },
  {
    id: "team",
    question: "How big is your team?",
    options: [
      { label: "Just me / small (< 5)", value: "small" },
      { label: "Medium (5-20)", value: "medium" },
      { label: "Large (> 20)", value: "large" },
    ],
  },
  {
    id: "timeline",
    question: "What’s your timeline?",
    options: [
      { label: "Immediate (1-3 months)", value: "immediate" },
      { label: "Short-term (3-6 months)", value: "short" },
      { label: "Long-term (6+ months)", value: "long" },
    ],
  },
];

const SEO_QUESTION = {
  id: "seo",
  question: "Are you interested in SEO optimization?",
  options: [
    { label: "Yes, definitely", value: "yes" },
    { label: "Maybe later", value: "later" },
  ],
};

const RECOMMENDATIONS = {
  web: {
    title: "Web Development & SEO",
    description:
      "We’ll build or revamp your website AND optimize it for search engines to drive sustainable traffic.",
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

export default function ServiceQuiz() {
  const [answers, setAnswers] = useState({});
  const [stepIndex, setStepIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Build dynamic steps: insert SEO question if first answer is "web"
  const steps = useMemo(() => {
    const w = answers.goal === "web";
    let arr = [...BASE_QUESTIONS];
    if (w) arr.splice(1, 0, SEO_QUESTION);
    return arr;
  }, [answers.goal]);

  const currentStep = steps[stepIndex];

  const handleOptionChange = useCallback(
    (value) => {
      setAnswers((prev) => ({ ...prev, [currentStep.id]: value }));
    },
    [currentStep]
  );

  const handleNext = () => {
    if (!answers[currentStep.id]) return;
    if (stepIndex + 1 < steps.length) {
      setStepIndex((i) => i + 1);
    } else {
      setShowResult(true);
    }
  };
  const handlePrev = () => {
    if (stepIndex > 0) setStepIndex((i) => i - 1);
  };
  const handleRetake = () => {
    setAnswers({});
    setStepIndex(0);
    setShowResult(false);
  };

  // Decide recommendation: for "web" branch use SEO answer or just web
  const recKey = answers.goal;
  const recommendation = RECOMMENDATIONS[recKey];

  return (
    <Container className="service-quiz py-5">
      <h2 className="mb-4">Find Your Ideal Service</h2>
      <Card className="p-4 quiz-card">
        {!showResult ? (
          <>
            {/* Stepper */}
            <div className="stepper mb-3">
              {steps.map((s, idx) => (
                <div
                  key={s.id}
                  className={`step ${idx <= stepIndex ? "active" : ""}`}
                >
                  <div className="circle">{idx + 1}</div>
                  <div className="label">{s.id === "seo" ? "SEO" : ""}</div>
                </div>
              ))}
            </div>

            <ProgressBar
              now={((stepIndex + 1) / steps.length) * 100}
              className="mb-4"
            />

            <TransitionGroup component={null}>
              <CSSTransition
                key={currentStep.id}
                classNames="fade"
                timeout={300}
              >
                <div className="question-block">
                  <h5>{currentStep.question}</h5>
                  <Form className="mt-3">
                    {currentStep.options.map((opt) => (
                      <Form.Check
                        key={opt.value}
                        type="radio"
                        id={`${currentStep.id}-${opt.value}`}
                        name={currentStep.id}
                        label={opt.label}
                        checked={answers[currentStep.id] === opt.value}
                        onChange={() => handleOptionChange(opt.value)}
                        className="mb-2"
                      />
                    ))}
                  </Form>
                </div>
              </CSSTransition>
            </TransitionGroup>

            <div className="d-flex justify-content-between mt-4">
              <Button
                variant="secondary"
                onClick={handlePrev}
                disabled={stepIndex === 0}
              >
                Previous
              </Button>
              <Button
                variant="primary"
                onClick={handleNext}
                disabled={!answers[currentStep.id]}
              >
                {stepIndex + 1 < steps.length ? "Next" : "See Recommendation"}
              </Button>
            </div>
          </>
        ) : (
          <div className="result-block">
            <h4>Your Recommended Service:</h4>
            {recommendation ? (
              <>
                <h5 className="mt-3">{recommendation.title}</h5>
                <p>{recommendation.description}</p>
                <Button variant="success" className="mt-3" href="/contact">
                  Contact Us
                </Button>
              </>
            ) : (
              <Alert variant="info">
                We’d love to learn more about your needs—please{" "}
                <a href="/contact">get in touch</a>.
              </Alert>
            )}
            <Button
              variant="outline-primary"
              className="mt-4"
              onClick={handleRetake}
            >
              Retake Quiz
            </Button>
          </div>
        )}
      </Card>
    </Container>
  );
}
