export default function WinLossTag({ type, editable, onToggle }) {
  const isWin = type === 'win';
  return (
    <button onClick={editable ? onToggle : undefined} style={{
      padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 800, fontFamily: "'DM Sans', sans-serif", letterSpacing: 0.8,
      background: isWin ? '#4a9e6e22' : '#c2545022', color: isWin ? '#5ec47e' : '#e06560',
      border: `1.5px solid ${isWin ? '#4a9e6e44' : '#c2545044'}`,
      cursor: editable ? 'pointer' : 'default', textTransform: 'uppercase', transition: 'all 0.15s ease', minWidth: 38, textAlign: 'center',
    }}>
      {isWin ? 'WIN' : 'LOSS'}
    </button>
  );
}
