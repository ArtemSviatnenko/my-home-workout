import type { Exercise } from "../data/workouts";

interface Props {
  exercise: Exercise;
  id: string;
  expanded: string | null;
  onToggle: (id: string) => void;
}

export default function ExerciseCard({ exercise: ex, id, expanded, onToggle }: Props) {
  const open = expanded === id;
  return (
    <div onClick={() => onToggle(id)} className="exercise-card">
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
          background: "#f0f0f0",
          borderRadius: "0 0 8px 8px",
        }}>
          💡 {ex.tip}
        </div>
      )}
    </div>
  );
}
