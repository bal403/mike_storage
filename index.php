<!DOCTYPE html>
<html lang="en" class="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MIKEE DriveBox - OS File Management Simulator</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class'
        }
    </script>
    <style>
        .block-free { background-color: #e2e8f0; color: #475569; font-size: 9px; border-radius: 4px; height: 22px; display: flex; align-items: center; justify-content: center; }
        .dark .block-free { background-color: #1e293b; color: #94a3b8; }
        .block-occupied { background-color: #0d9488; color: white; font-size: 9px; border-radius: 4px; height: 22px; display: flex; align-items: center; justify-content: center; font-weight: bold; }
        .block-selected { border: 2px solid #f43f5e !important; }
        .block-index { background-color: #8b5cf6 !important; color: white; }
        .drop-active { border: 2px dashed #0d9488 !important; background-color: rgba(13, 148, 136, 0.06); }
    </style>
</head>
<body class="bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen md:h-screen flex flex-col md:overflow-hidden transition-colors font-sans">

    <!-- Top Header -->
    <header class="min-h-16 px-3 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0 z-30 shadow-xs">
        <div class="flex items-center gap-2.5 min-w-0">
            <button id="menuBtn" type="button" aria-label="Toggle Menu" class="md:hidden p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 shrink-0">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
            </button>
            <div class="truncate">
                <h1 class="font-extrabold text-sm sm:text-base tracking-tight truncate">MIKEE <span class="text-teal-600 dark:text-teal-400">DriveBox</span></h1>
                <p class="text-[10px] text-slate-400 uppercase tracking-wider font-semibold hidden sm:block">OS File System Simulator</p>
            </div>
        </div>

        <!-- Center Role Switcher & Theme Toggle -->
        <div class="flex items-center gap-1.5 sm:gap-2">
            <select id="roleSwitcher" class="px-2.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold shadow-xs">
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="guest">Guest</option>
            </select>
            <button id="themeToggle" type="button" aria-label="Toggle Theme" class="p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition">
                <svg id="themeIcon" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/>
                </svg>
            </button>
        </div>

        <!-- Right + New Item Button -->
        <div class="relative shrink-0">
            <button id="newBtn" type="button" class="flex items-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-3 py-1.5 rounded-xl text-xs shadow-xs transition">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
                </svg>
                <span>New Item</span>
            </button>
            <div id="newMenu" class="hidden absolute right-0 top-full mt-1.5 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl py-1.5 z-50 text-xs">
                <button data-action="new-folder" class="w-full text-left px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2">
                    <svg class="w-4 h-4 text-teal-600 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
                    </svg>
                    <span>New Folder</span>
                </button>
                <button data-action="new-file" class="w-full text-left px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2">
                    <svg class="w-4 h-4 text-teal-600 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                    <span>New DriveBox File</span>
                </button>
                <label class="flex w-full text-left px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer items-center gap-2">
                    <svg class="w-4 h-4 text-teal-600 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                    </svg>
                    <span>Upload from PC</span>
                    <input type="file" id="laptopUploadInput" class="hidden" multiple>
                </label>
            </div>
        </div>
    </header>

    <!-- Main Body -->
    <div class="flex flex-1 md:overflow-hidden relative">
        <div id="sidebarBackdrop" class="hidden fixed inset-0 bg-black/50 z-30 md:hidden"></div>

        <!-- Left Sidebar with mike.png Icon -->
        <aside id="sidebar" class="fixed md:static inset-y-0 left-0 z-40 w-72 -translate-x-full md:translate-x-0 transition-transform duration-200 ease-in-out border-r border-slate-200 dark:border-slate-800 p-4 flex flex-col gap-4 bg-white dark:bg-slate-900 shrink-0 overflow-y-auto shadow-xl md:shadow-none">
            <!-- Sidebar Profile / Icon Header (mike.png) -->
            <div class="flex items-center justify-between gap-2.5 pb-3 border-b border-slate-200 dark:border-slate-800">
                <div class="flex items-center gap-2.5 min-w-0">
                    <img src="assets/images/mike.png" alt="Mike Icon" class="w-10 h-10 rounded-xl object-cover shrink-0 ring-2 ring-teal-500/40 bg-slate-100 dark:bg-slate-800">
                    <div class="min-w-0">
                        <div class="font-bold text-xs text-slate-800 dark:text-slate-100 truncate">Mikee Workspace</div>
                        <div class="text-[10px] text-slate-400 truncate">DriveBox Storage</div>
                    </div>
                </div>
                <button id="closeSidebarBtn" type="button" aria-label="Close Sidebar" class="md:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 shrink-0">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>

            <!-- Mobile Nav Links -->
            <div class="md:hidden flex flex-col gap-1 text-xs font-semibold">
                <a href="#" id="navMyDriveMob" class="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-teal-50 dark:bg-slate-800 text-teal-600 dark:text-teal-400">
                    <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6"/>
                    </svg>
                    <span>My Drive</span>
                </a>
                <a href="#" id="navSharedMob" class="flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
                    <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <span>Shared with me</span>
                </a>
                <a href="#" id="navPublicMob" class="flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
                    <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"/>
                    </svg>
                    <span>Public Files</span>
                </a>
                <a href="#" id="navTrashMob" class="flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
                    <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                    <span>Recycle Bin</span>
                </a>
            </div>

            <!-- Storage Capacity Box -->
            <div class="bg-slate-50 dark:bg-slate-950/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div class="flex items-center justify-between mb-1.5">
                    <span class="text-[10px] font-extrabold uppercase tracking-wider text-teal-700 dark:text-teal-400">Storage Capacity</span>
                    <button id="configDiskBtn" type="button" class="text-[10px] text-teal-600 dark:text-teal-400 hover:underline font-bold">Configure</button>
                </div>
                <div id="storageDetails" class="text-[10px] font-medium text-slate-600 dark:text-slate-300 mb-2"></div>
                <div class="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div id="storageBar" class="bg-teal-600 h-full transition-all" style="width: 0%"></div>
                </div>
            </div>

            <!-- Directory Tree -->
            <div class="flex-1 overflow-y-auto min-h-[180px] bg-slate-50 dark:bg-slate-950/60 p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div class="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-2 px-1">Directory Tree</div>
                <ul id="tree" class="text-xs space-y-1"></ul>
            </div>
        </aside>

        <!-- Center Workspace + Bottom Telemetry Dock -->
        <div class="flex-1 flex flex-col min-w-0 md:overflow-hidden">
            <main id="dropZone" class="flex-1 p-4 sm:p-6 overflow-y-auto flex flex-col bg-slate-50/60 dark:bg-slate-950">

                <!-- Desktop View Tabs -->
                <div class="hidden md:flex items-center justify-between mb-3">
                    <nav class="flex items-center gap-1 text-xs font-semibold bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
                        <a href="#" id="navMyDrive" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 dark:bg-slate-800 text-teal-600 dark:text-teal-400 font-bold transition">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6"/>
                            </svg>
                            <span>My Drive</span>
                        </a>
                        <a href="#" id="navShared" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-teal-600 transition">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
                            </svg>
                            <span>Shared</span>
                        </a>
                        <a href="#" id="navPublic" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-teal-600 transition">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"/>
                            </svg>
                            <span>Public</span>
                        </a>
                        <a href="#" id="navTrash" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-teal-600 transition">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                            </svg>
                            <span>Trash</span>
                        </a>
                    </nav>
                </div>

                <!-- Breadcrumb + View Toggle + Folder Actions -->
                <div class="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
                    <div id="breadcrumb" class="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 truncate"></div>

                    <div class="flex items-center gap-2">
                        <div class="flex items-center gap-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-1 text-xs shrink-0 shadow-xs">
                            <button id="viewGrid" type="button" class="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600 font-bold">
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                                </svg>
                                <span>Grid</span>
                            </button>
                            <button id="viewList" type="button" class="flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 font-medium">
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
                                </svg>
                                <span>List</span>
                            </button>
                        </div>

                        <div class="relative shrink-0">
                            <button id="folderActionBtn" type="button" title="Folder Actions" class="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 font-bold text-xs shadow-xs">
                                <span>Actions</span>
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
                                </svg>
                            </button>
                            <div id="folderActionMenu" class="hidden absolute right-0 top-full mt-1.5 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl py-1.5 z-30 text-xs">
                                <button data-folder-act="new-folder" class="w-full text-left px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2">
                                    <svg class="w-4 h-4 text-teal-600 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                                    </svg>
                                    <span>Add Subfolder</span>
                                </button>
                                <button data-folder-act="new-file" class="w-full text-left px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2">
                                    <svg class="w-4 h-4 text-teal-600 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
                                    </svg>
                                    <span>Add Virtual File</span>
                                </button>
                                <button data-folder-act="browse-file" class="w-full text-left px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2">
                                    <svg class="w-4 h-4 text-teal-600 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"/>
                                    </svg>
                                    <span>Browse File...</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="emptyState" class="hidden flex-1 flex flex-col items-center justify-center text-slate-400 py-14 text-center px-4">
                    <svg class="w-12 h-12 mb-3 text-slate-300 dark:text-slate-700" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
                    </svg>
                    <p class="text-xs font-medium">This folder is empty. Use '+ New Item' or drop files here.</p>
                </div>

                <div id="items" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"></div>
            </main>

            <!-- Bottom Dock: File Inspector + Free-Space Bitmap -->
            <section class="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 sm:px-6 py-3 shrink-0">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                    <div class="lg:col-span-5">
                        <h3 class="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">File & Block Inspector</h3>
                        <div id="inspectorContent" class="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-950/50 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 min-h-[54px]">
                            <p class="text-[11px]">Click a file card to inspect attributes and allocated blocks.</p>
                        </div>
                    </div>

                    <div class="lg:col-span-7 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800 pt-2.5 lg:pt-0 lg:pl-4">
                        <div class="flex items-center justify-between mb-1.5">
                            <span class="text-[10px] font-extrabold uppercase tracking-wider text-teal-700 dark:text-teal-400">Free-Space Bitmap (Blocks)</span>
                            <div class="flex gap-3 text-[9px] text-slate-400 font-medium">
                                <span class="flex items-center gap-1"><span class="w-2 h-2 bg-slate-300 dark:bg-slate-700 inline-block rounded-xs"></span> Free</span>
                                <span class="flex items-center gap-1"><span class="w-2 h-2 bg-teal-600 inline-block rounded-xs"></span> Used</span>
                                <span class="flex items-center gap-1"><span class="w-2 h-2 bg-purple-500 inline-block rounded-xs"></span> Index</span>
                            </div>
                        </div>
                        <div id="bitmap" class="grid grid-cols-8 sm:grid-cols-16 gap-1 max-h-24 overflow-y-auto pr-1"></div>
                    </div>
                </div>
            </section>
        </div>
    </div>

    <!-- Simple Footer with Direct List of Names -->
    <footer class="px-4 sm:px-6 py-2.5 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-600 dark:text-slate-400 shrink-0">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
            <span class="font-semibold text-slate-700 dark:text-slate-200">MIKEE &copy; 2026</span>
            <p class="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                Mikee, Nuguit · Klent, Revira · Jaden, Bachira · Kyra, Lazarra · Kenneth, Eclipse · Ryan Paul Maestre, · Sheena, Rouces · Niel, Bula
            </p>
        </div>
    </footer>

    <!-- Modals & Context Menu -->
    <div id="modal" class="hidden fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-3 sm:p-4">
        <div class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl w-full max-w-sm p-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div class="flex items-center justify-between mb-3">
                <h3 id="modalTitle" class="font-bold text-sm truncate pr-2"></h3>
                <button id="modalClose" type="button" aria-label="Close Modal" class="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
            <div id="modalBody" class="text-sm"></div>
        </div>
    </div>

    <div id="ctxMenu" class="hidden fixed bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl py-1.5 z-50 text-xs w-48"></div>

    <script src="assets/lock.js"></script>
    <script src="assets/app.js"></script>
</body>
</html>