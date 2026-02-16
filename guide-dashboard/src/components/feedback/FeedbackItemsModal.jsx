import { useState } from 'react';
import { S } from '../../styles/theme';
import { genId, fmtDate } from '../../utils/helpers';

export default function FeedbackItemsModal({ title, subtitle, items, editable, onSave, onClose, accentColor = "#c29a3c", icon = "\u25C8", placeholder = "Add item..." }) {
  const [entries, setEntries] = useState(JSON.parse(JSON.stringify(items || [])));
  const [newText, setNewText] = useState("");
  const addEntry = () => { if (!newText.trim()) return; setEntries([...entries, { id: genId(), text: newText.trim(), createdAt: new Date().toISOString() }]); setNewText(""); };
  const removeEntry = (i) => setEntries(entries.filter((_, j) => j !== i));
  const handleSave = () => { onSave(entries); onClose(); };

  return (
    <div style={{ position: "fixed", inset: 0, background: "#000000aa", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }} onClick={onClose}>
      <div style={{ background: "#1a1a2e", borderRadius: 20, border: "1px solid #2a2a3a", padding: 32, width: 580, maxWidth: "90vw", maxHeight: "80vh", display: "flex", flexDirection: "column" }} onClick={(e) => e.stopPropagation()}>
        <h3 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 800, color: "#e4e4ec", fontFamily: "'Space Grotesk', sans-serif" }}>{title}</h3>
        {subtitle && <div style={{ fontSize: 13, color: "#9a9ab0", fontFamily: "'DM Sans', sans-serif", marginBottom: 6, fontStyle: "italic" }}>{subtitle}</div>}
        <div style={{ fontSize: 11, color: "#5a5a6e", fontFamily: "'DM Sans', sans-serif", marginBottom: 20 }}>{entries.filter((e) => e.text).length} item{entries.filter((e) => e.text).length !== 1 ? "s" : ""}</div>
        <div style={{ flex: 1, overflowY: "auto", marginBottom: 20, display: "flex", flexDirection: "column", gap: 8 }}>
          {entries.map((entry, i) => (
            <div key={entry.id} style={{ display: "flex", gap: 10, alignItems: "start", background: "#13131f", borderRadius: 10, border: "1px solid #2a2a3a", padding: "10px 14px" }}>
              <div style={{ width: 22, height: 22, borderRadius: 6, background: accentColor + "15", display: "flex", alignItems: "center", justifyContent: "center", color: accentColor, fontSize: 10, fontWeight: 800, flexShrink: 0, marginTop: 2, fontFamily: "'DM Sans', sans-serif" }}>{icon}</div>
              <div style={{ flex: 1 }}>
                {editable ? (
                  <textarea value={entry.text} onChange={(e) => { const n = [...entries]; n[i] = { ...n[i], text: e.target.value }; setEntries(n); }} rows={1} placeholder={placeholder} style={{ ...S.inputBase, padding: "4px 8px", fontSize: 13 }} onFocus={(e) => e.target.style.borderColor = accentColor} onBlur={(e) => e.target.style.borderColor = "#3a3a50"} />
                ) : (
                  <div style={{ fontSize: 13, color: "#d4d4dc", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5 }}>{entry.text || "\u2014"}</div>
                )}
                {entry.createdAt && <div style={{ fontSize: 10, color: "#5a5a6e", fontFamily: "'DM Sans', sans-serif", marginTop: 4 }}>{fmtDate(entry.createdAt)}</div>}
              </div>
              {editable && entries.length > 1 && <button onClick={() => removeEntry(i)} style={S.removeBtn}>{"\u00D7"}</button>}
            </div>
          ))}
        </div>
        {editable && (
          <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
            <textarea value={newText} onChange={(e) => setNewText(e.target.value)} rows={2} placeholder={placeholder} style={{ ...S.inputBase, flex: 1, padding: "10px 14px", borderRadius: 10 }} onFocus={(e) => e.target.style.borderColor = accentColor} onBlur={(e) => e.target.style.borderColor = "#3a3a50"} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); addEntry(); } }} />
            <button onClick={addEntry} style={{ padding: "10px 20px", borderRadius: 10, border: "none", background: newText.trim() ? `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)` : "#3a3a4a", color: newText.trim() ? "#fff" : "#7a7a8e", fontSize: 13, fontWeight: 700, cursor: newText.trim() ? "pointer" : "default", fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s", alignSelf: "flex-end", whiteSpace: "nowrap" }}>+ Add</button>
          </div>
        )}
        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ padding: "10px 24px", borderRadius: 10, border: "1.5px solid #3a3a50", background: "transparent", color: "#9a9ab0", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Cancel</button>
          {editable && <button onClick={handleSave} style={{ padding: "10px 24px", borderRadius: 10, border: "none", background: "linear-gradient(135deg, #6366f1, #818cf8)", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Save</button>}
        </div>
      </div>
    </div>
  );
}
