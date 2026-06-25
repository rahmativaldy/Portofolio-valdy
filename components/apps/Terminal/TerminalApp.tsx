'use client';

import { useState } from 'react';

const COMMANDS = {
  help: 'Available commands: help, about, projects, skills, contact, clear',
  about: 'RahmatOS - Premium Interactive Portfolio\nBuilt with Next.js, React, TypeScript & Tailwind CSS',
  projects: 'View projects in the Projects app →',
  skills: 'View skills in the Skills app →',
  contact: 'View contact info in the Contact app →',
  clear: '',
};

export function TerminalApp() {
  const [output, setOutput] = useState<string[]>([
    '$ Welcome to RahmatOS Terminal',
    '$ Type "help" for available commands',
    '',
  ]);
  const [input, setInput] = useState('');

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const command = trimmed as keyof typeof COMMANDS;

    setOutput((prev) => [...prev, `$ ${cmd}`]);

    if (command === 'clear') {
      setOutput([]);
    } else if (command in COMMANDS) {
      const response = COMMANDS[command];
      if (response) {
        setOutput((prev) => [...prev, response, '']);
      } else {
        setOutput((prev) => [...prev, '']);
      }
    } else if (trimmed === '') {
      setOutput((prev) => [...prev, '']);
    } else {
      setOutput((prev) => [
        ...prev,
        `Command not found: ${cmd}`,
        '',
      ]);
    }

    setInput('');
  };

  return (
    <div className="w-full h-full p-5 font-mono text-sm overflow-hidden flex flex-col bg-gradient-to-br from-slate-900 via-slate-950 to-black">
      <div className="flex-1 overflow-y-auto mb-4 space-y-2">
        {output.map((line, i) => (
          <div key={i} className="text-emerald-400 whitespace-pre-wrap break-words text-xs leading-relaxed hover:bg-slate-900/30 px-2 py-1 rounded transition">
            {line}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-2 rounded-lg border border-slate-700/30">
        <span className="text-emerald-400 font-bold">$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleCommand(input);
            }
          }}
          autoFocus
          className="flex-1 bg-transparent outline-none text-emerald-400 text-xs placeholder-slate-600"
          placeholder="Type command or 'help'..."
        />
      </div>
    </div>
  );
}
