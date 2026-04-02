import { schedule, badge } from "../data/schedule";

export default function ProgressionView() {
  return (
    <div>
      <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#999", marginBottom: 10 }}>
        Weekly Progression
      </p>

      {schedule.map((s, i) => (
        <div key={i} className="week-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: "#0a0a0a" }}>Week {s.week}</span>
            <span style={{
              fontSize: 11,
              fontWeight: 500,
              background: badge[s.intensity]?.bg ?? "#f3f4f6",
              color: badge[s.intensity]?.color ?? "#374151",
              borderRadius: 20,
              padding: "2px 10px",
            }}>
              {s.intensity}
            </span>
          </div>
          <div style={{ fontSize: 13, color: "#666", marginTop: 5 }}>{s.note}</div>
        </div>
      ))}

      <div style={{
        marginTop: 4,
        background: "#f0fdf4",
        border: "1px solid #bbf7d0",
        borderRadius: 8,
        padding: "12px 16px",
        fontSize: 13,
        color: "#14532d",
        lineHeight: 1.6,
      }}>
        <strong>After 8 weeks:</strong><br />
        If recovery feels good and blood sugar is stable — move to 3×/week. We can then add a third workout or split into upper/lower body days.
      </div>

      <div style={{
        marginTop: 8,
        background: "#fff1f2",
        border: "1px solid #fecdd3",
        borderRadius: 8,
        padding: "12px 16px",
        fontSize: 13,
        color: "#881337",
        lineHeight: 1.6,
      }}>
        <strong>⚠️ Blood sugar note:</strong><br />
        Measure your levels before and after workouts for the first 2–3 weeks. If you notice sharp swings, consult your doctor about adjustments.
      </div>
    </div>
  );
}
