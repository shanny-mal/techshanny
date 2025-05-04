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
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./MemberDashboard.css";

export default function MemberDashboard() {
  const { user, signOut } = useContext(AuthContext);

  // ─── STATE ───────────────────────────────────────────────────────────────
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

  // ─── FETCH ALL DATA ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!user) return;
    setLoading(true);

    (async () => {
      try {
        // 1) isAdmin flag
        const { data: profile, error: profErr } = await supabase
          .from("profiles")
          .select("is_admin")
          .eq("user_id", user.id)
          .maybeSingle();
        if (profErr) throw profErr;
        setIsAdmin(Boolean(profile?.is_admin));

        // 2) projects → owner_id + created_at
        {
          const { data, error } = await supabase
            .from("projects")
            .select("*")
            .eq("owner_id", user.id)
            .order("created_at", { ascending: false });
          if (error) throw error;
          setProjects(norm(data));
        }

        // 3) posts → author_id + published_at
        {
          const { data, error } = await supabase
            .from("posts")
            .select("*")
            .eq("author_id", user.id)
            .order("published_at", { ascending: false });
          if (error && error.code !== "42P01") throw error;
          setPosts(norm(data));
        }

        // 4) admin‑only tables
        const adminFetch = async (table, setter) => {
          const { data, error } = await supabase
            .from(table)
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false });
          if (error && error.code !== "42P01") throw error;
          setter(norm(data));
        };
        if (isAdmin) {
          await Promise.all([
            adminFetch("newsletters", setNewsletters),
            adminFetch("resources", setResources),
            adminFetch("case_studies", setCaseStudies),
          ]);
        }
      } catch (err) {
        console.error("Dashboard load error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [user, isAdmin]);

  // ─── PROJECT CHART DATA ────────────────────────────────────────────────────
  const projectChart = useMemo(() => {
    const counts = {};
    projects.forEach((p) => {
      const label = new Date(p.created_at).toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
      counts[label] = (counts[label] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, [projects]);

  // ─── CREATE / EDIT HANDLER ───────────────────────────────────────────────────
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!modalContext) return;
    setLoading(true);

    try {
      if (modalContext === "project") {
        // Insert project
        const { error } = await supabase.from("projects").insert([
          {
            owner_id: user.id,
            name: formData.title,
            description: formData.content,
            link: formData.image_url,
          },
        ]);
        if (error) throw error;
        const { data } = await supabase
          .from("projects")
          .select("*")
          .eq("owner_id", user.id)
          .order("created_at", { ascending: false });
        setProjects(norm(data));
      } else if (modalContext === "post") {
        // Insert post
        const { error } = await supabase.from("posts").insert([
          {
            author_id: user.id,
            title: formData.title,
            excerpt: formData.excerpt,
            content: formData.content,
            image_url: formData.image_url,
          },
        ]);
        if (error) throw error;
        const { data } = await supabase
          .from("posts")
          .select("*")
          .eq("author_id", user.id)
          .order("published_at", { ascending: false });
        setPosts(norm(data));
      } else {
        // Insert into admin tables
        const table =
          modalContext === "caseStudy" ? "case_studies" : modalContext + "s";
        const payload = {
          user_id: user.id,
          title: formData.title,
          content: formData.content,
        };
        const { error } = await supabase.from(table).insert([payload]);
        if (error && error.code !== "42P01") throw error;
        const { data } = await supabase
          .from(table)
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });
        switch (modalContext) {
          case "newsletter":
            setNewsletters(norm(data));
            break;
          case "resource":
            setResources(norm(data));
            break;
          case "caseStudy":
            setCaseStudies(norm(data));
            break;
        }
      }
    } catch (err) {
      console.error("Create/Edit error:", err);
      setError(err.message);
    } finally {
      setShowModal(false);
      setFormData({
        title: "",
        excerpt: "",
        content: "",
        image_url: "",
      });
      setLoading(false);
    }
  };

  // ─── DELETE HANDLER ─────────────────────────────────────────────────────────
  const handleDelete = async (ctx, id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    setLoading(true);
    try {
      const table = ctx === "caseStudies" ? "case_studies" : ctx;
      await supabase.from(table).delete().eq("id", id);

      // re-fetch whichever list
      let data;
      if (table === "projects") {
        ({ data } = await supabase
          .from("projects")
          .select("*")
          .eq("owner_id", user.id)
          .order("created_at", { ascending: false }));
        setProjects(norm(data));
      } else if (table === "posts") {
        ({ data } = await supabase
          .from("posts")
          .select("*")
          .eq("author_id", user.id)
          .order("published_at", { ascending: false }));
        setPosts(norm(data));
      } else if (table === "newsletters") {
        ({ data } = await supabase
          .from("newsletters")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false }));
        setNewsletters(norm(data));
      } else if (table === "resources") {
        ({ data } = await supabase
          .from("resources")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false }));
        setResources(norm(data));
      } else if (table === "case_studies") {
        ({ data } = await supabase
          .from("case_studies")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false }));
        setCaseStudies(norm(data));
      }
    } catch (err) {
      console.error("Delete error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // trap focus in modal
  useEffect(() => {
    if (showModal && formRef.current) {
      formRef.current.querySelector("input,textarea")?.focus();
    }
  }, [showModal]);

  // ─── RENDER ─────────────────────────────────────────────────────────────────
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
    <Container className="member-dashboard py-5" role="main">
      {/* Welcome & Sign‑Out */}
      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <h2>Hello, {user.email}</h2>
                <small className="text-muted">
                  Member since {new Date(user.created_at).toLocaleDateString()}
                </small>
                {isAdmin && (
                  <Alert className="mt-2" variant="info">
                    You have admin privileges.
                  </Alert>
                )}
              </div>
              <Button variant="outline-secondary" onClick={signOut}>
                Sign Out
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Summary Cards */}
      <Row className="gy-3 mb-4">
        <Col xs={6} md={3}>
          <Card className="summary-card">
            <Card.Body>
              <h3>{projects.length}</h3>
              <p>Projects</p>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} md={3}>
          <Card className="summary-card">
            <Card.Body>
              <h3>{posts.length}</h3>
              <p>Blog Posts</p>
            </Card.Body>
          </Card>
        </Col>
        {isAdmin && (
          <>
            <Col xs={6} md={2}>
              <Card className="summary-card">
                <Card.Body>
                  <h3>{newsletters.length}</h3>
                  <p>Newsletters</p>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={6} md={2}>
              <Card className="summary-card">
                <Card.Body>
                  <h3>{resources.length}</h3>
                  <p>Resources</p>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={6} md={2}>
              <Card className="summary-card">
                <Card.Body>
                  <h3>{caseStudies.length}</h3>
                  <p>Case Studies</p>
                </Card.Body>
              </Card>
            </Col>
          </>
        )}
      </Row>

      {/* Tabs */}
      <Tab.Container defaultActiveKey="projects">
        <Nav variant="pills" className="mb-3 flex-wrap">
          <Nav.Item>
            <Nav.Link eventKey="projects">Projects</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="posts">Blog Posts</Nav.Link>
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
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>{label}s</h4>
                <Button
                  variant="primary"
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
                  + New {label}
                </Button>
              </div>

              {loading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" />
                </div>
              ) : data.length === 0 ? (
                <Alert variant="secondary">No {label}s yet.</Alert>
              ) : (
                <>
                  {key === "projects" && projectChart.length > 0 && (
                    <div className="mb-4 chart-container">
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={projectChart}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis allowDecimals={false} />
                          <Tooltip />
                          <Bar dataKey="count" fill="#A67B5B" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}

                  <Table responsive hover className="mb-4 bg-white">
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
                              : new Date(item.created_at).toLocaleDateString()}
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
                                  image_url: item.image_url || item.link || "",
                                });
                                setShowModal(true);
                              }}
                            >
                              Edit
                            </Button>{" "}
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
                </>
              )}
            </Tab.Pane>
          ))}
        </Tab.Content>
      </Tab.Container>

      {/* Create / Edit Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        aria-labelledby="create-modal-title"
      >
        <Form ref={formRef} onSubmit={handleCreate}>
          <Modal.Header closeButton>
            <Modal.Title id="create-modal-title">
              {formData.title
                ? `Edit ${modalContext}`
                : `Create New ${
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
                  <Form.Label>Image URL</Form.Label>
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
                {modalContext === "post"
                  ? "Content (HTML/Markdown)"
                  : "Description"}
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={modalContext === "post" ? 8 : 4}
                placeholder="Enter text"
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
            <Button variant="primary" type="submit" disabled={loading}>
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
