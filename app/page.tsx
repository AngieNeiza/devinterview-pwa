"use client";

import { useState, useCallback } from "react";

const allQuestions = [
  {
    category: "Algoritmos",
    q: "¿Cuál es la complejidad temporal de búsqueda binaria?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    correct: 1,
    explanation: "La búsqueda binaria divide el espacio de búsqueda a la mitad en cada paso, dando O(log n).",
  },
  {
    category: "Algoritmos",
    q: "¿Qué estructura de datos usa LIFO (último en entrar, primero en salir)?",
    options: ["Cola (Queue)", "Árbol binario", "Pila (Stack)", "Lista enlazada"],
    correct: 2,
    explanation: "La pila (Stack) usa LIFO. La cola (Queue) usa FIFO (primero en entrar, primero en salir).",
  },
  {
    category: "Algoritmos",
    q: "¿Cuál algoritmo de ordenamiento tiene complejidad promedio O(n log n)?",
    options: ["Bubble Sort", "Insertion Sort", "Selection Sort", "Merge Sort"],
    correct: 3,
    explanation: "Merge Sort divide el array recursivamente y combina en O(n log n). Bubble, Insertion y Selection son O(n²).",
  },
  {
    category: "Estructuras de datos",
    q: "¿Qué es una tabla hash (HashMap)?",
    options: [
      "Una lista ordenada de elementos",
      "Una estructura que mapea claves a valores usando una función hash",
      "Un árbol donde cada nodo tiene dos hijos",
      "Una pila de datos ordenados",
    ],
    correct: 1,
    explanation: "Un HashMap usa una función hash para calcular un índice donde almacenar el valor, permitiendo acceso promedio O(1).",
  },
  {
    category: "Estructuras de datos",
    q: "En un árbol binario de búsqueda (BST), ¿dónde van los valores menores al nodo raíz?",
    options: ["A la derecha", "A la izquierda", "Arriba del nodo", "En cualquier lado"],
    correct: 1,
    explanation: "En un BST, los valores menores van a la izquierda y los mayores a la derecha. Esto permite búsqueda en O(log n).",
  },
  {
    category: "POO",
    q: "¿Cuál de estos NO es un pilar de la programación orientada a objetos?",
    options: ["Encapsulamiento", "Herencia", "Compilación", "Polimorfismo"],
    correct: 2,
    explanation: "Los 4 pilares son: Encapsulamiento, Herencia, Polimorfismo y Abstracción. La compilación es un proceso del lenguaje.",
  },
  {
    category: "POO",
    q: "¿Qué significa 'herencia' en POO?",
    options: [
      "Ocultar los datos internos de una clase",
      "Una clase puede recibir propiedades y métodos de otra clase",
      "Un objeto puede tomar múltiples formas",
      "Separar la interfaz de la implementación",
    ],
    correct: 1,
    explanation: "La herencia permite que una clase hija reutilice el código de una clase padre, extendiendo o sobrescribiendo su comportamiento.",
  },
  {
    category: "Web / Frontend",
    q: "¿Qué hook de React se usa para ejecutar efectos secundarios (como llamadas a una API)?",
    options: ["useState", "useRef", "useEffect", "useContext"],
    correct: 2,
    explanation: "useEffect se ejecuta después de que el componente se renderiza y sirve para llamadas a APIs, suscripciones o manipular el DOM.",
  },
  {
    category: "Web / Frontend",
    q: "¿Cuál es la diferencia principal entre SSR y CSR?",
    options: [
      "SSR usa React y CSR usa Vue",
      "En SSR el HTML se genera en el servidor; en CSR se genera en el navegador",
      "SSR es más rápido siempre",
      "CSR requiere un servidor dedicado",
    ],
    correct: 1,
    explanation: "SSR (Server Side Rendering) genera el HTML antes de enviarlo al cliente, mejorando SEO. CSR genera el HTML en el navegador con JavaScript.",
  },
  {
    category: "Web / Frontend",
    q: "¿Qué es CORS?",
    options: [
      "Un lenguaje de estilos para componentes",
      "Un protocolo de autenticación",
      "Una política del navegador que restringe peticiones HTTP entre dominios distintos",
      "Un tipo de base de datos",
    ],
    correct: 2,
    explanation: "CORS (Cross-Origin Resource Sharing) es una política de seguridad del navegador. Se resuelve configurando los headers adecuados en el servidor.",
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
    explanation: "ACID garantiza que las transacciones se procesen de forma confiable: Atomicidad (todo o nada), Consistencia, Aislamiento y Durabilidad.",
  },
  {
    category: "Bases de datos",
    q: "¿Cuándo preferirías una base de datos NoSQL sobre SQL?",
    options: [
      "Cuando necesitas relaciones complejas entre tablas",
      "Cuando los datos son muy estructurados y estables",
      "Cuando necesitas escalar horizontalmente con datos no estructurados",
      "Cuando la consistencia de datos es lo más importante",
    ],
    correct: 2,
    explanation: "NoSQL brilla con grandes volúmenes de datos no estructurados y escala horizontal. SQL es mejor para datos relacionales con consistencia estricta.",
  },
  {
    category: "DevOps",
    q: "¿Cuál es la diferencia entre 'git merge' y 'git rebase'?",
    options: [
      "Son exactamente iguales",
      "Merge crea un nuevo commit de fusión; rebase reescribe el historial linealmente",
      "Rebase solo funciona en ramas remotas",
      "Merge elimina la rama origen automáticamente",
    ],
    correct: 1,
    explanation: "Merge preserva el historial con un commit de fusión. Rebase reescribe los commits para que parezca un historial lineal, más limpio pero altera el historial.",
  },
  {
    category: "DevOps",
    q: "¿Qué es Docker?",
    options: [
      "Un sistema operativo para servidores",
      "Un lenguaje de programación para infraestructura",
      "Una plataforma para crear, desplegar y ejecutar aplicaciones en contenedores",
      "Un servicio de base de datos en la nube",
    ],
    correct: 2,
    explanation: "Docker empaqueta una app con todas sus dependencias en un contenedor, garantizando que funcione igual en cualquier ambiente.",
  },
  {
    category: "DevOps",
    q: "¿Qué es CI/CD?",
    options: [
      "Un lenguaje de configuración para servidores",
      "Integración Continua y Entrega/Despliegue Continuo: automatiza pruebas y despliegues",
      "Un protocolo de comunicación entre microservicios",
      "Un tipo de base de datos distribuida",
    ],
    correct: 1,
    explanation: "CI/CD automatiza el proceso de pruebas (CI) y despliegue (CD) cada vez que hay cambios en el código, reduciendo errores y acelerando entregas.",
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
  const pct = Math.round((score / questions.length) * 100);

  const grade = pct >= 90 ? { label: "Excelente 🔥", color: "#00ff87" }
    : pct >= 75 ? { label: "Muy bien 💪", color: "#00d4ff" }
    : pct >= 60 ? { label: "Bien 👍", color: "#eab308" }
    : pct >= 40 ? { label: "Sigue practicando 📚", color: "#f97316" }
    : { label: "Hay que repasar 😅", color: "#ef4444" };

  const q = questions[current];

  return (
    <main style={{ padding: "1.5rem 1rem 6rem", maxWidth: 640, margin: "0 auto" }}>

      {/* ── START ── */}
      {screen === "start" && (
        <div className="start-screen">
          <div className="start-badge">SIMULADOR DE ENTREVISTAS</div>
          <h1 className="start-title">¿Listo para<br />practicar?</h1>
          <p className="start-sub">Elige cuántas preguntas de opción múltiple quieres responder. Al final recibirás tu calificación.</p>
          <div className="mode-grid">
            {[
              { label: "Rápido", count: 5, desc: "~3 min", icon: "⚡" },
              { label: "Normal", count: 10, desc: "~6 min", icon: "🎯" },
              { label: "Completo", count: 15, desc: "~10 min", icon: "🏆" },
            ].map(m => (
              <button key={m.count} className="mode-card" onClick={() => startQuiz(m.count)}>
                <span className="mode-icon">{m.icon}</span>
                <span className="mode-label">{m.label}</span>
                <span className="mode-count">{m.count} preguntas</span>
                <span className="mode-desc">{m.desc}</span>
              </button>
            ))}
          </div>
          <p className="start-total">Banco total: {allQuestions.length} preguntas · Selección aleatoria</p>
        </div>
      )}

      {/* ── QUIZ ── */}
      {screen === "quiz" && q && (
        <div className="quiz-screen">
          {/* Progress */}
          <div className="progress-bar-wrap">
            <div className="progress-bar-track">
              <div className="progress-bar-fill" style={{ width: `${((current) / questions.length) * 100}%` }} />
            </div>
            <span className="progress-text">{current + 1} / {questions.length}</span>
          </div>

          {/* Category */}
          <div className="q-category">{q.category}</div>

          {/* Question */}
          <p className="q-text">{q.q}</p>

          {/* Options */}
          <div className="options-list">
            {q.options.map((opt, i) => {
              let state = "idle";
              if (revealed) {
                if (i === q.correct) state = "correct";
                else if (i === selected && selected !== q.correct) state = "wrong";
              } else if (i === selected) {
                state = "selected";
              }
              return (
                <button
                  key={i}
                  className={`option-btn option-${state}`}
                  onClick={() => !revealed && setSelected(i)}
                  disabled={revealed}
                >
                  <span className="option-letter">{["A", "B", "C", "D"][i]}</span>
                  <span className="option-text">{opt}</span>
                  {revealed && i === q.correct && <span className="option-tag correct-tag">✓ Correcto</span>}
                  {revealed && i === selected && selected !== q.correct && <span className="option-tag wrong-tag">✗ Incorrecto</span>}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {revealed && (
            <div className="explanation">
              <span className="exp-label">💡 Explicación</span>
              <p className="exp-text">{q.explanation}</p>
            </div>
          )}

          {/* Actions */}
          <div className="quiz-actions">
            {!revealed ? (
              <button className="btn-confirm" onClick={confirm} disabled={selected === null}>
                Confirmar respuesta
              </button>
            ) : (
              <button className="btn-next" onClick={next}>
                {current + 1 >= questions.length ? "Ver resultados →" : "Siguiente →"}
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── RESULT ── */}
      {screen === "result" && (
        <div className="result-screen">
          <div className="result-header">
            <div className="score-circle" style={{ borderColor: grade.color, boxShadow: `0 0 40px ${grade.color}40` }}>
              <span className="score-pct" style={{ color: grade.color }}>{pct}%</span>
              <span className="score-fraction">{score}/{questions.length}</span>
            </div>
            <h2 className="grade-label" style={{ color: grade.color }}>{grade.label}</h2>
          </div>

          {/* Per-question summary */}
          <div className="summary-list">
            {questions.map((qq, i) => {
              const correct = answers[i] === qq.correct;
              return (
                <div key={i} className={`summary-item ${correct ? "sum-correct" : "sum-wrong"}`}>
                  <span className="sum-icon">{correct ? "✓" : "✗"}</span>
                  <div className="sum-content">
                    <p className="sum-q">{qq.q}</p>
                    {!correct && (
                      <p className="sum-answer">
                        Tu respuesta: <span className="wrong-ans">{answers[i] !== null ? qq.options[answers[i]!] : "Sin responder"}</span>
                        {" · "}Correcta: <span className="correct-ans">{qq.options[qq.correct]}</span>
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="result-actions">
            <button className="btn-restart" onClick={() => setScreen("start")}>
              Volver a intentar
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        /* START */
        .start-screen { display: flex; flex-direction: column; align-items: center; text-align: center; padding-top: 2rem; }
        .start-badge { font-size: 0.65rem; letter-spacing: 0.2em; color: #475569; border: 1px solid #1e293b; padding: 0.3rem 0.75rem; border-radius: 100px; margin-bottom: 1.5rem; }
        .start-title { font-size: 2.5rem; font-weight: 700; color: #f1f5f9; line-height: 1.1; margin-bottom: 1rem; }
        .start-sub { font-size: 0.85rem; color: #64748b; line-height: 1.6; max-width: 380px; margin-bottom: 2rem; }
        .mode-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; width: 100%; margin-bottom: 1.5rem; }
        .mode-card { background: #0f172a; border: 1px solid #1e293b; border-radius: 14px; padding: 1.25rem 0.75rem; display: flex; flex-direction: column; align-items: center; gap: 0.25rem; cursor: pointer; transition: all 0.2s; }
        .mode-card:hover { border-color: #00ff87; background: #0a1628; }
        .mode-icon { font-size: 1.5rem; margin-bottom: 0.25rem; }
        .mode-label { font-size: 0.85rem; font-weight: 700; color: #e2e8f0; }
        .mode-count { font-size: 0.75rem; color: #00ff87; }
        .mode-desc { font-size: 0.7rem; color: #475569; }
        .start-total { font-size: 0.7rem; color: #334155; }

        /* QUIZ */
        .quiz-screen { display: flex; flex-direction: column; gap: 1.25rem; }
        .progress-bar-wrap { display: flex; align-items: center; gap: 0.75rem; }
        .progress-bar-track { flex: 1; height: 4px; background: #1e293b; border-radius: 2px; overflow: hidden; }
        .progress-bar-fill { height: 100%; background: #00ff87; border-radius: 2px; transition: width 0.4s ease; }
        .progress-text { font-size: 0.7rem; color: #475569; white-space: nowrap; }
        .q-category { font-size: 0.65rem; letter-spacing: 0.15em; color: #00ff87; }
        .q-text { font-size: 1.05rem; line-height: 1.6; color: #e2e8f0; font-weight: 500; }
        .options-list { display: flex; flex-direction: column; gap: 0.6rem; }
        .option-btn { display: flex; align-items: center; gap: 0.75rem; background: #0f172a; border: 1px solid #1e293b; border-radius: 12px; padding: 0.875rem 1rem; cursor: pointer; text-align: left; transition: all 0.15s; }
        .option-btn:not(:disabled):hover { border-color: #334155; background: #0a1628; }
        .option-letter { width: 24px; height: 24px; border-radius: 6px; background: #1e293b; color: #64748b; font-size: 0.7rem; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .option-text { flex: 1; font-size: 0.875rem; color: #cbd5e1; line-height: 1.4; }
        .option-tag { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.05em; flex-shrink: 0; }
        .correct-tag { color: #00ff87; }
        .wrong-tag { color: #ef4444; }
        .option-selected { border-color: #6366f1; background: #1e1b4b; }
        .option-selected .option-letter { background: #6366f1; color: #fff; }
        .option-correct { border-color: #00ff87; background: #022c1a; }
        .option-correct .option-letter { background: #00ff87; color: #000; }
        .option-wrong { border-color: #ef4444; background: #2c0a0a; }
        .option-wrong .option-letter { background: #ef4444; color: #fff; }
        .explanation { background: #0a1628; border: 1px solid #1e3a5f; border-radius: 12px; padding: 1rem; }
        .exp-label { font-size: 0.7rem; color: #00d4ff; letter-spacing: 0.1em; display: block; margin-bottom: 0.5rem; }
        .exp-text { font-size: 0.82rem; color: #94a3b8; line-height: 1.6; }
        .quiz-actions { display: flex; justify-content: flex-end; }
        .btn-confirm { background: #1e293b; border: 1px solid #334155; color: #94a3b8; padding: 0.75rem 1.5rem; border-radius: 12px; font-size: 0.85rem; cursor: pointer; transition: all 0.2s; }
        .btn-confirm:not(:disabled):hover { border-color: #6366f1; color: #e2e8f0; }
        .btn-confirm:disabled { opacity: 0.4; cursor: not-allowed; }
        .btn-next { background: #00ff87; color: #000; border: none; padding: 0.75rem 1.5rem; border-radius: 12px; font-size: 0.85rem; font-weight: 700; cursor: pointer; transition: opacity 0.2s; }
        .btn-next:hover { opacity: 0.9; }

        /* RESULT */
        .result-screen { display: flex; flex-direction: column; gap: 1.5rem; }
        .result-header { display: flex; flex-direction: column; align-items: center; gap: 1rem; padding: 1.5rem 0; }
        .score-circle { width: 120px; height: 120px; border-radius: 50%; border: 3px solid; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .score-pct { font-size: 1.75rem; font-weight: 700; }
        .score-fraction { font-size: 0.75rem; color: #64748b; }
        .grade-label { font-size: 1.25rem; font-weight: 700; }
        .summary-list { display: flex; flex-direction: column; gap: 0.6rem; }
        .summary-item { display: flex; gap: 0.75rem; background: #0f172a; border: 1px solid #1e293b; border-radius: 12px; padding: 0.875rem; }
        .sum-correct { border-color: #022c1a; }
        .sum-wrong { border-color: #2c0a0a; }
        .sum-icon { font-size: 0.85rem; font-weight: 700; flex-shrink: 0; margin-top: 0.1rem; }
        .sum-correct .sum-icon { color: #00ff87; }
        .sum-wrong .sum-icon { color: #ef4444; }
        .sum-content { flex: 1; min-width: 0; }
        .sum-q { font-size: 0.8rem; color: #94a3b8; line-height: 1.4; margin-bottom: 0.3rem; }
        .sum-answer { font-size: 0.75rem; color: #475569; }
        .wrong-ans { color: #ef4444; }
        .correct-ans { color: #00ff87; }
        .result-actions { display: flex; justify-content: center; padding-top: 0.5rem; }
        .btn-restart { background: #0f172a; border: 1px solid #334155; color: #94a3b8; padding: 0.875rem 2rem; border-radius: 12px; font-size: 0.85rem; cursor: pointer; transition: all 0.2s; }
        .btn-restart:hover { border-color: #00ff87; color: #00ff87; }
      `}</style>
    </main>
  );
}