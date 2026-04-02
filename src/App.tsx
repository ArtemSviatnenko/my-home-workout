import { useState } from "react";

const workouts = {
  A: {
    title: "Workout A — Pull + Biceps + Core",
    color: "#0070f3",
    exercises: [
      { name: "Pull-ups (or negatives)", sets: "3", reps: "max / 5–8", weight: "bodyweight", tip: "Can't do a pull-up yet? Do negatives: jump to the bar and slowly lower yourself over 5 seconds." },
      { name: "Australian pull-ups (rows)", sets: "3", reps: "10–12", weight: "bodyweight", tip: "Under the bar — keep body straight, pull chest up to the bar." },
      { name: "Single-arm dumbbell row", sets: "3", reps: "10–12 each arm", weight: "8–12 kg", tip: "Back parallel to the floor, drive elbow up along your body." },
      { name: "Dumbbell bicep curls", sets: "3", reps: "10–12", weight: "8–10 kg", tip: "Lower slowly — the descent matters more than the lift." },
      { name: "Hanging knee/leg raises", sets: "3", reps: "8–12", weight: "bodyweight", tip: "If straight legs are too hard, raise bent knees instead." },
      { name: "Plank", sets: "3", reps: "30–45 sec", weight: "—", tip: "Keep hips level — don't let them sag or rise." },
    ],
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
    ],
  },
};

const schedule = [
  { week: "1–2", intensity: "Easy", note: "Get used to the movements — don't rush the reps or weight." },
  { week: "3–4", intensity: "Moderate", note: "Add reps or weight where it feels easy." },
  { week: "5–6", intensity: "Moderate+", note: "You should feel your muscles the next day." },
  { week: "7–8", intensity: "Normal", note: "Assess whether you're ready to move to 3×/week." },
];

const badge: Record<string, { bg: string; color: string }> = {
  Easy:      { bg: "#dcfce7", color: "#15803d" },
  Moderate:  { bg: "#fef9c3", color: "#a16207" },
  "Moderate+": { bg: "#ffedd5", color: "#c2410c" },
  Normal:    { bg: "#dbeafe", color: "#1d4ed8" },
};

// Shared style tokens
const card: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #eaeaea",
  borderRadius: 8,
  marginBottom: 8,
};

export default function App() {
  const [tab, setTab] = useState("A");
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div style={{
      maxWidth: 560,
      width: "100%",
      margin: "0 auto",
      padding: "32px 20px 64px",
      textAlign: "left",
    }}>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.3px", color: "#000" }}>
          🏋️ Workout Plan — Months 1–2
        </h2>
        <p style={{ fontSize: 13, color: "#666", marginTop: 6, lineHeight: 1.6 }}>
          Alternate A and B with a rest day in between.<br />
          Example: Mon → A, Thu → B
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
        {[
          { id: "A", label: "Workout A" },
          { id: "B", label: "Workout B" },
          { id: "sched", label: "📅 Progression" },
        ].map(t => {
          const active = tab === t.id;
          const activeColor = t.id === "A" ? "#0070f3" : t.id === "B" ? "#10b981" : "#7c3aed";
          return (
            <button
              key={t.id}
              onClick={() => { setTab(t.id); setExpanded(null); }}
              style={{
                flex: 1,
                padding: "8px 0",
                borderRadius: 6,
                border: active ? `1px solid ${activeColor}` : "1px solid #eaeaea",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 500,
                background: active ? activeColor : "#fff",
                color: active ? "#fff" : "#444",
                transition: "all 0.15s",
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Workout A / B */}
      {(tab === "A" || tab === "B") && (() => {
        const w = workouts[tab];
        return (
          <div>
            {/* Section label */}
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#999", marginBottom: 10 }}>
              {w.title}
            </p>

            {w.exercises.map((ex, i) => {
              const key = `${tab}-${i}`;
              const open = expanded === key;
              return (
                <div
                  key={i}
                  onClick={() => setExpanded(open ? null : key)}
                  style={{ ...card, cursor: "pointer" }}
                >
                  <div style={{ display: "flex", alignItems: "center", padding: "12px 16px", gap: 12 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 500, color: "#0a0a0a" }}>{ex.name}</div>
                      <div style={{ fontSize: 12, color: "#888", marginTop: 3 }}>
                        {ex.sets} sets · {ex.reps} · {ex.weight}
                      </div>
                    </div>
                    <span style={{
                      fontSize: 11,
                      color: "#999",
                      transform: open ? "rotate(180deg)" : "rotate(0deg)",
                      display: "inline-block",
                      transition: "transform 0.2s",
                      flexShrink: 0,
                    }}>▼</span>
                  </div>

                  {open && (
                    <div style={{
                      borderTop: "1px solid #eaeaea",
                      padding: "12px 16px",
                      fontSize: 13,
                      color: "#444",
                      lineHeight: 1.6,
                      background: "#fafafa",
                      borderRadius: "0 0 8px 8px",
                    }}>
                      💡 {ex.tip}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Rest info */}
            <div style={{
              marginTop: 4,
              padding: "10px 16px",
              background: "#fffbeb",
              border: "1px solid #fde68a",
              borderRadius: 8,
              fontSize: 13,
              color: "#92400e",
              display: "flex",
              gap: 20,
            }}>
              <span>⏱ Rest: <strong>60–90 sec</strong></span>
              <span>🕐 Duration: <strong>35–45 min</strong></span>
            </div>
          </div>
        );
      })()}

      {/* Progression tab */}
      {tab === "sched" && (
        <div>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#999", marginBottom: 10 }}>
            Weekly Progression
          </p>

          {schedule.map((s, i) => (
            <div key={i} style={{ ...card, padding: "12px 16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: "#0a0a0a" }}>Week {s.week}</span>
                <span style={{
                  fontSize: 11,
                  fontWeight: 500,
                  background: badge[s.intensity]?.bg ?? "#f3f4f6",
                  color: badge[s.intensity]?.color ?? "#374151",
                  borderRadius: 20,
                  padding: "2px 10px",
                }}>
                  {s.intensity}
                </span>
              </div>
              <div style={{ fontSize: 13, color: "#666", marginTop: 5 }}>{s.note}</div>
            </div>
          ))}

          <div style={{
            marginTop: 4,
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: 8,
            padding: "12px 16px",
            fontSize: 13,
            color: "#14532d",
            lineHeight: 1.6,
          }}>
            <strong>After 8 weeks:</strong><br />
            If recovery feels good and blood sugar is stable — move to 3×/week. We can then add a third workout or split into upper/lower body days.
          </div>

          <div style={{
            marginTop: 8,
            background: "#fff1f2",
            border: "1px solid #fecdd3",
            borderRadius: 8,
            padding: "12px 16px",
            fontSize: 13,
            color: "#881337",
            lineHeight: 1.6,
          }}>
            <strong>⚠️ Blood sugar note:</strong><br />
            Measure your levels before and after workouts for the first 2–3 weeks. If you notice sharp swings, consult your doctor about adjustments.
          </div>
        </div>
      )}
    </div>
  );
}
