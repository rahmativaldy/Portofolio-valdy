'use client';

const FOLDERS = {
  'portfolio': ['README.md', 'projects.json', 'skills.json'],
  'projects': ['project-1', 'project-2', 'project-3'],
  'src': ['components', 'pages', 'styles'],
};

export function FileExplorerApp() {
  return (
    <div className="w-full h-full flex flex-col">
      {/* Toolbar */}
      <div className="h-12 border-b border-slate-700 px-4 flex items-center gap-2 bg-slate-900">
        <button className="px-3 py-1 text-sm rounded bg-slate-800 hover:bg-slate-700 transition">
          ◀ Back
        </button>
        <button className="px-3 py-1 text-sm rounded bg-slate-800 hover:bg-slate-700 transition">
          Forward ▶
        </button>
        <div className="flex-1 mx-2 px-3 py-1 bg-slate-800 rounded text-sm text-slate-400">
          /portfolio
        </div>
      </div>

      {/* File List */}
      <div className="flex-1 p-4 overflow-auto">
        <div className="space-y-1">
          {FOLDERS['portfolio'].map((file) => (
            <div
              key={file}
              className="p-2 rounded hover:bg-slate-800 transition cursor-pointer flex items-center gap-2"
            >
              <span className="text-lg">📄</span>
              <span className="text-sm">{file}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-6 border-t border-slate-700 px-4 flex items-center gap-4 bg-slate-900 text-xs text-slate-400">
        <span>3 items</span>
      </div>
    </div>
  );
}
