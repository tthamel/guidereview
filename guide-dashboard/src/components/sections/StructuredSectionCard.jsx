import { useState } from 'react';
import { S, PROGRESS_OPTIONS, PROGRESS_COLORS, PROGRESS_LABELS } from '../../styles/theme';
import { genId, fmtDate, deepClone } from '../../utils/helpers';
import ProgressPill from '../ui/ProgressPill';
import InlineInput from '../ui/InlineInput';
import WinLossTag from '../ui/WinLossTag';
import ResolveModal from './ResolveModal';

export default function StructuredSectionCard({ title, emoji, iconColor, data, editable, onUpdate, defaultCollapsed = false }) {
  const cl = (d) => deepClone(d);
  const [resolveIdx, setResolveIdx] = useState(null);
  const [showClosed, setShowClosed] = useState(false);
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  const addWorkingItem = () => { const d = cl(data); d.workingItems.push({ id: genId(), text: '', progress: '', winsLosses: [{ id: genId(), text: '', type: 'win' }] }); onUpdate(d); };
  const removeWorkingItem = (i) => { const d = cl(data); d.workingItems.splice(i, 1); onUpdate(d); };
  const updateWorkingText = (i, t) => { const d = cl(data); d.workingItems[i].text = t; onUpdate(d); };
  const updateWorkingProgress = (i, v) => { const d = cl(data); d.workingItems[i].progress = v; onUpdate(d); };
  const closeWorkingItem = (i) => { const d = cl(data); d.workingItems[i].closed = true; d.workingItems[i].closedAt = new Date().toISOString(); onUpdate(d); };
  const reopenWorkingItem = (i) => { const d = cl(data); d.workingItems[i].closed = false; d.workingItems[i].closedAt = null; onUpdate(d); };
  const addWinLoss = (wi) => { const d = cl(data); d.workingItems[wi].winsLosses.push({ id: genId(), text: '', type: 'win' }); onUpdate(d); };
  const removeWinLoss = (wi, wli) => { const d = cl(data); d.workingItems[wi].winsLosses.splice(wli, 1); onUpdate(d); };
  const updateWinLoss = (wi, wli, f, v) => { const d = cl(data); d.workingItems[wi].winsLosses[wli][f] = v; onUpdate(d); };
  const toggleWL = (wi, wli) => { const d = cl(data); d.workingItems[wi].winsLosses[wli].type = d.workingItems[wi].winsLosses[wli].type === 'win' ? 'loss' : 'win'; onUpdate(d); };
  const addProblem = () => { const d = cl(data); d.problemItems.push({ id: genId(), text: '', solutions: [{ id: genId(), text: '' }] }); onUpdate(d); };
  const removeProblem = (i) => { const d = cl(data); d.problemItems.splice(i, 1); onUpdate(d); };
  const updateProblemText = (i, t) => { const d = cl(data); d.problemItems[i].text = t; onUpdate(d); };
  const resolveProblem = (i, resolution) => { const d = cl(data); d.problemItems[i].closed = true; d.problemItems[i].closedAt = new Date().toISOString(); d.problemItems[i].resolution = resolution; onUpdate(d); setResolveIdx(null); };
  const reopenProblem = (i) => { const d = cl(data); d.problemItems[i].closed = false; d.problemItems[i].closedAt = null; d.problemItems[i].resolution = ''; onUpdate(d); };
  const addSolution = (pi) => { const d = cl(data); d.problemItems[pi].solutions.push({ id: genId(), text: '' }); onUpdate(d); };
  const removeSolution = (pi, si) => { const d = cl(data); d.problemItems[pi].solutions.splice(si, 1); onUpdate(d); };
  const updateSolution = (pi, si, t) => { const d = cl(data); d.problemItems[pi].solutions[si].text = t; onUpdate(d); };
  const updateProgress = (v) => { const d = cl(data); d.progress = v; onUpdate(d); };
  const updateGoal = (v) => { const d = cl(data); d.goal = v; onUpdate(d); };

  const openWorking = (data.workingItems || []).filter((w) => !w.closed);
  const closedWorking = (data.workingItems || []).filter((w) => w.closed);
  const openProblems = (data.problemItems || []).filter((p) => !p.closed);
  const closedProblems = (data.problemItems || []).filter((p) => p.closed);
  const closedCount = closedWorking.length + closedProblems.length;
  const openWorkingCount = openWorking.filter((w) => w.text).length;
  const openProblemCount = openProblems.filter((p) => p.text).length;
  const winsCount = (data.workingItems || []).flatMap((w) => (w.winsLosses || []).filter((wl) => wl.type === 'win' && wl.text)).length;
  const lossesCount = (data.workingItems || []).flatMap((w) => (w.winsLosses || []).filter((wl) => wl.type === 'loss' && wl.text)).length;

  return (
    <div style={S.card}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: collapsed ? 0 : 10, cursor: 'pointer' }} onClick={() => setCollapsed(!collapsed)}>
        <h3 style={{ ...S.sectionTitle, userSelect: 'none' }}>
          <span style={{ color: iconColor || '#6366f1', fontSize: 14 }}>{emoji || '\u25C6'}</span> {title}
          <span style={{ transition: 'transform 0.2s', transform: collapsed ? 'rotate(0deg)' : 'rotate(90deg)', display: 'inline-block', fontSize: 10, color: '#5a5a6e', marginLeft: 4 }}>{'\u25B6'}</span>
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }} onClick={(e) => e.stopPropagation()}>
          {collapsed && (
            <div style={{ display: 'flex', gap: 8, fontSize: 11, fontFamily: "'DM Sans', sans-serif", marginRight: 4 }}>
              {openWorkingCount > 0 && <span style={{ color: '#6366f1' }}>{openWorkingCount} working</span>}
              {openProblemCount > 0 && <span style={{ color: '#c25450' }}>{openProblemCount} prob{openProblemCount !== 1 ? 's' : ''}</span>}
              {winsCount > 0 && <span style={{ color: '#4a9e6e' }}>{winsCount}W</span>}
              {lossesCount > 0 && <span style={{ color: '#c25450' }}>{lossesCount}L</span>}
            </div>
          )}
          <ProgressPill value={data.progress} editable={editable && !collapsed} onChange={updateProgress} />
        </div>
      </div>
      {collapsed && data.goal && <div style={{ fontSize: 12, color: '#7a7a8e', fontFamily: "'DM Sans', sans-serif", fontStyle: 'italic', marginTop: 6 }}>{data.goal}</div>}
      {!collapsed && <>
        <div style={{ marginBottom: 20 }}>
          {editable ? (
            <input value={data.goal || ''} onChange={(e) => updateGoal(e.target.value)} placeholder="Section goal \u2014 what does success look like?" style={{ ...S.inputBase, padding: '7px 12px', fontSize: 13, background: '#0d0d18', borderColor: '#2a2a3a' }} onFocus={(e) => (e.target.style.borderColor = iconColor || '#6366f1')} onBlur={(e) => (e.target.style.borderColor = '#2a2a3a')} />
          ) : (
            data.goal && <div style={{ fontSize: 13, color: '#9a9ab0', fontFamily: "'DM Sans', sans-serif", fontStyle: 'italic', lineHeight: 1.5 }}>{data.goal}</div>
          )}
        </div>

        {/* WORKING ON */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={S.label}>Working On</div>
            {editable && <button onClick={addWorkingItem} style={S.addBtn('#6366f1')}>+ Add Item</button>}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {openWorking.map((item) => { const wIdx = (data.workingItems || []).indexOf(item); return (
              <div key={item.id} style={{ background: '#0d0d18', borderRadius: 12, border: '1px solid #2a2a3a', padding: 16 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'start', marginBottom: 8 }}>
                  <div style={{ width: 22, height: 22, borderRadius: 6, background: '#6366f115', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366f1', fontSize: 11, fontWeight: 800, flexShrink: 0, marginTop: 3, fontFamily: "'DM Sans', sans-serif" }}>{openWorking.indexOf(item) + 1}</div>
                  <div style={{ flex: 1 }}><InlineInput value={item.text} onChange={(v) => updateWorkingText(wIdx, v)} editable={editable} placeholder="What are you working on?" /></div>
                  <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                    {editable && <button onClick={() => closeWorkingItem(wIdx)} title="Mark complete" style={{ padding: '3px 10px', borderRadius: 6, border: '1.5px solid #4a9e6e44', background: 'transparent', color: '#4a9e6e', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>{'\u2713'} Done</button>}
                    {editable && data.workingItems.filter((w) => !w.closed).length > 1 && <button onClick={() => removeWorkingItem(wIdx)} style={S.removeBtn}>{'\u00D7'}</button>}
                  </div>
                </div>
                <div style={{ marginLeft: 32, marginBottom: 8 }}>
                  <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                    {(editable ? PROGRESS_OPTIONS.filter((o) => o !== '') : (item.progress ? [item.progress] : [])).map((opt) => (
                      <button key={opt} onClick={editable ? () => updateWorkingProgress(wIdx, item.progress === opt ? '' : opt) : undefined} style={{
                        display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 8px', borderRadius: 12, fontSize: 10, fontWeight: 600,
                        background: item.progress === opt ? PROGRESS_COLORS[opt] + '25' : 'transparent',
                        color: item.progress === opt ? PROGRESS_COLORS[opt] : '#5a5a6e',
                        border: `1px solid ${item.progress === opt ? PROGRESS_COLORS[opt] + '44' : '#2a2a3a'}`,
                        cursor: editable ? 'pointer' : 'default', fontFamily: "'DM Sans', sans-serif", transition: 'all 0.15s',
                      }}><span style={{ width: 5, height: 5, borderRadius: '50%', background: PROGRESS_COLORS[opt] || '#3a3a4a' }} />{PROGRESS_LABELS[opt]}</button>
                    ))}
                  </div>
                </div>
                <div style={{ marginLeft: 32 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <div style={{ ...S.label, fontSize: 10, marginBottom: 0, color: '#5a5a6e' }}>Wins / Losses</div>
                    {editable && <button onClick={() => addWinLoss(wIdx)} style={{ ...S.addBtn('#818cf8'), padding: '2px 8px', fontSize: 10 }}>+ Add</button>}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {(item.winsLosses || []).map((wl, wlIdx) => (
                      <div key={wl.id} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <WinLossTag type={wl.type} editable={editable} onToggle={() => toggleWL(wIdx, wlIdx)} />
                        <div style={{ flex: 1 }}><InlineInput value={wl.text} onChange={(v) => updateWinLoss(wIdx, wlIdx, 'text', v)} editable={editable} placeholder={wl.type === 'win' ? 'What went well?' : 'What needs improvement?'} /></div>
                        {editable && item.winsLosses.length > 1 && <button onClick={() => removeWinLoss(wIdx, wlIdx)} style={{ ...S.removeBtn, fontSize: 11, padding: '1px 6px' }}>{'\u00D7'}</button>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );})}
          </div>
        </div>

        {/* PROBLEMS */}
        <div style={{ marginBottom: closedCount > 0 ? 24 : 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={S.label}>Problems</div>
            {editable && <button onClick={addProblem} style={S.addBtn('#c25450')}>+ Add Problem</button>}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {openProblems.map((prob) => { const pIdx = (data.problemItems || []).indexOf(prob); return (
              <div key={prob.id} style={{ background: '#0d0d18', borderRadius: 12, border: '1px solid #2a2a3a', padding: 16 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'start', marginBottom: 10 }}>
                  <div style={{ width: 22, height: 22, borderRadius: 6, background: '#c2545015', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c25450', fontSize: 11, fontWeight: 800, flexShrink: 0, marginTop: 3, fontFamily: "'Space Grotesk', sans-serif" }}>!</div>
                  <div style={{ flex: 1 }}><InlineInput value={prob.text} onChange={(v) => updateProblemText(pIdx, v)} editable={editable} placeholder="Describe the problem..." /></div>
                  <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                    {editable && <button onClick={() => setResolveIdx(pIdx)} title="Resolve problem" style={{ padding: '3px 10px', borderRadius: 6, border: '1.5px solid #4a9e6e44', background: 'transparent', color: '#4a9e6e', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>{'\u2713'} Resolve</button>}
                    {editable && data.problemItems.filter((p) => !p.closed).length > 1 && <button onClick={() => removeProblem(pIdx)} style={S.removeBtn}>{'\u00D7'}</button>}
                  </div>
                </div>
                <div style={{ marginLeft: 32 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <div style={{ ...S.label, fontSize: 10, marginBottom: 0, color: '#5a5a6e' }}>Solutions Attempted</div>
                    {editable && <button onClick={() => addSolution(pIdx)} style={{ ...S.addBtn('#c29a3c'), padding: '2px 8px', fontSize: 10 }}>+ Add</button>}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {(prob.solutions || []).map((sol, sIdx) => (
                      <div key={sol.id} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <div style={{ width: 18, height: 18, borderRadius: 5, background: '#c29a3c15', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c29a3c', fontSize: 10, fontWeight: 800, flexShrink: 0, fontFamily: "'DM Sans', sans-serif" }}>{'\u2192'}</div>
                        <div style={{ flex: 1 }}><InlineInput value={sol.text} onChange={(v) => updateSolution(pIdx, sIdx, v)} editable={editable} placeholder="What solution was tried?" /></div>
                        {editable && prob.solutions.length > 1 && <button onClick={() => removeSolution(pIdx, sIdx)} style={{ ...S.removeBtn, fontSize: 11, padding: '1px 6px' }}>{'\u00D7'}</button>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );})}
          </div>
        </div>

        {/* CLOSED ITEMS */}
        {closedCount > 0 && (
          <div>
            <button onClick={() => setShowClosed(!showClosed)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', background: 'transparent', border: 'none', cursor: 'pointer', color: '#5a5a6e', fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>
              <span style={{ transition: 'transform 0.2s', transform: showClosed ? 'rotate(90deg)' : 'rotate(0deg)', display: 'inline-block' }}>{'\u25B6'}</span>
              {closedCount} completed / resolved item{closedCount !== 1 ? 's' : ''}
            </button>
            {showClosed && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
                {closedWorking.map((item) => { const wIdx = (data.workingItems || []).indexOf(item); return (
                  <div key={item.id} style={{ background: '#0d0d18', borderRadius: 12, border: '1px solid #4a9e6e22', padding: 14, opacity: 0.75 }}>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <div style={{ width: 22, height: 22, borderRadius: 6, background: '#4a9e6e18', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4a9e6e', fontSize: 12, fontWeight: 800, flexShrink: 0, fontFamily: "'DM Sans', sans-serif" }}>{'\u2713'}</div>
                      <div style={{ flex: 1, fontSize: 13, color: '#9a9ab0', fontFamily: "'DM Sans', sans-serif", textDecoration: 'line-through' }}>{item.text}</div>
                      <span style={{ fontSize: 10, color: '#5a5a6e', fontFamily: "'DM Sans', sans-serif" }}>Completed {fmtDate(item.closedAt)}</span>
                      {editable && <button onClick={() => reopenWorkingItem(wIdx)} style={{ padding: '2px 8px', borderRadius: 6, border: '1px solid #3a3a50', background: 'transparent', color: '#7a7a8e', fontSize: 10, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Reopen</button>}
                    </div>
                  </div>
                );})}
                {closedProblems.map((prob) => { const pIdx = (data.problemItems || []).indexOf(prob); return (
                  <div key={prob.id} style={{ background: '#0d0d18', borderRadius: 12, border: '1px solid #4a9e6e22', padding: 14, opacity: 0.75 }}>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'start' }}>
                      <div style={{ width: 22, height: 22, borderRadius: 6, background: '#4a9e6e18', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4a9e6e', fontSize: 12, fontWeight: 800, flexShrink: 0, marginTop: 2, fontFamily: "'DM Sans', sans-serif" }}>{'\u2713'}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, color: '#9a9ab0', fontFamily: "'DM Sans', sans-serif", textDecoration: 'line-through', marginBottom: 6 }}>{prob.text}</div>
                        {prob.resolution && (
                          <div style={{ background: '#4a9e6e0a', borderRadius: 8, border: '1px solid #4a9e6e18', padding: '8px 12px' }}>
                            <div style={{ fontSize: 10, fontWeight: 700, color: '#4a9e6e', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>Resolution</div>
                            <div style={{ fontSize: 13, color: '#b4b4c4', fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5 }}>{prob.resolution}</div>
                          </div>
                        )}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
                        <span style={{ fontSize: 10, color: '#5a5a6e', fontFamily: "'DM Sans', sans-serif" }}>Resolved {fmtDate(prob.closedAt)}</span>
                        {editable && <button onClick={() => reopenProblem(pIdx)} style={{ padding: '2px 8px', borderRadius: 6, border: '1px solid #3a3a50', background: 'transparent', color: '#7a7a8e', fontSize: 10, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Reopen</button>}
                      </div>
                    </div>
                  </div>
                );})}
              </div>
            )}
          </div>
        )}
      </>}
      {resolveIdx !== null && data.problemItems[resolveIdx] && (
        <ResolveModal problem={data.problemItems[resolveIdx]} onConfirm={(res) => resolveProblem(resolveIdx, res)} onClose={() => setResolveIdx(null)} />
      )}
    </div>
  );
}
