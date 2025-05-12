// src/pages/MemberDashboard.jsx
import React, { useContext, useEffect, useState, useMemo, useRef } from "react";
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
import { AuthContext } from "../context/AuthContext.jsx";
import { supabase } from "../supabaseClient.js";
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
import { FaProjectDiagram, FaBlog, FaNewspaper, FaBook } from "react-icons/fa";
import "./MemberDashboard.css";

export default function MemberDashboard() {
  const { user, signOut } = useContext(AuthContext);

  // STATE
  const [isAdmin, setIsAdmin] = useState(false);
  const [projects, setProjects] = useState([]);
  const [posts, setPosts] = useState([]);
  const [newsletters, setNewsletters] = useState([]);
  const [resources, setResources] = useState([]);
  const [caseStudies, setCaseStudies] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [modalContext, setModalContext] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    image_url: "",
  });
  const formRef = useRef();
  const norm = (arr) => (Array.isArray(arr) ? arr : []);

  // FETCH
  useEffect(() => {
    if (!user) return;
    setLoading(true);
    (async () => {
      try {
        const { data: profile } = await supabase
          .from("profiles")
          .select("is_admin")
          .eq("user_id", user.id)
          .maybeSingle();
        setIsAdmin(Boolean(profile?.is_admin));

        const fetchTable = async (table, key, setter, orderBy) => {
          const { data } = await supabase
            .from(table)
            .select("*")
            .eq(key, user.id)
            .order(orderBy, { ascending: false });
          setter(norm(data));
        };

        await fetchTable("projects", "owner_id", setProjects, "created_at");
        await fetchTable("posts", "author_id", setPosts, "published_at");
        if (isAdmin) {
          await fetchTable(
            "newsletters",
            "user_id",
            setNewsletters,
            "created_at"
          );
          await fetchTable("resources", "user_id", setResources, "created_at");
          await fetchTable(
            "case_studies",
            "user_id",
            setCaseStudies,
            "created_at"
          );
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [user, isAdmin]);

  // CHART DATA
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

  // CREATE / EDIT
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!modalContext) return;
    setLoading(true);

    const table =
      modalContext === "project"
        ? "projects"
        : modalContext === "post"
        ? "posts"
        : modalContext === "newsletter"
        ? "newsletters"
        : modalContext === "resource"
        ? "resources"
        : "case_studies";

    const payload =
      modalContext === "project"
        ? {
            owner_id: user.id,
            name: formData.title,
            description: formData.content,
            link: formData.image_url,
          }
        : modalContext === "post"
        ? {
            author_id: user.id,
            title: formData.title,
            excerpt: formData.excerpt,
            content: formData.content,
            image_url: formData.image_url,
          }
        : {
            user_id: user.id,
            title: formData.title,
            content: formData.content,
          };

    try {
      const { error } = await supabase.from(table).insert([payload]);
      if (error) throw error;

      // re-fetch
      const setters = {
        projects: setProjects,
        posts: setPosts,
        newsletters: setNewsletters,
        resources: setResources,
        case_studies: setCaseStudies,
      };
      const key = table === "projects" ? "owner_id" : "author_id";
      const orderBy = table === "posts" ? "published_at" : "created_at";
      const { data } = await supabase
        .from(table)
        .select("*")
        .eq(key, user.id)
        .order(orderBy, { ascending: false });
      setters[table](norm(data));
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setShowModal(false);
      setLoading(false);
      setFormData({ title: "", excerpt: "", content: "", image_url: "" });
    }
  };

  // DELETE
  const handleDelete = async (ctx, id) => {
    if (!window.confirm("Delete this item?")) return;
    setLoading(true);
    try {
      const table = ctx === "caseStudies" ? "case_studies" : ctx;
      await supabase.from(table).delete().eq("id", id);
      const setters = {
        projects: setProjects,
        posts: setPosts,
        newsletters: setNewsletters,
        resources: setResources,
        case_studies: setCaseStudies,
      };
      setters[table]((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // FOCUS trap
  useEffect(() => {
    if (showModal && formRef.current) {
      formRef.current.querySelector("input,textarea")?.focus();
    }
  }, [showModal]);

  // require login
  if (!user) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          You must be logged in to view this page.
        </Alert>
      </Container>
    );
  }

  // === MAIN RENDER ===
  return (
    <Container fluid className="member-dashboard">
      <Tab.Container defaultActiveKey="projects">
        <Row>
          {/* Sidebar (desktop) */}
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
                  <Nav.Link eventKey="caseStudies" as="button">
                    <FaBook /> Case Studies
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Col>

          {/* Main content */}
          <Col lg={10}>
            {/* Mobile pills */}
            <Nav
              variant="pills"
              className="d-flex d-lg-none justify-content-around mb-3"
            >
              <Nav.Item>
                <Nav.Link eventKey="projects">Projects</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="posts">Posts</Nav.Link>
              </Nav.Item>
              {isAdmin && (
                <>
                  <Nav.Item>
                    <Nav.Link eventKey="newsletters">Newsletters</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="resources">Resources</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="caseStudies">Case Studies</Nav.Link>
                  </Nav.Item>
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
                        key: "caseStudies",
                        data: caseStudies,
                        label: "Case Study",
                      },
                    ]
                  : []),
              ].map(({ key, data, label }) => (
                <Tab.Pane eventKey={key} key={key}>
                  {/* Welcome Card on Projects */}
                  {key === "projects" && (
                    <Card className="welcome-card mb-4">
                      <Card.Body className="d-flex justify-content-between">
                        <div>
                          <h2>Hello, {user.email}</h2>
                          <small className="text-muted">
                            Member since{" "}
                            {new Date(user.created_at).toLocaleDateString()}
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
                  )}

                  {/* Summary Cards on Projects */}
                  {key === "projects" && (
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
                        </>
                      )}
                    </Row>
                  )}

                  {/* Section Header + “New” FAB */}
                  <div className="d-flex justify-content-between mb-2">
                    <h4>{label}s</h4>
                    <Button
                      variant="primary"
                      className="fab"
                      onClick={() => {
                        setModalContext(
                          key === "caseStudies" ? "caseStudy" : key.slice(0, -1)
                        );
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

                  {/* Loading / Empty / Table */}
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
                          <th>Title</th>
                          <th>
                            {key === "posts"
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
                            <td>{item.title || item.name}</td>
                            <td>
                              {key === "posts"
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
                                  setModalContext(
                                    key === "caseStudies"
                                      ? "caseStudy"
                                      : key.slice(0, -1)
                                  );
                                  setFormData({
                                    title: item.title || item.name,
                                    excerpt: item.excerpt || "",
                                    content:
                                      item.content || item.description || "",
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
              {formData.title
                ? `Edit ${modalContext}`
                : `Create New ${
                    modalContext === "caseStudy" ? "Case Study" : modalContext
                  }`}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={formData.title}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, title: e.target.value }))
                }
                required
              />
            </Form.Group>
            {modalContext === "post" && (
              <>
                <Form.Group controlId="formExcerpt" className="mb-3">
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
                <Form.Group controlId="formImageUrl" className="mb-3">
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
            )}
            <Form.Group controlId="formContent">
              <Form.Label>
                {modalContext === "post" ? "Content (HTML/MD)" : "Description"}
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={modalContext === "post" ? 8 : 4}
                placeholder={
                  modalContext === "post"
                    ? "Full post content (HTML or Markdown)"
                    : "Enter text"
                }
                value={formData.content}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, content: e.target.value }))
                }
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>…</Modal.Footer>
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
