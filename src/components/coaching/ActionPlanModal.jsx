import { useState } from 'react';
import { S } from '../../styles/theme';
import { genId } from '../../utils/helpers';

export default function ActionPlanModal({ coachingPoint, onUpdateTasks, onClose, editable }) {
  const [tasks, setTasks] = useState(JSON.parse(JSON.stringify(coachingPoint.tasks || [])));
  const addTask = () => setTasks([...tasks, { id: genId(), text: '', done: false }]);
  const removeTask = (i) => setTasks(tasks.filter((_, j) => j !== i));
  const updateTask = (i, f, v) => { const n = [...tasks]; n[i] = { ...n[i], [f]: v }; setTasks(n); };
  const handleSave = () => { onUpdateTasks(tasks); onClose(); };
  const doneCount = tasks.filter((t) => t.done).length;

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000000aa', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={onClose}>
      <div style={{ background: '#1a1a2e', borderRadius: 20, border: '1px solid #2a2a3a', padding: 32, width: 580, maxWidth: '90vw', maxHeight: '80vh', display: 'flex', flexDirection: 'column' }} onClick={(e) => e.stopPropagation()}>
        <h3 style={{ margin: '0 0 4px', fontSize: 20, fontWeight: 800, color: '#e4e4ec', fontFamily: "'Space Grotesk', sans-serif" }}>Action Plan</h3>
        <div style={{ fontSize: 13, color: '#9a9ab0', fontFamily: "'DM Sans', sans-serif", marginBottom: 6, fontStyle: 'italic' }}>{coachingPoint.goal}</div>
        <div style={{ fontSize: 11, color: '#5a5a6e', fontFamily: "'DM Sans', sans-serif", marginBottom: 20 }}>{doneCount} of {tasks.length} tasks complete</div>
        <div style={{ flex: 1, overflowY: 'auto', marginBottom: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {tasks.map((task, i) => (
            <div key={task.id} style={{ display: 'flex', gap: 10, alignItems: 'center', background: '#13131f', borderRadius: 10, border: '1px solid #2a2a3a', padding: '10px 14px' }}>
              <button onClick={editable ? () => updateTask(i, 'done', !task.done) : undefined} style={{ width: 22, height: 22, borderRadius: 6, border: `1.5px solid ${task.done ? '#4a9e6e' : '#3a3a50'}`, background: task.done ? '#4a9e6e22' : 'transparent', color: task.done ? '#4a9e6e' : '#3a3a50', fontSize: 12, fontWeight: 800, cursor: editable ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.15s' }}>{task.done ? '\u2713' : ''}</button>
              <div style={{ flex: 1 }}>
                {editable ? (
                  <input value={task.text} onChange={(e) => updateTask(i, 'text', e.target.value)} placeholder="Describe task..." style={{ ...S.inputBase, padding: '5px 10px', fontSize: 13, textDecoration: task.done ? 'line-through' : 'none', color: task.done ? '#7a7a8e' : '#d4d4dc' }} onFocus={(e) => (e.target.style.borderColor = '#6366f1')} onBlur={(e) => (e.target.style.borderColor = '#3a3a50')} />
                ) : (
                  <div style={{ fontSize: 13, color: task.done ? '#7a7a8e' : '#d4d4dc', fontFamily: "'DM Sans', sans-serif", textDecoration: task.done ? 'line-through' : 'none' }}>{task.text || '\u2014'}</div>
                )}
              </div>
              {editable && tasks.length > 1 && <button onClick={() => removeTask(i)} style={S.removeBtn}>{'\u00D7'}</button>}
            </div>
          ))}
          {editable && <button onClick={addTask} style={{ ...S.addBtn('#6366f1'), alignSelf: 'flex-start', marginTop: 4 }}>+ Add Task</button>}
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ padding: '10px 24px', borderRadius: 10, border: '1.5px solid #3a3a50', background: 'transparent', color: '#9a9ab0', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Cancel</button>
          {editable && <button onClick={handleSave} style={{ padding: '10px 24px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg, #6366f1, #818cf8)', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Save Tasks</button>}
        </div>
      </div>
    </div>
  );
}
