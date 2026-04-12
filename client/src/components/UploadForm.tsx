import { useState } from "react";
import { uploadViaProxy } from "../lib/api";
import type { NormalizedPinarkiveResult } from "../lib/types";
import { ResultCard } from "./ResultCard";

export function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<NormalizedPinarkiveResult | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResult(null);
    if (!file) {
      setResult({
        ok: false,
        cid: null,
        data: null,
        error: "Choose a file first.",
      });
      return;
    }

    setLoading(true);
    try {
      const body = await uploadViaProxy(file);
      setResult(body);
    } catch {
      setResult({
        ok: false,
        cid: null,
        data: null,
        error: "Could not reach the upload API.",
      });
    } finally {
      setLoading(false);
    }
  }

  const formStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    borderRadius: "0.75rem",
    border: "1px solid var(--border)",
    background: "var(--surface)",
    padding: "1.5rem",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <form onSubmit={onSubmit} style={formStyle}>
        <div>
          <label
            htmlFor="file"
            style={{ display: "block", fontSize: "0.875rem", fontWeight: 500 }}
          >
            File
          </label>
          <input
            id="file"
            name="file"
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            style={{ marginTop: "0.5rem", width: "100%", fontSize: "0.875rem", color: "var(--muted)" }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            border: "none",
            borderRadius: "0.5rem",
            padding: "0.65rem 1rem",
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "#fff",
            background: "var(--accent)",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.55 : 1,
          }}
        >
          {loading ? "Uploading…" : "Upload to PinArkive"}
        </button>
      </form>
      <ResultCard result={result} />
    </div>
  );
}
