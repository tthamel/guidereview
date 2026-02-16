import { useState } from 'react';
import { S } from '../../styles/theme';
import NewSessionModal from './NewSessionModal';
import SessionReplayModal from './SessionReplayModal';

export default function SessionsBar({ sessions, guide, role, userName, onAddSession, onUpdateSession }) {
  const [showNew, setShowNew] = useState(false);
  const [replayIdx, setReplayIdx] = useState(null);
  const sorted = [...(sessions || [])].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div style={{ ...S.card, marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: sorted.length > 0 ? 12 : 0 }}>
        <div style={{ ...S.label, marginBottom: 0, color: "#818cf8" }}>Meeting Sessions</div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontSize: 11, color: "#5a5a6e", fontFamily: "'DM Sans', sans-serif" }}>{sorted.length} session{sorted.length !== 1 ? "s" : ""}</span>
          {role === "lead" && <button onClick={() => setShowNew(true)} style={S.addBtn("#4a9e6e")}>+ New Session</button>}
        </div>
      </div>
      {sorted.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: 8 }}>
          {sorted.map((s, idx) => (
            <button key={s.id} onClick={() => setReplayIdx(idx)} style={{ padding: "10px 14px", borderRadius: 10, border: "1.5px solid #2a2a3a", background: "#0d0d18", cursor: "pointer", textAlign: "left", transition: "all 0.15s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#818cf8"; e.currentTarget.style.background = "#13131f"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#2a2a3a"; e.currentTarget.style.background = "#0d0d18"; }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#d4d4dc", fontFamily: "'Space Grotesk', sans-serif", marginBottom: 4 }}>
                {new Date(s.date + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </div>
              {s.summary && <div style={{ fontSize: 11, color: "#7a7a8e", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{s.summary}</div>}
              <div style={{ fontSize: 10, color: "#5a5a6e", fontFamily: "'DM Sans', sans-serif", marginTop: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.createdBy} {s.snapshot ? "\u00B7 \u25C6" : ""}</div>
            </button>
          ))}
        </div>
      )}
      {showNew && <NewSessionModal guide={guide} userName={userName} onSave={onAddSession} onClose={() => setShowNew(false)} />}
      {replayIdx !== null && sorted[replayIdx] && (
        <SessionReplayModal session={sorted[replayIdx]} guide={guide} onClose={() => setReplayIdx(null)} onUpdateSession={role === "lead" ? onUpdateSession : null} />
      )}
    </div>
  );
}
