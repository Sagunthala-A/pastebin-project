import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPaste } from "../api/pastes";
// import { getPaste } from "../api/pasteApi";

export default function ViewPaste() {
  const { id } = useParams();
  const [paste, setPaste] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getPaste(id)
      .then(setPaste)
      .catch(() => setError("Paste not found or expired"));
  }, [id]);

  if (error) {
    return (
      <div style={styles.page}>
        <div style={styles.errorCard}>{error}</div>
      </div>
    );
  }

  if (!paste) {
    return (
      <div style={styles.page}>
        <div style={styles.loading}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>Paste Content</div>

        <div style={styles.body}>
          {/* SAFE RENDERING: no script execution */}
          <pre style={styles.content}>{paste.content}</pre>
        </div>

        <div style={styles.footer}>
          <Link to="/" style={styles.link}>
            Create a new paste
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f3f4f6",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    width: "70%",
    maxWidth: 900,
    background: "#ffffff",
    borderRadius: 8,
    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
    overflow: "hidden",
  },
  header: {
    background: "#2563eb",
    color: "#ffffff",
    padding: "16px 20px",
    fontSize: 18,
    fontWeight: "bold",
  },
  body: {
    padding: 20,
    background: "#ffffff",
  },
  content: {
    background: "#f9fafb",
    padding: 16,
    borderRadius: 6,
    whiteSpace: "pre-wrap",
    fontSize: 15,
    lineHeight: 1.5,
  },
  footer: {
    borderTop: "1px solid #e5e7eb",
    padding: 14,
    textAlign: "center",
    background: "#ffffff",
  },
  link: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "bold",
  },
  errorCard: {
    background: "#fee2e2",
    color: "#991b1b",
    padding: 20,
    borderRadius: 8,
    fontSize: 16,
  },
  loading: {
    fontSize: 18,
    color: "#374151",
  },
};
