const STORAGE_KEYS = {
  GUIDES: 'guides-data-v15',
  CHANGELOG: 'changelog-v15',
};

export { STORAGE_KEYS };

export async function loadStorage(key, fallback) {
  try {
    if (window.storage && window.storage.get) {
      const r = await window.storage.get(key);
      return r ? JSON.parse(r.value) : fallback;
    }
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

export async function saveStorage(key, value) {
  try {
    if (window.storage && window.storage.set) {
      await window.storage.set(key, JSON.stringify(value));
      return;
    }
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Storage save error:', e);
  }
}
