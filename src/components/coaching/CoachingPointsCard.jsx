import { useState } from 'react';
import { S, CP_STATUSES } from '../../styles/theme';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import ProgressPill from '../ui/ProgressPill';
import ActionPlanModal from './ActionPlanModal';

export default function CoachingPointsCard({ items, editable, onUpdate, onAdd, onRemove, role, onUpdateGrowth }) {
  const upd = (i, f, v) => { const n = [...items]; n[i] = { ...n[i], [f]: v }; onUpdate(n); };
  const isMobile = useMediaQuery("(max-width: 680px)");
  const fmtCycle = (start, end) => {
    if (!start && !end) return "";
    const s = start ? new Date(start + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "?";
    const e = end ? new Date(end + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "?";
    return `${s} \u2013 ${e}`;
  };
  const activeItems = items.filter((cp) => cp.status !== "completed");
  const completedItems = items.filter((cp) => cp.status === "completed");
  const showGrowth = !!onUpdateGrowth;
  const [actionPlanIdx, setActionPlanIdx] = useState(null);
  const isGuide = role === "guide";
  const isLead = role === "lead";
  const growthUpd = (i, f, v) => { if (!onUpdateGrowth) return; const n = JSON.parse(JSON.stringify(items)); n[i][f] = v; onUpdateGrowth(n); };
  const updateTasks = (i, tasks) => { if (!onUpdateGrowth) return; const n = JSON.parse(JSON.stringify(items)); n[i].tasks = tasks; onUpdateGrowth(n); };

  return (
    <div style={S.card}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div style={{ ...S.label, color: "#6366f1", marginBottom: 0 }}>Coaching Points</div>
        {editable && <button onClick={onAdd} style={S.addBtn("#6366f1")}>+ Add</button>}
      </div>
      {activeItems.length === 0 && completedItems.length === 0 && (
        <div style={{ fontSize: 13, color: "#5a5a6e", fontFamily: "'DM Sans', sans-serif", padding: "8px 0" }}>No coaching points yet.</div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {activeItems.map((cp) => { const idx = items.indexOf(cp); const doneCount = (cp.tasks || []).filter((t) => t.done).length; const totalTasks = (cp.tasks || []).length; return (
          <div key={cp.id} style={{ background: "#0d0d18", borderRadius: 10, border: "1px solid #2a2a3a", padding: 14 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "start", marginBottom: 8 }}>
              <div style={{ flex: 1 }}>
                {editable ? (
                  <input value={cp.goal} onChange={(e) => upd(idx, "goal", e.target.value)} placeholder="Goal description..." style={{ ...S.inputBase, padding: "5px 10px", fontSize: 13 }} onFocus={(e) => e.target.style.borderColor = "#6366f1"} onBlur={(e) => e.target.style.borderColor = "#3a3a50"} />
                ) : (
                  <div style={{ fontSize: 13, color: cp.goal ? "#d4d4dc" : "#5a5a6e", fontFamily: "'DM Sans', sans-serif" }}>{cp.goal || "\u2014"}</div>
                )}
              </div>
              {editable && items.length > 1 && <button onClick={() => onRemove(idx)} style={S.removeBtn}>{"\u00D7"}</button>}
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
              {editable ? (
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <input type="date" value={cp.cycleStart || ""} onChange={(e) => upd(idx, "cycleStart", e.target.value)} style={{ ...S.inputBase, padding: "3px 8px", fontSize: 11, width: 130 }} />
                  <span style={{ color: "#5a5a6e", fontSize: 11 }}>{"\u2013"}</span>
                  <input type="date" value={cp.cycleEnd || ""} onChange={(e) => upd(idx, "cycleEnd", e.target.value)} style={{ ...S.inputBase, padding: "3px 8px", fontSize: 11, width: 130 }} />
                </div>
              ) : (
                fmtCycle(cp.cycleStart, cp.cycleEnd) && <span style={{ fontSize: 11, color: "#7a7a8e", fontFamily: "'DM Sans', sans-serif" }}>{fmtCycle(cp.cycleStart, cp.cycleEnd)}</span>
              )}
              <div style={{ display: "flex", gap: 4, marginLeft: "auto" }}>
                {CP_STATUSES.map((st) => (
                  <button key={st.id} onClick={editable ? () => upd(idx, "status", st.id) : undefined} style={{
                    padding: "2px 10px", borderRadius: 6, fontSize: 10, fontWeight: 700,
                    fontFamily: "'DM Sans', sans-serif", letterSpacing: 0.5,
                    background: cp.status === st.id ? st.color + "22" : "transparent",
                    color: cp.status === st.id ? st.color : "#5a5a6e",
                    border: `1.5px solid ${cp.status === st.id ? st.color + "44" : "#2a2a3a"}`,
                    cursor: editable ? "pointer" : "default", transition: "all 0.15s ease",
                  }}>{st.label}</button>
                ))}
              </div>
            </div>
            {showGrowth && (
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #2a2a3a", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr auto 1fr", gap: isMobile ? 12 : 14, alignItems: "start" }}>
                <div>
                  <div style={S.label}>Action Plan</div>
                  <button onClick={() => setActionPlanIdx(idx)} style={{ padding: "6px 14px", borderRadius: 8, border: "1.5px solid #3a3a50", background: "#13131f", color: "#d4d4dc", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: 8, width: "100%", textAlign: "left", transition: "border-color 0.15s" }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = "#6366f1"}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = "#3a3a50"}>
                    <span style={{ flex: 1 }}>{totalTasks > 0 ? `${doneCount}/${totalTasks} tasks` : "No tasks yet"}</span>
                    {totalTasks > 0 && (
                      <span style={{ width: 40, height: 4, borderRadius: 2, background: "#2a2a3a", overflow: "hidden", display: "inline-block" }}>
                        <span style={{ display: "block", width: `${totalTasks > 0 ? (doneCount / totalTasks) * 100 : 0}%`, height: "100%", borderRadius: 2, background: "#4a9e6e" }} />
                      </span>
                    )}
                    <span style={{ color: "#6366f1", fontSize: 11 }}>{"\u2192"}</span>
                  </button>
                </div>
                <div>
                  <div style={S.label}>Progress</div>
                  <ProgressPill value={cp.progress} editable={isLead} onChange={(v) => growthUpd(idx, "progress", v)} />
                </div>
                <div>
                  <div style={S.label}>Feedback & Support</div>
                  {isLead ? (
                    <textarea value={cp.feedback || ""} onChange={(e) => growthUpd(idx, "feedback", e.target.value)} rows={1} placeholder="Lead feedback..." style={{ ...S.inputBase, padding: "5px 10px", fontSize: 13 }} onFocus={(e) => e.target.style.borderColor = "#6366f1"} onBlur={(e) => e.target.style.borderColor = "#3a3a50"} />
                  ) : (
                    <div style={{ fontSize: 13, color: cp.feedback ? "#d4d4dc" : "#5a5a6e", fontFamily: "'DM Sans', sans-serif", minHeight: 28, padding: "5px 0" }}>{cp.feedback || "\u2014"}</div>
                  )}
                </div>
              </div>
            )}
          </div>
        );})}
      </div>
      {completedItems.length > 0 && (
        <div style={{ marginTop: 12, paddingTop: 10, borderTop: "1px solid #2a2a3a" }}>
          <div style={{ fontSize: 10, color: "#5a5a6e", fontWeight: 600, fontFamily: "'DM Sans', sans-serif", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>Completed</div>
          {completedItems.map((cp) => { const idx = items.indexOf(cp); return (
            <div key={cp.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", opacity: 0.65 }}>
              <span style={{ color: "#4a9e6e", fontSize: 12, fontWeight: 800 }}>{"\u2713"}</span>
              <span style={{ flex: 1, fontSize: 12, color: "#9a9ab0", fontFamily: "'DM Sans', sans-serif", textDecoration: "line-through" }}>{cp.goal}</span>
              {fmtCycle(cp.cycleStart, cp.cycleEnd) && <span style={{ fontSize: 10, color: "#5a5a6e", fontFamily: "'DM Sans', sans-serif" }}>{fmtCycle(cp.cycleStart, cp.cycleEnd)}</span>}
              {editable && <button onClick={() => upd(idx, "status", "active")} style={{ padding: "1px 6px", borderRadius: 4, border: "1px solid #3a3a50", background: "transparent", color: "#7a7a8e", fontSize: 9, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Reopen</button>}
            </div>
          );})}
        </div>
      )}
      {actionPlanIdx !== null && items[actionPlanIdx] && (
        <ActionPlanModal coachingPoint={items[actionPlanIdx]} editable={isGuide} onUpdateTasks={(tasks) => updateTasks(actionPlanIdx, tasks)} onClose={() => setActionPlanIdx(null)} />
      )}
    </div>
  );
}
