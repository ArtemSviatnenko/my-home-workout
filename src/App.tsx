import { useState } from "react";

const workouts = {
  A: {
    title: "Workout A",
    subtitle: "Pull · Biceps · Core",
    color: "#2563eb",
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
    title: "Workout B",
    subtitle: "Push · Triceps · Legs",
    color: "#059669",
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
  { week: "1–2", intensity: "Easy", note: "Get used to the movements — don't rush the reps or weight." },
  { week: "3–4", intensity: "Moderate", note: "Add reps or weight where it feels easy." },
  { week: "5–6", intensity: "Moderate+", note: "You should feel your muscles the next day." },
  { week: "7–8", intensity: "Normal", note: "Assess whether you're ready to move to 3×/week." },
];

const intensityColor: Record<string, string> = {
  Easy: "#dcfce7",
  Moderate: "#fef9c3",
  "Moderate+": "#ffedd5",
  Normal: "#dbeafe",
};
const intensityText: Record<string, string> = {
  Easy: "#166534",
  Moderate: "#854d0e",
  "Moderate+": "#9a3412",
  Normal: "#1e40af",
};

export default function App() {
  const [tab, setTab] = useState("A");
  const [expanded, setExpanded] = useState<string | null>(null);

  const tabs = [
    { id: "A", label: "Workout A" },
    { id: "B", label: "Workout B" },
    { id: "sched", label: "Progression" },
  ];

  return (
    <div style={{
      maxWidth: 520,
      width: "100%",
      margin: "0 auto",
      padding: "24px 16px 48px",
      textAlign: "left",
    }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 6 }}>
          Months 1–2
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 600, color: "#111", letterSpacing: "-0.3px" }}>
          🏋️ Home Workout Plan
        </h2>
        <p style={{ fontSize: 13, color: "#9ca3af", marginTop: 4 }}>
          Alternate A and B · rest day in between · Mon → A, Thu → B
        </p>
      </div>

      {/* Tab bar */}
      <div style={{
        display: "flex",
        background: "#efefed",
        borderRadius: 10,
        padding: 3,
        marginBottom: 20,
        gap: 2,
      }}>
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => { setTab(t.id); setExpanded(null); }}
            style={{
              flex: 1,
              padding: "7px 0",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 500,
              transition: "all 0.15s ease",
              background: tab === t.id ? "#fff" : "transparent",
              color: tab === t.id ? "#111" : "#888",
              boxShadow: tab === t.id ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Workout tabs */}
      {(tab === "A" || tab === "B") && (() => {
        const w = workouts[tab];
        return (
          <div>
            {/* Workout header */}
            <div style={{
              borderLeft: `3px solid ${w.color}`,
              paddingLeft: 12,
              marginBottom: 16,
            }}>
              <div style={{ fontSize: 16, fontWeight: 600, color: "#111" }}>{w.title}</div>
              <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>{w.subtitle}</div>
            </div>

            {/* Exercise cards */}
            {w.exercises.map((ex, i) => {
              const key = `${tab}-${i}`;
              const isOpen = expanded === key;
              return (
                <div
                  key={i}
                  onClick={() => setExpanded(isOpen ? null : key)}
                  style={{
                    background: "#fff",
                    borderRadius: 10,
                    border: "1px solid #e8e6e3",
                    marginBottom: 6,
                    cursor: "pointer",
                    overflow: "hidden",
                    transition: "box-shadow 0.15s ease",
                    boxShadow: isOpen ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
                  }}
                >
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "11px 14px",
                    gap: 12,
                  }}>
                    {/* Color dot */}
                    <div style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: w.color,
                      flexShrink: 0,
                    }} />
                    {/* Text */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "#111", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {ex.name}
                      </div>
                      <div style={{ fontSize: 11, color: "#aaa", marginTop: 2 }}>
                        {ex.sets} sets · {ex.reps} · {ex.weight}
                      </div>
                    </div>
                    {/* Chevron */}
                    <span style={{
                      fontSize: 10,
                      color: "#ccc",
                      transition: "transform 0.2s ease",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      display: "inline-block",
                      flexShrink: 0,
                    }}>▼</span>
                  </div>

                  {isOpen && (
                    <div style={{
                      padding: "0 14px 12px 32px",
                      fontSize: 12,
                      color: "#555",
                      lineHeight: 1.6,
                      borderTop: `1px solid ${w.color}22`,
                      paddingTop: 10,
                    }}>
                      💡 {ex.tip}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Rest info */}
            <div style={{
              marginTop: 12,
              padding: "10px 14px",
              background: "#fffbeb",
              borderRadius: 8,
              fontSize: 12,
              color: "#78350f",
              display: "flex",
              gap: 16,
            }}>
              <span>⏱ Rest: <strong>60–90 sec</strong></span>
              <span>🕐 Duration: <strong>35–45 min</strong></span>
            </div>
          </div>
        );
      })()}

      {/* Schedule tab */}
      {tab === "sched" && (
        <div>
          <div style={{
            borderLeft: "3px solid #7c3aed",
            paddingLeft: 12,
            marginBottom: 16,
          }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#111" }}>Weekly Progression</div>
            <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>2× per week · 8 weeks</div>
          </div>

          {schedule.map((s, i) => (
            <div key={i} style={{
              background: "#fff",
              border: "1px solid #e8e6e3",
              borderRadius: 10,
              padding: "12px 14px",
              marginBottom: 6,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>Week {s.week}</span>
                <span style={{
                  fontSize: 11,
                  fontWeight: 500,
                  background: intensityColor[s.intensity] ?? "#f3f4f6",
                  color: intensityText[s.intensity] ?? "#374151",
                  borderRadius: 20,
                  padding: "2px 10px",
                }}>
                  {s.intensity}
                </span>
              </div>
              <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 4 }}>{s.note}</div>
            </div>
          ))}

          {/* After 8 weeks */}
          <div style={{
            marginTop: 10,
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: 10,
            padding: "12px 14px",
            fontSize: 12,
            color: "#14532d",
            lineHeight: 1.6,
          }}>
            <strong>After 8 weeks:</strong><br />
            If recovery feels good and blood sugar is stable — move to 3×/week. We can then add a third workout or split into upper/lower body days.
          </div>

          {/* Blood sugar note */}
          <div style={{
            marginTop: 8,
            background: "#fff1f2",
            border: "1px solid #fecdd3",
            borderRadius: 10,
            padding: "12px 14px",
            fontSize: 12,
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
