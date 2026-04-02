export interface ScheduleWeek {
  week: string;
  intensity: string;
  note: string;
}

export const schedule: ScheduleWeek[] = [
  { week: "1–2", intensity: "Easy",      note: "Get used to the movements — don't rush the reps or weight." },
  { week: "3–4", intensity: "Moderate",  note: "Add reps or weight where it feels easy." },
  { week: "5–6", intensity: "Moderate+", note: "You should feel your muscles the next day." },
  { week: "7–8", intensity: "Normal",    note: "Assess whether you're ready to move to 3×/week." },
];

export const badge: Record<string, { bg: string; color: string }> = {
  Easy:        { bg: "#dcfce7", color: "#15803d" },
  Moderate:    { bg: "#fef9c3", color: "#a16207" },
  "Moderate+": { bg: "#ffedd5", color: "#c2410c" },
  Normal:      { bg: "#dbeafe", color: "#1d4ed8" },
};
