import { useState } from "react";
import type { WorkoutSessionState } from "../hooks/useWorkoutSession";
import type { Workout } from "../data/workouts";
import { BUFFER_DURATION, EXERCISE_DURATION, REST_DURATION } from "../constants/timer";
import ExerciseCard from "./ExerciseCard";
import WorkoutTimerPanel from "./WorkoutTimerPanel";

interface Props {
  workoutKey: "A" | "B";
  workout: Workout;
  session: WorkoutSessionState;
  onStart: (key: "A" | "B") => void;
  onPrev: () => void;
  onSkip: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
}

export default function WorkoutView({ workoutKey, workout, session, onStart, onPrev, onSkip, onPause, onResume, onStop }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const currentEx = session.phase !== "idle" ? workout.exercises[session.exerciseIndex] ?? null : null;
  const nextEx = session.phase === "rest" ? workout.exercises[session.exerciseIndex] ?? null : null;

  function handleToggle(id: string) {
    setExpanded(prev => (prev === id ? null : id));
  }

  return (
    <div>
      {session.phase !== "idle" && (
        <WorkoutTimerPanel
          state={session}
          exercise={currentEx}
          nextExercise={nextEx}
          workoutColor={workout.color}
          onPrev={onPrev}
          onSkip={onSkip}
          onPause={onPause}
          onResume={onResume}
          onStop={onStop}
          exerciseDuration={EXERCISE_DURATION}
          restDuration={REST_DURATION}
          bufferDuration={BUFFER_DURATION}
        />
      )}

      <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#999", marginBottom: 10 }}>
        {workout.title}
      </p>

      {workout.exercises.map((ex, i) => (
        <ExerciseCard
          key={i}
          exercise={ex}
          id={`${workoutKey}-${i}`}
          expanded={expanded}
          onToggle={handleToggle}
        />
      ))}

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

      {session.phase === "idle" && (
        <button
          onClick={() => onStart(workoutKey)}
          style={{
            marginTop: 12,
            width: "100%",
            padding: "12px 0",
            borderRadius: 8,
            border: "none",
            background: workout.color,
            color: "#fff",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            letterSpacing: "0.02em",
          }}
        >
          Start Workout
        </button>
      )}
    </div>
  );
}
