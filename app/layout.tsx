import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevInterview",
  description: "Simulador de entrevistas para desarrolladores",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        {/* Header */}
        <header style={{
          position: "sticky", top: 0, zIndex: 50,
          background: "rgba(2, 8, 23, 0.9)", backdropFilter: "blur(12px)",
          borderBottom: "1px solid #1e293b"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.875rem 1rem", maxWidth: 720, margin: "0 auto" }}>
            <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#e2e8f0" }}>
              <span style={{ color: "#00ff87" }}>&lt;</span>
              DevInterview
              <span style={{ color: "#00ff87" }}>/&gt;</span>
            </span>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00ff87", boxShadow: "0 0 8px #00ff87" }} />
          </div>
        </header>

        {/* Contenido */}
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          {children}
        </div>

        {/* Navegación inferior */}
        <nav style={{
          position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
          width: "100%", maxWidth: 720,
          background: "rgba(2, 8, 23, 0.95)", backdropFilter: "blur(12px)",
          borderTop: "1px solid #1e293b",
          display: "flex", justifyContent: "center", gap: "2rem",
          padding: "0.75rem 1rem", zIndex: 50
        }}>
          <Link href="/" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.2rem", textDecoration: "none", color: "#64748b" }}>
            <span style={{ fontSize: "1.25rem" }}>⚡</span>
            <span style={{ fontSize: "0.65rem", letterSpacing: "0.05em" }}>SIMULADOR</span>
          </Link>
          <Link href="/tips" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.2rem", textDecoration: "none", color: "#64748b" }}>
            <span style={{ fontSize: "1.25rem" }}>💡</span>
            <span style={{ fontSize: "0.65rem", letterSpacing: "0.05em" }}>TIPS</span>
          </Link>
        </nav>
      </body>
    </html>
  );
}