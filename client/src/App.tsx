import { UploadForm } from "./components/UploadForm";

export default function App() {
  return (
    <main
      style={{
        maxWidth: "32rem",
        margin: "0 auto",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "4rem 1rem",
      }}
    >
      <header style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <p
          style={{
            margin: "0 0 0.5rem",
            fontSize: "0.7rem",
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--muted)",
          }}
        >
          PinArkive
        </p>
        <h1
          style={{
            margin: 0,
            fontSize: "clamp(1.5rem, 4vw, 1.875rem)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
          }}
        >
          Vite + React upload starter
        </h1>
        <p
          style={{
            margin: "0.75rem 0 0",
            fontSize: "0.875rem",
            lineHeight: 1.6,
            color: "var(--muted)",
          }}
        >
          The browser talks only to the local Express server. Your PinArkive API
          key stays on the server—never bundled into client code.
        </p>
      </header>
      <UploadForm />
    </main>
  );
}
