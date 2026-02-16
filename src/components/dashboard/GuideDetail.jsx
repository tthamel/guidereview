import { useState } from 'react';
import { S } from '../../styles/theme';
import { fmtDate } from '../../utils/helpers';
import StructuredSectionCard from '../sections/StructuredSectionCard';

export default function GuideDetail({ guide, role, onSave, onBack }) {
  const [draft, setDraft] = useState(JSON.parse(JSON.stringify(guide)));
  const [dirty, setDirty] = useState(false);
  const [editMode, setEditMode] = useState(role === "guide");
  const canEdit = role === "guide" || role === "lead";
  const editable = editMode && canEdit;
  const handleSave = () => { onSave({ ...draft, lastUpdated: new Date().toISOString() }); setDirty(false); setEditMode(false); };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <button onClick={onBack} style={{ padding: "8px 18px", borderRadius: 10, border: "1.5px solid #3a3a50", background: "transparent", color: "#9a9ab0", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: 6 }}>{"\u2190"} Back</button>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {role === "lead" && !editMode && <button onClick={() => setEditMode(true)} style={{ padding: "8px 20px", borderRadius: 10, border: "1.5px solid #c29a3c44", background: "#c29a3c10", color: "#e4b44c", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all 0.15s" }}>Edit 3C's</button>}
          {editable && editMode && !dirty && role === "lead" && <button onClick={() => setEditMode(false)} style={{ padding: "8px 20px", borderRadius: 10, border: "1.5px solid #3a3a50", background: "transparent", color: "#9a9ab0", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Done Editing</button>}
          {editable && dirty && <button onClick={handleSave} style={{ padding: "10px 28px", borderRadius: 12, border: "none", background: "linear-gradient(135deg, #6366f1, #818cf8)", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", boxShadow: "0 4px 20px #6366f155" }}>Save Changes</button>}
        </div>
      </div>
      <div style={{ background: "linear-gradient(135deg, #1a1a30, #13131f)", borderRadius: 20, border: "1px solid #2a2a3a", padding: 32, marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: "#e4e4ec", fontFamily: "'Space Grotesk', sans-serif" }}>{guide.name}</h2>
            <div style={{ marginTop: 6, fontSize: 14, color: "#7a7a8e", fontFamily: "'DM Sans', sans-serif" }}>Group {guide.group} {"\u00B7"} Lead: {guide.leadGuide} {"\u00B7"} Updated {fmtDate(guide.lastUpdated)}</div>
          </div>
          <div style={{ padding: "6px 16px", borderRadius: 20, fontSize: 12, fontWeight: 700, background: editable ? "#c29a3c22" : role === "admin" ? "#4a9e6e22" : "#6366f122", color: editable ? "#e4b44c" : role === "admin" ? "#5ec47e" : "#818cf8", fontFamily: "'DM Sans', sans-serif", border: `1px solid ${editable ? "#c29a3c44" : role === "admin" ? "#4a9e6e44" : "#6366f144"}` }}>{editable ? "Editing" : "Viewing"} as {role === "guide" ? "Guide" : role === "lead" ? "Lead Guide" : "Leadership"}</div>
        </div>
      </div>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: "#e4e4ec", fontFamily: "'Space Grotesk', sans-serif", marginBottom: 16 }}>Guide Group 3C's</h2>
      <StructuredSectionCard title="Love School" emoji={"\u25C6"} iconColor="#6366f1" data={draft.threeCs.loveSchool} editable={editable} onUpdate={(v) => { setDirty(true); setDraft((d) => ({ ...d, threeCs: { ...d.threeCs, loveSchool: v } })); }} />
      <StructuredSectionCard title="Learn 2x" emoji={"\u25C7"} iconColor="#818cf8" data={draft.threeCs.learn2x} editable={editable} onUpdate={(v) => { setDirty(true); setDraft((d) => ({ ...d, threeCs: { ...d.threeCs, learn2x: v } })); }} />
      <StructuredSectionCard title="Life Skills" emoji={"\u25CB"} iconColor="#a78bfa" data={draft.threeCs.lifeSkills} editable={editable} onUpdate={(v) => { setDirty(true); setDraft((d) => ({ ...d, threeCs: { ...d.threeCs, lifeSkills: v } })); }} />
    </div>
  );
}
