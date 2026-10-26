import React, { useState } from 'react';
import {
  Code,
  Copy,
  Check,
  TrendingUp,
  Cpu,
  Layers,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { CONSUMER_CONTRACT_SOLIDITY, TS_SDK_SNIPPET } from '../data/mockData';

export const ConsumerPlayground: React.FC = () => {
  const [activeSnippet, setActiveSnippet] = useState<'ts' | 'solidity'>('ts');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = activeSnippet === 'ts' ? TS_SDK_SNIPPET : CONSUMER_CONTRACT_SOLIDITY;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="border border-slate-800 bg-slate-900/60 rounded-xl p-6 sm:p-8 space-y-4">
        <div className="text-xs uppercase tracking-wider text-cyan-400 font-mono">
          Developer Integration
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Integrating VeriFeed into Prediction Markets & dApps
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          Traditional prediction markets and insurance protocols suffer when real-world event outcomes are contested across conflicting news outlets.
          By calling VeriFeed on GenLayer, contracts receive a self-contained, consensus-validated verdict with confidence scores and a full rationale trace.
        </p>

        {/* Integration Architecture strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
          <div className="p-4 bg-slate-950/80 rounded-lg border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold">
              <TrendingUp className="w-4 h-4" />
              Prediction Markets
            </div>
            <p className="text-slate-400">
              Settle binary and multi-outcome betting pools without manual admin intervention or centralized UMA delays.
            </p>
          </div>

          <div className="p-4 bg-slate-950/80 rounded-lg border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold">
              <Cpu className="w-4 h-4" />
              Autonomous AI Agents
            </div>
            <p className="text-slate-400">
              AI agents querying reliable facts about breaking world events before executing on-chain trades or governance votes.
            </p>
          </div>

          <div className="p-4 bg-slate-950/80 rounded-lg border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold">
              <Layers className="w-4 h-4" />
              Parametric Insurance
            </div>
            <p className="text-slate-400">
              Resolve weather, flight cancellation, or cyber incident disputes by reading multiple airline or government APIs.
            </p>
          </div>
        </div>
      </div>

      {/* Code Snippets Section */}
      <div className="border border-slate-800 bg-slate-950 rounded-xl overflow-hidden shadow-xl">
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveSnippet('ts')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeSnippet === 'ts'
                  ? 'bg-slate-800 text-cyan-400 font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              TypeScript / genlayer-js
            </button>
            <button
              onClick={() => setActiveSnippet('solidity')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeSnippet === 'solidity'
                  ? 'bg-slate-800 text-cyan-400 font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Solidity Consumer Contract
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy Code'}
          </button>
        </div>

        <div className="p-4 overflow-x-auto font-mono text-xs text-slate-300 bg-slate-950 leading-relaxed max-h-[500px] overflow-y-auto">
          <pre>{activeSnippet === 'ts' ? TS_SDK_SNIPPET : CONSUMER_CONTRACT_SOLIDITY}</pre>
        </div>
      </div>
    </div>
  );
};
