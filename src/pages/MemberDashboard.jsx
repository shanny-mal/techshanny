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
import { supabase } from "../supabaseClient.js";
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
        .select("id, name, description, link, created_at")
        .eq("owner_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        setError(error.message);
      } else {
        setProjects(data);
      }
      setLoading(false);
    };

    fetchProjects();
  }, [user]);

  // If not logged in
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
      {/* User card */}
      <Card className="mb-4">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h3>Welcome, {user.email}</h3>
          <Button variant="outline-secondary" onClick={signOut}>
            Sign Out
          </Button>
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

      {/* Projects list */}
      <Card>
        <Card.Header>
          <h4>Your Projects</h4>
        </Card.Header>
        <Card.Body>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" role="status" />
            </div>
          ) : error ? (
            <Alert variant="danger">Error: {error}</Alert>
          ) : projects.length === 0 ? (
            <p>You have not created any projects yet.</p>
          ) : (
            <Table responsive striped hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Link</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((proj, idx) => (
                  <tr key={proj.id}>
                    <td>{idx + 1}</td>
                    <td>{proj.name}</td>
                    <td>{proj.description}</td>
                    <td>
                      {proj.link ? (
                        <a href={proj.link} target="_blank" rel="noreferrer">
                          View
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>
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
