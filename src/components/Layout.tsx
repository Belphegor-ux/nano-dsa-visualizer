import { useState, useEffect } from 'react';
import { Moon, Sun, BarChart3 } from 'lucide-react';

interface LayoutProps {
  readonly children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('dsa-theme');
    return stored ? stored === 'dark' : true;
  });

  useEffect(() => {
    document.documentElement.className = dark ? 'dark' : 'light';
    localStorage.setItem('dsa-theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="glass sticky top-0 z-50 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BarChart3 className="w-6 h-6 text-blue-500" />
          <h1 className="text-xl font-bold tracking-tight">
            <span className="text-blue-500">DSA</span> Visualizer
          </h1>
        </div>
        <button
          onClick={() => setDark(prev => !prev)}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Toggle theme"
        >
          {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </header>
      <main className="flex-1 p-4 md:p-6 max-w-[1600px] mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
