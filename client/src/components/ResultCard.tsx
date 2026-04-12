import { useState } from "react";
import type { NormalizedPinarkiveResult } from "../lib/types";

type Props = {
  result: NormalizedPinarkiveResult | null;
};

export function ResultCard({ result }: Props) {
  const [rawOpen, setRawOpen] = useState(false);

  if (!result) return null;

  const cardStyle: React.CSSProperties = {
    borderRadius: "0.75rem",
    border: "1px solid var(--border)",
    background: "var(--surface)",
    padding: "1rem",
  };

  if (!result.ok) {
    return (
      <div style={cardStyle} role="alert">
        <p style={{ margin: 0, fontSize: "0.875rem", fontWeight: 600, color: "var(--error)" }}>
          Upload failed
        </p>
        <p style={{ margin: "0.25rem 0 0", fontSize: "0.875rem", color: "var(--muted)" }}>
          {result.error}
        </p>
      </div>
    );
  }

  return (
    <div style={cardStyle}>
      <p style={{ margin: 0, fontSize: "0.875rem", fontWeight: 600, color: "var(--success)" }}>
        Success
      </p>
      {result.cid ? (
        <div style={{ marginTop: "0.75rem" }}>
          <p
            style={{
              margin: 0,
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            CID
          </p>
          <p
            style={{
              margin: "0.25rem 0 0",
              wordBreak: "break-all",
              fontFamily: "ui-monospace, monospace",
              fontSize: "0.875rem",
            }}
          >
            {result.cid}
          </p>
        </div>
      ) : (
        <p style={{ margin: "0.5rem 0 0", fontSize: "0.875rem", color: "var(--muted)" }}>
          No <code>cid</code> detected. Open raw JSON below if the API returned a different field.
        </p>
      )}
      <button
        type="button"
        onClick={() => setRawOpen((o) => !o)}
        style={{
          marginTop: "1rem",
          padding: 0,
          border: "none",
          background: "none",
          fontSize: "0.75rem",
          fontWeight: 600,
          color: "var(--accent)",
          cursor: "pointer",
          textDecoration: "underline",
        }}
      >
        {rawOpen ? "Hide" : "Show"} raw JSON
      </button>
      {rawOpen && (
        <pre
          style={{
            margin: "0.5rem 0 0",
            maxHeight: "12rem",
            overflow: "auto",
            borderRadius: "0.5rem",
            background: "var(--bg)",
            padding: "0.75rem",
            fontSize: "0.75rem",
            color: "var(--muted)",
          }}
        >
          {JSON.stringify(result.data, null, 2)}
        </pre>
      )}
    </div>
  );
}
