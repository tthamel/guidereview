import { S } from '../../styles/theme';
import { fmtDate } from '../../utils/helpers';

export default function ChangelogView({ changelog }) {
  if (!changelog.length) return <div style={{ textAlign: "center", padding: 48, color: "#5a5a6e", fontFamily: "'DM Sans', sans-serif" }}>No changes recorded yet.</div>;
  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: "#e4e4ec", fontFamily: "'Space Grotesk', sans-serif", marginBottom: 20 }}>Change History</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {changelog.slice().reverse().map((entry, idx) => (
          <div key={idx} style={{ ...S.card, marginBottom: 0, padding: "14px 20px", display: "flex", alignItems: "center", gap: 16, borderRadius: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: entry.role === "guide" ? "#6366f118" : "#c29a3c18", color: entry.role === "guide" ? "#818cf8" : "#e4b44c", fontSize: 16, fontWeight: 700 }}>{entry.role === "guide" ? "\u25C6" : "\u25C8"}</div>
            <div style={{ flex: 1 }}><div style={{ fontSize: 14, color: "#d4d4dc", fontFamily: "'DM Sans', sans-serif" }}><span style={{ fontWeight: 700 }}>{entry.userName}</span><span style={{ color: "#7a7a8e" }}> updated </span><span style={{ fontWeight: 600 }}>{entry.guideName}</span><span style={{ color: "#7a7a8e" }}> {"\u2014"} {entry.description}</span></div></div>
            <div style={{ fontSize: 12, color: "#5a5a6e", fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap" }}>{fmtDate(entry.timestamp)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
