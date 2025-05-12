// src/components/Tools/ROICalculator.jsx
import React, { useState, useMemo, useRef } from "react";
import { Container, Form, Row, Col, Button, Alert } from "react-bootstrap";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./ROICalculator.css";

export default function ROICalculator() {
  const [hourlyRate, setHourlyRate] = useState("");
  const [hoursSaved, setHoursSaved] = useState("");
  const [months, setMonths] = useState("");
  const [error, setError] = useState("");

  // ref to chart area for PDF export
  const chartRef = useRef(null);

  // monthly savings
  const monthlySaving = useMemo(() => {
    const rate = parseFloat(hourlyRate);
    const hrs = parseFloat(hoursSaved);
    if (isNaN(rate) || isNaN(hrs)) return 0;
    return rate * hrs;
  }, [hourlyRate, hoursSaved]);

  // build data for each month
  const chartData = useMemo(() => {
    const m = parseInt(months, 10);
    if (isNaN(m) || m < 1) return [];
    return Array.from({ length: m }, (_, i) => ({
      name: `M${i + 1}`,
      savings: parseFloat(((i + 1) * monthlySaving).toFixed(2)),
    }));
  }, [monthlySaving, months]);

  const totalROI =
    chartData.length > 0 ? chartData[chartData.length - 1].savings : 0;

  // validate inputs on the fly
  const validateInputs = () => {
    if (
      isNaN(parseFloat(hourlyRate)) ||
      isNaN(parseFloat(hoursSaved)) ||
      isNaN(parseInt(months, 10)) ||
      parseInt(months, 10) < 1
    ) {
      setError("Please enter valid numbers (months ≥ 1).");
    } else {
      setError("");
    }
  };

  // PDF export
  const handleDownloadPDF = async () => {
    if (!chartRef.current) return;
    try {
      const canvas = await html2canvas(chartRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "landscape" });
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth() - 20;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 10, 10, pdfWidth, pdfHeight);
      pdf.save("roi-savings.pdf");
    } catch (err) {
      console.error("PDF export failed:", err);
      alert("Could not generate PDF. Please try again.");
    }
  };

  return (
    <Container className="roi-calculator py-5">
      <h2 className="mb-4">ROI Calculator</h2>

      <Form onChange={validateInputs}>
        <Row className="gy-3">
          <Col md={4}>
            <Form.Group controlId="hourlyRate">
              <Form.Label>Hourly Rate ($)</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                placeholder="e.g. 50.00"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
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
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>

      {error && (
        <Alert className="mt-3" variant="danger">
          {error}
        </Alert>
      )}

      {chartData.length > 0 && !error && (
        <>
          <div className="d-flex align-items-center justify-content-between mt-4">
            <h4>
              Total Savings: $
              {totalROI.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </h4>
            <Button variant="secondary" onClick={handleDownloadPDF}>
              Download PDF
            </Button>
          </div>

          <div className="chart-wrapper mt-3" ref={chartRef}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(val) => `$${val}`} />
                <Tooltip formatter={(val) => [`$${val}`, "Cumulative"]} />
                <Bar
                  dataKey="savings"
                  fill="#A67B5B"
                  isAnimationActive={true}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </Container>
  );
}
