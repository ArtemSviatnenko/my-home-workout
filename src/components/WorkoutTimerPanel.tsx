import type { WorkoutSessionState, Phase } from "../hooks/useWorkoutSession";

interface Exercise {
  name: string;
  sets: string;
  reps: string;
  weight: string;
}

interface Props {
  state: WorkoutSessionState;
  exercise: Exercise | null;
  nextExercise: Exercise | null;
  workoutColor: string;
  onPrev: () => void;
  onSkip: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  exerciseDuration: number;
  restDuration: number;
  bufferDuration: number;
}

function phaseColor(phase: Phase, workoutColor: string): string {
  switch (phase) {
    case "buffer":   return "#666";
    case "exercise": return workoutColor;
    case "rest":     return "#f59e0b";
    case "complete": return "#10b981";
    default:         return "#666";
  }
}

function phaseLabel(phase: Phase): string {
  switch (phase) {
    case "buffer":   return "GET READY";
    case "exercise": return "EXERCISE";
    case "rest":     return "REST";
    case "complete": return "DONE";
    default:         return "";
  }
}

function phaseDuration(phase: Phase, exerciseDuration: number, restDuration: number, bufferDuration: number): number {
  switch (phase) {
    case "buffer":   return bufferDuration;
    case "exercise": return exerciseDuration;
    case "rest":     return restDuration;
    default:         return 1;
  }
}

function formatTime(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

const RADIUS = 72;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const iconBtn: React.CSSProperties = {
  width: 44, height: 44, borderRadius: "50%",
  border: "1px solid #eaeaea", background: "#fff",
  display: "flex", alignItems: "center", justifyContent: "center",
  cursor: "pointer", flexShrink: 0,
};

const stopBtn: React.CSSProperties = {
  width: 36, height: 36, borderRadius: "50%",
  border: "1px solid #fecaca", background: "#fff",
  display: "flex", alignItems: "center", justifyContent: "center",
  cursor: "pointer", flexShrink: 0,
};

function IconPrev() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <polygon points="13,2 5,8 13,14" fill="#444" />
      <rect x="2" y="2" width="2.5" height="12" rx="1" fill="#444" />
    </svg>
  );
}

function IconNext() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <polygon points="3,2 11,8 3,14" fill="#444" />
      <rect x="11.5" y="2" width="2.5" height="12" rx="1" fill="#444" />
    </svg>
  );
}

function IconPause({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="2" y="1" width="3.5" height="12" rx="1" fill={color} />
      <rect x="8.5" y="1" width="3.5" height="12" rx="1" fill={color} />
    </svg>
  );
}

function IconPlay({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <polygon points="3,1 13,7 3,13" fill={color} />
    </svg>
  );
}

function IconStop() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <rect x="1" y="1" width="10" height="10" rx="2" fill="#dc2626" />
    </svg>
  );
}

export default function WorkoutTimerPanel({ state, exercise, nextExercise, workoutColor, onPrev, onSkip, onPause, onResume, onStop, exerciseDuration, restDuration, bufferDuration }: Props) {
  const { phase, timeRemaining, exerciseIndex, setIndex, paused } = state;
  const color = phaseColor(phase, workoutColor);
  const total = phaseDuration(phase, exerciseDuration, restDuration, bufferDuration);
  const progress = phase === "complete" ? 1 : timeRemaining / total;
  const dashOffset = CIRCUMFERENCE * (1 - progress);
  const isComplete = phase === "complete";

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 100,
      background: "#fff",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "24px 20px",
    }}>
    <div className="timer-panel" style={{ borderColor: color, width: "100%", maxWidth: 480 }}>

      {/* Progress */}
      {!isComplete && (
        <div style={{ fontSize: 12, color: "#999", marginBottom: 6 }}>
          Exercise {exerciseIndex + 1} of 6 · Set {setIndex + 1} of 3
        </div>
      )}

      {/* Phase label */}
      <div className="phase-label" style={{ color, marginBottom: 4 }}>
        {phaseLabel(phase)}
      </div>

      {/* Exercise name */}
      {exercise && !isComplete && (
        <div style={{ fontSize: 22, fontWeight: 700, color: "#0a0a0a", marginBottom: 14 }}>
          {exercise.name}
        </div>
      )}

      {isComplete && (
        <div style={{ fontSize: 22, fontWeight: 700, color: "#10b981", margin: "12px 0 20px" }}>
          Workout Complete!
        </div>
      )}

      {/* Info chips — above the ring */}
      {exercise && !isComplete && (
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 18, flexWrap: "wrap" }}>
          {[
            { label: "Sets",   value: exercise.sets   },
            { label: "Reps",   value: exercise.reps   },
            { label: "Weight", value: exercise.weight },
          ].map(chip => (
            <div key={chip.label} style={{
              background: "#f7f7f7", border: "1px solid #eaeaea",
              borderRadius: 6, padding: "3px 10px", fontSize: 12, color: "#444",
            }}>
              <span style={{ color: "#999", marginRight: 4 }}>{chip.label}</span>
              <strong>{chip.value}</strong>
            </div>
          ))}
        </div>
      )}

      {/* Ring row: ◀  ring  ▶ */}
      {!isComplete && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 16 }}>

          {/* Prev */}
          <button onClick={onPrev} style={iconBtn} title="Previous set">
            <IconPrev />
          </button>

          {/* SVG Ring */}
          <div
            style={{ position: "relative", width: 170, height: 170, opacity: paused ? 0.45 : 1, transition: "opacity 0.2s", cursor: "pointer" }}
            onClick={paused ? onResume : onPause}
            title={paused ? "Resume" : "Pause"}
          >
            <svg width="170" height="170" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="85" cy="85" r={RADIUS} fill="none" stroke="#eaeaea" strokeWidth="10" />
              <circle
                cx="85" cy="85" r={RADIUS}
                fill="none"
                stroke={color}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={dashOffset}
                style={{ transition: paused ? "none" : "stroke-dashoffset 0.9s linear, stroke 0.3s" }}
              />
            </svg>
            {/* Countdown + pause icon overlay */}
            <div style={{
              position: "absolute", inset: 0, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: 4,
            }}>
              <div style={{ fontSize: 32, fontWeight: 700, fontFamily: "monospace", color: "#0a0a0a", lineHeight: 1 }}>
                {formatTime(timeRemaining)}
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                {paused ? <IconPlay color="#bbb" /> : <IconPause color="#bbb" />}
              </div>
            </div>
          </div>

          {/* Skip */}
          <button onClick={onSkip} style={iconBtn} title="Skip">
            <IconNext />
          </button>
        </div>
      )}

      {/* Next exercise — shown during rest */}
      {phase === "rest" && nextExercise && (
        <div style={{
          margin: "0 0 14px",
          padding: "10px 14px",
          background: "#f7f7f7",
          border: "1px solid #eaeaea",
          borderRadius: 8,
          textAlign: "left",
        }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#999", marginBottom: 4 }}>
            Up next
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#0a0a0a" }}>{nextExercise.name}</div>
          <div style={{ fontSize: 15, color: "#888", marginTop: 4 }}>
            {nextExercise.sets} sets · {nextExercise.reps} · {nextExercise.weight}
          </div>
        </div>
      )}

      {/* Stop button */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        {isComplete ? (
          <button
            onClick={onStop}
            style={{
              padding: "8px 24px", borderRadius: 6, border: "1px solid #0070f3",
              background: "#fff", color: "#0070f3", fontSize: 13, fontWeight: 500, cursor: "pointer",
            }}
          >
            Back to Plan
          </button>
        ) : (
          <button onClick={onStop} style={stopBtn} title="Stop workout">
            <IconStop />
          </button>
        )}
      </div>

    </div>
    </div>
  );
}
