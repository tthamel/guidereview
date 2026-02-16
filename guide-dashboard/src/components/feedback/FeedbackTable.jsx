import { useState } from 'react';
import { S } from '../../styles/theme';
import { fmtDate } from '../../utils/helpers';
import FeedbackItemsModal from './FeedbackItemsModal';

export default function FeedbackTable({ items, role, onUpdate, onAdd, onRemove }) {
  const [modalIdx, setModalIdx] = useState(null);
  const [modalType, setModalType] = useState(null);
  const isGuide = role === "guide";
  const isLead = role === "lead";
  const upd = (i, f, v) => { const n = [...items]; n[i] = { ...n[i], [f]: v }; onUpdate(n); };
  const openModal = (idx, type) => { setModalIdx(idx); setModalType(type); };
  const closeModal = () => { setModalIdx(null); setModalType(null); };
  const handleSaveModal = (idx, type, entries) => { upd(idx, type === "feedback" ? "entries" : type === "notes" ? "notes" : "actionPlans", entries); };

  return (
    <div style={S.card}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h3 style={S.sectionTitle}><span style={{ color: "#c29a3c", fontSize: 14 }}>{"\u25C8"}</span> Feedback to Lead</h3>
        {isGuide && <button onClick={onAdd} style={S.addBtn("#6366f1")}>+ Add Topic</button>}
      </div>
      {items.map((item, idx) => {
        const entryCount = (item.entries || []).filter((e) => e.text).length;
        const noteCount = (Array.isArray(item.notes) ? item.notes : []).filter((n) => n.text).length;
        const actionCount = (Array.isArray(item.actionPlans) ? item.actionPlans : []).filter((a) => a.text).length;
        const latestEntry = (item.entries || []).filter((e) => e.text).slice(-1)[0];
        return (
          <div key={item.id} style={{ background: "#0d0d18", borderRadius: 12, border: "1px solid #2a2a3a", padding: 16, marginBottom: idx < items.length - 1 ? 10 : 0 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "start", marginBottom: 10 }}>
              <div style={{ flex: 1 }}>
                {isGuide ? (
                  <input value={item.topic || ""} onChange={(e) => upd(idx, "topic", e.target.value)} placeholder="Feedback topic..." style={{ ...S.inputBase, padding: "5px 10px", fontSize: 14, fontWeight: 600 }} onFocus={(e) => e.target.style.borderColor = "#c29a3c"} onBlur={(e) => e.target.style.borderColor = "#3a3a50"} />
                ) : (
                  <div style={{ fontSize: 14, fontWeight: 600, color: item.topic ? "#d4d4dc" : "#5a5a6e", fontFamily: "'DM Sans', sans-serif" }}>{item.topic || "\u2014"}</div>
                )}
              </div>
              <div style={{ display: "flex", gap: 4, flexShrink: 0, alignItems: "center" }}>
                {item.createdAt && <span style={{ fontSize: 10, color: "#5a5a6e", fontFamily: "'DM Sans', sans-serif", marginRight: 4 }}>{fmtDate(item.createdAt)}</span>}
                {isGuide && items.length > 1 && <button onClick={() => onRemove(idx)} style={S.removeBtn}>{"\u00D7"}</button>}
              </div>
            </div>
            {latestEntry && (
              <div style={{ fontSize: 12, color: "#9a9ab0", fontFamily: "'DM Sans', sans-serif", marginBottom: 10, padding: "6px 10px", background: "#13131f", borderRadius: 8, border: "1px solid #2a2a3a", lineHeight: 1.5 }}>
                <span style={{ color: "#c29a3c", fontSize: 10, fontWeight: 700, marginRight: 6 }}>LATEST</span>
                {latestEntry.text}
              </div>
            )}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button onClick={() => openModal(idx, "feedback")} style={{ flex: 1, minWidth: 120, padding: "8px 14px", borderRadius: 8, border: "1.5px solid #3a3a50", background: "#13131f", color: "#d4d4dc", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, transition: "border-color 0.15s" }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = "#c29a3c"}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = "#3a3a50"}>
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ color: "#c29a3c", fontSize: 12 }}>{"\u25C8"}</span>
                  Feedback
                  <span style={{ padding: "1px 7px", borderRadius: 10, fontSize: 10, fontWeight: 700, background: "#c29a3c22", color: "#c29a3c", fontFamily: "'DM Sans', sans-serif" }}>{entryCount}</span>
                </span>
                <span style={{ color: "#c29a3c", fontSize: 11 }}>{"\u2192"}</span>
              </button>
              {isLead && <button onClick={() => openModal(idx, "actionPlans")} style={{ flex: 1, minWidth: 120, padding: "8px 14px", borderRadius: 8, border: "1.5px solid #3a3a50", background: "#13131f", color: "#d4d4dc", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, transition: "border-color 0.15s" }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = "#4a9e6e"}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = "#3a3a50"}>
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ color: "#4a9e6e", fontSize: 12 }}>{"\u25B3"}</span>
                  Action Plans
                  <span style={{ padding: "1px 7px", borderRadius: 10, fontSize: 10, fontWeight: 700, background: "#4a9e6e22", color: "#4a9e6e", fontFamily: "'DM Sans', sans-serif" }}>{actionCount}</span>
                </span>
                <span style={{ color: "#4a9e6e", fontSize: 11 }}>{"\u2192"}</span>
              </button>}
              {isLead && <button onClick={() => openModal(idx, "notes")} style={{ padding: "8px 14px", borderRadius: 8, border: "1.5px solid #3a3a50", background: "#13131f", color: "#d4d4dc", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: 8, transition: "border-color 0.15s" }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = "#818cf8"}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = "#3a3a50"}>
                <span style={{ color: "#818cf8", fontSize: 12 }}>{"\u25C7"}</span>
                Notes
                <span style={{ padding: "1px 7px", borderRadius: 10, fontSize: 10, fontWeight: 700, background: "#818cf822", color: "#818cf8", fontFamily: "'DM Sans', sans-serif" }}>{noteCount}</span>
                <span style={{ color: "#818cf8", fontSize: 11 }}>{"\u2192"}</span>
              </button>}
            </div>
          </div>
        );
      })}
      {modalIdx !== null && items[modalIdx] && modalType === "feedback" && (
        <FeedbackItemsModal title="Feedback" subtitle={items[modalIdx].topic || "Untitled topic"} items={items[modalIdx].entries || []} editable={isGuide} accentColor="#c29a3c" icon={"\u25C8"} placeholder="Add feedback..." onSave={(entries) => handleSaveModal(modalIdx, "feedback", entries)} onClose={closeModal} />
      )}
      {modalIdx !== null && items[modalIdx] && modalType === "actionPlans" && (
        <FeedbackItemsModal title="Action Plans" subtitle={items[modalIdx].topic || "Untitled topic"} items={Array.isArray(items[modalIdx].actionPlans) ? items[modalIdx].actionPlans : []} editable={isLead} accentColor="#4a9e6e" icon={"\u25B3"} placeholder="Add action plan..." onSave={(plans) => handleSaveModal(modalIdx, "actionPlans", plans)} onClose={closeModal} />
      )}
      {modalIdx !== null && items[modalIdx] && modalType === "notes" && (
        <FeedbackItemsModal title="Notes" subtitle={items[modalIdx].topic || "Untitled topic"} items={Array.isArray(items[modalIdx].notes) ? items[modalIdx].notes : []} editable={isLead} accentColor="#818cf8" icon={"\u25C7"} placeholder="Add note..." onSave={(notes) => handleSaveModal(modalIdx, "notes", notes)} onClose={closeModal} />
      )}
    </div>
  );
}
