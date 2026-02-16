import { PROGRESS_OPTIONS, PROGRESS_COLORS } from '../../styles/theme';

export default function ProgressPill({ value, editable, onChange }) {
  const color = PROGRESS_COLORS[value || ''];
  const display = value || 'Not Set';

  if (!editable) {
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 14px', borderRadius: 20, fontSize: 13, fontWeight: 600, background: color + '22', color, border: `1.5px solid ${color}44`, fontFamily: "'DM Sans', sans-serif" }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
        {display}
      </span>
    );
  }

  return (
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
      {PROGRESS_OPTIONS.map((opt) => (
        <button key={opt} onClick={() => onChange(opt)} style={{
          display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600,
          background: value === opt ? PROGRESS_COLORS[opt] + '30' : 'transparent',
          color: PROGRESS_COLORS[opt],
          border: `1.5px solid ${value === opt ? PROGRESS_COLORS[opt] : PROGRESS_COLORS[opt] + '44'}`,
          cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", transition: 'all 0.15s ease',
        }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: PROGRESS_COLORS[opt] }} />
          {opt || 'Not Set'}
        </button>
      ))}
    </div>
  );
}
