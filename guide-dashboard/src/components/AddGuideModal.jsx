import { useState } from 'react';
import { S, GROUPS } from '../../styles/theme';
import { genId } from '../../utils/helpers';
import { DEFAULT_3CS, DEFAULT_COACHING_POINTS, DEFAULT_FEEDBACK } from '../../utils/defaults';

export default function AddGuideModal({ onAdd, onClose, leads }) {
  const [name, setName] = useState("");
  const [group, setGroup] = useState("Wonderlab");
  const [lead, setLead] = useState(leads[0] || "");
  const handleAdd = () => { if (!name.trim()) return; onAdd({ id: genId(), name: name.trim(), group, leadGuide: lead, coachingPoints: JSON.parse(JSON.stringify(DEFAULT_COACHING_POINTS)), threeCs: JSON.parse(JSON.stringify(DEFAULT_3CS)), feedback: JSON.parse(JSON.stringify(DEFAULT_FEEDBACK)), sessions: [], lastUpdated: new Date().toISOString() }); onClose(); };
  return (
    <div style={{ position: "fixed", inset: 0, background: "#00000088", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }} onClick={onClose}>
      <div style={{ background: "#1a1a2e", borderRadius: 20, border: "1px solid #2a2a3a", padding: 32, width: 400, maxWidth: "90vw" }} onClick={(e) => e.stopPropagation()}>
        <h3 style={{ margin: "0 0 20px", fontSize: 20, fontWeight: 800, color: "#e4e4ec", fontFamily: "'Space Grotesk', sans-serif" }}>Add New Guide</h3>
        <div style={{ marginBottom: 16 }}><div style={S.label}>Name</div><input value={name} onChange={(e) => setName(e.target.value)} style={{ ...S.inputBase, padding: "10px 14px", borderRadius: 10 }} /></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
          <div><div style={S.label}>Group</div><select value={group} onChange={(e) => setGroup(e.target.value)} style={{ ...S.inputBase, padding: "10px 14px", borderRadius: 10 }}>{["Wonderlab","LL","L1","L2","MS","HS"].map((g) => <option key={g} value={g}>{g}</option>)}</select></div>
          <div><div style={S.label}>Lead Guide</div><input value={lead} onChange={(e) => setLead(e.target.value)} placeholder="Lead guide name" style={{ ...S.inputBase, padding: "10px 14px", borderRadius: 10 }} /></div>
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ padding: "10px 24px", borderRadius: 10, border: "1.5px solid #3a3a50", background: "transparent", color: "#9a9ab0", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Cancel</button>
          <button onClick={handleAdd} style={{ padding: "10px 24px", borderRadius: 10, border: "none", background: "linear-gradient(135deg, #6366f1, #818cf8)", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", opacity: name.trim() ? 1 : 0.4 }}>Add Guide</button>
        </div>
      </div>
    </div>
  );
}
