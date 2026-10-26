import React, { useState } from 'react';
import {
  UploadCloud,
  Check,
  Copy,
  ExternalLink,
  Terminal,
  FileCode,
  ShieldCheck,
  Download,
  Sparkles,
} from 'lucide-react';

export const VercelGuide: React.FC = () => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyCode = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(key);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const vercelJsonContent = `{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}`;

  const cliDeployCommands = `# 1. Install Vercel CLI (if not already installed)
npm i -g vercel

# 2. Deploy directly from the project directory
vercel

# 3. Deploy to production
vercel --prod`;

  const gitPushCommands = `# 1. Initialize git and commit
git init
git add .
git commit -m "feat: complete VeriFeed GenLayer Oracle project"

# 2. Add your GitHub remote repository
git remote add origin https://github.com/YOUR_USERNAME/verifeed-oracle.git
git branch -M main
git push -u origin main

# 3. Open https://vercel.com/new, import the repository and click Deploy!`;

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="border border-slate-800 bg-slate-900/60 rounded-xl p-6 sm:p-8 space-y-4">
        <div className="text-xs uppercase tracking-wider text-cyan-400 font-mono">
          Production Hosting Guide
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Deploying VeriFeed to Vercel
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          VeriFeed has been pre-configured with a root <code className="text-cyan-400 font-mono">vercel.json</code> and standard Vite build pipeline.
          You can deploy it in less than 60 seconds with zero manual configuration.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-3">
          <a
            href="https://vercel.com/new"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-white hover:bg-slate-200 rounded-md transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Open Vercel New Project Dashboard
          </a>
        </div>
      </div>

      {/* Step by step deployment options */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Method 1: Git Import (Recommended) */}
        <div className="border border-slate-800 bg-slate-950 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2 font-bold text-white text-sm">
              <span className="w-5 h-5 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center text-xs font-mono">
                1
              </span>
              <span>Method A: Import via GitHub (Recommended)</span>
            </div>
            <button
              onClick={() => copyCode('git', gitPushCommands)}
              className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1 font-mono"
            >
              {copiedSection === 'git' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedSection === 'git' ? 'Copied' : 'Copy Commands'}
            </button>
          </div>

          <p className="text-xs text-slate-400">
            Push the project code to your GitHub account and import directly from the Vercel dashboard:
          </p>

          <pre className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
            {gitPushCommands}
          </pre>

          <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-800 text-xs text-slate-300 space-y-1">
            <div className="font-semibold text-white">Vercel Build Settings:</div>
            <div>• Framework Preset: <span className="font-mono text-cyan-400">Vite</span></div>
            <div>• Build Command: <span className="font-mono text-cyan-400">npm run build</span></div>
            <div>• Output Directory: <span className="font-mono text-cyan-400">dist</span></div>
          </div>
        </div>

        {/* Method 2: Vercel CLI */}
        <div className="border border-slate-800 bg-slate-950 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2 font-bold text-white text-sm">
              <span className="w-5 h-5 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center text-xs font-mono">
                2
              </span>
              <span>Method B: Deploy via Vercel CLI</span>
            </div>
            <button
              onClick={() => copyCode('cli', cliDeployCommands)}
              className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1 font-mono"
            >
              {copiedSection === 'cli' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedSection === 'cli' ? 'Copied' : 'Copy Commands'}
            </button>
          </div>

          <p className="text-xs text-slate-400">
            If you have the terminal, run the Vercel CLI directly:
          </p>

          <pre className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
            {cliDeployCommands}
          </pre>

          <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-800 text-xs text-slate-300 space-y-1">
            <div className="font-semibold text-white">Pre-bundled vercel.json File:</div>
            <p className="text-slate-400 text-[11px]">
              Already created at <code className="text-cyan-400 font-mono">/vercel.json</code> to ensure all single-page client routes seamlessly load without 404 errors.
            </p>
          </div>
        </div>
      </div>

      {/* vercel.json inspect card */}
      <div className="border border-slate-800 bg-slate-950 rounded-xl overflow-hidden shadow-xl">
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
            <FileCode className="w-4 h-4 text-cyan-400" />
            <span>vercel.json</span>
            <span className="text-slate-600">·</span>
            <span className="text-emerald-400 font-semibold">Active in workspace root</span>
          </div>

          <button
            onClick={() => copyCode('json', vercelJsonContent)}
            className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors"
          >
            {copiedSection === 'json' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedSection === 'json' ? 'Copied' : 'Copy vercel.json'}
          </button>
        </div>

        <div className="p-4 overflow-x-auto font-mono text-xs text-slate-300 bg-slate-950">
          <pre>{vercelJsonContent}</pre>
        </div>
      </div>
    </div>
  );
};
