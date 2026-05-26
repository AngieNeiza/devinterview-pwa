import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import SWRegistration from "./SWRegistration";

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "DevInterview",
  description: "Simulador de entrevistas de desarrollo de software con preguntas de opción múltiple",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#020817" />
      </head>
      <body className={`${jetbrains.variable}`}>
        <div className="app-shell">
          <header className="app-header">
            <div className="header-inner">
              <span className="logo">
                <span className="logo-bracket">&lt;</span>
                DevInterview
                <span className="logo-bracket">/&gt;</span>
              </span>
              <div className="status-dot" />
            </div>
          </header>

          <div className="content-area">{children}</div>

          <nav className="bottom-nav">
            <Link href="/" className="nav-item">
              <span className="nav-icon">⚡</span>
              <span className="nav-label">Simulador</span>
            </Link>
            <Link href="/tips" className="nav-item">
              <span className="nav-icon">💡</span>
              <span className="nav-label">Tips</span>
            </Link>
          </nav>
        </div>
        <SWRegistration />
      </body>
    </html>
  );
}