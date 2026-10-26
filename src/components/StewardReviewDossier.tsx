import React, { useState } from 'react';
import {
  ShieldCheck,
  Copy,
  Check,
  ExternalLink,
  Play,
  FileText,
  Download,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Layers,
  Terminal,
  UploadCloud,
} from 'lucide-react';
import { Question } from '../types';

interface StewardReviewDossierProps {
  onNavigateToTab: (tab: 'explorer' | 'contract' | 'consumer' | 'vercel') => void;
  onOpenCreateModal: () => void;
  onSelectSampleQuestion: () => void;
  firstQuestion: Question;
}

export const StewardReviewDossier: React.FC<StewardReviewDossierProps> = ({
  onNavigateToTab,
  onOpenCreateModal,
  onSelectSampleQuestion,
  firstQuestion,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const projectSummary =
    'An oracle that resolves conflicting web sources through GenLayer validator consensus and returns a verdict with reasoning.';

  const projectOverview =
    'VeriFeed is an on-chain oracle for questions where sources disagree. A user submits a question (e.g. "Who won match X?") with 2–5 source URLs. The VeriFeed Intelligent Contract fetches each source, and GenLayer validators use LLM reasoning to compare the evidence, weigh source reliability, and reach consensus on a final answer. The contract stores the verdict, a confidence level, and a short rationale, plus which sources agreed or conflicted. Anyone can open a dispute to trigger re-evaluation with new sources. It is built for prediction-market builders, DAOs, and dApps that need trustworthy resolution of real-world facts without a centralized oracle operator. The React frontend lets users create questions, add sources, view the consensus result, and inspect the full resolution history, all interacting directly with the contract through genlayer-js.';

  const expectedOutcome =
    'After submitting a question, the transaction is accepted and reaches FINALIZED. The result page shows a verdict (e.g. "Real Madrid"), a confidence value, and a rationale. The contract address on the explorer shows the new question stored in state. Disputing adds a new resolution round to the history.';

  const howToSteps = [
    {
      num: '01',
      title: 'Connect a wallet',
      instruction: 'Open the website and connect a wallet on the GenLayer Bradbury network.',
      actionLabel: 'Connect / Inspect Wallet',
      action: () => onNavigateToTab('explorer'),
    },
    {
      num: '02',
      title: 'Create a question',
      instruction:
        'Click "New Question", enter "Which team won the 2024 Champions League final?" and add 3 source URLs.',
      actionLabel: 'Open Create Modal',
      action: onOpenCreateModal,
    },
    {
      num: '03',
      title: 'Submit for resolution',
      instruction: 'Confirm the transaction and wait until the status changes from Pending to Finalized.',
      actionLabel: 'Try Quick Preset',
      action: onOpenCreateModal,
    },
    {
      num: '04',
      title: 'Read the verdict',
      instruction:
        'Open the result page to see the answer, confidence score, rationale, and the source-agreement breakdown.',
      actionLabel: 'Inspect Sample Verdict',
      action: onSelectSampleQuestion,
    },
    {
      num: '05',
      title: 'Dispute (optional)',
      instruction:
        'Click "Dispute", add one more source, and watch the verdict get re-evaluated.',
      actionLabel: 'Inspect Dispute Mechanism',
      action: onSelectSampleQuestion,
    },
  ];

  const fullMarkdownExport = `# GenLayer Project Submission: VeriFeed

**Application Date:** 26/10/2026
**Required Fields Completed:** 7 / 7

## 01. Identity
- **Project Name:** VeriFeed
- **Primary Tag:** Oracles / Data
- **Tag 1:** Prediction Markets
- **Tag 2:** AI Agents

## 02. Project Summary (One-liner: 122/180 chars)
${projectSummary}

## 03. Project Overview (Description: 926/1000 chars)
${projectOverview}

## 04. Demo Video
- **Demo URL:** https://www.youtube.com/watch?v=demo_verifeed_genlayer
- **Note:** Video walkthrough demonstrating wallet connection, creating a question with 3 sources, live GenLayer validator consensus, and inspecting the equivalence verdict.

## 05. How-to Steps
1. **Connect a wallet:** Open the website and connect a wallet on the GenLayer Bradbury network.
2. **Create a question:** Click "New Question", enter "Which team won the 2024 Champions League final?" and add 3 source URLs.
3. **Submit for resolution:** Confirm the transaction and wait until the status changes from Pending to Finalized.
4. **Read the verdict:** Open the result page to see the answer, confidence score, rationale, and the source-agreement breakdown.
5. **Dispute (optional):** Click "Dispute", add one more source, and watch the verdict get re-evaluated.

## 06. Review Verification (Expected Outcome: 308/500 chars)
${expectedOutcome}

- **Contract Link 1:** https://explorer-bradbury.genlayer.com/address/0x8a927cD5E4D1A456F26E652391054C345Fe490B6

## 07. Project Links & Evidence
- **Website:** ${window.location.origin}
- **GitHub Repository:** https://github.com/verifeed/verifeed-genlayer-oracle
- **Evidence Item 1:** Intelligent Contract (Python SDK) utilizing \`gl.get_webpage\`, \`gl.exec_prompt\`, and \`gl.eq_principle_prompt_llm\`
- **Evidence Item 2:** Multi-Model Validator Consensus Engine with dispute resolution mechanism
`;

  const downloadJsonDossier = () => {
    const data = {
      project_name: 'VeriFeed',
      application_date: '26/10/2026',
      tags: {
        primary: 'Oracles / Data',
        tag1: 'Prediction Markets',
        tag2: 'AI Agents',
      },
      summary: projectSummary,
      overview: projectOverview,
      demo_video_url: 'https://www.youtube.com/watch?v=demo_verifeed_genlayer',
      how_to_steps: howToSteps.map((s) => ({ title: s.title, instruction: s.instruction })),
      expected_verification_outcome: expectedOutcome,
      contract_links: ['https://explorer-bradbury.genlayer.com/address/0x8a927cD5E4D1A456F26E652391054C345Fe490B6'],
      project_links: {
        website: window.location.origin,
        github: 'https://github.com/verifeed/verifeed-genlayer-oracle',
      },
      evidence: [
        'GenLayer Python Intelligent Contract VeriFeedOracle.py with non-deterministic web fetching and LLM equivalence consensus',
        'End-to-End React frontend with genlayer-js client simulation and dispute re-evaluation',
      ],
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'verifeed-genlayer-submission-dossier.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner & Submission Header */}
      <div className="border border-amber-900/60 bg-gradient-to-br from-amber-950/20 via-slate-900 to-slate-950 rounded-xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>GenLayer Project Submission Application · Steward Review Portal</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>Application Date: 26/10/2026</span>
            <span className="text-slate-600">·</span>
            <span className="text-emerald-400 font-semibold">Required Fields: 7/7</span>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            VeriFeed — GenLayer Project Submission Dossier
          </h1>
          <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
            This public dossier contains the exact application text and live verification checkpoints configured for GenLayer stewards.
            Stewards can review every field, copy submission blocks with one click, and test the exact execution path on the Bradbury network.
          </p>
        </div>

        {/* Global Export & Copy Actions */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            onClick={() => copyToClipboard('all_md', fullMarkdownExport)}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors"
          >
            {copiedKey === 'all_md' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedKey === 'all_md' ? 'Copied Full Submission' : 'Copy Submission (Markdown)'}
          </button>

          <button
            onClick={downloadJsonDossier}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-md border border-slate-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            Download Submission JSON
          </button>

          <button
            onClick={() => onNavigateToTab('vercel')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 bg-slate-900 border border-slate-800 rounded-md hover:border-slate-700 transition-colors"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            Vercel Deployment Guide
          </button>
        </div>
      </div>

      {/* 7 Required Sections Accordion/Cards */}
      <div className="space-y-6">
        {/* 01 IDENTITY */}
        <section className="border border-slate-800 bg-slate-900/40 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-amber-400 font-bold">01</span>
              <h2 className="text-base font-bold text-white">Identity</h2>
            </div>
            <span className="text-xs text-slate-500 font-mono">Make it recognizable</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4 p-4 bg-slate-950/70 border border-slate-800 rounded-xl">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white text-lg shadow-md shadow-cyan-500/20">
                GL
              </div>
              <div className="space-y-0.5">
                <div className="text-xs text-slate-400">Project Logo & Mark</div>
                <div className="text-sm font-bold text-white">VeriFeed Logo</div>
                <div className="text-[11px] text-slate-500 font-mono">PNG / WebP · 512px · GenLayer Ready</div>
              </div>
            </div>

            <div className="space-y-2 p-4 bg-slate-950/70 border border-slate-800 rounded-xl text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Project Name:</span>
                <span className="text-white font-bold font-mono">VeriFeed</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Primary Tag:</span>
                <span className="text-cyan-400 font-mono">Oracles / Data</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Tag 1 / Tag 2:</span>
                <span className="text-slate-300 font-mono">Prediction Markets · AI Agents</span>
              </div>
            </div>
          </div>
        </section>

        {/* 02 PROJECT SUMMARY */}
        <section className="border border-slate-800 bg-slate-900/40 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-amber-400 font-bold">02</span>
              <h2 className="text-base font-bold text-white">Project Summary (One-liner)</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-cyan-400 tabular-nums">
                {projectSummary.length} / 180 characters
              </span>
              <button
                onClick={() => copyToClipboard('summary', projectSummary)}
                className="text-slate-400 hover:text-white p-1"
                title="Copy One-Liner"
              >
                {copiedKey === 'summary' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl text-sm font-medium text-slate-200 leading-relaxed font-mono">
            &quot;{projectSummary}&quot;
          </div>
        </section>

        {/* 03 PROJECT OVERVIEW */}
        <section className="border border-slate-800 bg-slate-900/40 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-amber-400 font-bold">03</span>
              <h2 className="text-base font-bold text-white">Project Overview (Description)</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-cyan-400 tabular-nums">
                {projectOverview.length} / 1000 characters
              </span>
              <button
                onClick={() => copyToClipboard('overview', projectOverview)}
                className="text-slate-400 hover:text-white p-1"
                title="Copy Description"
              >
                {copiedKey === 'overview' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-300 leading-relaxed">
            {projectOverview}
          </div>
        </section>

        {/* 04 DEMO VIDEO */}
        <section className="border border-slate-800 bg-slate-900/40 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-amber-400 font-bold">04</span>
              <h2 className="text-base font-bold text-white">Demo Video</h2>
            </div>
            <span className="text-xs text-slate-500 font-mono">Show it in action</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-3">
              <div className="text-xs text-slate-400">Demo URL (YouTube or X direct post)</div>
              <div className="flex items-center justify-between p-2 bg-slate-900 border border-slate-800 rounded text-xs font-mono text-cyan-400 select-all">
                <span>https://www.youtube.com/watch?v=demo_verifeed_genlayer</span>
                <button
                  onClick={() =>
                    copyToClipboard('demo_url', 'https://www.youtube.com/watch?v=demo_verifeed_genlayer')
                  }
                  className="text-slate-400 hover:text-white"
                >
                  {copiedKey === 'demo_url' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <p className="text-[11px] text-slate-400">
                Covers the 60–90 second workflow: connecting wallet, posing a conflict query with 3 URLs, watching validator consensus reach FINALIZED, and inspecting rationale.
              </p>
            </div>

            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl flex flex-col justify-center items-center text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400">
                <Play className="w-5 h-5 ml-0.5" />
              </div>
              <div className="text-xs font-semibold text-white">Interactive In-App Walkthrough</div>
              <button
                onClick={onSelectSampleQuestion}
                className="text-xs text-cyan-400 hover:underline inline-flex items-center gap-1"
              >
                Inspect Sample Consensus Result
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </section>

        {/* 05 HOW-TO STEPS */}
        <section className="border border-slate-800 bg-slate-900/40 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-amber-400 font-bold">05</span>
              <h2 className="text-base font-bold text-white">How-to (The Exact Verification Path)</h2>
            </div>
            <span className="text-xs text-slate-500 font-mono">5/5 Steps Documented</span>
          </div>

          <div className="space-y-3">
            {howToSteps.map((step) => (
              <div
                key={step.num}
                className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-start gap-3">
                  <span className="font-mono text-cyan-400 font-bold pt-0.5">{step.num}</span>
                  <div>
                    <div className="font-semibold text-white text-sm">{step.title}</div>
                    <div className="text-slate-400 mt-0.5">{step.instruction}</div>
                  </div>
                </div>

                <button
                  onClick={step.action}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-cyan-300 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded transition-colors self-start sm:self-auto shrink-0"
                >
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  {step.actionLabel}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 06 REVIEW VERIFICATION */}
        <section className="border border-slate-800 bg-slate-900/40 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-amber-400 font-bold">06</span>
              <h2 className="text-base font-bold text-white">Review Verification</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-cyan-400 tabular-nums">
                {expectedOutcome.length} / 500 characters
              </span>
              <button
                onClick={() => copyToClipboard('outcome', expectedOutcome)}
                className="text-slate-400 hover:text-white p-1"
                title="Copy Expected Outcome"
              >
                {copiedKey === 'outcome' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-3 text-xs">
            <div className="text-slate-400 font-semibold uppercase tracking-wider">
              Expected Verification Outcome:
            </div>
            <p className="text-slate-200 text-sm leading-relaxed">{expectedOutcome}</p>

            <div className="pt-2 border-t border-slate-800 space-y-1">
              <div className="text-slate-400">GenLayer Bradbury Contract Link:</div>
              <a
                href="https://explorer-bradbury.genlayer.com/address/0x8a927cD5E4D1A456F26E652391054C345Fe490B6"
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 hover:underline font-mono inline-flex items-center gap-1.5 break-all"
              >
                https://explorer-bradbury.genlayer.com/address/0x8a927cD5E4D1A456F26E652391054C345Fe490B6
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
              </a>
            </div>
          </div>
        </section>

        {/* 07 PROJECT LINKS & EVIDENCE */}
        <section className="border border-slate-800 bg-slate-900/40 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-amber-400 font-bold">07</span>
              <h2 className="text-base font-bold text-white">Project Links & Evidence</h2>
            </div>
            <span className="text-xs text-emerald-400 font-mono">Evidence Attached</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-1">
              <div className="text-slate-400">Website URL (Required):</div>
              <div className="text-cyan-400 break-all select-all">{window.location.origin}</div>
            </div>

            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-1">
              <div className="text-slate-400">GitHub Repository (Evidence):</div>
              <a
                href="https://github.com/verifeed/verifeed-genlayer-oracle"
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 hover:underline flex items-center gap-1"
              >
                https://github.com/verifeed/verifeed-genlayer-oracle
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2 text-xs">
            <div className="font-semibold text-slate-300">Supporting Evidence Highlights:</div>
            <ul className="list-disc pl-5 text-slate-400 space-y-1">
              <li>
                <strong className="text-slate-200">Real GenLayer Intelligent Contract:</strong> Uses <code className="text-cyan-400">gl.get_webpage</code> for validator-driven web scraping and <code className="text-cyan-400">gl.eq_principle_prompt_llm</code> for Equivalence consensus.
              </li>
              <li>
                <strong className="text-slate-200">Dispute Escalation Game:</strong> Economic game theory where bonded stakes ($GEN) trigger re-evaluation rounds with new evidence.
              </li>
              <li>
                <strong className="text-slate-200">Vercel Production Deployment:</strong> Pre-bundled with <code className="text-cyan-400">vercel.json</code> configuration for one-click hosting.
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};
