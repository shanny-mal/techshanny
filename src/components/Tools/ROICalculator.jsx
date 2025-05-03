// src/components/Tools/ROICalculator.jsx
// =======================================
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const ROICalculator = () => {
  const [hours, setHours] = useState(0);
  const [rate, setRate] = useState(0);
  const [savings, setSavings] = useState(0);
  const data = [
    { name: "Current", value: hours * rate },
    { name: "After", value: hours * rate * 1.2 },
  ];

  const handleCalculate = () => setSavings(hours * rate * 0.2);

  return (
    <section aria-labelledby="roi-heading">
      <h2 id="roi-heading">ROI Calculator</h2>
      <label>
        Hours saved per week:
        <input
          type="number"
          value={hours}
          onChange={(e) => setHours(+e.target.value)}
        />
      </label>
      <label>
        Hourly rate ($):
        <input
          type="number"
          value={rate}
          onChange={(e) => setRate(+e.target.value)}
        />
      </label>
      <button onClick={handleCalculate}>Calculate</button>
      {savings > 0 && <p>Weekly savings: ${savings.toFixed(2)}</p>}
      <LineChart width={400} height={200} data={data}>
        <CartesianGrid stroke="#eee" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" />
      </LineChart>
    </section>
  );
};

export default ROICalculator;
