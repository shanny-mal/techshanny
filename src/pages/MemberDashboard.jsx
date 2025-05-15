// src/pages/MemberDashboard.jsx
import React, { useEffect, useState, useMemo, useRef } from "react";
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
  Table,
  Image,
} from "react-bootstrap";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../services/api.js";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  FaProjectDiagram,
  FaBlog,
  FaNewspaper,
  FaBook,
  FaClipboardList,
} from "react-icons/fa";
import "./MemberDashboard.css";

export default function MemberDashboard() {
  const { user, signOut } = useAuth();

  // ─── State ────────────────────────────────────────────────────────────────
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [projects, setProjects] = useState([]);
  const [posts, setPosts] = useState([]);
  const [newsletters, setNewsletters] = useState([]);
  const [resources, setResources] = useState([]);
  const [caseStudies, setCaseStudies] = useState([]);
  const [logs, setLogs] = useState([]); // ← New state for Logs

  // Modal + form
  const [modalContext, setModalContext] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const formRef = useRef();
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    image_url: "",
  });

  // ─── Fetch helper ─────────────────────────────────────────────────────────
  const fetchList = async (resource, setter) => {
    try {
      const data = await api.getList(resource);
      setter(data);
    } catch (err) {
      throw new Error(`Failed to load ${resource}: ${err.message}`);
    }
  };

  // ─── Initial load ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!user) return;
    setLoading(true);

    (async () => {
      try {
        // always fetch projects & posts
        await Promise.all([
          fetchList("projects", setProjects),
          fetchList("posts", setPosts),
        ]);

        // if admin, fetch all admin sections
        if (user.is_staff || user.is_superuser) {
          setIsAdmin(true);
          await Promise.all([
            fetchList("newsletters", setNewsletters),
            fetchList("resources", setResources),
            fetchList("case-studies", setCaseStudies),
            fetchList("logs", setLogs), // ← Fetch logs for admin
          ]);
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  // ─── Chart data ────────────────────────────────────────────────────────────
  const monthlyProjects = useMemo(() => {
    const cnt = {};
    projects.forEach((p) => {
      const m = new Date(p.created_at).toLocaleString("default", {
        month: "short",
      });
      cnt[m] = (cnt[m] || 0) + 1;
    });
    return Object.entries(cnt).map(([name, count]) => ({ name, count }));
  }, [projects]);

  // ─── Create / Edit ─────────────────────────────────────────────────────────
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!modalContext) return;
    setLoading(true);

    let payload = {};
    switch (modalContext) {
      case "projects":
        payload = {
          name: formData.title,
          description: formData.content,
          link: formData.image_url,
        };
        break;
      case "posts":
        payload = {
          title: formData.title,
          excerpt: formData.excerpt,
          content: formData.content,
          image_url: formData.image_url,
        };
        break;
      case "newsletters":
      case "resources":
      case "case-studies":
        payload = { title: formData.title, content: formData.content };
        break;
      case "logs": // ← New create payload for logs
        payload = {
          message: formData.content,
          level: formData.excerpt || "INFO",
        };
        break;
      default:
        break;
    }

    try {
      await api.create(modalContext, payload);
      const setterMap = {
        projects: setProjects,
        posts: setPosts,
        newsletters: setNewsletters,
        resources: setResources,
        "case-studies": setCaseStudies,
        logs: setLogs, // ← Map logs setter
      };
      await fetchList(modalContext, setterMap[modalContext]);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setShowModal(false);
      setLoading(false);
      setFormData({ title: "", excerpt: "", content: "", image_url: "" });
    }
  };

  // ─── Delete ─────────────────────────────────────────────────────────────────
  const handleDelete = async (endpoint, id) => {
    if (!window.confirm("Are you sure?")) return;
    setLoading(true);
    try {
      await api.remove(endpoint, id);
      const setterMap = {
        projects: setProjects,
        posts: setPosts,
        newsletters: setNewsletters,
        resources: setResources,
        "case-studies": setCaseStudies,
        logs: setLogs, // ← Map logs setter
      };
      setterMap[endpoint]((prev) => prev.filter((x) => x.id !== id));
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ─── Trap focus in modal ───────────────────────────────────────────────────
  useEffect(() => {
    if (showModal && formRef.current) {
      formRef.current.querySelector("input,textarea")?.focus();
    }
  }, [showModal]);

  // ─── Require logged in ─────────────────────────────────────────────────────
  if (!user) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          You must be logged in to view this page.
        </Alert>
      </Container>
    );
  }

  // ─── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <Container fluid className="member-dashboard">
      <Tab.Container defaultActiveKey="projects">
        <Row>
          {/* Sidebar */}
          <Col lg={2} className="sidebar d-none d-lg-block">
            <Nav variant="pills" className="flex-column">
              <Nav.Link eventKey="projects" as="button">
                <FaProjectDiagram /> Projects
              </Nav.Link>
              <Nav.Link eventKey="posts" as="button">
                <FaBlog /> Posts
              </Nav.Link>
              {isAdmin && (
                <>
                  <Nav.Link eventKey="newsletters" as="button">
                    <FaNewspaper /> Newsletters
                  </Nav.Link>
                  <Nav.Link eventKey="resources" as="button">
                    <FaBook /> Resources
                  </Nav.Link>
                  <Nav.Link eventKey="case-studies" as="button">
                    <FaBook /> Case Studies
                  </Nav.Link>
                  <Nav.Link eventKey="logs" as="button">
                    <FaClipboardList /> Logs {/* ← New Logs tab */}
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Col>

          {/* Main content */}
          <Col lg={10}>
            {/* Mobile tabs */}
            <Nav
              variant="pills"
              className="d-flex d-lg-none justify-content-around mb-3"
            >
              <Nav.Link eventKey="projects">Projects</Nav.Link>
              <Nav.Link eventKey="posts">Posts</Nav.Link>
              {isAdmin && (
                <>
                  <Nav.Link eventKey="newsletters">Newsletters</Nav.Link>
                  <Nav.Link eventKey="resources">Resources</Nav.Link>
                  <Nav.Link eventKey="case-studies">Case Studies</Nav.Link>
                  <Nav.Link eventKey="logs">Logs</Nav.Link>
                </>
              )}
            </Nav>

            <Tab.Content>
              {[
                { key: "projects", data: projects, label: "Project" },
                { key: "posts", data: posts, label: "Blog Post" },
                ...(isAdmin
                  ? [
                      {
                        key: "newsletters",
                        data: newsletters,
                        label: "Newsletter",
                      },
                      { key: "resources", data: resources, label: "Resource" },
                      {
                        key: "case-studies",
                        data: caseStudies,
                        label: "Case Study",
                      },
                      { key: "logs", data: logs, label: "Log Entry" }, // ← logs pane
                    ]
                  : []),
              ].map(({ key, data, label }) => (
                <Tab.Pane eventKey={key} key={key}>
                  {/* Projects welcome + summary */}
                  {key === "projects" && (
                    <>
                      <Card className="welcome-card mb-4">
                        <Card.Body className="d-flex justify-content-between">
                          <div>
                            <h2>Hello, {user.email}</h2>
                            <small className="text-muted">
                              Member since{" "}
                              {new Date(user.date_joined).toLocaleDateString()}
                            </small>
                            {isAdmin && (
                              <Alert variant="info" className="mt-2">
                                You have admin privileges.
                              </Alert>
                            )}
                          </div>
                          <Button variant="outline-secondary" onClick={signOut}>
                            Sign Out
                          </Button>
                        </Card.Body>
                      </Card>

                      <Row className="summary-row mb-4">
                        <Col xs={6} md={3}>
                          <Card className="summary-card">
                            <Card.Body>
                              <FaProjectDiagram className="summary-icon" />
                              <h3>{projects.length}</h3>
                              <p>Projects</p>
                              <ResponsiveContainer width="100%" height={50}>
                                <LineChart data={monthlyProjects}>
                                  <Line
                                    dataKey="count"
                                    stroke="#A67B5B"
                                    dot={false}
                                    strokeWidth={2}
                                  />
                                </LineChart>
                              </ResponsiveContainer>
                            </Card.Body>
                          </Card>
                        </Col>
                        <Col xs={6} md={3}>
                          <Card className="summary-card">
                            <Card.Body>
                              <FaBlog className="summary-icon" />
                              <h3>{posts.length}</h3>
                              <p>Posts</p>
                              <ResponsiveContainer width="100%" height={50}>
                                <BarChart data={monthlyProjects}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="name" />
                                  <YAxis allowDecimals={false} />
                                  <Tooltip />
                                  <Bar dataKey="count" fill="#7A5235" />
                                </BarChart>
                              </ResponsiveContainer>
                            </Card.Body>
                          </Card>
                        </Col>
                        {isAdmin && (
                          <>
                            <Col xs={6} md={2}>
                              <Card className="summary-card">
                                <Card.Body>
                                  <FaNewspaper className="summary-icon" />
                                  <h3>{newsletters.length}</h3>
                                  <p>Newsletters</p>
                                </Card.Body>
                              </Card>
                            </Col>
                            <Col xs={6} md={2}>
                              <Card className="summary-card">
                                <Card.Body>
                                  <FaBook className="summary-icon" />
                                  <h3>{resources.length}</h3>
                                  <p>Resources</p>
                                </Card.Body>
                              </Card>
                            </Col>
                            <Col xs={6} md={2}>
                              <Card className="summary-card">
                                <Card.Body>
                                  <FaBook className="summary-icon" />
                                  <h3>{caseStudies.length}</h3>
                                  <p>Case Studies</p>
                                </Card.Body>
                              </Card>
                            </Col>
                            <Col xs={6} md={2}>
                              <Card className="summary-card">
                                <Card.Body>
                                  <FaClipboardList className="summary-icon" />
                                  <h3>{logs.length}</h3>
                                  <p>Logs</p>
                                </Card.Body>
                              </Card>
                            </Col>
                          </>
                        )}
                      </Row>
                    </>
                  )}

                  {/* Section header + New button */}
                  <div className="d-flex justify-content-between mb-2">
                    <h4>{label}s</h4>
                    <Button
                      variant="primary"
                      className="fab"
                      onClick={() => {
                        setModalContext(key);
                        setFormData({
                          title: "",
                          excerpt: "",
                          content: "",
                          image_url: "",
                        });
                        setShowModal(true);
                      }}
                    >
                      +
                    </Button>
                  </div>

                  {loading ? (
                    <div className="text-center py-5">
                      <Spinner animation="border" />
                    </div>
                  ) : data.length === 0 ? (
                    <Alert variant="secondary">No {label}s yet.</Alert>
                  ) : (
                    <Table
                      responsive
                      hover
                      striped
                      className="mb-4 bg-white table-custom"
                    >
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>{key === "logs" ? "Message" : "Title"}</th>
                          <th>
                            {key === "logs"
                              ? "Level"
                              : key === "posts"
                              ? "Excerpt"
                              : key === "projects"
                              ? "Description"
                              : "Created"}
                          </th>
                          {key === "posts" && <th>Image</th>}
                          {key === "posts" && <th>Published</th>}
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((item, idx) => (
                          <tr key={item.id}>
                            <td>{idx + 1}</td>
                            <td>
                              {key === "logs"
                                ? item.message
                                : item.title || item.name}
                            </td>
                            <td>
                              {key === "logs"
                                ? item.level
                                : key === "posts"
                                ? item.excerpt
                                : key === "projects"
                                ? item.description
                                : new Date(
                                    item.created_at
                                  ).toLocaleDateString()}
                            </td>
                            {key === "posts" && (
                              <>
                                <td>
                                  {item.image_url ? (
                                    <Image
                                      src={item.image_url}
                                      thumbnail
                                      style={{
                                        width: 50,
                                        height: 50,
                                        objectFit: "cover",
                                      }}
                                    />
                                  ) : (
                                    "—"
                                  )}
                                </td>
                                <td>
                                  {item.published_at
                                    ? new Date(
                                        item.published_at
                                      ).toLocaleDateString()
                                    : "—"}
                                </td>
                              </>
                            )}
                            <td>
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                className="me-2"
                                onClick={() => {
                                  setModalContext(key);
                                  setFormData({
                                    title:
                                      key === "logs"
                                        ? ""
                                        : item.title || item.name,
                                    excerpt:
                                      key === "logs"
                                        ? item.level
                                        : item.excerpt || "",
                                    content:
                                      key === "logs"
                                        ? item.message
                                        : item.content ||
                                          item.description ||
                                          "",
                                    image_url:
                                      item.image_url || item.link || "",
                                  });
                                  setShowModal(true);
                                }}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleDelete(key, item.id)}
                              >
                                Delete
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )}
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>

      {/* Create/Edit Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        aria-labelledby="crud-modal"
      >
        <Form ref={formRef} onSubmit={handleCreate}>
          <Modal.Header closeButton>
            <Modal.Title id="crud-modal">
              {(() => {
                const noun = modalContext
                  ? modalContext === "case-studies"
                    ? "Case Study"
                    : modalContext === "logs"
                    ? "Log Entry"
                    : modalContext.slice(0, -1)
                  : "";
                return formData.title || formData.content
                  ? `Edit ${noun}`
                  : `Create New ${noun}`;
              })()}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Title or Message */}
            <Form.Group className="mb-3">
              <Form.Label>
                {modalContext === "logs" ? "Message Title" : "Title"}
              </Form.Label>
              <Form.Control
                type="text"
                required
                placeholder={
                  modalContext === "logs" ? "Enter log title" : "Enter title"
                }
                value={
                  modalContext === "logs" ? formData.content : formData.title
                }
                onChange={(e) =>
                  setFormData((f) => ({
                    ...f,
                    ...(modalContext === "logs"
                      ? { content: e.target.value }
                      : { title: e.target.value }),
                  }))
                }
              />
            </Form.Group>

            {/* Level or Excerpt & Image URL */}
            {modalContext === "logs" ? (
              <Form.Group className="mb-3">
                <Form.Label>Level</Form.Label>
                <Form.Select
                  required
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData((f) => ({ ...f, excerpt: e.target.value }))
                  }
                >
                  {["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"].map(
                    (l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    )
                  )}
                </Form.Select>
              </Form.Group>
            ) : modalContext === "posts" ? (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Excerpt</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Short summary"
                    value={formData.excerpt}
                    onChange={(e) =>
                      setFormData((f) => ({ ...f, excerpt: e.target.value }))
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    type="url"
                    placeholder="https://..."
                    value={formData.image_url}
                    onChange={(e) =>
                      setFormData((f) => ({ ...f, image_url: e.target.value }))
                    }
                  />
                </Form.Group>
              </>
            ) : null}

            {/* Content or Description */}
            <Form.Group className="mb-3">
              <Form.Label>
                {modalContext === "posts"
                  ? "Content (HTML/Markdown)"
                  : modalContext === "logs"
                  ? "Log Message"
                  : "Description"}
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={modalContext === "posts" ? 6 : 4}
                placeholder={
                  modalContext === "posts"
                    ? "Full post content..."
                    : modalContext === "logs"
                    ? "Enter detailed log message..."
                    : "Enter description"
                }
                value={formData.content}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, content: e.target.value }))
                }
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Saving…" : "Save"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {error && (
        <Alert variant="danger" className="mt-3 text-center">
          {error}
        </Alert>
      )}
    </Container>
  );
}
