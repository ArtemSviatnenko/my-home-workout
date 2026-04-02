import { useState } from "react";

const workouts = {
  A: {
    title: "Workout A — Pull + Biceps + Core",
    color: "#3b82f6",
    exercises: [
      { name: "Pull-ups (or negatives)", sets: "3", reps: "max / 5–8", weight: "bodyweight", tip: "Can't do a pull-up yet? Do negatives: jump to the bar and slowly lower yourself over 5 seconds." },
      { name: "Australian pull-ups (rows)", sets: "3", reps: "10–12", weight: "bodyweight", tip: "Under the bar — keep body straight, pull chest up to the bar." },
      { name: "Single-arm dumbbell row", sets: "3", reps: "10–12 each arm", weight: "8–12 kg", tip: "Back parallel to the floor, drive elbow up along your body." },
      { name: "Dumbbell bicep curls", sets: "3", reps: "10–12", weight: "8–10 kg", tip: "Lower slowly — the descent matters more than the lift." },
      { name: "Hanging knee/leg raises", sets: "3", reps: "8–12", weight: "bodyweight", tip: "If straight legs are too hard, raise bent knees instead." },
      { name: "Plank", sets: "3", reps: "30–45 sec", weight: "—", tip: "Keep hips level — don't let them sag or rise." },
    ]
  },
  B: {
    title: "Workout B — Push + Triceps + Legs",
    color: "#10b981",
    exercises: [
      { name: "Push-ups", sets: "3", reps: "max (at least 5)", weight: "bodyweight", tip: "Too hard? Do them from your knees. Goal is full range of motion." },
      { name: "Dumbbell floor press", sets: "3", reps: "10–12", weight: "8–12 kg", tip: "Lie on the floor, lower dumbbells until elbows touch the floor." },
      { name: "Dumbbell chest fly", sets: "3", reps: "10–12", weight: "5–8 kg", tip: "Lighter weight, wide arc — feel the stretch across your chest." },
      { name: "Lying tricep extension", sets: "3", reps: "10–12", weight: "5–8 kg", tip: "Lying down, lower dumbbells toward your ears by bending only the elbows." },
      { name: "Goblet squat with dumbbell", sets: "3", reps: "12–15", weight: "8–12 kg", tip: "Hold dumbbell at chest, knees tracking over toes." },
      { name: "Romanian deadlift with dumbbells", sets: "3", reps: "10–12", weight: "10–12 kg", tip: "Keep back straight, lower dumbbells along your legs, feel the hamstring stretch." },
    ]
  }
};

const schedule = [
  { week: "1–2", freq: "2×/week", intensity: "Easy", note: "Get used to the movements — don't rush the reps or weight." },
  { week: "3–4", freq: "2×/week", intensity: "Moderate", note: "Add reps or weight where it feels easy." },
  { week: "5–6", freq: "2×/week", intensity: "Moderate+", note: "You should feel your muscles the next day." },
  { week: "7–8", freq: "2×/week", intensity: "Normal", note: "Assess whether you're ready to move to 3×/week." },
];

export default function App() {
  const [tab, setTab] = useState("A");
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 600, width: "100%", margin: "0 auto", padding: 16, color: "#1f2937", textAlign: "left", boxSizing: "border-box", fontSize: 16, lineHeight: "normal", letterSpacing: "normal" }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>🏋️ Workout Plan — Months 1–2</h2>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 16 }}>Alternate A and B with a rest day in between. Example: Mon → A, Thu → B</p>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {["A", "B", "📅"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            flex: 1, padding: "10px 0", borderRadius: 10, border: "none", cursor: "pointer",
            background: tab === t ? (t === "A" ? "#3b82f6" : t === "B" ? "#10b981" : "#8b5cf6") : "#f3f4f6",
            color: tab === t ? "#fff" : "#374151", fontWeight: 600, fontSize: 14
          }}>
            {t === "📅" ? "📅 Progression" : `Workout ${t}`}
          </button>
        ))}
      </div>

      {(tab === "A" || tab === "B") && (() => {
        const w = workouts[tab];
        return (
          <div>
            <div style={{ background: w.color, color: "#fff", borderRadius: 10, padding: "10px 14px", marginBottom: 12, fontSize: 15, fontWeight: 600 }}>
              {w.title}
            </div>
            {w.exercises.map((ex, i) => (
              <div key={i} onClick={() => setExpanded(expanded === `${tab}-${i}` ? null : `${tab}-${i}`)}
                style={{ background: "#f9fafb", borderRadius: 10, padding: "12px 14px", marginBottom: 8, cursor: "pointer", border: "1px solid #e5e7eb" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{ex.name}</div>
                    <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>
                      {ex.sets} sets · {ex.reps} · {ex.weight}
                    </div>
                  </div>
                  <span style={{ color: "#9ca3af", fontSize: 18 }}>{expanded === `${tab}-${i}` ? "▲" : "▼"}</span>
                </div>
                {expanded === `${tab}-${i}` && (
                  <div style={{ marginTop: 10, fontSize: 13, color: "#374151", background: "#fff", borderRadius: 8, padding: "8px 10px", borderLeft: `3px solid ${w.color}` }}>
                    💡 {ex.tip}
                  </div>
                )}
              </div>
            ))}
            <div style={{ background: "#fef3c7", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#92400e", marginTop: 8 }}>
              ⏱ Rest between sets: <strong>60–90 sec</strong><br/>
              🕐 Total duration: <strong>35–45 min</strong>
            </div>
          </div>
        );
      })()}

      {tab === "📅" && (
        <div>
          <div style={{ background: "#8b5cf6", color: "#fff", borderRadius: 10, padding: "10px 14px", marginBottom: 12, fontSize: 15, fontWeight: 600 }}>
            📅 Weekly Progression
          </div>
          {schedule.map((s, i) => (
            <div key={i} style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 10, padding: "12px 14px", marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <span style={{ fontWeight: 700, fontSize: 14 }}>Week {s.week}</span>
                <span style={{ background: "#ede9fe", color: "#6d28d9", borderRadius: 20, padding: "2px 10px", fontSize: 12, fontWeight: 600 }}>{s.intensity}</span>
              </div>
              <div style={{ fontSize: 12, color: "#6b7280" }}>{s.note}</div>
            </div>
          ))}
          <div style={{ background: "#d1fae5", borderRadius: 10, padding: "12px 14px", fontSize: 13, color: "#065f46", marginTop: 8 }}>
            <strong>After 8 weeks:</strong><br/>
            If recovery feels good and blood sugar is stable — move to 3×/week. We can then add a third workout or split into upper/lower body days.
          </div>
          <div style={{ background: "#fee2e2", borderRadius: 10, padding: "12px 14px", fontSize: 13, color: "#991b1b", marginTop: 8 }}>
            <strong>⚠️ Blood sugar note:</strong><br/>
            Measure your levels before and after workouts for the first 2–3 weeks. If you notice sharp swings, consult your doctor about adjustments.
          </div>
        </div>
      )}
    </div>
  );
}
