// src/components/Tools/ROICalculator.jsx
import React, { useState, useMemo } from "react";
import { Container, Form, Row, Col, Button, Alert } from "react-bootstrap";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const ROICalculator = () => {
  const [hourlyRate, setHourlyRate] = useState("");
  const [hoursSaved, setHoursSaved] = useState("");
  const [months, setMonths] = useState("");
  const [error, setError] = useState("");

  // parse inputs
  const monthlySaving = useMemo(() => {
    const rate = parseFloat(hourlyRate);
    const hrs = parseFloat(hoursSaved);
    if (isNaN(rate) || isNaN(hrs)) return 0;
    return rate * hrs;
  }, [hourlyRate, hoursSaved]);

  // build chart data: cumulative savings
  const chartData = useMemo(() => {
    const m = parseInt(months, 10);
    if (isNaN(m) || m <= 0) return [];
    const data = [];
    for (let i = 1; i <= m; i++) {
      data.push({
        name: `Month ${i}`,
        savings: parseFloat((monthlySaving * i).toFixed(2)),
      });
    }
    return data;
  }, [monthlySaving, months]);

  // total ROI
  const totalROI = useMemo(() => {
    return chartData.length ? chartData[chartData.length - 1].savings : 0;
  }, [chartData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (
      isNaN(parseFloat(hourlyRate)) ||
      isNaN(parseFloat(hoursSaved)) ||
      isNaN(parseInt(months, 10)) ||
      parseInt(months, 10) <= 0
    ) {
      setError("Please enter valid numeric values (months ≥ 1).");
    }
    // otherwise chartData & totalROI will update automatically
  };

  return (
    <Container className="py-5">
      <h2 className="mb-4">ROI Calculator</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="gy-3">
          <Col md={4}>
            <Form.Group controlId="hourlyRate">
              <Form.Label>Hourly Rate (₵)</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                placeholder="e.g. 50.00"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="hoursSaved">
              <Form.Label>Hours Saved / Month</Form.Label>
              <Form.Control
                type="number"
                step="0.1"
                placeholder="e.g. 10"
                value={hoursSaved}
                onChange={(e) => setHoursSaved(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="months">
              <Form.Label>Number of Months</Form.Label>
              <Form.Control
                type="number"
                placeholder="e.g. 12"
                value={months}
                onChange={(e) => setMonths(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        {error && (
          <Alert className="mt-3" variant="danger">
            {error}
          </Alert>
        )}
        <Button className="mt-3" type="submit">
          Calculate
        </Button>
      </Form>

      {chartData.length > 0 && (
        <>
          <h4 className="mt-5">
            Total Savings: ₵
            {totalROI.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </h4>
          <div style={{ width: "100%", height: 300 }} className="mt-4">
            <ResponsiveContainer>
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(val) => `₵${val}`} />
                <Tooltip formatter={(val) => [`₵${val}`, "Cumulative"]} />
                <Bar dataKey="savings" fill="#A67B5B" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </Container>
  );
};

export default ROICalculator;
