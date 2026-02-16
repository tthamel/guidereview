import { useState } from 'react';
import { S } from '../../styles/theme';
import { genId, snapshotGuide } from '../../utils/helpers';

export default function NewSessionModal({ guide, userName, onSave, onClose }) {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [notes, setNotes] = useState("");
  const [summary, setSummary] = useState("");
  const handleCreate = () => {
    if (!date) return;
    const session = { id: genId(), date, notes: notes.trim(), summary: summary.trim(), createdBy: userName, createdAt: new Date().toISOString(), snapshot: snapshotGuide(guide) };
    onSave(session);
    onClose();
  };
  return (
    <div style={{ position: "fixed", inset: 0, background: "#000000aa", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }} onClick={onClose}>
      <div style={{ background: "#1a1a2e", borderRadius: 20, border: "1px solid #2a2a3a", padding: 32, width: 520, maxWidth: "90vw" }} onClick={(e) => e.stopPropagation()}>
        <h3 style={{ margin: "0 0 6px", fontSize: 20, fontWeight: 800, color: "#e4e4ec", fontFamily: "'Space Grotesk', sans-serif" }}>New Meeting Session</h3>
        <div style={{ fontSize: 13, color: "#7a7a8e", marginBottom: 20, fontFamily: "'DM Sans', sans-serif" }}>Record a 1:1 session with {guide.name}. A snapshot of current progress will be saved automatically.</div>
        <div style={{ marginBottom: 16 }}>
          <div style={S.label}>Meeting Date</div>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ ...S.inputBase, padding: "10px 14px", borderRadius: 10, width: 200 }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <div style={S.label}>Session Notes</div>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} placeholder="What was discussed? Key observations, decisions made..." style={{ ...S.inputBase, padding: "12px 14px", borderRadius: 10 }} onFocus={(e) => e.target.style.borderColor = "#6366f1"} onBlur={(e) => e.target.style.borderColor = "#3a3a50"} />
        </div>
        <div style={{ marginBottom: 20 }}>
          <div style={S.label}>Summary</div>
          <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={2} placeholder="Brief takeaway for quick reference..." style={{ ...S.inputBase, padding: "12px 14px", borderRadius: 10 }} onFocus={(e) => e.target.style.borderColor = "#6366f1"} onBlur={(e) => e.target.style.borderColor = "#3a3a50"} />
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ padding: "10px 24px", borderRadius: 10, border: "1.5px solid #3a3a50", background: "transparent", color: "#9a9ab0", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Cancel</button>
          <button onClick={handleCreate} style={{ padding: "10px 24px", borderRadius: 10, border: "none", background: date ? "linear-gradient(135deg, #6366f1, #818cf8)" : "#3a3a4a", color: date ? "#fff" : "#7a7a8e", fontSize: 14, fontWeight: 700, cursor: date ? "pointer" : "default", fontFamily: "'DM Sans', sans-serif" }}>Create Session</button>
        </div>
      </div>
    </div>
  );
}
