// src/components/ResourceLibrary/ResourceList.jsx
// =======================================
import React, { useState, useEffect } from "react";
import ResourceCard from "./ResourceCard";
import axios from "axios";

const API_URL = process.env.REACT_APP_RESOURCE_API;

const ResourceList = () => {
  const [resources, setResources] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    axios.get(`${API_URL}/resources`).then((res) => setResources(res.data));
  }, []);

  const topics = ["All", ...new Set(resources.map((r) => r.topic))];
  const displayed =
    filter === "All" ? resources : resources.filter((r) => r.topic === filter);

  return (
    <section aria-labelledby="resources-heading">
      <h2 id="resources-heading">Resource Library</h2>
      <div className="filters">
        <label htmlFor="topic-filter">Filter by topic:</label>
        <select
          id="topic-filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          {topics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div className="resource-grid">
        {displayed.map((r) => (
          <ResourceCard key={r.id} resource={r} />
        ))}
      </div>
    </section>
  );
};

export default ResourceList;
