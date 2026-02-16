import { S } from '../../styles/theme';

export default function EditableField({ value, onChange, editable, placeholder, rows = 2, style: xs }) {
  if (!editable) {
    return (
      <div style={{ minHeight: 28, padding: '5px 0', fontSize: 13, color: value ? '#d4d4dc' : '#5a5a6e', whiteSpace: 'pre-wrap', lineHeight: 1.5, fontFamily: "'DM Sans', sans-serif", ...xs }}>
        {value || placeholder || '\u2014'}
      </div>
    );
  }
  return (
    <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} placeholder={placeholder} style={{ ...S.inputBase, ...xs }}
      onFocus={(e) => (e.target.style.borderColor = '#6366f1')}
      onBlur={(e) => (e.target.style.borderColor = '#3a3a50')} />
  );
}
