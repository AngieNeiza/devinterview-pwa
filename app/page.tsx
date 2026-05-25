"use client";

import { useState, useCallback } from "react";

const allQuestions = [
  {
    category: "Algoritmos",
    q: "¿Cuál es la complejidad temporal de búsqueda binaria?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    correct: 1,
    explanation: "La búsqueda binaria divide el espacio a la mitad en cada paso, dando O(log n).",
  },
  {
    category: "Algoritmos",
    q: "¿Qué estructura de datos usa LIFO?",
    options: ["Cola (Queue)", "Árbol binario", "Pila (Stack)", "Lista enlazada"],
    correct: 2,
    explanation: "La pila (Stack) usa LIFO: último en entrar, primero en salir.",
  },
  {
    category: "Algoritmos",
    q: "¿Cuál algoritmo tiene complejidad promedio O(n log n)?",
    options: ["Bubble Sort", "Insertion Sort", "Selection Sort", "Merge Sort"],
    correct: 3,
    explanation: "Merge Sort divide el array recursivamente. Bubble, Insertion y Selection son O(n²).",
  },
  {
    category: "POO",
    q: "¿Cuál de estos NO es un pilar de la POO?",
    options: ["Encapsulamiento", "Herencia", "Compilación", "Polimorfismo"],
    correct: 2,
    explanation: "Los 4 pilares son: Encapsulamiento, Herencia, Polimorfismo y Abstracción.",
  },
  {
    category: "POO",
    q: "¿Qué significa herencia en POO?",
    options: [
      "Ocultar los datos internos",
      "Una clase recibe propiedades de otra clase",
      "Un objeto toma múltiples formas",
      "Separar interfaz de implementación",
    ],
    correct: 1,
    explanation: "La herencia permite que una clase hija reutilice el código de una clase padre.",
  },
  {
    category: "Web / Frontend",
    q: "¿Qué hook de React se usa para llamadas a una API?",
    options: ["useState", "useRef", "useEffect", "useContext"],
    correct: 2,
    explanation: "useEffect se ejecuta después del render y sirve para llamadas a APIs.",
  },
  {
    category: "Web / Frontend",
    q: "¿Cuál es la diferencia entre SSR y CSR?",
    options: [
      "SSR usa React y CSR usa Vue",
      "En SSR el HTML se genera en el servidor; en CSR en el navegador",
      "SSR es más rápido siempre",
      "CSR requiere un servidor dedicado",
    ],
    correct: 1,
    explanation: "SSR genera el HTML antes de enviarlo. CSR lo genera en el navegador con JavaScript.",
  },
  {
    category: "Bases de datos",
    q: "¿Qué significa ACID en bases de datos?",
    options: [
      "Atomicidad, Consistencia, Aislamiento, Durabilidad",
      "Acceso, Control, Integración, Distribución",
      "Automatización, Concurrencia, Indexación, Datos",
      "Autenticación, Caché, Índice, Disponibilidad",
    ],
    correct: 0,
    explanation: "ACID: Atomicidad (todo o nada), Consistencia, Aislamiento y Durabilidad.",
  },
  {
    category: "DevOps",
    q: "¿Qué es Docker?",
    options: [
      "Un sistema operativo para servidores",
      "Un lenguaje de programación",
      "Una plataforma para ejecutar apps en contenedores",
      "Un servicio de base de datos",
    ],
    correct: 2,
    explanation: "Docker empaqueta una app con sus dependencias en un contenedor para que funcione igual en cualquier ambiente.",
  },
  {
    category: "DevOps",
    q: "¿Qué es CI/CD?",
    options: [
      "Un lenguaje de configuración",
      "Integración y Entrega Continua: automatiza pruebas y despliegues",
      "Un protocolo de comunicación",
      "Un tipo de base de datos",
    ],
    correct: 1,
    explanation: "CI/CD automatiza pruebas (CI) y despliegue (CD) cada vez que hay cambios en el código.",
  },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

type Screen = "start" | "quiz" | "result";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("start");
  const [questions, setQuestions] = useState(allQuestions);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [revealed, setRevealed] = useState(false);

  const startQuiz = useCallback((count: number) => {
    const q = shuffle(allQuestions).slice(0, count);
    setQuestions(q);
    setAnswers(new Array(count).fill(null));
    setCurrent(0);
    setSelected(null);
    setRevealed(false);
    setScreen("quiz");
  }, []);

  const confirm = () => {
    if (selected === null) return;
    const newAnswers = [...answers];
    newAnswers[current] = selected;
    setAnswers(newAnswers);
    setRevealed(true);
  };

  const next = () => {
    if (current + 1 >= questions.length) {
      setScreen("result");
    } else {
      setCurrent(current + 1);
      setSelected(null);
      setRevealed(false);
    }
  };

  const score = answers.filter((a, i) => a === questions[i]?.correct).length;
  const pct = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
  const grade =
    pct >= 90 ? { label: "Excelente 🔥", color: "#00ff87" }
    : pct >= 75 ? { label: "Muy bien 💪", color: "#00d4ff" }
    : pct >= 60 ? { label: "Bien 👍", color: "#eab308" }
    : pct >= 40 ? { label: "Sigue practicando 📚", color: "#f97316" }
    : { label: "Hay que repasar 😅", color: "#ef4444" };

  const q = questions[current];

  return (
    <main style={{ padding: "1.5rem 1rem 6rem", maxWidth: 640, margin: "0 auto" }}>

      {/* PANTALLA DE INICIO */}
      {screen === "start" && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", paddingTop: "2rem" }}>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", color: "#475569", border: "1px solid #1e293b", padding: "0.3rem 0.75rem", borderRadius: 100, marginBottom: "1.5rem" }}>
            SIMULADOR DE ENTREVISTAS
          </p>
          <h1 style={{ fontSize: "2.2rem", fontWeight: 700, color: "#f1f5f9", lineHeight: 1.1, marginBottom: "1rem" }}>
            ¿Listo para practicar?
          </h1>
          <p style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: 1.6, maxWidth: 360, marginBottom: "2rem" }}>
            Elige cuántas preguntas quieres responder. Al final recibirás tu calificación.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem", width: "100%", marginBottom: "1.5rem" }}>
            {[{ label: "Rápido", count: 5, desc: "~3 min", icon: "⚡" },
              { label: "Normal", count: 7, desc: "~5 min", icon: "🎯" },
              { label: "Completo", count: 10, desc: "~7 min", icon: "🏆" }].map(m => (
              <button key={m.count} onClick={() => startQuiz(m.count)} style={{
                background: "#0f172a", border: "1px solid #1e293b", borderRadius: 14,
                padding: "1.25rem 0.5rem", display: "flex", flexDirection: "column",
                alignItems: "center", gap: "0.25rem", cursor: "pointer"
              }}>
                <span style={{ fontSize: "1.5rem" }}>{m.icon}</span>
                <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#e2e8f0" }}>{m.label}</span>
                <span style={{ fontSize: "0.75rem", color: "#00ff87" }}>{m.count} preguntas</span>
                <span style={{ fontSize: "0.7rem", color: "#475569" }}>{m.desc}</span>
              </button>
            ))}
          </div>
          <p style={{ fontSize: "0.7rem", color: "#334155" }}>Banco: {allQuestions.length} preguntas · Selección aleatoria</p>
        </div>
      )}

      {/* PANTALLA DE QUIZ */}
      {screen === "quiz" && q && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {/* Progreso */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ flex: 1, height: 4, background: "#1e293b", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ width: `${(current / questions.length) * 100}%`, height: "100%", background: "#00ff87", transition: "width 0.4s" }} />
            </div>
            <span style={{ fontSize: "0.7rem", color: "#475569" }}>{current + 1}/{questions.length}</span>
          </div>

          <p style={{ fontSize: "0.65rem", letterSpacing: "0.15em", color: "#00ff87" }}>{q.category}</p>
          <p style={{ fontSize: "1rem", lineHeight: 1.6, color: "#e2e8f0", fontWeight: 500 }}>{q.q}</p>

          {/* Opciones */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {q.options.map((opt, i) => {
              let bg = "#0f172a", border = "#1e293b", color = "#cbd5e1";
              if (revealed) {
                if (i === q.correct) { bg = "#022c1a"; border = "#00ff87"; color = "#00ff87"; }
                else if (i === selected) { bg = "#2c0a0a"; border = "#ef4444"; color = "#ef4444"; }
              } else if (i === selected) {
                bg = "#1e1b4b"; border = "#6366f1"; color = "#e2e8f0";
              }
              return (
                <button key={i} onClick={() => !revealed && setSelected(i)} disabled={revealed} style={{
                  display: "flex", alignItems: "center", gap: "0.75rem",
                  background: bg, border: `1px solid ${border}`, borderRadius: 12,
                  padding: "0.875rem 1rem", cursor: revealed ? "default" : "pointer", textAlign: "left"
                }}>
                  <span style={{ width: 24, height: 24, borderRadius: 6, background: "#1e293b", color: "#64748b", fontSize: "0.7rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {["A","B","C","D"][i]}
                  </span>
                  <span style={{ flex: 1, fontSize: "0.875rem", color, lineHeight: 1.4 }}>{opt}</span>
                  {revealed && i === q.correct && <span style={{ fontSize: "0.65rem", color: "#00ff87", fontWeight: 700 }}>✓</span>}
                  {revealed && i === selected && selected !== q.correct && <span style={{ fontSize: "0.65rem", color: "#ef4444", fontWeight: 700 }}>✗</span>}
                </button>
              );
            })}
          </div>

          {/* Explicación */}
          {revealed && (
            <div style={{ background: "#0a1628", border: "1px solid #1e3a5f", borderRadius: 12, padding: "1rem" }}>
              <p style={{ fontSize: "0.65rem", color: "#00d4ff", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>💡 EXPLICACIÓN</p>
              <p style={{ fontSize: "0.82rem", color: "#94a3b8", lineHeight: 1.6 }}>{q.explanation}</p>
            </div>
          )}

          {/* Botones */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            {!revealed ? (
              <button onClick={confirm} disabled={selected === null} style={{
                background: selected === null ? "#1e293b" : "#6366f1", border: "none",
                color: selected === null ? "#475569" : "#fff", padding: "0.75rem 1.5rem",
                borderRadius: 12, fontSize: "0.85rem", cursor: selected === null ? "not-allowed" : "pointer"
              }}>
                Confirmar respuesta
              </button>
            ) : (
              <button onClick={next} style={{
                background: "#00ff87", border: "none", color: "#000",
                padding: "0.75rem 1.5rem", borderRadius: 12, fontSize: "0.85rem", fontWeight: 700, cursor: "pointer"
              }}>
                {current + 1 >= questions.length ? "Ver resultados →" : "Siguiente →"}
              </button>
            )}
          </div>
        </div>
      )}

      {/* PANTALLA DE RESULTADOS */}
      {screen === "result" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", padding: "2rem 0" }}>
            <div style={{ width: 120, height: 120, borderRadius: "50%", border: `3px solid ${grade.color}`, boxShadow: `0 0 40px ${grade.color}40`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "1.75rem", fontWeight: 700, color: grade.color }}>{pct}%</span>
              <span style={{ fontSize: "0.75rem", color: "#64748b" }}>{score}/{questions.length}</span>
            </div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: grade.color }}>{grade.label}</h2>
          </div>

          {/* Resumen */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {questions.map((qq, i) => {
              const ok = answers[i] === qq.correct;
              return (
                <div key={i} style={{ display: "flex", gap: "0.75rem", background: "#0f172a", border: `1px solid ${ok ? "#022c1a" : "#2c0a0a"}`, borderRadius: 12, padding: "0.875rem" }}>
                  <span style={{ color: ok ? "#00ff87" : "#ef4444", fontWeight: 700, flexShrink: 0 }}>{ok ? "✓" : "✗"}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: "0.8rem", color: "#94a3b8", marginBottom: ok ? 0 : "0.3rem" }}>{qq.q}</p>
                    {!ok && (
                      <p style={{ fontSize: "0.75rem", color: "#475569" }}>
                        Tu respuesta: <span style={{ color: "#ef4444" }}>{answers[i] !== null ? qq.options[answers[i]!] : "Sin responder"}</span>
                        {" · "}Correcta: <span style={{ color: "#00ff87" }}>{qq.options[qq.correct]}</span>
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", justifyContent: "center", paddingTop: "0.5rem" }}>
            <button onClick={() => setScreen("start")} style={{
              background: "#0f172a", border: "1px solid #334155", color: "#94a3b8",
              padding: "0.875rem 2rem", borderRadius: 12, fontSize: "0.85rem", cursor: "pointer"
            }}>
              Volver a intentar
            </button>
          </div>
        </div>
      )}
    </main>
  );
}