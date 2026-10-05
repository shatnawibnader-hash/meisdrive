import React, { useState, useEffect, useRef } from 'react';
import {
  Lock,
  Unlock,
  ExternalLink,
  FolderLock,
  FolderOpen,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  RefreshCw,
  Info
} from 'lucide-react';

interface GradeFolder {
  id: string;
  name: string;
  subTitle: string;
  gradeRange: string;
  url: string;
  password: string;
  badge: string;
  colorScheme: {
    primary: string;
    border: string;
    bgHover: string;
    badgeBg: string;
    badgeText: string;
    iconBg: string;
    iconColor: string;
    buttonBg: string;
    buttonHover: string;
  };
}

const FOLDERS: GradeFolder[] = [
  {
    id: 'grade-4-6',
    name: 'Grade 4 - 6',
    gradeRange: 'Grades 4, 5 & 6',
    subTitle: 'Elementary & Intermediate Learning',
    url: 'https://drive.google.com/drive/folders/138SFZbwlaa60DIn8V2nbyO40LyXPAibv?usp=sharing',
    password: 'Meis@4',
    badge: 'Grades 4 - 6',
    colorScheme: {
      primary: 'text-indigo-600 dark:text-indigo-400',
      border: 'border-indigo-100 hover:border-indigo-300 dark:border-indigo-900/50 dark:hover:border-indigo-700',
      bgHover: 'hover:bg-indigo-50/40 dark:hover:bg-indigo-950/20',
      badgeBg: 'bg-indigo-50 dark:bg-indigo-950/50',
      badgeText: 'text-indigo-700 dark:text-indigo-300',
      iconBg: 'bg-indigo-100 dark:bg-indigo-900/60',
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      buttonBg: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200 dark:shadow-none',
      buttonHover: 'hover:bg-indigo-700',
    },
  },
  {
    id: 'grade-7-12',
    name: 'Grade 7 - 12',
    gradeRange: 'Grades 7, 8, 9, 10, 11 & 12',
    subTitle: 'Middle & High School Curriculum',
    url: 'https://drive.google.com/drive/folders/152UiVfWdMPVvTP6Ntlor7uNw5so4VXJz?usp=sharing',
    password: 'Meis@7',
    badge: 'Grades 7 - 12',
    colorScheme: {
      primary: 'text-blue-600 dark:text-blue-400',
      border: 'border-blue-100 hover:border-blue-300 dark:border-blue-900/50 dark:hover:border-blue-700',
      bgHover: 'hover:bg-blue-50/40 dark:hover:bg-blue-950/20',
      badgeBg: 'bg-blue-50 dark:bg-blue-950/50',
      badgeText: 'text-blue-700 dark:text-blue-300',
      iconBg: 'bg-blue-100 dark:bg-blue-900/60',
      iconColor: 'text-blue-600 dark:text-blue-400',
      buttonBg: 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200 dark:shadow-none',
      buttonHover: 'hover:bg-blue-700',
    },
  },
];

export default function App() {
  const [activeFolder, setActiveFolder] = useState<GradeFolder | null>(null);
  const [inputPassword, setInputPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [unlockedFolders, setUnlockedFolders] = useState<Record<string, boolean>>({});
  const [successOpenedFolderId, setSuccessOpenedFolderId] = useState<string | null>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  // Restore unlocked state from session if available
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('unlocked_meis_folders');
      if (saved) {
        setUnlockedFolders(JSON.parse(saved));
      }
    } catch {
      // Ignore sessionStorage errors
    }
  }, []);

  // Focus password input when modal opens
  useEffect(() => {
    if (activeFolder) {
      setInputPassword('');
      setError(null);
      setShowPassword(false);
      setTimeout(() => {
        passwordInputRef.current?.focus();
      }, 50);
    }
  }, [activeFolder]);

  const handleOpenFolder = (folder: GradeFolder) => {
    if (unlockedFolders[folder.id]) {
      // Already unlocked in this session, open directly
      window.open(folder.url, '_blank', 'noopener,noreferrer');
      setSuccessOpenedFolderId(folder.id);
      setTimeout(() => setSuccessOpenedFolderId(null), 3000);
      return;
    }

    setActiveFolder(folder);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeFolder) return;

    if (inputPassword.trim() === activeFolder.password) {
      // Success!
      setError(null);
      const updated = { ...unlockedFolders, [activeFolder.id]: true };
      setUnlockedFolders(updated);
      try {
        sessionStorage.setItem('unlocked_meis_folders', JSON.stringify(updated));
      } catch {
        // Ignore
      }

      const targetUrl = activeFolder.url;
      const openedFolderId = activeFolder.id;
      setActiveFolder(null);
      setInputPassword('');
      setSuccessOpenedFolderId(openedFolderId);
      setTimeout(() => setSuccessOpenedFolderId(null), 4000);

      // Open in a new tab
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    } else {
      setError('Incorrect password. Please verify and try again.');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      passwordInputRef.current?.select();
    }
  };

  const handleLockFolder = (folderId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = { ...unlockedFolders, [folderId]: false };
    setUnlockedFolders(updated);
    try {
      sessionStorage.setItem('unlocked_meis_folders', JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white font-sans">
      {/* Top Banner / Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 dark:text-white tracking-tight text-base sm:text-lg">
                  MEIS Drive Portal
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-full border border-indigo-200/50 dark:border-indigo-800/50">
                  Protected
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                Middle East International School · Secure Cloud Resources
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="font-medium hidden sm:inline">Password Authentication Active</span>
            <span className="font-medium sm:hidden">Secured</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-16 flex flex-col justify-center">
        {/* Intro Hero */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>Official Google Drive Resource Folders</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Select Your Grade Level
          </h1>
        </div>

        {/* Success Alert Banner (when folder opened) */}
        {successOpenedFolderId && (
          <div className="max-w-xl mx-auto mb-8 w-full animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl p-4 flex items-center justify-between gap-3 text-emerald-800 dark:text-emerald-200 shadow-sm">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div className="text-sm">
                  <span className="font-semibold">Access Granted: </span>
                  Google Drive folder has been opened in a new tab.
                </div>
              </div>
              <a
                href={FOLDERS.find((f) => f.id === successOpenedFolderId)?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 underline hover:text-emerald-900 flex items-center gap-1 shrink-0"
              >
                Reopen Link <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}

        {/* The Two Main Grade Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
          {FOLDERS.map((folder) => {
            const isUnlocked = !!unlockedFolders[folder.id];

            return (
              <div
                key={folder.id}
                className={`group relative bg-white dark:bg-slate-900 rounded-2xl border-2 transition-all duration-200 shadow-sm hover:shadow-xl flex flex-col justify-between p-6 sm:p-8 ${
                  isUnlocked
                    ? 'border-emerald-300 dark:border-emerald-700/60 shadow-emerald-500/5'
                    : `${folder.colorScheme.border} ${folder.colorScheme.bgHover}`
                }`}
              >
                {/* Card Top Section */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 duration-200 ${
                        isUnlocked
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                          : `${folder.colorScheme.iconBg} ${folder.colorScheme.iconColor}`
                      }`}
                    >
                      {isUnlocked ? (
                        <FolderOpen className="w-7 h-7" />
                      ) : (
                        <FolderLock className="w-7 h-7" />
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {isUnlocked ? (
                        <div className="flex items-center gap-1.5">
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 px-2.5 py-1 rounded-full">
                            <Unlock className="w-3 h-3" /> Unlocked
                          </span>
                          <button
                            type="button"
                            onClick={(e) => handleLockFolder(folder.id, e)}
                            title="Lock this folder"
                            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 px-2.5 py-1 rounded-full">
                          <Lock className="w-3 h-3" /> Password Protected
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {folder.subTitle}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      {folder.name}
                    </h2>
                  </div>
                </div>

                {/* Card Bottom / Action Button */}
                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/80">
                  <button
                    type="button"
                    onClick={() => handleOpenFolder(folder)}
                    className={`w-full py-4 px-6 rounded-xl font-bold text-base flex items-center justify-center gap-3 transition-all duration-150 transform active:scale-[0.98] cursor-pointer shadow-md ${
                      isUnlocked
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200 dark:shadow-none'
                        : folder.colorScheme.buttonBg
                    }`}
                  >
                    <span>{folder.name}</span>
                    {isUnlocked ? (
                      <>
                        <span className="text-xs font-normal opacity-90">· Open Drive</span>
                        <ExternalLink className="w-4 h-4 ml-auto" />
                      </>
                    ) : (
                      <>
                        <span className="text-xs font-normal opacity-90">· Password Required</span>
                        <ChevronRight className="w-4 h-4 ml-auto transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
                    <span>Target: Google Drive</span>
                    <span>{isUnlocked ? 'Ready to browse' : 'Requires security key'}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Small Note at the end */}
        <div className="mt-10 flex items-center justify-center gap-2 text-center text-xs sm:text-sm text-slate-500 dark:text-slate-400 px-4">
          <Info className="w-4 h-4 text-slate-400 shrink-0" />
          <span>
            <strong className="font-medium text-slate-700 dark:text-slate-300">Note: </strong>
            Coordinators of 4 to 12 upload all materials in Grade 7 - 12 drive.
          </span>
        </div>
      </main>

      {/* Password Modal Dialog */}
      {activeFolder && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={() => setActiveFolder(null)}
        >
          <div
            className={`w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 relative transition-all duration-200 ${
              isShaking ? 'animate-shake' : ''
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${activeFolder.colorScheme.iconBg} ${activeFolder.colorScheme.iconColor}`}
                >
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <h3 id="modal-title" className="text-xl font-bold text-slate-900 dark:text-white">
                    {activeFolder.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Password Protected Drive Folder
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveFolder(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-semibold transition-colors"
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 mb-5 leading-normal">
              Enter the authorized access password for <strong>{activeFolder.name}</strong> to unlock and view the Google Drive resources.
            </p>

            {/* Password Form */}
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="folder-password"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                >
                  Folder Password
                </label>
                <div className="relative">
                  <input
                    ref={passwordInputRef}
                    id="folder-password"
                    type={showPassword ? 'text' : 'password'}
                    value={inputPassword}
                    onChange={(e) => {
                      setInputPassword(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="Enter password..."
                    autoComplete="current-password"
                    className={`w-full px-4 py-3 pr-11 rounded-xl text-sm font-medium bg-slate-50 dark:bg-slate-800/80 border transition-all outline-none ${
                      error
                        ? 'border-red-500 focus:ring-2 focus:ring-red-400/30'
                        : 'border-slate-300 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {error && (
                  <div className="flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400 mt-2 font-medium">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveFolder(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!inputPassword.trim()}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ${activeFolder.colorScheme.buttonBg}`}
                >
                  <Unlock className="w-3.5 h-3.5" />
                  <span>Unlock & Open</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-500 dark:text-slate-500 bg-white/40 dark:bg-slate-900/40">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 Middle East International School · Secure Educational Materials Portal</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Google Drive Integrated</span>
            <span aria-hidden="true">·</span>
            <span>Grade 4 - 6</span>
            <span aria-hidden="true">·</span>
            <span>Grade 7 - 12</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
