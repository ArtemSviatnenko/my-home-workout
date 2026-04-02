import { useState } from "react";
import { useWorkoutSession } from "./hooks/useWorkoutSession";
import { workouts } from "./data/workouts";
import WorkoutView from "./components/WorkoutView";
import ProgressionView from "./components/ProgressionView";

const TABS = [
  { id: "A",     label: "Workout A",     color: "#0070f3" },
  { id: "B",     label: "Workout B",     color: "#10b981" },
  { id: "sched", label: "📅 Progression", color: "#7c3aed" },
];

export default function App() {
  const [tab, setTab] = useState("A");
  const { state: session, startWorkout, prev, skip, pause, resume, abort } = useWorkoutSession();

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
        {TABS.map(t => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                flex: 1,
                padding: "8px 0",
                borderRadius: 6,
                border: active ? `1px solid ${t.color}` : "1px solid #eaeaea",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 500,
                background: active ? t.color : "#fff",
                color: active ? "#fff" : "#444",
                transition: "all 0.15s",
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Views */}
      {(tab === "A" || tab === "B") && (
        <WorkoutView
          workoutKey={tab}
          workout={workouts[tab]}
          session={session}
          onStart={startWorkout}
          onPrev={prev}
          onSkip={skip}
          onPause={pause}
          onResume={resume}
          onStop={abort}
        />
      )}
      {tab === "sched" && <ProgressionView />}

    </div>
  );
}
