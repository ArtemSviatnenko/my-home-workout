import { useState, useEffect } from "react";
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
  const [minimized, setMinimized] = useState(false);

  // Re-expand when phase auto-advances
  useEffect(() => { setMinimized(false); }, [session.phase]);

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

      {/* Start Workout button */}
      {(tab === "A" || tab === "B") && session.phase === "idle" && (
        <button
          onClick={() => startWorkout(tab as "A" | "B")}
          style={{
            width: "100%",
            padding: "12px 0",
            borderRadius: 8,
            border: "none",
            background: "#10b981",
            color: "#fff",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            letterSpacing: "0.02em",
            marginBottom: 20,
          }}
        >
          Start Workout
        </button>
      )}

      {/* Views */}
      {(tab === "A" || tab === "B") && (
        <WorkoutView
          workoutKey={tab}
          workout={workouts[tab]}
          session={session}
          minimized={minimized}
          onPrev={prev}
          onSkip={skip}
          onPause={pause}
          onResume={resume}
          onStop={abort}
          onMinimize={() => setMinimized(true)}
        />
      )}
      {tab === "sched" && <ProgressionView />}

      {/* Continue pill — shown when timer is minimized, persists across tabs */}
      {session.phase !== "idle" && minimized && (
        <button
          onClick={() => { setMinimized(false); resume(); }}
          style={{
            position: "fixed", bottom: 32, left: "50%", transform: "translateX(-50%)",
            zIndex: 100, padding: "14px 32px", borderRadius: 50,
            background: session.phase === "rest" ? "#f59e0b" : workouts[session.workoutKey]?.color ?? "#10b981",
            color: "#fff", border: "none",
            fontSize: 16, fontWeight: 600, cursor: "pointer",
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            letterSpacing: "0.02em", whiteSpace: "nowrap",
          }}
        >
          Continue
        </button>
      )}

    </div>
  );
}
