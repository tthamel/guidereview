import { useState } from 'react';
import { S, PROGRESS_COLORS, PROGRESS_LABELS } from '../../styles/theme';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import ProgressPill from '../ui/ProgressPill';

export default function SessionReplayModal({ session, guide, onClose, onUpdateSession }) {
  const [editing, setEditing] = useState(false);
  const [notes, setNotes] = useState(session.notes || "");
  const [summary, setSummary] = useState(session.summary || "");
  const snap = session.snapshot;
  const isMobile = useMediaQuery("(max-width: 680px)");
  const handleSave = () => { onUpdateSession({ ...session, notes: notes.trim(), summary: summary.trim() }); setEditing(false); };

  const SectionSnapshot = ({ title, emoji, color, data }) => {
    if (!data) return null;
    const openW = (data.workingItems || []).filter((w) => !w.closed && w.text);
    const openP = (data.problemItems || []).filter((p) => !p.closed && p.text);
    const wins = (data.workingItems || []).flatMap((w) => (w.winsLosses || []).filter((wl) => wl.type === "win" && wl.text));
    const losses = (data.workingItems || []).flatMap((w) => (w.winsLosses || []).filter((wl) => wl.type === "loss" && wl.text));
    return (
      <div style={{ background: "#13131f", borderRadius: 10, border: "1px solid #2a2a3a", padding: 14, marginBottom: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#d4d4dc", fontFamily: "'Space Grotesk', sans-serif", display: "flex", alignItems: "center", gap: 6 }}><span style={{ color, fontSize: 11 }}>{emoji}</span> {title}</div>
          <ProgressPill value={data.progress} editable={false} />
        </div>
        {data.goal && <div style={{ fontSize: 11, color: "#7a7a8e", fontStyle: "italic", fontFamily: "'DM Sans', sans-serif", marginBottom: 8 }}>{data.goal}</div>}
        <div style={{ display: "flex", gap: 16, fontSize: 11, fontFamily: "'DM Sans', sans-serif" }}>
          {openW.length > 0 && <div><span style={{ color: "#6366f1", fontWeight: 700 }}>{openW.length}</span> <span style={{ color: "#5a5a6e" }}>working</span></div>}
          {openP.length > 0 && <div><span style={{ color: "#c25450", fontWeight: 700 }}>{openP.length}</span> <span style={{ color: "#5a5a6e" }}>problems</span></div>}
          {wins.length > 0 && <div><span style={{ color: "#4a9e6e", fontWeight: 700 }}>{wins.length}</span> <span style={{ color: "#5a5a6e" }}>wins</span></div>}
          {losses.length > 0 && <div><span style={{ color: "#c25450", fontWeight: 700 }}>{losses.length}</span> <span style={{ color: "#5a5a6e" }}>losses</span></div>}
        </div>
        {openW.length > 0 && (
          <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid #2a2a3a" }}>
            {openW.map((w) => (
              <div key={w.id} style={{ fontSize: 12, color: "#9a9ab0", fontFamily: "'DM Sans', sans-serif", padding: "2px 0", display: "flex", gap: 6, alignItems: "center" }}>
                <span style={{ color: "#6366f1", fontSize: 9 }}>{"\u25C6"}</span> {w.text} {w.progress && <span style={{ color: PROGRESS_COLORS[w.progress], fontSize: 10, fontWeight: 600 }}>({PROGRESS_LABELS[w.progress]})</span>}
              </div>
            ))}
          </div>
        )}
        {openP.length > 0 && (
          <div style={{ marginTop: 6 }}>
            {openP.map((p) => (
              <div key={p.id} style={{ fontSize: 12, color: "#9a9ab0", fontFamily: "'DM Sans', sans-serif", padding: "2px 0", display: "flex", gap: 6, alignItems: "center" }}>
                <span style={{ color: "#c25450", fontSize: 9 }}>!</span> {p.text}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "#000000aa", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }} onClick={onClose}>
      <div style={{ background: "#1a1a2e", borderRadius: 20, border: "1px solid #2a2a3a", padding: 32, width: 680, maxWidth: "92vw", maxHeight: "85vh", display: "flex", flexDirection: "column" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 16 }}>
          <div>
            <h3 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 800, color: "#e4e4ec", fontFamily: "'Space Grotesk', sans-serif" }}>Session {"\u2014"} {new Date(session.date + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</h3>
            <div style={{ fontSize: 12, color: "#5a5a6e", fontFamily: "'DM Sans', sans-serif" }}>with {guide.name} {"\u00B7"} Led by {session.createdBy}</div>
          </div>
          {onUpdateSession && !editing && <button onClick={() => setEditing(true)} style={{ ...S.addBtn("#818cf8"), padding: "6px 14px" }}>Edit Notes</button>}
        </div>

        <div style={{ flex: 1, overflowY: "auto" }}>
          {/* Notes & Summary */}
          <div style={{ ...S.card, marginBottom: 12, padding: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16 }}>
              <div>
                <div style={{ ...S.label, marginBottom: 6 }}>Session Notes</div>
                {editing ? (
                  <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} style={{ ...S.inputBase, padding: "10px 12px", borderRadius: 8 }} onFocus={(e) => e.target.style.borderColor = "#6366f1"} onBlur={(e) => e.target.style.borderColor = "#3a3a50"} />
                ) : (
                  <div style={{ fontSize: 13, color: notes ? "#d4d4dc" : "#5a5a6e", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{notes || "No notes recorded."}</div>
                )}
              </div>
              <div>
                <div style={{ ...S.label, marginBottom: 6 }}>Summary</div>
                {editing ? (
                  <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={4} style={{ ...S.inputBase, padding: "10px 12px", borderRadius: 8 }} onFocus={(e) => e.target.style.borderColor = "#6366f1"} onBlur={(e) => e.target.style.borderColor = "#3a3a50"} />
                ) : (
                  <div style={{ fontSize: 13, color: summary ? "#d4d4dc" : "#5a5a6e", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{summary || "No summary."}</div>
                )}
              </div>
            </div>
            {editing && (
              <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 12 }}>
                <button onClick={() => { setNotes(session.notes || ""); setSummary(session.summary || ""); setEditing(false); }} style={{ padding: "6px 16px", borderRadius: 8, border: "1.5px solid #3a3a50", background: "transparent", color: "#9a9ab0", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Cancel</button>
                <button onClick={handleSave} style={{ padding: "6px 16px", borderRadius: 8, border: "none", background: "linear-gradient(135deg, #6366f1, #818cf8)", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Save</button>
              </div>
            )}
          </div>

          {/* Snapshot */}
          {snap ? (
            <div>
              <div style={{ ...S.label, marginBottom: 10, color: "#818cf8" }}>Snapshot at Time of Session</div>
              {/* Coaching Points */}
              {(snap.coachingPoints || []).length > 0 && (
                <div style={{ background: "#13131f", borderRadius: 10, border: "1px solid #2a2a3a", padding: 14, marginBottom: 8 }}>
                  <div style={{ ...S.label, fontSize: 10, marginBottom: 8, color: "#6366f1" }}>Coaching Points</div>
                  {snap.coachingPoints.filter((cp) => cp.goal).map((cp) => (
                    <div key={cp.id} style={{ display: "flex", gap: 8, alignItems: "center", padding: "4px 0" }}>
                      <ProgressPill value={cp.progress} editable={false} />
                      <span style={{ fontSize: 12, color: "#d4d4dc", fontFamily: "'DM Sans', sans-serif" }}>{cp.goal}</span>
                      <span style={{ fontSize: 10, color: "#5a5a6e", fontFamily: "'DM Sans', sans-serif", marginLeft: "auto" }}>{(cp.tasks || []).filter((t) => t.done).length}/{(cp.tasks || []).length} tasks</span>
                    </div>
                  ))}
                </div>
              )}
              {/* 3Cs */}
              <SectionSnapshot title="Love School" emoji={"\u25C6"} color="#6366f1" data={snap.threeCs?.loveSchool} />
              <SectionSnapshot title="Learn 2x" emoji={"\u25C7"} color="#818cf8" data={snap.threeCs?.learn2x} />
              <SectionSnapshot title="Life Skills" emoji={"\u25CB"} color="#a78bfa" data={snap.threeCs?.lifeSkills} />
              {/* Feedback */}
              {(snap.feedback || []).filter((f) => f.topic).length > 0 && (
                <div style={{ background: "#13131f", borderRadius: 10, border: "1px solid #2a2a3a", padding: 14, marginBottom: 8 }}>
                  <div style={{ ...S.label, fontSize: 10, marginBottom: 8, color: "#c29a3c" }}>Feedback to Lead</div>
                  {snap.feedback.filter((f) => f.topic).map((f) => (
                    <div key={f.id} style={{ fontSize: 12, color: "#9a9ab0", fontFamily: "'DM Sans', sans-serif", padding: "3px 0", display: "flex", gap: 6, alignItems: "center" }}>
                      <span style={{ color: "#c29a3c", fontSize: 9 }}>{"\u25C8"}</span> {f.topic}
                      <span style={{ color: "#5a5a6e", fontSize: 10, marginLeft: "auto" }}>{(f.entries || []).filter((e) => e.text).length} entries</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div style={{ background: "#13131f", borderRadius: 10, border: "1px solid #2a2a3a", padding: 20, textAlign: "center" }}>
              <div style={{ fontSize: 13, color: "#5a5a6e", fontFamily: "'DM Sans', sans-serif" }}>No snapshot was captured for this session.</div>
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 16 }}>
          <button onClick={onClose} style={{ padding: "10px 24px", borderRadius: 10, border: "1.5px solid #3a3a50", background: "transparent", color: "#9a9ab0", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Close</button>
        </div>
      </div>
    </div>
  );
}
