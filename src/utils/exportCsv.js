import { fmtDate } from './helpers';

export function exportToExcel(guides) {
  const esc = (v) => {
    const s = String(v || '').replace(/"/g, '""');
    return s.includes(',') || s.includes('\n') || s.includes('"') ? `"${s}"` : s;
  };

  const headers = [
    'Guide Name', 'Group', 'Lead Guide', 'Coaching Points', 'Last Updated',
    'Love School Goal', 'Love School Progress', 'Love School Working On', 'Love School Completed',
    'Love School Wins', 'Love School Losses', 'Love School Problems', 'Love School Resolved',
    'Love School Resolutions', 'Love School Solutions',
    'Learn 2x Goal', 'Learn 2x Progress', 'Learn 2x Working On', 'Learn 2x Completed',
    'Learn 2x Wins', 'Learn 2x Losses', 'Learn 2x Problems', 'Learn 2x Resolved',
    'Learn 2x Resolutions', 'Learn 2x Solutions',
    'Life Skills Goal', 'Life Skills Progress', 'Life Skills Working On', 'Life Skills Completed',
    'Life Skills Wins', 'Life Skills Losses', 'Life Skills Problems', 'Life Skills Resolved',
    'Life Skills Resolutions', 'Life Skills Solutions',
    'Guide Growth Points', 'Feedback Items', 'Sessions',
  ];

  const extractSection = (sec) => {
    const wo = (sec.workingItems || []).filter((w) => !w.closed).map((w) => `${w.text}${w.progress ? ' (' + w.progress + ')' : ''}`).filter(Boolean).join('; ');
    const comp = (sec.workingItems || []).filter((w) => w.closed).map((w) => w.text).filter(Boolean).join('; ');
    const wins = (sec.workingItems || []).flatMap((w) => (w.winsLosses || []).filter((wl) => wl.type === 'win').map((wl) => wl.text)).filter(Boolean).join('; ');
    const losses = (sec.workingItems || []).flatMap((w) => (w.winsLosses || []).filter((wl) => wl.type === 'loss').map((wl) => wl.text)).filter(Boolean).join('; ');
    const probs = (sec.problemItems || []).filter((p) => !p.closed).map((p) => p.text).filter(Boolean).join('; ');
    const resolved = (sec.problemItems || []).filter((p) => p.closed).map((p) => p.text).filter(Boolean).join('; ');
    const resolutions = (sec.problemItems || []).filter((p) => p.closed && p.resolution).map((p) => `${p.text}: ${p.resolution}`).filter(Boolean).join('; ');
    const sols = (sec.problemItems || []).flatMap((p) => (p.solutions || []).map((s) => s.text)).filter(Boolean).join('; ');
    return [sec.goal || '', sec.progress, wo, comp, wins, losses, probs, resolved, resolutions, sols];
  };

  const rows = guides.map((g) => [
    g.name, g.group, g.leadGuide,
    (g.coachingPoints || []).map((cp) => `${cp.goal} [${cp.status}] (${(cp.tasks || []).filter((t) => t.done).length}/${(cp.tasks || []).length} tasks)`).join('; '),
    fmtDate(g.lastUpdated),
    ...extractSection(g.threeCs.loveSchool),
    ...extractSection(g.threeCs.learn2x),
    ...extractSection(g.threeCs.lifeSkills),
    (g.coachingPoints || []).map((cp) => `${cp.goal}: ${cp.progress || 'Not set'} - ${cp.feedback || 'No feedback'}`).join('; '),
    g.feedback.map((f) => `${f.topic}: ${(f.entries || []).map((e) => e.text).filter(Boolean).join(' | ')} // Notes: ${(Array.isArray(f.notes) ? f.notes : []).map((n) => n.text).filter(Boolean).join(' | ')} [${fmtDate(f.createdAt)}]`).join('; '),
    (g.sessions || []).map((s) => `${s.date}: ${s.summary || s.notes || 'No notes'} (by ${s.createdBy})`).join('; '),
  ]);

  const csv = [headers.map(esc).join(','), ...rows.map((r) => r.map(esc).join(','))].join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Guide_1-1_Dashboard_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
