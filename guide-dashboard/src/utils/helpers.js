export const genId = () => Math.random().toString(36).slice(2, 10);

export const fmtDate = (iso) => {
  if (!iso) return '\u2014';
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const snapshotGuide = (g) => ({
  coachingPoints: JSON.parse(JSON.stringify(g.coachingPoints || [])),
  threeCs: JSON.parse(JSON.stringify(g.threeCs)),
  feedback: JSON.parse(JSON.stringify(g.feedback || [])),
});

export const deepClone = (obj) => JSON.parse(JSON.stringify(obj));
