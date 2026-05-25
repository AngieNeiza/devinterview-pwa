"use client";

import { useState } from "react";

const tips = [
  { icon: "🧠", title: "Piensa en voz alta", body: "Los entrevistadores quieren ver tu proceso de razonamiento. Narra cada paso: 'Primero identifico los casos borde, luego pienso en la complejidad…'. Esto demuestra claridad mental y comunicación técnica.", tag: "Mentalidad" },
  { icon: "📐", title: "Usa el método STAR", body: "Situación → Tarea → Acción → Resultado. Estructura tus respuestas con ejemplos concretos. En vez de 'soy trabajador', di: 'En X proyecto tuve que refactorizar Y en 2 días, hice Z y logramos W'.", tag: "Comunicación" },
  { icon: "🔍", title: "Clarifica antes de codear", body: "Antes de escribir código haz preguntas: ¿Qué tamaño tiene el input? ¿Puede haber nulls? ¿Importa la complejidad? Esto demuestra madurez de ingeniero.", tag: "Algoritmos" },
  { icon: "🚀", title: "Empieza con brute force", body: "No intentes dar la solución óptima de entrada. Plantea primero una solución que funcione aunque sea O(n²) y luego optimiza. Muchos candidatos se bloquean buscando la solución perfecta.", tag: "Algoritmos" },
  { icon: "💬", title: "Sé honesto con lo que no sabes", body: "Si te preguntan algo que no sabes, sé directo: 'No tengo experiencia con eso, pero entiendo los conceptos base y aprendería rápido'. La honestidad vale más que inventar.", tag: "Actitud" },
  { icon: "⚡", title: "Aprende los patrones comunes", body: "La mayoría de problemas en entrevistas siguen patrones: Sliding Window, Two Pointers, BFS/DFS, Dynamic Programming, Binary Search. Dominarlos te ahorra tiempo en el momento.", tag: "Preparación" },
  { icon: "🤝", title: "Siempre haz preguntas al final", body: "Prepara 2-3 preguntas para el entrevistador: ¿Cómo es el code review? ¿Qué stack usan? ¿Cómo es el crecimiento técnico? Esto muestra interés genuino.", tag: "Estrategia" },
  { icon: "📝", title: "Cuida tu GitHub", body: "Agrega READMEs claros con descripción, capturas e instrucciones de instalación. Un GitHub descuidado puede hundir una candidatura; uno cuidado puede abrirte puertas.", tag: "Estrategia" },
];

const tags = ["Todos", ...Array.from(new Set(tips.map(t => t.tag)))];
const tagColors: Record<string, string> = {
  "Mentalidad": "#a855f7", "Comunicación": "#00d4ff", "Algoritmos": "#00ff87",
  "Actitud": "#f97316", "Preparación": "#eab308", "Estrategia": "#6366f1",
};

export default function TipsPage() {
  const [activeTag, setActiveTag] = useState("Todos");
  const [expanded, setExpanded] = useState<number | null>(null);
  const filtered = activeTag === "Todos" ? tips : tips.filter(t => t.tag === activeTag);

  return (
    <main style={{ padding: "1.5rem 1rem 6rem", maxWidth: 640, margin: "0 auto" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: "#475569" }}>GUÍA DE ENTREVISTAS</p>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#f1f5f9", margin: "0.25rem 0 0" }}>Tips para destacar</h1>
      </div>

      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
        {tags.map(tag => (
          <button key={tag} onClick={() => setActiveTag(tag)} style={{
            background: activeTag === tag && tag !== "Todos" ? `${tagColors[tag]}20` : "#0f172a",
            border: `1px solid ${activeTag === tag && tag !== "Todos" ? `${tagColors[tag]}60` : "#1e293b"}`,
            color: activeTag === tag ? (tag !== "Todos" ? tagColors[tag] : "#e2e8f0") : "#64748b",
            padding: "0.3rem 0.75rem", borderRadius: 100, fontSize: "0.75rem", cursor: "pointer"
          }}>{tag}</button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {filtered.map((tip, i) => {
          const color = tagColors[tip.tag] ?? "#64748b";
          const isOpen = expanded === i;
          return (
            <div key={i} onClick={() => setExpanded(isOpen ? null : i)} style={{
              background: "#0f172a", border: `1px solid ${isOpen ? `${color}40` : "#1e293b"}`,
              borderRadius: 14, padding: "1rem", cursor: "pointer"
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                <span style={{ fontSize: "1.25rem", flexShrink: 0 }}>{tip.icon}</span>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: "0.65rem", background: `${color}15`, color, padding: "0.15rem 0.5rem", borderRadius: 100, display: "inline-block", marginBottom: "0.3rem" }}>{tip.tag}</span>
                  <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "#e2e8f0", margin: 0 }}>{tip.title}</p>
                </div>
                <span style={{ color: "#475569", fontSize: "1.25rem", transition: "transform 0.2s", transform: isOpen ? "rotate(90deg)" : "none" }}>›</span>
              </div>
              {isOpen && (
                <p style={{ fontSize: "0.85rem", lineHeight: 1.65, color: "#94a3b8", marginTop: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid #1e293b" }}>
                  {tip.body}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}