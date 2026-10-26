import React, { useState } from 'react';
import {
  Code2,
  Copy,
  Check,
  ExternalLink,
  Terminal,
  ShieldCheck,
  Play,
  Layers,
  Database,
  Cpu,
} from 'lucide-react';
import { CONTRACT_PYTHON_SOURCE } from '../data/mockData';
import { Question } from '../types';
import { checkNetworkHealth, BRADBURY_CHAIN } from '../services/genlayer';

interface IntelligentContractViewProps {
  questions: Question[];
}

export const IntelligentContractView: React.FC<IntelligentContractViewProps> = ({ questions }) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [testQuestionId, setTestQuestionId] = useState<string>('vf-q-101');
  const [simulatedOutput, setSimulatedOutput] = useState<any>(null);
  const [querying, setQuerying] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CONTRACT_PYTHON_SOURCE);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleTestCall = async () => {
    setQuerying(true);
    try {
      const health = await checkNetworkHealth();
      const q = questions.find((item) => item.id === testQuestionId) || questions[0];
      if (q) {
        setSimulatedOutput({
          jsonrpc: '2.0',
          method: 'gen_call',
          contract_address: '0x8a927cD5E4D1A456F26E652391054C345Fe490B6',
          bradbury_current_block: health.blockNumber,
          chain_id: BRADBURY_CHAIN.id,
          rpc_endpoint: 'https://rpc-bradbury.genlayer.com',
          return_data: {
            id: q.id,
            title: q.title,
            status: q.status,
            verdict: q.verdict,
            confidence_score: q.confidenceScore,
            rationale: q.rationale,
            dispute_round: (q.disputeHistory?.length || 0) + 1,
            sources_evaluated: q.sources.length,
          },
        });
      }
    } finally {
      setQuerying(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Title & Introduction */}
      <div className="border border-slate-800 bg-slate-900/60 rounded-xl p-6 sm:p-8 space-y-4">
        <div className="text-xs uppercase tracking-wider text-cyan-400 font-mono">
          Intelligent Contract Architecture
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          VeriFeed Intelligent Contract (Python SDK)
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          Unlike legacy blockchains limited to deterministic code, GenLayer Intelligent Contracts run Python natively.
          VeriFeed directly executes web scrapers (<code className="text-cyan-400 font-mono">gl.get_webpage</code>) and multi-LLM reasoning prompts (<code className="text-cyan-400 font-mono">gl.exec_prompt</code>) inside the contract state machine without requiring centralized off-chain oracle operators.
        </p>

        {/* Contract Primitives Pill-free Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
          <div className="p-4 bg-slate-950/80 rounded-lg border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-cyan-400 font-mono font-semibold">
              <Layers className="w-4 h-4" />
              gl.get_webpage(url)
            </div>
            <p className="text-slate-400 leading-normal">
              Non-deterministic internet access. Every validator retrieves the webpage directly; discrepancies are synthesized on-chain.
            </p>
          </div>

          <div className="p-4 bg-slate-950/80 rounded-lg border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-cyan-400 font-mono font-semibold">
              <Cpu className="w-4 h-4" />
              gl.exec_prompt(prompt)
            </div>
            <p className="text-slate-400 leading-normal">
              On-chain LLM execution. Validators feed extracted texts into foundation models to cross-reference conflicting claims.
            </p>
          </div>

          <div className="p-4 bg-slate-950/80 rounded-lg border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-cyan-400 font-mono font-semibold">
              <ShieldCheck className="w-4 h-4" />
              gl.eq_principle_prompt_llm()
            </div>
            <p className="text-slate-400 leading-normal">
              The Equivalence Principle verifies that heterogeneous models reach semantic consensus even if exact phrasing varies.
            </p>
          </div>
        </div>
      </div>

      {/* Code Viewer & Interactive Tester Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Python Source Code (2 cols) */}
        <div className="lg:col-span-2 border border-slate-800 bg-slate-950 rounded-xl overflow-hidden shadow-xl flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <Code2 className="w-4 h-4 text-cyan-400" />
              <span>VeriFeedOracle.py</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">GenLayer Python 3.11</span>
            </div>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedCode ? 'Copied' : 'Copy Source'}
            </button>
          </div>

          <div className="p-4 overflow-x-auto font-mono text-xs text-slate-300 bg-slate-950 leading-relaxed max-h-[600px] overflow-y-auto">
            <pre>{CONTRACT_PYTHON_SOURCE}</pre>
          </div>
        </div>

        {/* Interactive Contract Tester (1 col) */}
        <div className="border border-slate-800 bg-slate-900/60 rounded-xl p-5 space-y-5 flex flex-col">
          <div className="flex items-center gap-2 text-xs font-semibold text-white">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>Interactive Method Simulator</span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Test calling read and write methods against the deployed contract instance on GenLayer Bradbury testnet.
          </p>

          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Select Question ID to Query</label>
              <select
                value={testQuestionId}
                onChange={(e) => setTestQuestionId(e.target.value)}
                className="w-full px-3 py-2 text-xs text-white bg-slate-950 border border-slate-800 rounded-lg focus:outline-none focus:border-cyan-500 font-mono"
              >
                {questions.map((q) => (
                  <option key={q.id} value={q.id}>
                    {q.id} - {q.title.slice(0, 32)}...
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleTestCall}
              disabled={querying}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-cyan-950 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 rounded-md transition-colors cursor-pointer"
            >
              <Play className="w-3.5 h-3.5" />
              {querying ? 'Querying Bradbury RPC...' : 'Call get_verdict(q_id)'}
            </button>
          </div>

          {/* Result Output */}
          {simulatedOutput && (
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                Simulated Contract Response:
              </div>
              <pre className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-[11px] font-mono text-cyan-300 overflow-x-auto max-h-56 overflow-y-auto">
                {JSON.stringify(simulatedOutput, null, 2)}
              </pre>
            </div>
          )}

          {/* Contract Deployment Info */}
          <div className="pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-400 font-mono">
            <div className="flex items-center justify-between">
              <span>Network:</span>
              <span className="text-white">Bradbury Testnet</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Compiler:</span>
              <span className="text-white">GenLayer PyRunner v0.3</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Dispute Stake:</span>
              <span className="text-white">50 $GEN</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
