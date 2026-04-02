export interface Exercise {
  name: string;
  sets: string;
  reps: string;
  weight: string;
  tip: string;
}

export interface Workout {
  title: string;
  color: string;
  exercises: Exercise[];
}

export const workouts: Record<"A" | "B", Workout> = {
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
