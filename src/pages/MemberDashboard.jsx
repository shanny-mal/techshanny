// src/pages/MemberDashboard.jsx
import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Card,
  Table,
  Spinner,
  Alert,
  Button,
} from "react-bootstrap";
import { AuthContext } from "../context/AuthContext.jsx";
import { supabase } from "../services/api.js";
import "./MemberDashboard.css";

const MemberDashboard = () => {
  const { user, signOut } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;
    const fetchProjects = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("projects")
        .select("id, name, status, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (error) setError(error.message);
      else setProjects(data);
      setLoading(false);
    };
    fetchProjects();
  }, [user]);

  if (!user) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          You must be logged in to view this page.
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="member-dashboard py-5">
      <Card className="mb-4">
        <Card.Header>
          <div className="d-flex justify-content-between align-items-center">
            <h3>Welcome, {user.email}</h3>
            <Button variant="outline-secondary" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          <p>
            <strong>User ID:</strong> {user.id}
          </p>
          <p>
            <strong>Member since:</strong>{" "}
            {new Date(
              user.created_at || user.confirmed_at
            ).toLocaleDateString()}
          </p>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>
          <h4>Your Projects</h4>
        </Card.Header>
        <Card.Body>
          {loading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : error ? (
            <Alert variant="danger">Error: {error}</Alert>
          ) : projects.length === 0 ? (
            <p>You have not created any projects yet.</p>
          ) : (
            <Table responsive striped hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Project Name</th>
                  <th>Status</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((proj, idx) => (
                  <tr key={proj.id}>
                    <td>{idx + 1}</td>
                    <td>{proj.name}</td>
                    <td>{proj.status}</td>
                    <td>{new Date(proj.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MemberDashboard;
