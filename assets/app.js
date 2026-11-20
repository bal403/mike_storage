const FEATURE_LOCK = {
  enabled: true,
  title: 'Feature Locked',
  message: 'Please BAYAD ANAY KAMO KAN VICTOR BEFORE INI MA unlock, SALAMAT.',
  lockedIds: ['newBtn', 'folderActionBtn', 'configDiskBtn'],
  defaultLockedRole: 'guest',
};

const state = {
  currentDir: 1,
  view: 'grid',
  path: '/',
  role: 'admin',
  selectedFile: null,
  activeTab: 'mydrive',
};

const $ = (s) => document.querySelector(s);

const ICONS = {
  folder: `<svg class="w-4 h-4 text-teal-600 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>`,
  folderLg: `<svg class="w-6 h-6 text-teal-600 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>`,
  home: `<svg class="w-4 h-4 text-teal-600 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6"/></svg>`,
  fileLg: `<svg class="w-6 h-6 text-slate-500 dark:text-slate-300 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>`,
  codeLg: `<svg class="w-6 h-6 text-indigo-500 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>`,
  execLg: `<svg class="w-6 h-6 text-amber-500 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>`,
  imgLg: `<svg class="w-6 h-6 text-emerald-500 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>`,
  eye: `<svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>`,
  download: `<svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>`,
  edit: `<svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>`,
  copy: `<svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>`,
  move: `<svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>`,
  trash: `<svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>`,
  lock: `<svg class="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>`,
  globe: `<svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"/></svg>`,
  share: `<svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>`,
  restore: `<svg class="w-4 h-4 text-teal-600 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/></svg>`,
  nuke: `<svg class="w-4 h-4 text-red-500 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>`,
  dots: `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>`,
  sun: `<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>`,
  moon: `<path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/>`,
  alertError: `<svg class="w-10 h-10 text-red-500 mx-auto" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`,
  alertSuccess: `<svg class="w-10 h-10 text-teal-600 mx-auto" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
  alertInfo: `<svg class="w-10 h-10 text-sky-500 mx-auto" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
};

const ENDPOINT_MAP = {
  whoami: 'api/auth.php',
  switch_user: 'api/auth.php',
  list_users: 'api/auth.php',
  list: 'api/directories.php',
  tree: 'api/directories.php',
  mkdir: 'api/directories.php',
  rmdir: 'api/directories.php',
  restore_dir: 'api/directories.php',
  delete_dir_forever: 'api/directories.php',
  rename_dir: 'api/directories.php',
  resolve: 'api/directories.php',
  create: 'api/files.php',
  read: 'api/files.php',
  edit: 'api/files.php',
  copy: 'api/files.php',
  delete: 'api/files.php',
  rename: 'api/files.php',
  chmod: 'api/files.php',
  blocks: 'api/files.php',
  restore: 'api/files.php',
  delete_forever: 'api/files.php',
  list_trash: 'api/files.php',
  list_public: 'api/directories.php',
  shared_with_me: 'api/share.php',
  share_dir: 'api/share.php',
  public_dir: 'api/directories.php',
  move: 'api/files.php',
  download: 'api/files.php',
  upload: 'api/files.php',
  bitmap: 'api/disk.php',
  stats: 'api/disk.php',
  configure: 'api/disk.php',
  blocks_of: 'api/disk.php',
  reset: 'api/disk.php',
};

function api(actionKey, opts = {}) {
  const actualAction = actionKey.split('&')[0];
  const base = ENDPOINT_MAP[actualAction];
  if (!base) return Promise.reject(new Error('Unknown action: ' + actualAction));

  const separator = base.includes('?') ? '&' : '?';
  const url = `${base}${separator}action=${actionKey}`;

  return fetch(url, { credentials: 'same-origin', ...opts }).then(async r => {
    const text = await r.text();
    try {
      const json = JSON.parse(text);
      if (!r.ok) throw new Error(json.error || `HTTP error! status: ${r.status}`);
      return json;
    } catch (e) {
      throw new Error(e.message || `Invalid JSON response: ${text.substring(0, 100)}`);
    }
  });
}

function showPopupModal(title, message, type = 'info') {
  const iconSvg = type === 'error' ? ICONS.alertError : (type === 'success' ? ICONS.alertSuccess : ICONS.alertInfo);
  openModal(title, `
    <div class="space-y-3 text-center py-2">
      <div>${iconSvg}</div>
      <div class="text-xs font-semibold text-slate-700 dark:text-slate-200 px-2 leading-relaxed">${escapeHtml(message)}</div>
    </div>
    <div class="flex justify-center mt-5">
      <button onclick="closeModal()" class="px-6 py-2.5 rounded-xl bg-teal-600 text-white text-xs font-semibold shadow-md hover:bg-teal-700 transition w-full sm:w-auto">OK</button>
    </div>
  `);
}
window.showPopupModal = showPopupModal;

function triggerFeatureLock(event) {
  if (!FEATURE_LOCK.enabled) return false;
  if (event) {
    event.preventDefault();
    event.stopPropagation();
    if (typeof event.stopImmediatePropagation === 'function') {
      event.stopImmediatePropagation();
    }
  }
  showPopupModal(FEATURE_LOCK.title, FEATURE_LOCK.message, 'error');
  return true;
}

function wireFeatureLock() {
  if (!FEATURE_LOCK.enabled) return;

  document.addEventListener('pointerdown', (event) => {
    if (!FEATURE_LOCK.enabled) return;
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;
    if (FEATURE_LOCK.lockedIds.some((id) => Boolean(target.closest(`#${id}`)))) {
      triggerFeatureLock(event);
    }
  }, true);

  document.addEventListener('click', (event) => {
    if (!FEATURE_LOCK.enabled) return;
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;
    if (FEATURE_LOCK.lockedIds.some((id) => Boolean(target.closest(`#${id}`)))) {
      triggerFeatureLock(event);
    }
  }, true);

  document.addEventListener('change', (event) => {
    if (!FEATURE_LOCK.enabled) return;
    const target = event.target instanceof Element ? event.target : null;
    if (target && target.id === 'roleSwitcher') {
      target.value = FEATURE_LOCK.defaultLockedRole;
      triggerFeatureLock(event);
    }
  }, true);

  document.addEventListener('drop', (event) => {
    if (!FEATURE_LOCK.enabled) return;
    const target = event.target instanceof Element ? event.target : null;
    if (target && target.closest('#dropZone')) {
      triggerFeatureLock(event);
    }
  }, true);
}

async function init() {
  wireFeatureLock();
  initTheme();
  wireMobileSidebar();
  wireSidebarTabs();

  try {
    const me = await api('whoami');
    state.role = me.role;
    const roleSwitcher = $('#roleSwitcher');
    if (roleSwitcher) roleSwitcher.value = me.role;
    applyRoleTheme(me.role);
  } catch (e) {
    console.error('Auth initialization error:', e);
  }

  await loadTree();
  await loadDir(1);
  await loadBitmap();

  wireDropZone();
  wireLaptopUpload();
  wireFolderActions();
  wireConfigureDisk();
}

function initTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  updateThemeIcon();

  const btn = document.getElementById('themeToggle');
  if (btn) {
    btn.onclick = () => {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateThemeIcon();
    };
  }
}

function updateThemeIcon() {
  const icon = document.getElementById('themeIcon');
  if (icon) {
    icon.innerHTML = document.documentElement.classList.contains('dark') ? ICONS.sun : ICONS.moon;
  }
}

function applyRoleTheme(role) {
  const sidebar = $('#sidebar');
  if (!sidebar) return;
  if (role === 'admin') {
    sidebar.style.borderRightColor = '#0d9488';
  } else if (role === 'user') {
    sidebar.style.borderRightColor = '#6366f1';
  } else {
    sidebar.style.borderRightColor = '#f59e0b';
  }
}

function positionNewMenuForMobile() {
  const menu = $('#newMenu');
  const btn = $('#newBtn');
  if (!menu || !btn || menu.classList.contains('hidden')) return;

  if (window.innerWidth < 768) {
    const rect = btn.getBoundingClientRect();
    menu.style.position = 'fixed';
    menu.style.right = '12px';
    menu.style.left = 'auto';
    menu.style.top = Math.min(window.innerHeight - 140, rect.bottom + 8) + 'px';
    menu.style.bottom = 'auto';
    menu.style.zIndex = '70';
  } else {
    menu.style.position = '';
    menu.style.left = '';
    menu.style.top = '';
    menu.style.right = '';
    menu.style.bottom = '';
    menu.style.zIndex = '';
  }
}

function openMobileSidebar() {
  const sidebar = $('#sidebar');
  const backdrop = $('#sidebarBackdrop');
  if (!sidebar) return;
  sidebar.style.position = 'fixed';
  sidebar.style.top = '0';
  sidebar.style.bottom = '0';
  sidebar.style.left = '0';
  sidebar.style.right = 'auto';
  sidebar.style.zIndex = '40';
  sidebar.style.transform = 'translateX(0)';
  sidebar.classList.remove('-translate-x-full', 'hidden');
  sidebar.classList.add('translate-x-0');

  if (backdrop) {
    backdrop.style.position = 'fixed';
    backdrop.style.inset = '0';
    backdrop.style.zIndex = '30';
    backdrop.classList.remove('hidden');
  }
  document.body.classList.add('overflow-hidden');
}

function closeMobileSidebar() {
  const sidebar = $('#sidebar');
  const backdrop = $('#sidebarBackdrop');
  $('#newMenu')?.classList.add('hidden');
  if (!sidebar) return;

  if (window.innerWidth < 768) {
    sidebar.style.transform = 'translateX(-100%)';
  } else {
    sidebar.style.position = '';
    sidebar.style.top = '';
    sidebar.style.bottom = '';
    sidebar.style.left = '';
    sidebar.style.right = '';
    sidebar.style.zIndex = '';
    sidebar.style.transform = '';
  }

  sidebar.classList.remove('translate-x-0');
  sidebar.classList.add('-translate-x-full');

  if (backdrop) {
    backdrop.classList.add('hidden');
  }
  document.body.classList.remove('overflow-hidden');
}

function syncSidebarLayoutByViewport() {
  const sidebar = $('#sidebar');
  const backdrop = $('#sidebarBackdrop');
  if (!sidebar) return;

  if (window.innerWidth >= 768) {
    sidebar.style.position = '';
    sidebar.style.top = '';
    sidebar.style.bottom = '';
    sidebar.style.left = '';
    sidebar.style.right = '';
    sidebar.style.zIndex = '';
    sidebar.style.transform = '';
    sidebar.classList.remove('-translate-x-full', 'translate-x-0', 'hidden');
    if (backdrop) backdrop.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  } else {
    if (!sidebar.classList.contains('translate-x-0')) {
      sidebar.style.position = 'fixed';
      sidebar.style.top = '0';
      sidebar.style.bottom = '0';
      sidebar.style.left = '0';
      sidebar.style.right = 'auto';
      sidebar.style.zIndex = '40';
      sidebar.style.transform = 'translateX(-100%)';
      sidebar.classList.add('-translate-x-full');
      if (backdrop) backdrop.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }
  }
  positionNewMenuForMobile();
}

function wireMobileSidebar() {
  syncSidebarLayoutByViewport();

  $('#menuBtn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    const sidebar = $('#sidebar');
    if (!sidebar) return;
    if (sidebar.classList.contains('translate-x-0')) {
      closeMobileSidebar();
    } else {
      openMobileSidebar();
    }
  });
  $('#closeSidebarBtn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    closeMobileSidebar();
  });
  $('#sidebarBackdrop')?.addEventListener('click', closeMobileSidebar);

  window.addEventListener('resize', syncSidebarLayoutByViewport);
}

const newBtn = $('#newBtn');
if (newBtn) {
  newBtn.onclick = (e) => {
    if (triggerFeatureLock(e)) return;
    e.stopPropagation();
    if (state.role !== 'admin') {
      closeMobileSidebar();
      showPopupModal("Access Denied", "You cannot create new files/folders. Admin only. Ask permission from admin.", "error");
      return;
    }
    const menu = $('#newMenu');
    if (!menu) return;
    menu.classList.toggle('hidden');
    if (!menu.classList.contains('hidden')) {
      positionNewMenuForMobile();
    }
  };
  document.addEventListener('click', (e) => {
    if (!$('#newMenu')?.contains(e.target) && e.target !== newBtn) {
      $('#newMenu')?.classList.add('hidden');
    }
    if (!$('#folderActionMenu')?.contains(e.target) && e.target !== $('#folderActionBtn')) {
      $('#folderActionMenu')?.classList.add('hidden');
    }
  });
  $('#newMenu')?.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    e.stopPropagation();
    $('#newMenu').classList.add('hidden');
    closeMobileSidebar();
    if (btn.dataset.action === 'new-folder') openNewFolderModal();
    if (btn.dataset.action === 'new-file') openNewFileModal();
  });
}

function wireFolderActions() {
  const btn = $('#folderActionBtn');
  const menu = $('#folderActionMenu');
  if (!btn || !menu) return;

  btn.onclick = (e) => {
    if (triggerFeatureLock(e)) return;
    e.stopPropagation();
    if (state.role !== 'admin') {
      showPopupModal("Access Denied", "Only Admin can execute folder actions. Ask permission from admin.", "error");
      return;
    }
    menu.classList.toggle('hidden');
  };

  menu.addEventListener('click', (e) => {
    const item = e.target.closest('[data-folder-act]');
    if (!item) return;
    menu.classList.add('hidden');
    const act = item.dataset.folderAct;
    if (act === 'new-folder') openNewFolderModal();
    if (act === 'new-file') openNewFileModal();
    if (act === 'browse-file') $('#laptopUploadInput')?.click();
  });
}

function wireConfigureDisk() {
  const btn = $('#configDiskBtn');
  if (!btn) return;
  btn.onclick = async (e) => {
    if (triggerFeatureLock(e)) return;
    closeMobileSidebar();
    if (state.role !== 'admin') {
      showPopupModal("Access Denied", "You don't have access to configure virtual disk. Admin only. Ask permission from admin.", "error");
      return;
    }
    const data = await api('bitmap');
    openModal('Configure Virtual Disk', `
      <div class="space-y-3 text-xs">
        <div>
          <label class="block text-slate-500 mb-1 font-medium">Total Disk Blocks</label>
          <input id="cfgTotalBlocks" type="number" min="16" max="256" value="${data.total}" class="w-full px-3 py-2.5 border rounded-xl dark:bg-slate-700 dark:border-slate-600 font-medium">
        </div>
        <div>
          <label class="block text-slate-500 mb-1 font-medium">Block Size (KB)</label>
          <input id="cfgBlockSize" type="number" min="1" max="64" value="${data.block_kb}" class="w-full px-3 py-2.5 border rounded-xl dark:bg-slate-700 dark:border-slate-600 font-medium">
        </div>
        <div class="text-[11px] text-amber-600 pt-1 font-medium">Note: Reconfiguring resets existing virtual files to prevent block corruption.</div>
      </div>
      <div class="flex justify-end gap-2 mt-5">
        <button onclick="closeModal()" class="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-xs font-semibold">Cancel</button>
        <button id="saveDiskCfgBtn" class="px-4 py-2 rounded-xl bg-teal-600 text-white text-xs font-semibold">Apply Configuration</button>
      </div>
    `);
    $('#saveDiskCfgBtn').onclick = async () => {
      const fd = new FormData();
      fd.append('total_blocks', $('#cfgTotalBlocks').value);
      fd.append('block_size_kb', $('#cfgBlockSize').value);
      const res = await api('configure', { method: 'POST', body: fd });
      if (res.ok) {
        closeModal();
        state.selectedFile = null;
        resetInspector();
        await loadDir(1);
        await loadBitmap();
      } else showPopupModal("Error", res.error || 'Failed to configure disk', 'error');
    };
  };
}

function resetInspector() {
  const el = $('#inspectorContent');
  if (el) {
    el.innerHTML = `<p class="text-[11px]">Click a file card to inspect attributes and allocated blocks.</p>`;
  }
}

function highlightFileBlocks(file) {
  document.querySelectorAll('#bitmap [data-block]').forEach(b => {
    b.classList.remove('block-selected', 'block-index');
  });
  if (!file) return;
  const blocks = file.blocks || [];
  blocks.forEach(idx => {
    const cell = document.querySelector(`#bitmap [data-block="${idx}"]`);
    if (cell) cell.classList.add('block-selected');
  });
  if (file.index_block !== null && file.index_block !== undefined) {
    const idxCell = document.querySelector(`#bitmap [data-block="${file.index_block}"]`);
    if (idxCell) idxCell.classList.add('block-index', 'block-selected');
  }
}

function renderInspector(file) {
  state.selectedFile = file;
  highlightFileBlocks(file);
  const el = $('#inspectorContent');
  if (!el || !file) return;

  const blocksList = (file.blocks || []).join(', ') || 'None';
  const indexInfo = file.allocation_type === 'indexed'
    ? ` · Index Block: <b>#${file.index_block}</b>`
    : '';
  const created = file.created_at ? escapeHtml(file.created_at) : '-';
  const updated = file.updated_at ? escapeHtml(file.updated_at) : '-';

  el.innerHTML = `
    <div class="space-y-1 text-[11px] leading-snug">
      <div class="font-bold text-slate-800 dark:text-slate-100 truncate">${escapeHtml(file.filename)} <span class="text-teal-600">(${file.size_kb} KB · ${escapeHtml((file.extension || 'file').toUpperCase())})</span></div>
      <div class="text-slate-500">Path: <span class="font-mono">${escapeHtml(file.location || state.path)}</span> · Alloc: <b class="uppercase">${escapeHtml(file.allocation_type)}</b>${indexInfo}</div>
      <div class="text-slate-500 truncate">Blocks: <span class="font-mono">[${escapeHtml(blocksList)}]</span> · Perms: <span class="font-mono">A:${escapeHtml(file.perm_admin || 'rwx')} U:${escapeHtml(file.perm_user || 'rw-')} G:${escapeHtml(file.perm_guest || 'r--')}</span></div>
      <div class="text-[10px] text-slate-400 truncate">Created: ${created} · Modified: ${updated}</div>
    </div>
  `;
}

function openModal(title, html) {
  $('#modalTitle').textContent = title;
  $('#modalBody').innerHTML = html;
  $('#modal')?.classList.remove('hidden');
}

function closeModal() { $('#modal')?.classList.add('hidden'); }
window.closeModal = closeModal;

const modalClose = $('#modalClose');
if (modalClose) modalClose.onclick = closeModal;

function openNewFolderModal() {
  if (state.role !== 'admin') {
    showPopupModal("Access Denied", "You cannot create folders. Admin only. Ask permission from admin.", "error");
    return;
  }
  openModal('Create New Folder', `
    <input id="folderName" placeholder="Enter folder name..." class="w-full px-3 py-3 border rounded-xl dark:bg-slate-700 dark:border-slate-600 text-xs font-medium">
    <div class="flex justify-end gap-2 mt-5">
      <button onclick="closeModal()" class="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-xs font-semibold">Cancel</button>
      <button id="createFolderBtn" class="px-4 py-2 rounded-xl bg-teal-600 text-white text-xs font-semibold">Create Folder</button>
    </div>
  `);
  $('#createFolderBtn').onclick = async () => {
    const name = $('#folderName').value.trim();
    if (!name) return;
    const fd = new FormData();
    fd.append('name', name);
    fd.append('parent_id', state.currentDir);
    const res = await api('mkdir', { method: 'POST', body: fd });
    if (res.ok) {
      closeModal();
      await loadTree();
      await loadDir(state.currentDir);
      await loadBitmap();
    } else showPopupModal("Error", res.error || 'Failed to create folder', 'error');
  };
}

function openNewFileModal() {
  if (state.role !== 'admin') {
    showPopupModal("Access Denied", "You cannot create files. Admin only. Ask permission from admin.", "error");
    return;
  }
  openModal('Create New Virtual File', `
    <input id="fName" placeholder="filename.txt" class="w-full px-3 py-3 border rounded-xl dark:bg-slate-700 dark:border-slate-600 mb-2.5 text-xs font-medium">
    <input id="fSize" type="number" min="1" value="4" placeholder="Size (KB)" class="w-full px-3 py-3 border rounded-xl dark:bg-slate-700 dark:border-slate-600 mb-2.5 text-xs font-medium">
    <textarea id="fContent" placeholder="Enter file content here..." rows="3" class="w-full px-3 py-3 border rounded-xl dark:bg-slate-700 dark:border-slate-600 mb-2.5 text-xs font-medium"></textarea>
    <select id="fAlloc" class="w-full px-3 py-3 border rounded-xl dark:bg-slate-700 dark:border-slate-600 mb-3 text-xs font-medium">
      <option value="contiguous">Contiguous Allocation</option>
      <option value="linked">Linked Allocation</option>
      <option value="indexed">Indexed Allocation</option>
    </select>

    <div class="text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5 mt-2">File Access Permissions (rwx):</div>
    <div class="grid grid-cols-3 gap-2 text-xs mb-4 bg-slate-50 dark:bg-slate-700/40 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
      <div>
        <div class="font-semibold text-slate-700 dark:text-slate-200 mb-1">Admin</div>
        <label class="flex items-center gap-1.5 py-1"><input type="checkbox" id="adm_r" checked> Read</label>
        <label class="flex items-center gap-1.5 py-1"><input type="checkbox" id="adm_w" checked> Write</label>
        <label class="flex items-center gap-1.5 py-1"><input type="checkbox" id="adm_x" checked> Execute</label>
      </div>
      <div>
        <div class="font-semibold text-slate-700 dark:text-slate-200 mb-1">User</div>
        <label class="flex items-center gap-1.5 py-1"><input type="checkbox" id="usr_r" checked> Read</label>
        <label class="flex items-center gap-1.5 py-1"><input type="checkbox" id="usr_w" checked> Write</label>
        <label class="flex items-center gap-1.5 py-1"><input type="checkbox" id="usr_x"> Execute</label>
      </div>
      <div>
        <div class="font-semibold text-slate-700 dark:text-slate-200 mb-1">Guest</div>
        <label class="flex items-center gap-1.5 py-1"><input type="checkbox" id="gst_r" checked> Read</label>
        <label class="flex items-center gap-1.5 py-1"><input type="checkbox" id="gst_w"> Write</label>
        <label class="flex items-center gap-1.5 py-1"><input type="checkbox" id="gst_x"> Execute</label>
      </div>
    </div>

    <div class="flex justify-end gap-2">
      <button onclick="closeModal()" class="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-xs font-semibold">Cancel</button>
      <button id="createFileBtn" class="px-4 py-2 rounded-xl bg-teal-600 text-white text-xs font-semibold">Create File</button>
    </div>
  `);

  $('#createFileBtn').onclick = async () => {
    const name = $('#fName').value.trim();
    if (!name) return;

    const getPerm = (rId, wId, xId) => {
      const r = $(rId).checked ? 'r' : '-';
      const w = $(wId).checked ? 'w' : '-';
      const x = $(xId).checked ? 'x' : '-';
      return r + w + x;
    };

    const fd = new FormData();
    fd.append('filename', name);
    fd.append('size_kb', $('#fSize').value || 1);
    fd.append('content', $('#fContent').value);
    fd.append('allocation_type', $('#fAlloc').value);
    fd.append('parent_id', state.currentDir);
    fd.append('perm_admin', getPerm('#adm_r', '#adm_w', '#adm_x'));
    fd.append('perm_user', getPerm('#usr_r', '#usr_w', '#usr_x'));
    fd.append('perm_guest', getPerm('#gst_r', '#gst_w', '#gst_x'));

    const res = await api('create', { method: 'POST', body: fd });
    if (res.ok) {
      closeModal();
      await loadDir(state.currentDir);
      await loadBitmap();
    } else showPopupModal("Error", res.error || 'Storage full or allocation failed', 'error');
  };
}

async function loadTree() {
  const treeEl = $('#tree');
  if (!treeEl) return;
  const { tree } = await api('tree');
  const byParent = {};
  tree.forEach(t => {
    if (t.is_root == 1) return;
    (byParent[t.parent_id] ||= []).push(t);
  });
  const build = (parent, depth) => {
    let html = '';
    (byParent[parent] || []).forEach(node => {
      const active = state.currentDir == node.id && state.activeTab === 'mydrive';
      html += `<li>
        <a href="#" data-dir="${node.id}" class="flex items-center gap-1.5 px-2.5 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition ${active ? 'bg-teal-50 dark:bg-slate-800 font-bold text-teal-600 dark:text-teal-400' : ''}" style="padding-left:${6 + depth * 10}px">
          ${ICONS.folder} <span class="truncate">${escapeHtml(node.name)}</span>
        </a>
        ${build(node.id, depth + 1)}
      </li>`;
    });
    return `<ul class="space-y-0.5">${html}</ul>`;
  };
  const rootActive = state.currentDir == 1 && state.activeTab === 'mydrive';
  treeEl.innerHTML = `
    <li><a href="#" data-dir="1" class="flex items-center gap-1.5 px-2.5 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition ${rootActive ? 'bg-teal-50 dark:bg-slate-800 font-bold text-teal-600 dark:text-teal-400' : ''}">
      ${ICONS.home} <span>Root</span>
    </a>${build(1, 1)}</li>`;
  treeEl.querySelectorAll('[data-dir]').forEach(a => {
    a.onclick = (e) => {
      e.preventDefault();
      setActiveNavTab('mydrive');
      loadDir(+a.dataset.dir);
      closeMobileSidebar();
    };
  });
}

async function loadDir(id) {
  state.activeTab = 'mydrive';
  state.currentDir = id;
  const data = await api(`list&dir_id=${id}`);
  state.path = data.path;
  renderBreadcrumb(data.path);
  renderItems(data);
  loadTree();
  const folderActionBtn = $('#folderActionBtn');
  if (folderActionBtn) folderActionBtn.classList.remove('hidden');
}

function renderBreadcrumb(path) {
  const parts = path.split('/').filter(Boolean);
  let html = `<a href="#" data-dir="1" class="text-teal-600 dark:text-teal-400 hover:underline shrink-0 font-semibold">Root</a>`;
  parts.forEach(p => {
    html += ` <span class="text-slate-400">/</span> <span class="truncate">${escapeHtml(p)}</span>`;
  });
  const bc = $('#breadcrumb');
  if (bc) bc.innerHTML = html;
  bc?.querySelector('[data-dir]')?.addEventListener('click', e => {
    e.preventDefault();
    setActiveNavTab('mydrive');
    loadDir(1);
  });
}

function renderItems(data) {
  const items = [];
  data.directories?.forEach(d => items.push({ kind: 'dir', ...d }));
  data.files?.forEach(f => items.push({ kind: 'file', ...f }));

  const emptyState = $('#emptyState');
  const itemsEl = $('#items');
  if (!itemsEl) return;

  if (items.length === 0) {
    emptyState?.classList.remove('hidden');
    itemsEl.innerHTML = '';
    return;
  }
  emptyState?.classList.add('hidden');

  const gridClass = state.view === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1';
  itemsEl.className = `grid ${gridClass} gap-3`;

  itemsEl.innerHTML = items.map(it => {
    const isDir = it.kind === 'dir';
    const icon = isDir ? ICONS.folderLg : iconFor(it.extension);
    const name = isDir ? it.name : it.filename;
    const sub = isDir ? 'Directory' : `${it.size_kb} KB · ${it.allocation_type}`;
    const encodedFile = !isDir ? encodeURIComponent(JSON.stringify(it)) : '';
    return `
      <div class="file-card bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 flex items-center gap-3 cursor-pointer hover:border-teal-400 transition shadow-xs"
           data-kind="${it.kind}" data-id="${it.id}" ${!isDir ? `data-file="${encodedFile}"` : ''}>
        <div class="p-2 rounded-xl bg-slate-100 dark:bg-slate-700/60 shrink-0">${icon}</div>
        <div class="min-w-0 flex-1">
          <div class="font-semibold text-xs sm:text-sm truncate">${escapeHtml(name)}</div>
          <div class="text-[11px] text-slate-500 truncate">${sub}</div>
        </div>
        <button type="button" aria-label="Item Actions" class="dots p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 shrink-0 rounded-lg">${ICONS.dots}</button>
      </div>`;
  }).join('');

  itemsEl.querySelectorAll('.file-card').forEach(card => {
    card.onclick = async (e) => {
      if (e.target.closest('.dots')) return;
      if (card.dataset.kind === 'dir') {
        loadDir(+card.dataset.id);
      } else {
        const fileId = +card.dataset.id;
        try {
          const parsed = JSON.parse(decodeURIComponent(card.dataset.file || '{}'));
          renderInspector(parsed);
        } catch (_) {}

        try {
          const readCheck = await api(`read&file_id=${fileId}`);
          if (!readCheck.ok) {
            showPopupModal("Access Denied", `You cannot view this file. Role '${state.role}' has no Read permission. Ask permission from admin.`, "error");
            return;
          }
          viewFileContent(fileId);
        } catch (err) {
          showPopupModal("Access Denied", "You don't have access to this file. Ask permission from admin.", "error");
        }
      }
    };

    const dots = card.querySelector('.dots');
    if (dots) {
      dots.onclick = async (e) => {
        e.stopPropagation();
        const fileId = +card.dataset.id;
        const kind = card.dataset.kind;

        let canWrite = false;
        if (kind === 'file') {
          try {
            const readCheck = await api(`read&file_id=${fileId}`);
            canWrite = readCheck.can_write || false;
          } catch (err) {
            canWrite = false;
          }
        } else {
          canWrite = (state.role === 'admin');
        }

        showContextMenu(e.clientX, e.clientY, kind, fileId, { canWrite, role: state.role });
      };
    }
  });
}

function iconFor(ext) {
  const e = (ext || '').toLowerCase();
  if (['js', 'php', 'html', 'css', 'json', 'py', 'cpp', 'c', 'sql'].includes(e)) return ICONS.codeLg;
  if (['exe', 'sh', 'bat', 'bin'].includes(e)) return ICONS.execLg;
  if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'].includes(e)) return ICONS.imgLg;
  return ICONS.fileLg;
}

function updateViewButtons() {
  const gridBtn = $('#viewGrid');
  const listBtn = $('#viewList');
  if (!gridBtn || !listBtn) return;

  if (state.view === 'grid') {
    gridBtn.className = 'flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600 font-bold';
    listBtn.className = 'flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 font-medium';
  } else {
    listBtn.className = 'flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600 font-bold';
    gridBtn.className = 'flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 font-medium';
  }
}

const viewList = $('#viewList');
const viewGrid = $('#viewGrid');
if (viewList) viewList.onclick = () => { state.view = 'list'; updateViewButtons(); loadDir(state.currentDir); };
if (viewGrid) viewGrid.onclick = () => { state.view = 'grid'; updateViewButtons(); loadDir(state.currentDir); };

const roleSwitcher = $('#roleSwitcher');
if (roleSwitcher) {
  roleSwitcher.onchange = async (e) => {
    const newRole = e.target.value;
    const fd = new FormData();
    fd.append('role', newRole);
    const res = await api('switch_user', { method: 'POST', body: fd });
    if (res.ok) {
      state.role = res.role;
      applyRoleTheme(res.role);

      if (res.role === 'admin') {
        showPopupModal("Welcome", "Welcome, Admin! Full system access granted.", "success");
      } else if (res.role === 'user') {
        showPopupModal("Welcome", "Welcome, User! Assigned permissions loaded.", "success");
      } else {
        showPopupModal("Welcome", "Welcome, Guest! View-only mode active.", "info");
      }

      if (state.activeTab === 'trash' && res.role !== 'admin') {
        setActiveNavTab('mydrive');
        await loadDir(1);
      } else if (state.activeTab === 'mydrive') {
        await loadDir(state.currentDir);
      } else if (state.activeTab === 'shared') {
        await showSharedView();
      } else if (state.activeTab === 'public') {
        await showPublicView();
      }
      await loadBitmap();
    } else showPopupModal("Error", res.error || 'Failed to switch user role', 'error');
  };
}

async function viewFileContent(id) {
  const read = await api(`read&file_id=${id}`);
  if (!read.ok) {
    showPopupModal("Access Denied", `You cannot read this file. Role '${state.role}' is not assigned with Read permission. Ask permission from admin.`, "error");
    return;
  }
  const f = read.file;
  renderInspector(f);
  openModal(`File Viewer: ${f.filename}`, `
    <div class="space-y-3 text-xs">
      <div class="p-3.5 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-700 max-h-60 overflow-y-auto whitespace-pre-wrap font-mono">${escapeHtml(f.content || '(empty file)')}</div>
      <div class="flex flex-wrap justify-end gap-2 pt-2">
        <button onclick="window.executeFile(${f.id}, ${read.can_exec ? 'true' : 'false'})" class="px-3.5 py-2 rounded-xl bg-indigo-600 text-white font-semibold">Run (x)</button>
        ${read.can_write ? `<button onclick="closeModal(); openEditFileModal(${f.id}, true);" class="px-4 py-2 rounded-xl bg-teal-600 text-white font-semibold">Edit Content</button>` : ''}
        <button onclick="closeModal()" class="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-xs font-semibold">Close</button>
      </div>
    </div>
  `);
}

window.openEditFileModal = async (id, canWrite) => {
  if (!canWrite) {
    showPopupModal("Access Denied", `You cannot edit this file. Role '${state.role}' has no Write permission. Ask permission from admin.`, "error");
    return;
  }
  const read = await api(`read&file_id=${id}`);
  const f = read.file;
  openModal(`Edit File: ${f.filename}`, `
    <textarea id="editFileContent" rows="6" class="w-full px-3 py-3 border rounded-xl dark:bg-slate-700 dark:border-slate-600 mb-3 text-xs font-mono">${escapeHtml(f.content || '')}</textarea>
    <div class="flex justify-end gap-2">
      <button onclick="closeModal()" class="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-xs font-semibold">Cancel</button>
      <button id="saveEditBtn" class="px-4 py-2 rounded-xl bg-teal-600 text-white text-xs font-semibold">Save Changes</button>
    </div>
  `);
  $('#saveEditBtn').onclick = async () => {
    const fd = new FormData();
    fd.append('file_id', id);
    fd.append('content', $('#editFileContent').value);
    const res = await api('edit', { method: 'POST', body: fd });
    if (res.ok) {
      closeModal();
      showPopupModal("Success", "File updated and saved successfully!", "success");
      await loadDir(state.currentDir);
    } else showPopupModal("Access Denied", res.error || 'Failed to save changes. Ask permission from admin.', 'error');
  };
};

window.executeFile = (id, canExec) => {
  if (!canExec) {
    showPopupModal("Access Denied", `You cannot execute this file. Role '${state.role}' lacks Execute (x) permission. Ask permission from admin.`, "error");
    return;
  }
  showPopupModal("Execution Success", `Executing virtual file ID #${id} in simulated OS environment... Execution completed successfully.`, "success");
};

async function loadBitmap() {
  try {
    const data = await api('bitmap');
    const total = data.total;
    const blockKb = data.block_kb || 4;
    const free = data.blocks.filter(b => b == 0).length;
    const used = total - free;
    const pct = Math.round((used / total) * 100);

    const totalKb = total * blockKb;
    const usedKb = used * blockKb;
    const availKb = free * blockKb;

    const bitmapEl = $('#bitmap');
    const detailsEl = $('#storageDetails');
    const barEl = $('#storageBar');

    if (bitmapEl) {
      bitmapEl.innerHTML = data.blocks.map((occ, i) =>
        `<div class="${occ == 1 ? 'block-occupied' : 'block-free'}" data-block="${i}" title="Block ${i}">${i}</div>`
      ).join('');
    }

    if (detailsEl) {
      detailsEl.innerHTML = `
        <div class="flex justify-between"><span>Used: <b>${usedKb} KB</b></span><span>Free: <b>${availKb} KB</b></span></div>
        <div class="text-[9px] text-slate-400">Total Capacity: ${totalKb} KB (${used}/${total} blocks · ${pct}%)</div>
      `;
    }

    if (barEl) {
      barEl.style.width = `${pct}%`;
      barEl.className = `h-full transition-all ${pct >= 85 ? 'bg-red-500' : 'bg-teal-600'}`;
    }

    if (state.selectedFile) {
      highlightFileBlocks(state.selectedFile);
    }
  } catch (err) {
    console.error('Failed to load bitmap:', err);
  }
}

const ctxMenu = document.getElementById('ctxMenu');

function showContextMenu(x, y, kind, id, opts = {}) {
  if (!ctxMenu) return;
  const items = [];
  const role = opts.role || state.role;
  const canWrite = opts.canWrite || false;

  if (kind === 'trash_file') {
    if (role === 'admin') {
      items.push({ icon: ICONS.restore, label: 'Recover / Restore', fn: () => restoreTrashFile(id) });
      items.push({ icon: ICONS.nuke, label: 'Delete Permanently', fn: () => nukeTrashFile(id) });
    }
  } else if (kind === 'trash_dir') {
    if (role === 'admin') {
      items.push({ icon: ICONS.restore, label: 'Recover Folder', fn: () => restoreTrashDir(id) });
      items.push({ icon: ICONS.nuke, label: 'Delete Permanently', fn: () => nukeTrashDir(id) });
    }
  } else if (kind === 'file') {
    items.push({ icon: ICONS.eye, label: 'View Content', fn: () => viewFileContent(id) });
    items.push({ icon: ICONS.download, label: 'Download File', fn: () => window.open(`api/files.php?action=download&file_id=${id}`) });

    if (canWrite) {
      items.push({ icon: ICONS.edit, label: 'Edit Content', fn: () => window.openEditFileModal(id, true) });
      items.push({ icon: ICONS.copy, label: 'Copy File', fn: () => copyFile(id) });
      items.push({ icon: ICONS.edit, label: 'Rename File', fn: () => promptRename(id, canWrite) });
      items.push({ icon: ICONS.move, label: 'Move to...', fn: () => promptMoveModal(id, canWrite) });
      items.push({ icon: ICONS.trash, label: 'Move to Trash', fn: () => trashItem(id, canWrite) });
    } else {
      items.push({
        icon: ICONS.lock,
        label: 'Edit (Locked - View Only)',
        fn: () => showPopupModal("Access Denied", `You can't edit. Role '${role}' has no Write permission. Ask permission from admin.`, "error")
      });
      items.push({
        icon: ICONS.lock,
        label: 'Move to Trash (Locked)',
        fn: () => showPopupModal("Access Denied", "You can't delete files. Admin only or write permission required. Ask permission from admin.", "error")
      });
    }
  } else if (kind === 'dir') {
    items.push({ icon: ICONS.folder, label: 'Open Folder', fn: () => loadDir(id) });

    if (role === 'admin' || canWrite) {
      items.push({ icon: ICONS.globe, label: 'Make Folder Public', fn: () => makeFolderPublic(id) });
      items.push({ icon: ICONS.share, label: 'Share Folder', fn: () => promptShareFolder(id) });
      items.push({ icon: ICONS.edit, label: 'Rename Folder', fn: () => promptRenameDir(id) });
      items.push({ icon: ICONS.trash, label: 'Move to Trash', fn: () => trashDirectory(id) });
    } else {
      items.push({
        icon: ICONS.lock,
        label: 'Folder Options (Locked)',
        fn: () => showPopupModal("Access Denied", "You cannot modify this folder. Admin only. Ask permission from admin.", "error")
      });
    }
  }

  ctxMenu.innerHTML = items.map((it, i) =>
    `<button data-i="${i}" class="w-full text-left px-3 py-2.5 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2.5 text-xs sm:text-sm">${it.icon} <span>${it.label}</span></button>`
  ).join('');

  ctxMenu.querySelectorAll('button').forEach((b, i) => {
    b.onclick = () => { ctxMenu.classList.add('hidden'); items[i].fn(); };
  });

  const isMobile = window.innerWidth <= 768;
  if (!isMobile) {
    const menuW = 230;
    const menuH = items.length * 38;
    ctxMenu.style.position = '';
    ctxMenu.style.right = '';
    ctxMenu.style.bottom = '';
    ctxMenu.style.width = '';
    ctxMenu.style.left = Math.max(8, Math.min(x, window.innerWidth - menuW - 8)) + 'px';
    ctxMenu.style.top  = Math.max(8, Math.min(y, window.innerHeight - menuH - 8)) + 'px';
  } else {
    ctxMenu.style.position = 'fixed';
    ctxMenu.style.left = '12px';
    ctxMenu.style.right = '12px';
    ctxMenu.style.bottom = '12px';
    ctxMenu.style.top = 'auto';
    ctxMenu.style.width = 'auto';
  }
  ctxMenu.classList.remove('hidden');
}

document.addEventListener('click', (e) => {
  if (ctxMenu && !ctxMenu.contains(e.target)) ctxMenu.classList.add('hidden');
});

async function makeFolderPublic(dirId) {
  const fd = new FormData();
  fd.append('dir_id', dirId);
  fd.append('is_public', '1');
  const res = await api('public_dir', { method: 'POST', body: fd }).catch(() => ({ ok: true }));
  if (res.ok) {
    showPopupModal("Success", "Folder has been made public! It is now visible in 'Public Files'.", "success");
  } else {
    showPopupModal("Error", res.error || "Failed to make folder public.", "error");
  }
}

async function promptShareFolder(dirId) {
  openModal('Share Folder', `
    <div class="space-y-3 text-xs">
      <p class="text-slate-500">Enter target username or device ID:</p>
      <input id="shareTargetUser" placeholder="e.g. student_02" class="w-full px-3 py-3 border rounded-xl dark:bg-slate-700 dark:border-slate-600 font-medium">
      <div>
        <label class="block text-slate-500 mb-1 font-medium">Permission Level:</label>
        <select id="sharePermLevel" class="w-full px-3 py-3 border rounded-xl dark:bg-slate-700 dark:border-slate-600 font-medium">
          <option value="r--">Read Only (r--)</option>
          <option value="rw-">Read & Write (rw-)</option>
          <option value="rwx">Full Control (rwx)</option>
        </select>
      </div>
    </div>
    <div class="flex justify-end gap-2 mt-5">
      <button onclick="closeModal()" class="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-xs font-semibold">Cancel</button>
      <button id="confirmShareBtn" class="px-4 py-2 rounded-xl bg-teal-600 text-white text-xs font-semibold">Share Folder</button>
    </div>
  `);

  $('#confirmShareBtn').onclick = async () => {
    const targetUser = $('#shareTargetUser').value.trim();
    const perm = $('#sharePermLevel').value;
    if (!targetUser) {
      showPopupModal("Validation Error", "Please enter a target username.", "error");
      return;
    }

    const fd = new FormData();
    fd.append('dir_id', dirId);
    fd.append('target_user', targetUser);
    fd.append('permission', perm);

    const res = await api('share_dir', { method: 'POST', body: fd }).catch(() => ({ ok: true }));
    if (res.ok) {
      closeModal();
      showPopupModal("Success", `Folder shared with '${targetUser}'!`, "success");
    } else {
      showPopupModal("Error", res.error || 'Failed to share folder.', 'error');
    }
  };
}

async function copyFile(id) {
  const fd = new FormData();
  fd.append('file_id', id);
  fd.append('parent_id', state.currentDir);
  const res = await api('copy', { method: 'POST', body: fd });
  if (res.ok) {
    await loadDir(state.currentDir);
    await loadBitmap();
  } else showPopupModal("Access Denied", res.error || 'Copy failed. Ask permission from admin.', 'error');
}

async function promptRename(id, canWrite) {
  if (!canWrite) {
    showPopupModal("Access Denied", "You can't rename this file. Write permission required. Ask permission from admin.", "error");
    return;
  }
  openModal('Rename File', `
    <input id="newFilenameInput" placeholder="Enter new filename..." class="w-full px-3 py-3 border rounded-xl dark:bg-slate-700 dark:border-slate-600 text-xs font-medium">
    <div class="flex justify-end gap-2 mt-5">
      <button onclick="closeModal()" class="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-xs font-semibold">Cancel</button>
      <button id="confirmRenameBtn" class="px-4 py-2 rounded-xl bg-teal-600 text-white text-xs font-semibold">Rename</button>
    </div>
  `);
  $('#confirmRenameBtn').onclick = async () => {
    const name = $('#newFilenameInput').value.trim();
    if (!name) return;
    const fd = new FormData();
    fd.append('file_id', id);
    fd.append('filename', name);
    const res = await api('rename', { method: 'POST', body: fd });
    if (res.ok) {
      closeModal();
      await loadDir(state.currentDir);
    } else showPopupModal("Access Denied", res.error || 'Failed to rename file. Ask permission from admin.', 'error');
  };
}

async function promptRenameDir(id) {
  if (state.role !== 'admin') {
    showPopupModal("Access Denied", "You can't rename folders. Admin only. Ask permission from admin.", "error");
    return;
  }
  openModal('Rename Folder', `
    <input id="newDirnameInput" placeholder="Enter new folder name..." class="w-full px-3 py-3 border rounded-xl dark:bg-slate-700 dark:border-slate-600 text-xs font-medium">
    <div class="flex justify-end gap-2 mt-5">
      <button onclick="closeModal()" class="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-xs font-semibold">Cancel</button>
      <button id="confirmRenameDirBtn" class="px-4 py-2 rounded-xl bg-teal-600 text-white text-xs font-semibold">Rename</button>
    </div>
  `);
  $('#confirmRenameDirBtn').onclick = async () => {
    const name = $('#newDirnameInput').value.trim();
    if (!name) return;
    const fd = new FormData();
    fd.append('dir_id', id);
    fd.append('name', name);
    const res = await api('rename_dir', { method: 'POST', body: fd });
    if (res.ok) {
      closeModal();
      await loadTree();
      await loadDir(state.currentDir);
    } else showPopupModal("Access Denied", res.error || 'Failed to rename folder. Ask permission from admin.', 'error');
  };
}

async function promptMoveModal(id, canWrite) {
  if (!canWrite) {
    showPopupModal("Access Denied", "You can't move this file. Write permission required. Ask permission from admin.", "error");
    return;
  }
  const { tree } = await api('tree');
  let optionsHtml = `<option value="1">Root (/)</option>`;
  tree.forEach(node => {
    if (node.is_root != 1) {
      optionsHtml += `<option value="${node.id}">${escapeHtml(node.name)} (ID: ${node.id})</option>`;
    }
  });

  openModal('Move File to Destination', `
    <div class="space-y-2 text-xs">
      <label class="block text-slate-500 font-medium">Select destination folder:</label>
      <select id="targetDirSelect" class="w-full px-3 py-3 border rounded-xl dark:bg-slate-700 dark:border-slate-600 font-medium">
        ${optionsHtml}
      </select>
    </div>
    <div class="flex justify-end gap-2 mt-5">
      <button onclick="closeModal()" class="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-xs font-semibold">Cancel</button>
      <button id="confirmMoveBtn" class="px-4 py-2 rounded-xl bg-teal-600 text-white text-xs font-semibold">Move File</button>
    </div>
  `);

  $('#confirmMoveBtn').onclick = async () => {
    const targetId = $('#targetDirSelect').value;
    const fd = new FormData();
    fd.append('file_id', id);
    fd.append('parent_id', targetId);
    const res = await api('move', { method: 'POST', body: fd });
    if (res.ok) {
      closeModal();
      await loadDir(state.currentDir);
    } else {
      showPopupModal("Access Denied", res.error || 'Failed to move file. Ask permission from admin.', 'error');
    }
  };
}

async function trashItem(id, canWrite) {
  if (!canWrite) {
    showPopupModal("Access Denied", "You can't move this file to trash. Write permission required. Ask permission from admin.", "error");
    return;
  }
  const fd = new FormData(); fd.append('file_id', id);
  const res = await api('delete', { method: 'POST', body: fd });
  if (res.error) {
    showPopupModal("Access Denied", res.error + ". Ask permission from admin.", "error");
  } else {
    showPopupModal("Success", "File moved to trash successfully.", "success");
  }
  await loadDir(state.currentDir); await loadBitmap();
}

async function trashDirectory(id) {
  if (state.role !== 'admin') {
    showPopupModal("Access Denied", "You can't delete folders. Admin only. Ask permission from admin.", "error");
    return;
  }
  const fd = new FormData(); fd.append('dir_id', id);
  const res = await api('rmdir', { method: 'POST', body: fd });
  if (res.error) {
    showPopupModal("Access Denied", res.error + ". Ask permission from admin.", "error");
  } else {
    showPopupModal("Success", "Folder moved to trash successfully.", "success");
  }
  await loadTree(); await loadDir(state.currentDir); await loadBitmap();
}

async function restoreTrashFile(id) {
  if (state.role !== 'admin') {
    showPopupModal("Access Denied", "Admin only. Ask permission from admin.", "error");
    return;
  }
  const fd = new FormData(); fd.append('file_id', id);
  const res = await api('restore', { method: 'POST', body: fd });
  if (res.ok) {
    showPopupModal("Success", "File restored successfully.", "success");
    await showTrashView();
    await loadBitmap();
  } else showPopupModal("Error", res.error || 'Restore failed', 'error');
}

async function nukeTrashFile(id) {
  if (state.role !== 'admin') {
    showPopupModal("Access Denied", "Admin only. Ask permission from admin.", "error");
    return;
  }
  openModal('Permanent Delete', `
    <div class="text-xs text-slate-600 dark:text-slate-300 py-2">Permanently delete this file and free disk blocks? This cannot be undone.</div>
    <div class="flex justify-end gap-2 mt-5">
      <button onclick="closeModal()" class="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-xs font-semibold">Cancel</button>
      <button id="confirmNukeBtn" class="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-semibold">Delete Forever</button>
    </div>
  `);
  $('#confirmNukeBtn').onclick = async () => {
    closeModal();
    const fd = new FormData(); fd.append('file_id', id);
    const res = await api('delete_forever', { method: 'POST', body: fd });
    if (res.ok) {
      showPopupModal("Success", "File permanently deleted.", "success");
      await showTrashView();
      await loadBitmap();
    } else showPopupModal("Error", res.error || 'Permanent delete failed', 'error');
  };
}

async function restoreTrashDir(id) {
  if (state.role !== 'admin') {
    showPopupModal("Access Denied", "Admin only. Ask permission from admin.", "error");
    return;
  }
  const fd = new FormData(); fd.append('dir_id', id);
  const res = await api('restore_dir', { method: 'POST', body: fd });
  if (res.ok) {
    showPopupModal("Success", "Folder restored successfully.", "success");
    await loadTree();
    await showTrashView();
  } else showPopupModal("Error", res.error || 'Restore folder failed', 'error');
}

async function nukeTrashDir(id) {
  if (state.role !== 'admin') {
    showPopupModal("Access Denied", "Admin only. Ask permission from admin.", "error");
    return;
  }
  openModal('Permanent Delete Folder', `
    <div class="text-xs text-slate-600 dark:text-slate-300 py-2">Permanently delete this folder?</div>
    <div class="flex justify-end gap-2 mt-5">
      <button onclick="closeModal()" class="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-xs font-semibold">Cancel</button>
      <button id="confirmNukeDirBtn" class="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-semibold">Delete Forever</button>
    </div>
  `);
  $('#confirmNukeDirBtn').onclick = async () => {
    closeModal();
    const fd = new FormData(); fd.append('dir_id', id);
    const res = await api('delete_dir_forever', { method: 'POST', body: fd });
    if (res.ok) {
      showPopupModal("Success", "Folder permanently deleted.", "success");
      await loadTree();
      await showTrashView();
    } else showPopupModal("Error", res.error || 'Permanent delete folder failed', 'error');
  };
}

function setActiveNavTab(tab) {
  state.activeTab = tab;
  const pairs = {
    mydrive: ['navMyDrive', 'navMyDriveMob'],
    shared: ['navShared', 'navSharedMob'],
    public: ['navPublic', 'navPublicMob'],
    trash: ['navTrash', 'navTrashMob'],
  };

  Object.entries(pairs).forEach(([key, ids]) => {
    const isActive = key === tab;
    ids.forEach((id, idx) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (idx === 0) {
        el.className = isActive
          ? 'flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 dark:bg-slate-800 text-teal-600 dark:text-teal-400 font-bold transition'
          : 'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-teal-600 transition';
      } else {
        el.className = isActive
          ? 'flex items-center gap-2 px-3 py-2.5 rounded-xl bg-teal-50 dark:bg-slate-800 text-teal-600 dark:text-teal-400'
          : 'flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800';
      }
    });
  });
}

function wireSidebarTabs() {
  const runNav = async (tabKey, actionFn, checkAdmin = false) => {
    if (checkAdmin && state.role !== 'admin') {
      closeMobileSidebar();
      showPopupModal("Access Denied", "Recycle Bin is restricted to Admin. Ask permission from admin.", "error");
      return;
    }
    setActiveNavTab(tabKey);
    closeMobileSidebar();
    await actionFn();
  };

  const bindPair = (tabKey, desktopId, mobileId, actionFn, checkAdmin = false) => {
    [desktopId, mobileId].forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      el.onclick = (e) => {
        e.preventDefault();
        runNav(tabKey, actionFn, checkAdmin);
      };
    });
  };

  bindPair('mydrive', 'navMyDrive', 'navMyDriveMob', () => loadDir(1));
  bindPair('shared', 'navShared', 'navSharedMob', () => showSharedView());
  bindPair('public', 'navPublic', 'navPublicMob', () => showPublicView());
  bindPair('trash', 'navTrash', 'navTrashMob', () => showTrashView(), true);
}

async function showSharedView() {
  $('#folderActionBtn')?.classList.add('hidden');
  $('#breadcrumb').innerHTML = `<span>Shared with me</span>`;
  try {
    const data = await api('shared_with_me');
    const itemsList = data.items || [];
    const items = $('#items');
    if (!itemsList.length) {
      $('#emptyState')?.classList.add('hidden');
      items.innerHTML = `<div class="col-span-full text-center py-16 text-slate-400 text-xs font-medium">No shared items found.</div>`;
      return;
    }
    $('#emptyState')?.classList.add('hidden');
    items.innerHTML = itemsList.map(it => {
      const isDir = it.resource_type === 'directory';
      const name = isDir ? (it.dir_name || 'Shared Folder') : (it.filename || 'Shared File');
      const icon = isDir ? ICONS.folderLg : ICONS.fileLg;
      return `
        <div class="file-card bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
          <div class="p-2 rounded-xl bg-slate-100 dark:bg-slate-700/60 shrink-0">${icon}</div>
          <div class="min-w-0 flex-1">
            <div class="font-semibold text-xs sm:text-sm truncate">${escapeHtml(name)}</div>
            <div class="text-[11px] text-teal-600 dark:text-teal-400 font-semibold mt-0.5">
              Shared as <span class="uppercase font-bold">${escapeHtml(it.shared_with_role)}</span> · Access: <span class="font-mono bg-slate-100 dark:bg-slate-700 px-1 rounded">${escapeHtml(it.permission || 'r--')}</span>
            </div>
          </div>
        </div>`;
    }).join('');
  } catch (err) {
    console.error('Shared view error:', err);
  }
}

async function showPublicView() {
  $('#folderActionBtn')?.classList.add('hidden');
  $('#breadcrumb').innerHTML = `<span>Public Files</span>`;
  try {
    const data = await api('list_public');
    const allItems = [
      ...(data.directories || []).map(d => ({ kind: 'dir', ...d, label: d.name })),
      ...(data.files || []).map(f => ({ kind: 'file', ...f, label: f.filename })),
    ];
    const items = $('#items');
    if (!allItems.length) {
      $('#emptyState')?.classList.add('hidden');
      items.innerHTML = `<div class="col-span-full text-center py-16 text-slate-400 text-xs font-medium">No public files found.</div>`;
      return;
    }
    $('#emptyState')?.classList.add('hidden');
    items.innerHTML = allItems.map(it => `
      <div class="file-card bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 flex items-center gap-3">
        <div class="p-2 rounded-xl bg-slate-100 dark:bg-slate-700/60 shrink-0">${it.kind === 'dir' ? ICONS.folderLg : iconFor(it.extension)}</div>
        <div class="min-w-0 flex-1">
          <div class="font-semibold text-xs sm:text-sm truncate">${escapeHtml(it.label)}</div>
          <div class="text-[11px] text-teal-600 font-semibold">Publicly Accessible</div>
        </div>
      </div>`).join('');
  } catch (err) {
    console.error('Public view error:', err);
  }
}

async function showTrashView() {
  $('#folderActionBtn')?.classList.add('hidden');
  $('#breadcrumb').innerHTML = `<span>Recycle Bin / Trash</span>`;
  try {
    const data = await api('list_trash');
    const allItems = [
      ...(data.directories || []).map(d => ({ kind: 'dir', ...d, label: d.name })),
      ...(data.files || []).map(f => ({ kind: 'file', ...f, label: f.filename })),
    ];
    const items = $('#items');
    if (!allItems.length) {
      $('#emptyState')?.classList.add('hidden');
      items.innerHTML = `<div class="col-span-full text-center py-16 text-slate-400 text-xs font-medium">Recycle Bin is empty.</div>`;
      return;
    }
    $('#emptyState')?.classList.add('hidden');
    items.innerHTML = allItems.map(it => `
      <div class="file-card bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 flex items-center gap-3 cursor-pointer"
           data-kind="${it.kind === 'file' ? 'trash_file' : 'trash_dir'}" data-id="${it.id}">
        <div class="p-2 rounded-xl bg-slate-100 dark:bg-slate-700/60 shrink-0">${it.kind === 'dir' ? ICONS.folderLg : iconFor(it.extension)}</div>
        <div class="min-w-0 flex-1">
          <div class="font-semibold text-xs sm:text-sm truncate">${escapeHtml(it.label)}</div>
          <div class="text-[11px] text-slate-500">${it.kind === 'file' ? `${it.size_kb} KB · Trashed` : 'Folder · Trashed'}</div>
        </div>
        <button type="button" aria-label="Trash Item Actions" class="dots p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 shrink-0 rounded-lg">${ICONS.dots}</button>
      </div>
    `).join('');

    items.querySelectorAll('.file-card').forEach(card => {
      const dots = card.querySelector('.dots');
      if (dots) {
        dots.onclick = (e) => {
          e.stopPropagation();
          showContextMenu(e.clientX, e.clientY, card.dataset.kind, +card.dataset.id);
        };
      }
    });
  } catch (err) {
    console.error('Trash view error:', err);
  }
}

function wireDropZone() {
  const dropZone = document.getElementById('dropZone');
  if (!dropZone) return;
  ['dragenter', 'dragover'].forEach(ev =>
    dropZone.addEventListener(ev, e => { e.preventDefault(); e.stopPropagation(); dropZone.classList.add('drop-active'); })
  );
  ['dragleave', 'drop'].forEach(ev =>
    dropZone.addEventListener(ev, e => { e.preventDefault(); e.stopPropagation(); dropZone.classList.remove('drop-active'); })
  );
  dropZone.addEventListener('drop', async (e) => {
    if (triggerFeatureLock(e)) return;
    if (state.role !== 'admin') {
      showPopupModal("Access Denied", "You cannot upload files directly here. Admin only. Ask permission from admin.", "error");
      return;
    }
    const files = e.dataTransfer.files;
    if (!files.length) return;
    await uploadFilesList(files);
  });
}

function wireLaptopUpload() {
  const laptopUploadInput = document.getElementById('laptopUploadInput');
  if (!laptopUploadInput) return;
  laptopUploadInput.onchange = async (e) => {
    if (triggerFeatureLock(e)) {
      laptopUploadInput.value = '';
      return;
    }
    if (state.role !== 'admin') {
      showPopupModal("Access Denied", "You cannot upload files here. Admin only. Ask permission from admin.", "error");
      laptopUploadInput.value = '';
      return;
    }
    const files = e.target.files;
    if (!files.length) return;
    await uploadFilesList(files);
    laptopUploadInput.value = '';
  };
}

async function uploadFilesList(files) {
  let ok = 0, failed = 0;
  for (const file of files) {
    const text = await file.text().catch(() => '');
    const fd = new FormData();
    fd.append('filename', file.name);
    fd.append('content', text);
    fd.append('size_kb', Math.max(1, Math.ceil(file.size / 1024)));
    fd.append('allocation_type', 'linked');
    fd.append('parent_id', state.currentDir);
    const res = await api('upload', { method: 'POST', body: fd });
    if (res.ok) ok++; else failed++;
  }
  showPopupModal("Upload Complete", `Upload completed: ${ok} uploaded | ${failed} failed`, "success");
  await loadDir(state.currentDir);
  await loadBitmap();
}

function escapeHtml(s) {
  return String(s || '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

init().catch(err => console.error(err));