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
  workoutColor: string;
  onSkip: () => void;
  onAbort: () => void;
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

const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function WorkoutTimerPanel({ state, exercise, workoutColor, onSkip, onAbort, exerciseDuration, restDuration, bufferDuration }: Props) {
  const { phase, timeRemaining, exerciseIndex, setIndex } = state;
  const color = phaseColor(phase, workoutColor);
  const total = phaseDuration(phase, exerciseDuration, restDuration, bufferDuration);
  const progress = phase === "complete" ? 1 : timeRemaining / total;
  const dashOffset = CIRCUMFERENCE * (1 - progress);

  const isComplete = phase === "complete";

  return (
    <div className="timer-panel" style={{ borderColor: color }}>
      {/* Progress */}
      {!isComplete && (
        <div style={{ fontSize: 12, color: "#999", marginBottom: 12 }}>
          Exercise {exerciseIndex + 1} of 6 · Set {setIndex + 1} of 3
        </div>
      )}

      {/* Phase label */}
      <div className="phase-label" style={{ color }}>
        {phaseLabel(phase)}
      </div>

      {/* Exercise name */}
      {exercise && !isComplete && (
        <div style={{ fontSize: 17, fontWeight: 600, color: "#0a0a0a", marginBottom: 20 }}>
          {exercise.name}
        </div>
      )}

      {isComplete && (
        <div style={{ fontSize: 22, fontWeight: 700, color: "#10b981", marginBottom: 20 }}>
          Workout Complete!
        </div>
      )}

      {/* SVG Ring */}
      {!isComplete && (
        <div style={{ position: "relative", width: 140, height: 140, margin: "0 auto 20px" }}>
          <svg width="140" height="140" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="70" cy="70" r={RADIUS} fill="none" stroke="#eaeaea" strokeWidth="8" />
            <circle
              cx="70" cy="70" r={RADIUS}
              fill="none"
              stroke={color}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
              style={{ transition: "stroke-dashoffset 0.9s linear, stroke 0.3s" }}
            />
          </svg>
          <div style={{
            position: "absolute", inset: 0, display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 32, fontWeight: 700,
            fontFamily: "monospace", color: "#0a0a0a",
          }}>
            {formatTime(timeRemaining)}
          </div>
        </div>
      )}

      {/* Exercise chips */}
      {exercise && !isComplete && (
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 24, flexWrap: "wrap" }}>
          {[
            { label: "Sets", value: exercise.sets },
            { label: "Reps", value: exercise.reps },
            { label: "Weight", value: exercise.weight },
          ].map(chip => (
            <div key={chip.label} style={{
              background: "#f7f7f7", border: "1px solid #eaeaea",
              borderRadius: 6, padding: "4px 12px", fontSize: 12, color: "#444",
            }}>
              <span style={{ color: "#999", marginRight: 4 }}>{chip.label}</span>
              <strong>{chip.value}</strong>
            </div>
          ))}
        </div>
      )}

      {/* Buttons */}
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        {!isComplete && (
          <button
            onClick={onSkip}
            style={{
              padding: "8px 20px", borderRadius: 6, border: "1px solid #eaeaea",
              background: "#fff", color: "#444", fontSize: 13, fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Skip →
          </button>
        )}
        <button
          onClick={onAbort}
          style={{
            padding: "8px 20px", borderRadius: 6, border: "none",
            background: "none", color: isComplete ? "#0070f3" : "#dc2626",
            fontSize: 13, fontWeight: 500, cursor: "pointer",
          }}
        >
          {isComplete ? "Back to Plan" : "Stop Workout"}
        </button>
      </div>
    </div>
  );
}
