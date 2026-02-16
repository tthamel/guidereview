import { useState } from 'react';
import { S, PROGRESS_COLORS } from '../../styles/theme';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { fmtDate, genId } from '../../utils/helpers';
import ProgressPill from '../ui/ProgressPill';
import SessionsBar from '../sessions/SessionsBar';
import CoachingPointsCard from '../coaching/CoachingPointsCard';
import FeedbackTable from '../feedback/FeedbackTable';

export default function DashboardOverview({ guides, role, userName, onSelect, onUpdateGuide }) {
  const [expandedId, setExpandedId] = useState(null);
  const isMobile = useMediaQuery("(max-width: 680px)");
  const pv = (p) => p === "90%" ? 90 : p === "50%" ? 50 : p === "10%" ? 10 : 0;
  const allSections = guides.flatMap((g) => [g.threeCs.loveSchool, g.threeCs.learn2x, g.threeCs.lifeSkills]);
  const allProblems = allSections.flatMap((s) => s.problemItems || []);
  const allWorking = allSections.flatMap((s) => s.workingItems || []);
  const allWinsLosses = allWorking.flatMap((w) => w.winsLosses || []);
  const allCoaching = guides.flatMap((g) => g.coachingPoints || []);

  const stats = {
    total: guides.length,
    avgProgress: Math.round(guides.reduce((s, g) => { const v = [g.threeCs.loveSchool.progress, g.threeCs.learn2x.progress, g.threeCs.lifeSkills.progress].map(pv); return s + v.reduce((a, b) => a + b, 0) / 3; }, 0) / Math.max(guides.length, 1)),
    recentlyUpdated: guides.filter((g) => (new Date() - new Date(g.lastUpdated)) / 86400000 < 14).length,
    needsAttention: guides.filter((g) => [g.threeCs.loveSchool.progress, g.threeCs.learn2x.progress, g.threeCs.lifeSkills.progress].some((p) => p === "10%" || p === "")).length,
    openProblems: allProblems.filter((p) => !p.closed && p.text).length,
    resolvedProblems: allProblems.filter((p) => p.closed).length,
    wins: allWinsLosses.filter((wl) => wl.type === "win" && wl.text).length,
    losses: allWinsLosses.filter((wl) => wl.type === "loss" && wl.text).length,
    activeWorking: allWorking.filter((w) => !w.closed && w.text).length,
    completedWorking: allWorking.filter((w) => w.closed).length,
    coachingByProgress: { none: allCoaching.filter((c) => !c.progress).length, starting: allCoaching.filter((c) => c.progress === "10%").length, inProgress: allCoaching.filter((c) => c.progress === "50%").length, nearly: allCoaching.filter((c) => c.progress === "90%").length },
    staleGuides: guides.filter((g) => (new Date() - new Date(g.lastUpdated)) / 86400000 >= 14),
  };

  const MiniBar = ({ value, max, color }) => (
    <div style={{ flex: 1, height: 4, borderRadius: 2, background: "#2a2a3a", overflow: "hidden" }}>
      <div style={{ width: `${max > 0 ? (value / max) * 100 : 0}%`, height: "100%", borderRadius: 2, background: color, transition: "width 0.5s ease" }} />
    </div>
  );

  const StatRow = ({ label, value, color, total }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
      <div style={{ width: 90, fontSize: 11, color: "#7a7a8e", fontFamily: "'DM Sans', sans-serif" }}>{label}</div>
      <MiniBar value={value} max={total} color={color} />
      <div style={{ width: 24, fontSize: 12, fontWeight: 700, color, textAlign: "right", fontFamily: "'Space Grotesk', sans-serif" }}>{value}</div>
    </div>
  );

  // Guide role Ã¢â‚¬â€ single guide view
  const myGuide = role === "guide" ? guides.find((g) => g.name === userName) : null;
  if (role === "guide" && myGuide) {
    const g = myGuide;
    const areas = [
      { name: "Love School", emoji: "\u25C6", color: "#6366f1", val: g.threeCs.loveSchool.progress, data: g.threeCs.loveSchool },
      { name: "Learn 2x", emoji: "\u25C7", color: "#818cf8", val: g.threeCs.learn2x.progress, data: g.threeCs.learn2x },
      { name: "Life Skills", emoji: "\u25CB", color: "#a78bfa", val: g.threeCs.lifeSkills.progress, data: g.threeCs.lifeSkills },
    ];
    const gSections = [g.threeCs.loveSchool, g.threeCs.learn2x, g.threeCs.lifeSkills];
    const gWins = gSections.flatMap((s) => (s.workingItems || []).flatMap((w) => (w.winsLosses || []).filter((wl) => wl.type === "win" && wl.text))).length;
    const gLosses = gSections.flatMap((s) => (s.workingItems || []).flatMap((w) => (w.winsLosses || []).filter((wl) => wl.type === "loss" && wl.text))).length;
    const gOpenProbs = gSections.flatMap((s) => (s.problemItems || []).filter((p) => !p.closed && p.text)).length;
    const gActiveWorking = gSections.flatMap((s) => (s.workingItems || []).filter((w) => !w.closed && w.text)).length;
    const updateGuide = (field, value) => { onUpdateGuide({ ...g, [field]: value, lastUpdated: new Date().toISOString() }); };

    return (
      <div>
        {/* Header */}
        <div style={{ background: "linear-gradient(135deg, #1a1a30, #13131f)", borderRadius: 20, border: "1px solid #2a2a3a", padding: isMobile ? 20 : 32, marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: isMobile ? "start" : "start", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 12 : 0 }}>
            <div>
              <h2 style={{ margin: 0, fontSize: isMobile ? 22 : 28, fontWeight: 800, color: "#e4e4ec", fontFamily: "'Space Grotesk', sans-serif" }}>{g.name}</h2>
              <div style={{ marginTop: 6, fontSize: isMobile ? 12 : 14, color: "#7a7a8e", fontFamily: "'DM Sans', sans-serif" }}>Group {g.group} {"\u00B7"} Lead: {g.leadGuide} {"\u00B7"} Updated {fmtDate(g.lastUpdated)}</div>
            </div>
            <button onClick={() => onSelect(g.id)} style={{ padding: "8px 20px", borderRadius: 10, border: "1.5px solid #6366f144", background: "#6366f110", color: "#818cf8", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: 6, transition: "all 0.15s" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#6366f120"; e.currentTarget.style.borderColor = "#6366f1"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#6366f110"; e.currentTarget.style.borderColor = "#6366f144"; }}>
              {"\u25C6"} Edit 3C's {"\u2192"}
            </button>
          </div>
        </div>

        {/* 3C Metrics */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 16, marginBottom: 16 }}>
          {areas.map((a) => {
            const openW = (a.data.workingItems || []).filter((w) => !w.closed && w.text).length;
            const openP = (a.data.problemItems || []).filter((p) => !p.closed && p.text).length;
            const wins = (a.data.workingItems || []).flatMap((w) => (w.winsLosses || []).filter((wl) => wl.type === "win" && wl.text)).length;
            const losses = (a.data.workingItems || []).flatMap((w) => (w.winsLosses || []).filter((wl) => wl.type === "loss" && wl.text)).length;
            return (
              <div key={a.name} style={{ ...S.card, marginBottom: 0, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -10, right: -10, fontSize: 56, opacity: 0.06, color: a.color }}>{a.emoji}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#e4e4ec", fontFamily: "'Space Grotesk', sans-serif", display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ color: a.color, fontSize: 12 }}>{a.emoji}</span> {a.name}
                  </div>
                  <ProgressPill value={a.val} editable={false} />
                </div>
                {a.data.goal && <div style={{ fontSize: 12, color: "#7a7a8e", fontFamily: "'DM Sans', sans-serif", fontStyle: "italic", marginBottom: 10, lineHeight: 1.4 }}>{a.data.goal}</div>}
                <div style={{ display: "flex", gap: 12, fontSize: 11, fontFamily: "'DM Sans', sans-serif" }}>
                  {openW > 0 && <span style={{ color: "#6366f1" }}>{openW} working</span>}
                  {openP > 0 && <span style={{ color: "#c25450" }}>{openP} prob{openP !== 1 ? "s" : ""}</span>}
                  {wins > 0 && <span style={{ color: "#4a9e6e" }}>{wins}W</span>}
                  {losses > 0 && <span style={{ color: "#c25450" }}>{losses}L</span>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary stats row */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
          {[
            { label: "Working On", value: gActiveWorking, color: "#6366f1", icon: "\u25C7" },
            { label: "Open Problems", value: gOpenProbs, color: "#c25450", icon: "\u25EC" },
            { label: "Wins", value: gWins, color: "#4a9e6e", icon: "\u25B3" },
            { label: "Losses", value: gLosses, color: "#c25450", icon: "\u25CB" },
          ].map(({ label, value, color, icon }) => (
            <div key={label} style={{ ...S.card, marginBottom: 0, position: "relative", overflow: "hidden", padding: "16px 20px" }}>
              <div style={{ position: "absolute", top: -8, right: -8, fontSize: 40, opacity: 0.06 }}>{icon}</div>
              <div style={{ ...S.label, marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color, fontFamily: "'Space Grotesk', sans-serif" }}>{value}</div>
            </div>
          ))}
        </div>

        {/* Sessions, Coaching, Growth, Feedback */}
        <SessionsBar sessions={g.sessions || []} guide={g} role={role} userName={userName}
          onAddSession={() => {}}
          onUpdateSession={null} />
        <CoachingPointsCard items={g.coachingPoints || []} editable={false} role={role}
          onUpdate={() => {}} onAdd={() => {}} onRemove={() => {}}
          onUpdateGrowth={(v) => updateGuide("coachingPoints", v)} />
        <FeedbackTable items={g.feedback || []} role={role}
          onUpdate={(v) => updateGuide("feedback", v)}
          onAdd={() => updateGuide("feedback", [...(g.feedback || []), { id: genId(), topic: "", entries: [{ id: genId(), text: "", createdAt: new Date().toISOString() }], notes: [], actionPlans: [], createdAt: new Date().toISOString() }])}
          onRemove={(i) => updateGuide("feedback", (g.feedback || []).filter((_, j) => j !== i))} />
      </div>
    );
  }

  return (
    <div>
      {/* Top-level stats */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 16, marginBottom: 16 }}>
        {[{ label: "Total Guides", value: stats.total, color: "#6366f1", icon: "\u25C7" }, { label: "Avg Progress", value: `${stats.avgProgress}%`, color: "#4a9e6e", icon: "\u25B3" }, { label: "Updated (14d)", value: stats.recentlyUpdated, color: "#818cf8", icon: "\u25CB" }, { label: "Needs Attention", value: stats.needsAttention, color: "#c25450", icon: "\u25EC" }].map(({ label, value, color, icon }) => (
          <div key={label} style={{ ...S.card, position: "relative", overflow: "hidden", marginBottom: 0 }}>
            <div style={{ position: "absolute", top: -10, right: -10, fontSize: 56, opacity: 0.06 }}>{icon}</div>
            <div style={{ ...S.label, marginBottom: 8 }}>{label}</div>
            <div style={{ fontSize: 32, fontWeight: 800, color, fontFamily: "'Space Grotesk', sans-serif" }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Detailed breakdowns */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: 16, marginBottom: 32 }}>
        {/* Problems */}
        <div style={S.card}>
          <div style={{ ...S.label, marginBottom: 12, color: "#c25450" }}>Problems</div>
          <StatRow label="Open" value={stats.openProblems} color="#c25450" total={stats.openProblems + stats.resolvedProblems} />
          <StatRow label="Resolved" value={stats.resolvedProblems} color="#4a9e6e" total={stats.openProblems + stats.resolvedProblems} />
          <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid #2a2a3a" }}>
            <div style={{ ...S.label, marginBottom: 8, color: "#6366f1" }}>Working Items</div>
            <StatRow label="Active" value={stats.activeWorking} color="#6366f1" total={stats.activeWorking + stats.completedWorking} />
            <StatRow label="Completed" value={stats.completedWorking} color="#4a9e6e" total={stats.activeWorking + stats.completedWorking} />
          </div>
        </div>

        {/* Wins / Losses */}
        <div style={S.card}>
          <div style={{ ...S.label, marginBottom: 12, color: "#c29a3c" }}>Wins / Losses</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 12 }}>
            <span style={{ fontSize: 28, fontWeight: 800, color: "#4a9e6e", fontFamily: "'Space Grotesk', sans-serif" }}>{stats.wins}</span>
            <span style={{ fontSize: 13, color: "#5a5a6e" }}>wins</span>
            <span style={{ fontSize: 18, color: "#3a3a4a", margin: "0 2px" }}>/</span>
            <span style={{ fontSize: 28, fontWeight: 800, color: "#c25450", fontFamily: "'Space Grotesk', sans-serif" }}>{stats.losses}</span>
            <span style={{ fontSize: 13, color: "#5a5a6e" }}>losses</span>
          </div>
          <div style={{ height: 8, borderRadius: 4, background: "#2a2a3a", overflow: "hidden", display: "flex" }}>
            {(stats.wins + stats.losses > 0) && (<>
              <div style={{ width: `${(stats.wins / (stats.wins + stats.losses)) * 100}%`, height: "100%", background: "#4a9e6e", transition: "width 0.5s" }} />
              <div style={{ width: `${(stats.losses / (stats.wins + stats.losses)) * 100}%`, height: "100%", background: "#c25450", transition: "width 0.5s" }} />
            </>)}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
            <span style={{ fontSize: 10, color: "#4a9e6e", fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>{stats.wins + stats.losses > 0 ? Math.round((stats.wins / (stats.wins + stats.losses)) * 100) : 0}% win rate</span>
            <span style={{ fontSize: 10, color: "#5a5a6e", fontFamily: "'DM Sans', sans-serif" }}>{stats.wins + stats.losses} total</span>
          </div>
        </div>

        {/* Coaching Progress */}
        <div style={S.card}>
          <div style={{ ...S.label, marginBottom: 12, color: "#4a9e6e" }}>Coaching Progress</div>
          <StatRow label="Not Set" value={stats.coachingByProgress.none} color="#3a3a4a" total={allCoaching.length} />
          <StatRow label="Starting" value={stats.coachingByProgress.starting} color="#c25450" total={allCoaching.length} />
          <StatRow label="In Progress" value={stats.coachingByProgress.inProgress} color="#c29a3c" total={allCoaching.length} />
          <StatRow label="Nearly There" value={stats.coachingByProgress.nearly} color="#4a9e6e" total={allCoaching.length} />
          <div style={{ marginTop: 8, fontSize: 10, color: "#5a5a6e", fontFamily: "'DM Sans', sans-serif" }}>{allCoaching.length} total coaching points</div>
        </div>
      </div>

      {/* Stale guides warning */}
      {stats.staleGuides.length > 0 && (
        <div style={{ background: "#c2545010", border: "1px solid #c2545030", borderRadius: 12, padding: "12px 20px", marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ color: "#c25450", fontSize: 16, fontWeight: 800 }}>{"\u25EC"}</div>
          <div style={{ fontSize: 13, color: "#d4a4a0", fontFamily: "'DM Sans', sans-serif" }}>
            <span style={{ fontWeight: 700 }}>{stats.staleGuides.length} guide{stats.staleGuides.length !== 1 ? "s" : ""}</span> not updated in 14+ days: {stats.staleGuides.map((g) => g.name).join(", ")}
          </div>
        </div>
      )}

      <h2 style={{ fontSize: 22, fontWeight: 800, color: "#e4e4ec", fontFamily: "'Space Grotesk', sans-serif", marginBottom: 16 }}>All Guides</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {guides.map((g) => {
          const areas = [{ name: "Love School", label: "Love", val: g.threeCs.loveSchool.progress }, { name: "Learn 2x", label: "Learn", val: g.threeCs.learn2x.progress }, { name: "Life Skills", label: "Life", val: g.threeCs.lifeSkills.progress }];
          const gSections = [g.threeCs.loveSchool, g.threeCs.learn2x, g.threeCs.lifeSkills];
          const gOpenProbs = gSections.flatMap((s) => (s.problemItems || []).filter((p) => !p.closed && p.text)).length;
          const gWins = gSections.flatMap((s) => (s.workingItems || []).flatMap((w) => (w.winsLosses || []).filter((wl) => wl.type === "win" && wl.text))).length;
          const gLosses = gSections.flatMap((s) => (s.workingItems || []).flatMap((w) => (w.winsLosses || []).filter((wl) => wl.type === "loss" && wl.text))).length;
          const isExpanded = expandedId === g.id;
          const editable = role === "guide" || role === "lead";
          const updateGuide = (field, value) => { onUpdateGuide({ ...g, [field]: value, lastUpdated: new Date().toISOString() }); };
          return (
            <div key={g.id} style={{ ...S.card, marginBottom: 0, borderColor: isExpanded ? "#6366f144" : "#2a2a3a", transition: "all 0.2s ease" }}>
              {/* Summary row Ã¢â‚¬â€ always visible */}
              <div style={{ display: "flex", gap: isMobile ? 10 : 16, alignItems: isMobile ? "start" : "center", cursor: "pointer", flexDirection: isMobile ? "column" : "row" }} onClick={() => setExpandedId(isExpanded ? null : g.id)}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                    <div style={{ fontSize: isMobile ? 16 : 18, fontWeight: 700, color: "#e4e4ec", fontFamily: "'Space Grotesk', sans-serif" }}>{g.name}</div>
                    <span style={{ transition: "transform 0.2s", transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)", display: "inline-block", fontSize: 10, color: "#5a5a6e" }}>{"\u25B6"}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "#7a7a8e", fontFamily: "'DM Sans', sans-serif" }}>Group {g.group} {"\u00B7"} Lead: {g.leadGuide}</div>
                </div>
                <div style={{ display: "flex", gap: isMobile ? 8 : 12, alignItems: "center", flexShrink: 0, flexWrap: "wrap" }}>
                  {!isMobile && areas.map((a) => (
                    <div key={a.name} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ fontSize: 10, color: "#5a5a6e", fontFamily: "'DM Sans', sans-serif", width: 52, textAlign: "right" }}>{a.label}</div>
                      <div style={{ width: 40, height: 4, borderRadius: 2, background: "#2a2a3a", overflow: "hidden" }}>
                        <div style={{ width: `${a.val ? parseInt(a.val) : 0}%`, height: "100%", borderRadius: 2, background: PROGRESS_COLORS[a.val] || "#3a3a4a", transition: "width 0.5s ease" }} />
                      </div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: PROGRESS_COLORS[a.val] || "#5a5a6e", fontFamily: "'DM Sans', sans-serif", width: 20 }}>{a.val || "\u2014"}</div>
                    </div>
                  ))}
                  {isMobile && areas.map((a) => (
                    <div key={a.name} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <div style={{ fontSize: 10, color: "#5a5a6e", fontFamily: "'DM Sans', sans-serif" }}>{a.label}</div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: PROGRESS_COLORS[a.val] || "#5a5a6e", fontFamily: "'DM Sans', sans-serif" }}>{a.val || "\u2014"}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 10, fontSize: 11, fontFamily: "'DM Sans', sans-serif", flexShrink: 0 }}>
                  <span style={{ color: "#4a9e6e" }}>{gWins}W</span>
                  <span style={{ color: "#c25450" }}>{gLosses}L</span>
                  {gOpenProbs > 0 && <span style={{ color: "#c29a3c" }}>{gOpenProbs}P</span>}
                  {!isMobile && <span style={{ color: "#5a5a6e" }}>{fmtDate(g.lastUpdated)}</span>}
                </div>
              </div>

              {/* Expanded section Ã¢â‚¬â€ sessions, coaching, growth, feedback */}
              {isExpanded && (
                <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid #2a2a3a" }}>
                  <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                    <button onClick={() => onSelect(g.id)} style={{ padding: "8px 20px", borderRadius: 10, border: "1.5px solid #6366f144", background: "#6366f110", color: "#818cf8", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: 6, transition: "all 0.15s" }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "#6366f120"; e.currentTarget.style.borderColor = "#6366f1"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "#6366f110"; e.currentTarget.style.borderColor = "#6366f144"; }}>
                      {"\u25C6"} View 3C's {"\u2192"}
                    </button>
                  </div>
                  <SessionsBar sessions={g.sessions || []} guide={g} role={role} userName={userName}
                    onAddSession={(session) => updateGuide("sessions", [...(g.sessions || []), session])}
                    onUpdateSession={(updated) => updateGuide("sessions", (g.sessions || []).map((s) => s.id === updated.id ? updated : s))} />
                  <CoachingPointsCard items={g.coachingPoints || []} editable={role === "lead"} role={role}
                    onUpdate={(v) => updateGuide("coachingPoints", v)}
                    onAdd={() => updateGuide("coachingPoints", [...(g.coachingPoints || []), { id: genId(), goal: "", cycleStart: "", cycleEnd: "", status: "active", tasks: [{ id: genId(), text: "", done: false }], progress: "", feedback: "" }])}
                    onRemove={(i) => updateGuide("coachingPoints", (g.coachingPoints || []).filter((_, j) => j !== i))}
                    onUpdateGrowth={(v) => updateGuide("coachingPoints", v)} />
                  <FeedbackTable items={g.feedback || []} role={role}
                    onUpdate={(v) => updateGuide("feedback", v)}
                    onAdd={() => updateGuide("feedback", [...(g.feedback || []), { id: genId(), topic: "", entries: [{ id: genId(), text: "", createdAt: new Date().toISOString() }], notes: [], actionPlans: [], createdAt: new Date().toISOString() }])}
                    onRemove={(i) => updateGuide("feedback", (g.feedback || []).filter((_, j) => j !== i))} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
