// src/pages/MemberDashboard.jsx
import React, { useContext, useEffect, useState, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Nav,
  Tab,
  Spinner,
  Alert,
  Modal,
  Form,
} from "react-bootstrap";
import { AuthContext } from "../context/AuthContext.jsx";
import { supabase } from "../supabaseClient.js";
import "./MemberDashboard.css";

export default function MemberDashboard() {
  const { user, signOut } = useContext(AuthContext);

  // Admin flag from profiles table
  const [isAdmin, setIsAdmin] = useState(false);

  // Data stores for each section
  const [projects, setProjects] = useState([]);
  const [posts, setPosts] = useState([]);
  const [newsletters, setNewsletters] = useState([]);
  const [resources, setResources] = useState([]);
  const [caseStudies, setCaseStudies] = useState([]);

  // Loading & error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal state
  const [modalContext, setModalContext] = useState(null); // e.g. "project", "post", etc.
  const [showModal, setShowModal] = useState(false);

  // Form refs for focus trapping
  const formRef = useRef();

  // Input states for generic create form
  const [formData, setFormData] = useState({ title: "", content: "" });

  // Fetch both profile and content data on mount
  useEffect(() => {
    if (!user) return;
    setLoading(true);

    const fetchAll = async () => {
      try {
        // Check admin privilege
        let { data: profile } = await supabase
          .from("profiles")
          .select("is_admin")
          .eq("id", user.id)
          .single();
        setIsAdmin(profile?.is_admin);

        // Common fetch helper
        const fetch = (table, setter) =>
          supabase
            .from(table)
            .select("*")
            .eq("owner_id", user.id)
            .order("created_at", { ascending: false })
            .then(({ data, error }) => {
              if (error) throw error;
              setter(data);
            });

        await Promise.all([
          fetch("projects", setProjects),
          fetch("posts", setPosts),
          isAdmin ? fetch("newsletters", setNewsletters) : Promise.resolve(),
          isAdmin ? fetch("resources", setResources) : Promise.resolve(),
          isAdmin ? fetch("case_studies", setCaseStudies) : Promise.resolve(),
        ]);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [user, isAdmin]);

  // Generic create handler
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!modalContext) return;

    setLoading(true);
    try {
      const tableMap = {
        project: "projects",
        post: "posts",
        newsletter: "newsletters",
        resource: "resources",
        caseStudy: "case_studies",
      };
      const table = tableMap[modalContext];
      const payload = {
        owner_id: user.id,
        title: formData.title,
        content: formData.content,
      };
      await supabase.from(table).insert([payload]);
      // Refresh only that section
      const setterMap = {
        project: setProjects,
        post: setPosts,
        newsletter: setNewsletters,
        resource: setResources,
        caseStudy: setCaseStudies,
      };
      const { data } = await supabase
        .from(table)
        .select("*")
        .eq("owner_id", user.id)
        .order("created_at", { ascending: false });
      setterMap[modalContext](data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
      setShowModal(false);
      setFormData({ title: "", content: "" });
    }
  };

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

  // Accessible focus trap on modal show
  useEffect(() => {
    if (showModal && formRef.current) {
      formRef.current.querySelector("input, textarea")?.focus();
    }
  }, [showModal]);

  return (
    <Container className="member-dashboard py-5" role="main">
      <Card className="mb-4">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h1 className="h4">Dashboard</h1>
          <Button variant="outline-secondary" onClick={signOut}>
            Sign Out
          </Button>
        </Card.Header>
        <Card.Body>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Member since:</strong>{" "}
            {new Date(
              user.created_at || user.confirmed_at
            ).toLocaleDateString()}
          </p>
          {isAdmin && <Alert variant="info">You have admin privileges.</Alert>}
        </Card.Body>
      </Card>

      {/* Tabs for different sections */}
      <Tab.Container defaultActiveKey="projects">
        <Nav variant="tabs" role="tablist">
          <Nav.Item>
            <Nav.Link eventKey="projects" role="tab">
              Projects
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="posts" role="tab">
              Blog Posts
            </Nav.Link>
          </Nav.Item>
          {isAdmin && (
            <>
              <Nav.Item>
                <Nav.Link eventKey="newsletters" role="tab">
                  Newsletters
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="resources" role="tab">
                  Resources
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="caseStudies" role="tab">
                  Case Studies
                </Nav.Link>
              </Nav.Item>
            </>
          )}
        </Nav>

        <Tab.Content className="mt-4">
          {/** Generic Section Renderer **/}
          {[
            {
              key: "projects",
              data: projects,
              label: "Project",
              allowCreate: true,
            },
            {
              key: "posts",
              data: posts,
              label: "Blog Post",
              allowCreate: true,
            },
            ...(isAdmin
              ? [
                  {
                    key: "newsletters",
                    data: newsletters,
                    label: "Newsletter",
                    allowCreate: true,
                  },
                  {
                    key: "resources",
                    data: resources,
                    label: "Resource",
                    allowCreate: true,
                  },
                  {
                    key: "caseStudies",
                    data: caseStudies,
                    label: "Case Study",
                    allowCreate: true,
                  },
                ]
              : []),
          ].map(({ key, data, label, allowCreate }) => (
            <Tab.Pane eventKey={key} key={key} role="tabpanel">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>{label}s</h2>
                {allowCreate && (
                  <Button
                    variant="primary"
                    onClick={() => {
                      setModalContext(
                        key === "caseStudies" ? "caseStudy" : key.slice(0, -1)
                      );
                      setShowModal(true);
                    }}
                    aria-label={`Create new ${label.toLowerCase()}`}
                  >
                    + New {label}
                  </Button>
                )}
              </div>

              {loading ? (
                <Spinner animation="border" role="status" />
              ) : data.length === 0 ? (
                <Alert variant="secondary">
                  No {label.toLowerCase()}s yet.
                </Alert>
              ) : (
                <ul className="dashboard-list" aria-live="polite">
                  {data.map((item) => (
                    <li key={item.id}>
                      <Card className="mb-2">
                        <Card.Body>
                          <Card.Title>{item.title}</Card.Title>
                          <Card.Text>{item.content}</Card.Text>
                          <small className="text-muted">
                            {new Date(item.created_at).toLocaleDateString()}
                          </small>
                        </Card.Body>
                      </Card>
                    </li>
                  ))}
                </ul>
              )}
            </Tab.Pane>
          ))}
        </Tab.Content>
      </Tab.Container>

      {/* Create / Edit Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="create-modal-title"
      >
        <Form ref={formRef} onSubmit={handleCreate}>
          <Modal.Header closeButton>
            <Modal.Title id="create-modal-title">
              Create New{" "}
              {modalContext === "caseStudy" ? "Case Study" : modalContext}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, title: e.target.value }))
                }
                required
                aria-required="true"
              />
            </Form.Group>
            <Form.Group controlId="formContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={formData.content}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, content: e.target.value }))
                }
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? "Saving…" : "Save"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}
    </Container>
  );
}
