import { useState, useEffect } from 'react';
import { S } from './styles/theme';
import { useMediaQuery } from './hooks/useMediaQuery';
import { genId } from './utils/helpers';
import { STORAGE_KEYS, loadStorage, saveStorage } from './utils/storage';
import { DEFAULT_3CS, DEFAULT_COACHING_POINTS, DEFAULT_FEEDBACK } from './utils/defaults';
import { exportToExcel } from './utils/exportCsv';
import { DEMO_GUIDES } from './data/demoGuides';
import DashboardOverview from './components/dashboard/DashboardOverview';
import GuideDetail from './components/dashboard/GuideDetail';
import ChangelogView from './components/ChangelogView';
import AddGuideModal from './components/AddGuideModal';

export default function App() {
  const [guides, setGuides] = useState(DEMO_GUIDES);
  const [changelog, setChangelog] = useState([]);
  const [role, setRole] = useState('lead');
  const [userName, setUserName] = useState('Samantha DePalo');
  const [activeView, setActiveView] = useState('lead');
  const [view, setView] = useState('dashboard');
  const [selectedGuideId, setSelectedGuideId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const isMobile = useMediaQuery('(max-width: 680px)');

  useEffect(() => { (async () => { const sg = await loadStorage(STORAGE_KEYS.GUIDES, null); const sl = await loadStorage(STORAGE_KEYS.CHANGELOG, []); if (sg) setGuides(sg); if (sl) setChangelog(sl); setLoaded(true); })(); }, []);
  useEffect(() => { if (loaded) saveStorage(STORAGE_KEYS.GUIDES, guides); }, [guides, loaded]);
  useEffect(() => { if (loaded) saveStorage(STORAGE_KEYS.CHANGELOG, changelog); }, [changelog, loaded]);

  const handleSaveGuide = (updated) => {
    setGuides((prev) => prev.map((g) => (g.id === updated.id ? updated : g)));
    setChangelog((prev) => [...prev, { timestamp: new Date().toISOString(), userName, role, guideId: updated.id, guideName: updated.name, description: 'Updated guide information' }]);
    setView('dashboard'); setSelectedGuideId(null);
  };
  const handleAddGuide = (ng) => {
    setGuides((prev) => [...prev, ng]);
    setChangelog((prev) => [...prev, { timestamp: new Date().toISOString(), userName, role, guideId: ng.id, guideName: ng.name, description: 'Added new guide' }]);
  };
  const handleResetData = async () => { setGuides(DEMO_GUIDES); setChangelog([]); setRole('lead'); setUserName('Samantha DePalo'); setActiveView('lead'); setView('dashboard'); setSelectedGuideId(null); await saveStorage(STORAGE_KEYS.GUIDES, DEMO_GUIDES); await saveStorage(STORAGE_KEYS.CHANGELOG, []); };

  const effectiveRole = activeView === 'leadership' ? 'admin' : role;
  const selectedGuide = guides.find((g) => g.id === selectedGuideId);
  const existingLeads = [...new Set(guides.map((g) => g.leadGuide))];
  const filteredGuides = role === 'guide' ? guides.filter((g) => g.name === userName || g.leadGuide === userName) : guides;

  return (
    <div style={{ minHeight: '100vh', background: '#0d0d18', color: '#d4d4dc', fontFamily: "'DM Sans', sans-serif" }}>
      {/* Top Bar */}
      <div style={{ background: '#10101c', borderBottom: '1px solid #1e1e30', padding: isMobile ? '10px 16px' : '12px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100, backdropFilter: 'blur(12px)', flexWrap: 'wrap', gap: isMobile ? 8 : 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 10 : 16 }}>
          <div style={{ fontSize: isMobile ? 17 : 20, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", background: 'linear-gradient(135deg, #6366f1, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Guide 1:1</div>
          {!isMobile && <div style={{ width: 1, height: 24, background: '#2a2a3a' }} />}
          {['dashboard', 'changelog'].map((v) => (
            <button key={v} onClick={() => { setView(v); setSelectedGuideId(null); }} style={{ padding: isMobile ? '5px 10px' : '6px 16px', borderRadius: 8, border: 'none', background: view === v || (view === 'detail' && v === 'dashboard') ? '#6366f118' : 'transparent', color: view === v || (view === 'detail' && v === 'dashboard') ? '#818cf8' : '#7a7a8e', fontSize: isMobile ? 12 : 13, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>{v === 'dashboard' ? '\u25A3 Dashboard' : '\u25C7 History'}</button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 6 : 12 }}>
          {effectiveRole !== 'guide' && effectiveRole !== 'admin' && <button onClick={() => setShowAddModal(true)} style={S.addBtn('#4a9e6e')}>+ Add</button>}
          <div style={{ display: 'flex', gap: 4, background: '#1a1a28', borderRadius: 10, padding: 3 }}>
            {role === 'lead' ? (
              <>
                <button onClick={() => { setActiveView('lead'); setView('dashboard'); setSelectedGuideId(null); }} style={{ padding: '6px 14px', borderRadius: 8, border: 'none', background: activeView === 'lead' ? '#6366f1' : 'transparent', color: activeView === 'lead' ? '#fff' : '#7a7a8e', fontSize: isMobile ? 11 : 12, fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", transition: 'all 0.15s ease' }}>{'\u25C8'} {isMobile ? 'Lead' : 'Lead Guide'}</button>
                <button onClick={() => { setActiveView('leadership'); setView('dashboard'); setSelectedGuideId(null); }} style={{ padding: '6px 14px', borderRadius: 8, border: 'none', background: activeView === 'leadership' ? '#6366f1' : 'transparent', color: activeView === 'leadership' ? '#fff' : '#7a7a8e', fontSize: isMobile ? 11 : 12, fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", transition: 'all 0.15s ease' }}>{'\u25A3'} {isMobile ? 'Admin' : 'Leadership'}</button>
              </>
            ) : (
              <button style={{ padding: '6px 14px', borderRadius: 8, border: 'none', background: '#6366f1', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'default', fontFamily: "'DM Sans', sans-serif" }}>{'\u25C6'} Guide</button>
            )}
          </div>
          {!isMobile && <button onClick={() => exportToExcel(guides)} style={{ ...S.addBtn('#818cf8'), padding: '7px 16px' }}>{'\u2193'} Export</button>}
          {!isMobile && <button onClick={handleResetData} style={{ padding: '7px 12px', borderRadius: 10, border: '1px solid #3a3a50', background: 'transparent', color: '#5a5a6e', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Reset Demo</button>}
        </div>
      </div>

      {/* User Context */}
      <div style={{ background: '#12121e', borderBottom: '1px solid #1e1e30', padding: isMobile ? '8px 16px' : '8px 32px', display: 'flex', alignItems: 'center', gap: 12, fontSize: 13, flexWrap: 'wrap' }}>
        <span style={{ color: '#5a5a6e' }}>Signed in as:</span>
        <select value={userName} onChange={(e) => {
          const val = e.target.value;
          setUserName(val);
          if (existingLeads.includes(val)) { setRole('lead'); setActiveView('lead'); }
          else { setRole('guide'); setActiveView('guide'); }
          setView('dashboard'); setSelectedGuideId(null);
        }} style={{ background: '#1a1a28', border: '1px solid #2a2a3a', borderRadius: 6, color: '#d4d4dc', padding: '3px 8px', fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>
          {guides.map((g) => <option key={g.id} value={g.name}>{g.name} (Guide)</option>)}
          {existingLeads.map((l) => <option key={l} value={l}>{l} (Lead Guide)</option>)}
        </select>
        {!isMobile && <>
          <span style={{ color: '#3a3a50' }}>|</span>
          <span style={{ color: '#5a5a6e' }}>{effectiveRole === 'guide' ? 'You can edit your own dashboard' : effectiveRole === 'lead' ? 'You can edit dashboards for your guides' : 'Read-only overview'}</span>
        </>}
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '20px 14px 60px' : '28px 32px 60px' }}>
        {view === 'detail' && selectedGuide ? (
          <GuideDetail guide={selectedGuide} role={effectiveRole} onSave={handleSaveGuide} onBack={() => { setView('dashboard'); setSelectedGuideId(null); }} />
        ) : view === 'changelog' ? (
          <ChangelogView changelog={changelog} />
        ) : (
          <DashboardOverview guides={filteredGuides} role={effectiveRole} userName={userName} onSelect={(id) => { setSelectedGuideId(id); setView('detail'); }} onUpdateGuide={(updated) => {
            setGuides((prev) => prev.map((g) => (g.id === updated.id ? updated : g)));
            setChangelog((prev) => [...prev, { timestamp: new Date().toISOString(), userName, role: effectiveRole, guideId: updated.id, guideName: updated.name, description: 'Updated guide information' }]);
          }} />
        )}
      </div>

      {showAddModal && <AddGuideModal onAdd={handleAddGuide} onClose={() => setShowAddModal(false)} leads={existingLeads} />}
    </div>
  );
}
