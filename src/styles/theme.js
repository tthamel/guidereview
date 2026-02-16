export const PROGRESS_OPTIONS = ['', '10%', '50%', '90%'];

export const PROGRESS_COLORS = {
  '': '#3a3a4a',
  '10%': '#c25450',
  '50%': '#c29a3c',
  '90%': '#4a9e6e',
};

export const PROGRESS_LABELS = {
  '': 'Not Set',
  '10%': 'Starting',
  '50%': 'In Progress',
  '90%': 'Nearly There',
};

export const CP_STATUSES = [
  { id: 'active', label: 'Active', color: '#6366f1' },
  { id: 'completed', label: 'Completed', color: '#4a9e6e' },
  { id: 'carried', label: 'Carried Forward', color: '#c29a3c' },
];

export const GROUPS = ['Wonderlab', 'LL', 'L1', 'L2', 'MS', 'HS'];

export const S = {
  label: {
    fontSize: 11,
    fontWeight: 700,
    color: '#7a7a8e',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 6,
    fontFamily: "'DM Sans', sans-serif",
  },
  card: {
    background: '#13131f',
    borderRadius: 16,
    border: '1px solid #2a2a3a',
    padding: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    margin: 0,
    fontSize: 17,
    fontWeight: 700,
    color: '#e4e4ec',
    fontFamily: "'Space Grotesk', sans-serif",
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  addBtn: (c = '#6366f1') => ({
    padding: '4px 12px',
    borderRadius: 8,
    border: `1.5px solid ${c}`,
    background: 'transparent',
    color: c,
    fontSize: 11,
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: "'DM Sans', sans-serif",
  }),
  removeBtn: {
    padding: '2px 7px',
    borderRadius: 6,
    border: '1px solid #c2545044',
    background: 'transparent',
    color: '#c25450',
    fontSize: 13,
    cursor: 'pointer',
    lineHeight: 1,
    fontWeight: 600,
  },
  inputBase: {
    width: '100%',
    padding: '7px 11px',
    borderRadius: 8,
    border: '1.5px solid #3a3a50',
    background: '#1a1a28',
    color: '#d4d4dc',
    fontSize: 13,
    fontFamily: "'DM Sans', sans-serif",
    lineHeight: 1.5,
    outline: 'none',
    transition: 'border-color 0.2s',
    resize: 'none',
    boxSizing: 'border-box',
  },
};
