import { S } from '../../styles/theme';

export default function InlineInput({ value, onChange, editable, placeholder, style: xs }) {
  if (!editable) {
    return (
      <span style={{ fontSize: 13, color: value ? '#d4d4dc' : '#5a5a6e', fontFamily: "'DM Sans', sans-serif", ...xs }}>
        {value || placeholder || '\u2014'}
      </span>
    );
  }
  return (
    <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
      style={{ ...S.inputBase, padding: '5px 10px', fontSize: 13, ...xs }}
      onFocus={(e) => (e.target.style.borderColor = '#6366f1')}
      onBlur={(e) => (e.target.style.borderColor = '#3a3a50')} />
  );
}
