import React, { useEffect, useState, useMemo } from "react";
import { Table, Spinner, Alert, Form, Container } from "react-bootstrap";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../services/api.js";

export default function Logs() {
  const { user, isAdmin } = useAuth();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [levelFilter, setLevelFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!isAdmin) return;
    setLoading(true);
    api
      .getList("logs", { ordering: "-timestamp" })
      .then(setLogs)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [isAdmin]);

  const filtered = useMemo(() => {
    return logs.filter((l) => {
      const matchLevel = levelFilter === "ALL" || l.level === levelFilter;
      const matchSearch =
        search === "" ||
        l.message.toLowerCase().includes(search.toLowerCase()) ||
        l.logger_name.toLowerCase().includes(search.toLowerCase());
      return matchLevel && matchSearch;
    });
  }, [logs, levelFilter, search]);

  if (!user || !isAdmin) {
    return <Alert variant="warning">Access denied.</Alert>;
  }

  return (
    <Container className="py-5">
      <h2>Application Logs</h2>

      <Form className="mb-3 d-flex gap-2 flex-wrap">
        <Form.Select
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
          style={{ maxWidth: "200px" }}
        >
          <option value="ALL">All Levels</option>
          <option value="DEBUG">Debug</option>
          <option value="INFO">Info</option>
          <option value="WARNING">Warning</option>
          <option value="ERROR">Error</option>
          <option value="CRITICAL">Critical</option>
        </Form.Select>

        <Form.Control
          type="search"
          placeholder="Search message or logger…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flexGrow: 1, minWidth: "200px" }}
        />
      </Form>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Time</th>
              <th>Level</th>
              <th>Logger</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((l) => (
              <tr key={l.id}>
                <td>{new Date(l.timestamp).toLocaleString()}</td>
                <td>{l.level}</td>
                <td>{l.logger_name}</td>
                <td>{l.message}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
