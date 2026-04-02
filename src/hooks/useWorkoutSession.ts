import { useReducer, useEffect, useRef } from "react";
import { useWorkoutAudio } from "./useWorkoutAudio";
import { BUFFER_DURATION, EXERCISE_DURATION, REST_DURATION, SETS_PER_EXERCISE, TOTAL_EXERCISES } from "../constants/timer";

export type Phase = "idle" | "buffer" | "exercise" | "rest" | "complete";

export interface WorkoutSessionState {
  phase: Phase;
  workoutKey: "A" | "B";
  exerciseIndex: number;
  setIndex: number;
  timeRemaining: number;
  paused: boolean;
}

type Action =
  | { type: "START"; workoutKey: "A" | "B" }
  | { type: "TICK" }
  | { type: "PHASE_COMPLETE" }
  | { type: "SKIP" }
  | { type: "PREV" }
  | { type: "PAUSE" }
  | { type: "RESUME" }
  | { type: "ABORT" };

const INITIAL_STATE: WorkoutSessionState = {
  phase: "idle",
  workoutKey: "A",
  exerciseIndex: 0,
  setIndex: 0,
  timeRemaining: 0,
  paused: false,
};

function advance(state: WorkoutSessionState): WorkoutSessionState {
  const { exerciseIndex, setIndex } = state;
  const moreSetsSameEx = setIndex + 1 < SETS_PER_EXERCISE;
  const moreExercises = exerciseIndex + 1 < TOTAL_EXERCISES;

  if (state.phase === "buffer") {
    return { ...state, phase: "exercise", timeRemaining: EXERCISE_DURATION };
  }
  if (state.phase === "exercise") {
    if (moreSetsSameEx) {
      return { ...state, phase: "rest", timeRemaining: REST_DURATION, setIndex: setIndex + 1 };
    } else if (moreExercises) {
      return { ...state, phase: "rest", timeRemaining: REST_DURATION, setIndex: 0, exerciseIndex: exerciseIndex + 1 };
    } else {
      return { ...state, phase: "complete", timeRemaining: 0 };
    }
  }
  if (state.phase === "rest") {
    return { ...state, phase: "exercise", timeRemaining: EXERCISE_DURATION };
  }
  return state;
}

function reducer(state: WorkoutSessionState, action: Action): WorkoutSessionState {
  switch (action.type) {
    case "START":
      return { phase: "buffer", workoutKey: action.workoutKey, exerciseIndex: 0, setIndex: 0, timeRemaining: BUFFER_DURATION, paused: false };
    case "TICK":
      if (state.paused) return state;
      if (state.timeRemaining <= 1) return advance(state);
      return { ...state, timeRemaining: state.timeRemaining - 1 };
    case "PHASE_COMPLETE":
    case "SKIP":
      return { ...advance(state), paused: false };
    case "PREV": {
      // If not the first set of first exercise, go back one set (or one exercise)
      const { exerciseIndex, setIndex } = state;
      if (setIndex > 0) {
        return { ...state, phase: "exercise", setIndex: setIndex - 1, timeRemaining: EXERCISE_DURATION, paused: false };
      } else if (exerciseIndex > 0) {
        return { ...state, phase: "exercise", exerciseIndex: exerciseIndex - 1, setIndex: SETS_PER_EXERCISE - 1, timeRemaining: EXERCISE_DURATION, paused: false };
      }
      // Already at first set of first exercise — restart the buffer
      return { ...state, phase: "buffer", exerciseIndex: 0, setIndex: 0, timeRemaining: BUFFER_DURATION, paused: false };
    }
    case "PAUSE":
      return { ...state, paused: true };
    case "RESUME":
      return { ...state, paused: false };
    case "ABORT":
      return INITIAL_STATE;
    default:
      return state;
  }
}

export function useWorkoutSession() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const audio = useWorkoutAudio();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prevPhaseRef = useRef<Phase>("idle");

  // Tick interval
  useEffect(() => {
    const active = state.phase !== "idle" && state.phase !== "complete";
    if (active) {
      intervalRef.current = setInterval(() => dispatch({ type: "TICK" }), 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [state.phase]);

  // Phase-change audio
  useEffect(() => {
    if (state.phase === prevPhaseRef.current) return;
    prevPhaseRef.current = state.phase;
    switch (state.phase) {
      case "buffer":   audio.playWorkoutStart(); break;
      case "exercise": audio.playExerciseStart(); break;
      case "rest":     audio.playRestStart(); break;
      case "complete": audio.playComplete(); break;
    }
  }, [state.phase]);

  // Mid-rest audio cues
  useEffect(() => {
    if (state.phase !== "rest") return;
    if (state.timeRemaining === 30) audio.playHalfwayBeep();
    if (state.timeRemaining <= 3 && state.timeRemaining > 0) audio.playCountdownBeep();
  }, [state.timeRemaining, state.phase]);

  function startWorkout(workoutKey: "A" | "B") {
    dispatch({ type: "START", workoutKey });
  }
  function skip()   { dispatch({ type: "SKIP" }); }
  function prev()   { dispatch({ type: "PREV" }); }
  function pause()  { dispatch({ type: "PAUSE" }); }
  function resume() { dispatch({ type: "RESUME" }); }
  function abort()  { dispatch({ type: "ABORT" }); }

  return { state, startWorkout, skip, prev, pause, resume, abort };
}
