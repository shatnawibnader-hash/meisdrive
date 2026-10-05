import {
  ExternalLink,
  FolderOpen,
  GraduationCap,
  Sparkles,
  ChevronRight,
  Info
} from 'lucide-react';

interface GradeFolder {
  id: string;
  name: string;
  subTitle: string;
  gradeRange: string;
  url: string;
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
  };
}

const FOLDERS: GradeFolder[] = [
  {
    id: 'grade-4-6',
    name: 'Grade 4 - 6',
    gradeRange: 'Grades 4, 5 & 6',
    subTitle: 'Elementary & Intermediate Learning',
    url: 'https://drive.google.com/drive/folders/138SFZbwlaa60DIn8V2nbyO40LyXPAibv?usp=sharing',
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
    },
  },
  {
    id: 'grade-7-12',
    name: 'Grade 7 - 12',
    gradeRange: 'Grades 7, 8, 9, 10, 11 & 12',
    subTitle: 'Middle & High School Curriculum',
    url: 'https://drive.google.com/drive/folders/152UiVfWdMPVvTP6Ntlor7uNw5so4VXJz?usp=sharing',
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
    },
  },
];

export default function App() {
  const handleOpenFolder = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
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
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                Middle East International School · Cloud Resources
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-medium hidden sm:inline">Google Drive Connected</span>
            <span className="font-medium sm:hidden">Online</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-12 sm:py-20 flex flex-col justify-center">
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

        {/* The Two Main Grade Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
          {FOLDERS.map((folder) => {
            return (
              <div
                key={folder.id}
                className={`group relative bg-white dark:bg-slate-900 rounded-2xl border-2 transition-all duration-200 shadow-sm hover:shadow-xl flex flex-col justify-between p-6 sm:p-8 ${folder.colorScheme.border} ${folder.colorScheme.bgHover}`}
              >
                {/* Card Top Section */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 duration-200 ${folder.colorScheme.iconBg} ${folder.colorScheme.iconColor}`}
                    >
                      <FolderOpen className="w-7 h-7" />
                    </div>

                    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${folder.colorScheme.badgeBg} ${folder.colorScheme.badgeText}`}>
                      {folder.badge}
                    </span>
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
                  <a
                    href={folder.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleOpenFolder(folder.url)}
                    className={`w-full py-4 px-6 rounded-xl font-bold text-base flex items-center justify-between transition-all duration-150 transform active:scale-[0.98] cursor-pointer shadow-md no-underline ${folder.colorScheme.buttonBg}`}
                  >
                    <span>{folder.name}</span>
                    <span className="flex items-center gap-1.5 text-xs font-medium opacity-90">
                      <span>Open Drive</span>
                      <ExternalLink className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </a>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
                    <span>Target: Google Drive</span>
                    <span className="flex items-center gap-1">
                      Direct Access <ChevronRight className="w-3 h-3 inline" />
                    </span>
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

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-500 dark:text-slate-500 bg-white/40 dark:bg-slate-900/40">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 Middle East International School · Educational Materials Portal</p>
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
