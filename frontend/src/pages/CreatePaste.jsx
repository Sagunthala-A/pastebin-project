import React, { useState } from "react";
import { createPaste } from "../api/pastes";
// import { createPaste } from "../api/pasteApi";

export default function CreatePaste() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [views, setViews] = useState("");
  const [resultUrl, setResultUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  async function handleCreatePaste() {
    setError("");
    setCopied(false);

    // ---------- Frontend validation (UX only) ----------
    if (!content.trim()) {
      setError("Paste content cannot be empty");
      return;
    }

    if (ttl && (!Number.isInteger(Number(ttl)) || Number(ttl) <= 0)) {
      setError("TTL must be a positive number");
      return;
    }

    if (views && (!Number.isInteger(Number(views)) || Number(views) <= 0)) {
      setError("Max views must be a positive number");
      return;
    }

    const body = { content: content.trim() };
    if (ttl) body.ttl_seconds = Number(ttl);
    if (views) body.max_views = Number(views);

    try {
      const data = await createPaste(body);
      if (data?.url) {
        setResultUrl(data.url);
      } else {
        setError("Unexpected server response");
      }
    } catch (err) {
      setError(err.message || "Failed to create paste");
    }
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(resultUrl);
    setCopied(true);
  }

  function reset() {
    setContent("");
    setTtl("");
    setViews("");
    setResultUrl("");
    setCopied(false);
    setError("");
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Pastebin Lite</h1>
        <p style={styles.subtitle}>
          Share text snippets with optional expiry and view limits
        </p>

        {!resultUrl ? (
          <>
            {error && <div style={styles.error}>{error}</div>}

            <textarea
              style={styles.textarea}
              placeholder="Paste your text here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <input
              style={styles.input}
              type="number"
              placeholder="TTL (seconds)"
              value={ttl}
              onChange={(e) => setTtl(e.target.value)}
            />

            <input
              style={styles.input}
              type="number"
              placeholder="Max views"
              value={views}
              onChange={(e) => setViews(e.target.value)}
            />

            <button style={styles.button} onClick={handleCreatePaste}>
              Create Paste
            </button>
          </>
        ) : (
          <div style={styles.successBox}>
            <h3>Paste created successfully!</h3>

            <div style={styles.linkRow}>
              <input style={styles.linkInput} value={resultUrl} readOnly />
              <button style={styles.copyBtn} onClick={copyToClipboard}>
                {copied ? "Copied" : "Copy"}
              </button>
            </div>

            <button style={styles.secondaryBtn} onClick={reset}>
              Create another paste
            </button>
          </div>
        )}
      </div>

      <footer style={styles.footer}>
        Pastebin Lite · Share text snippets securely
      </footer>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    background: "#fff",
    padding: 30,
    borderRadius: 12,
    width: 520,
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
  },
  title: {
    margin: 0,
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
  },
  textarea: {
    width: "100%",
    height: 120,
    padding: 10,
    marginBottom: 12,
    fontSize: 14,
  },
  input: {
    width: "100%",
    padding: 8,
    marginBottom: 10,
    fontSize: 14,
  },
  button: {
    width: "100%",
    padding: 10,
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 15,
  },
  successBox: {
    background: "#dcfce7",
    padding: 16,
    borderRadius: 8,
    border: "1px solid #22c55e",
  },
  linkRow: {
    display: "flex",
    gap: 8,
    marginBottom: 12,
  },
  linkInput: {
    flex: 1,
    padding: 8,
    fontSize: 13,
  },
  copyBtn: {
    padding: "8px 14px",
    background: "#22c55e",
    border: "none",
    borderRadius: 6,
    color: "#fff",
    cursor: "pointer",
  },
  secondaryBtn: {
    background: "transparent",
    border: "1px solid #22c55e",
    color: "#166534",
    padding: 8,
    borderRadius: 6,
    cursor: "pointer",
  },
  footer: {
    marginTop: 20,
    color: "#e5e7eb",
    fontSize: 13,
  },
  error: {
    color: "#b91c1c",
    marginBottom: 10,
  },
};
