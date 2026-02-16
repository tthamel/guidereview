import { useState } from 'react';
import { S } from '../../styles/theme';

export default function ResolveModal({ problem, onConfirm, onClose }) {
  const [resolution, setResolution] = useState('');
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000000aa', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={onClose}>
      <div style={{ background: '#1a1a2e', borderRadius: 20, border: '1px solid #2a2a3a', padding: 32, width: 520, maxWidth: '90vw' }} onClick={(e) => e.stopPropagation()}>
        <h3 style={{ margin: '0 0 6px', fontSize: 20, fontWeight: 800, color: '#e4e4ec', fontFamily: "'Space Grotesk', sans-serif" }}>Resolve Problem</h3>
        <div style={{ fontSize: 13, color: '#7a7a8e', marginBottom: 20, fontFamily: "'DM Sans', sans-serif" }}>Closing out this problem {'\u2014'} capture what ultimately worked.</div>
        <div style={{ background: '#13131f', borderRadius: 12, border: '1px solid #2a2a3a', padding: 16, marginBottom: 20 }}>
          <div style={{ ...S.label, fontSize: 10, color: '#c25450', marginBottom: 4 }}>Problem</div>
          <div style={{ fontSize: 14, color: '#d4d4dc', fontFamily: "'DM Sans', sans-serif", marginBottom: 12 }}>{problem.text}</div>
          {(problem.solutions || []).length > 0 && (
            <div>
              <div style={{ ...S.label, fontSize: 10, color: '#c29a3c', marginBottom: 4 }}>Solutions Attempted</div>
              {problem.solutions.map((s) => (
                <div key={s.id} style={{ fontSize: 13, color: '#9a9ab0', fontFamily: "'DM Sans', sans-serif", padding: '2px 0', display: 'flex', gap: 6, alignItems: 'center' }}>
                  <span style={{ color: '#c29a3c', fontSize: 10 }}>{'\u2192'}</span> {s.text || '(empty)'}
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ marginBottom: 20 }}>
          <div style={S.label}>What ultimately solved it?</div>
          <textarea value={resolution} onChange={(e) => setResolution(e.target.value)} rows={4} placeholder="Describe the resolution, what worked, key takeaways..."
            style={{ ...S.inputBase, padding: '12px 14px', borderRadius: 10 }}
            onFocus={(e) => (e.target.style.borderColor = '#4a9e6e')} onBlur={(e) => (e.target.style.borderColor = '#3a3a50')} />
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ padding: '10px 24px', borderRadius: 10, border: '1.5px solid #3a3a50', background: 'transparent', color: '#9a9ab0', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Cancel</button>
          <button onClick={() => { if (resolution.trim()) onConfirm(resolution.trim()); }} style={{ padding: '10px 24px', borderRadius: 10, border: 'none', background: resolution.trim() ? 'linear-gradient(135deg, #4a9e6e, #5ec47e)' : '#3a3a4a', color: resolution.trim() ? '#fff' : '#7a7a8e', fontSize: 14, fontWeight: 700, cursor: resolution.trim() ? 'pointer' : 'default', fontFamily: "'DM Sans', sans-serif", transition: 'all 0.2s' }}>Mark Resolved</button>
        </div>
      </div>
    </div>
  );
}
