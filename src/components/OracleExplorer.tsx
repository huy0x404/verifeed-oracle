import React, { useState, useMemo } from 'react';
import {
  Search,
  Plus,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ExternalLink,
  ChevronRight,
  Filter,
  ShieldCheck,
  Scale,
  Sparkles,
  GitBranch,
} from 'lucide-react';
import { Question, QuestionStatus } from '../types';

interface OracleExplorerProps {
  questions: Question[];
  onSelectQuestion: (question: Question) => void;
  onOpenCreateModal: () => void;
  onOpenDispute: (question: Question) => void;
}

export const OracleExplorer: React.FC<OracleExplorerProps> = ({
  questions,
  onSelectQuestion,
  onOpenCreateModal,
  onOpenDispute,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const categories = ['all', 'Sports', 'Prediction Markets', 'Crypto & Web3', 'Science & Tech'];

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const matchesSearch =
        q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.verdict?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.sources.some((s) => s.domain.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory =
        selectedCategory === 'all' || q.category === selectedCategory;

      const matchesStatus =
        selectedStatus === 'all' || q.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [questions, searchTerm, selectedCategory, selectedStatus]);

  const stats = useMemo(() => {
    const total = questions.length;
    const finalized = questions.filter((q) => q.status === 'FINALIZED').length;
    const resolving = questions.filter((q) => q.status === 'RESOLVING' || q.status === 'PENDING').length;
    const avgConfidence = (
      questions.reduce((acc, q) => acc + (q.confidenceScore || 0), 0) / (finalized || 1)
    ).toFixed(1);
    return { total, finalized, resolving, avgConfidence };
  }, [questions]);

  return (
    <div className="space-y-8">
      {/* Hero Overview */}
      <div className="border border-slate-800 bg-slate-900/60 rounded-xl p-6 sm:p-8">
        <div className="max-w-3xl space-y-4">
          <div className="text-xs uppercase tracking-wider text-cyan-400 font-mono">
            GenLayer Intelligent Oracle
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
            Resolving conflicting web sources into cryptographic consensus.
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            VeriFeed enables any dApp, prediction market, or DAO to pose questions with contradictory sources.
            GenLayer validator nodes independently retrieve web data, apply LLM analytical reasoning, verify semantic equivalence,
            and finalize an on-chain verdict with confidence ratings and reasoning traces.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenCreateModal}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-cyan-950 bg-cyan-400 hover:bg-cyan-300 rounded-md transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Create New Oracle Query
            </button>
            <a
              href="https://explorer-bradbury.genlayer.com/address/0x8a927cD5E4D1A456F26E652391054C345Fe490B6"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono text-slate-300 bg-slate-800/80 hover:bg-slate-800 hover:text-white rounded-md border border-slate-700/80 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              Contract: 0x8a92...90B6 (Bradbury)
            </a>
          </div>
        </div>

        {/* Metric Strip (Clean tabular-nums, no pill enclosures) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800/80 text-sm">
          <div>
            <div className="text-xs text-slate-400">Total Resolutions</div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-white tabular-nums mt-1">
              {stats.total}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-400">Finalized Consensus</div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400 tabular-nums mt-1">
              {stats.finalized}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-400">Average Equivalence Score</div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-400 tabular-nums mt-1">
              {stats.avgConfidence}%
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-400">Consensus Engine</div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">
              LLM Equivalence
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Search box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by topic, source domain, or verdict..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs text-white bg-slate-900 border border-slate-800 rounded-lg placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
            />
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-lg overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap capitalize ${
                  selectedCategory === cat
                    ? 'bg-slate-800 text-cyan-400 font-semibold shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat === 'all' ? 'All Categories' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary status filter */}
        <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
          <span className="font-medium text-slate-300">Filter by Status:</span>
          {['all', 'FINALIZED', 'RESOLVING', 'DISPUTED'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`hover:text-white transition-colors cursor-pointer ${
                selectedStatus === st ? 'text-cyan-400 font-bold underline' : ''
              }`}
            >
              {st === 'all' ? 'All' : st}
            </button>
          ))}
          <span className="text-slate-600">·</span>
          <span>Showing {filteredQuestions.length} queries</span>
        </div>
      </div>

      {/* Question List View */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="border border-slate-800 bg-slate-900/40 rounded-xl p-12 text-center space-y-4">
            <AlertTriangle className="w-8 h-8 text-slate-500 mx-auto" />
            <h3 className="text-base font-semibold text-white">No oracle queries found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              No resolutions match your current search or category filter. Try clearing the filter or submit a new question with conflicting sources.
            </p>
            <button
              onClick={onOpenCreateModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-cyan-950 bg-cyan-400 rounded-md hover:bg-cyan-300 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Create First Query
            </button>
          </div>
        ) : (
          filteredQuestions.map((q) => {
            const agreedSources = q.sources.filter((s) => s.status === 'agreed').length;
            const conflictedSources = q.sources.filter((s) => s.status === 'conflicted').length;

            return (
              <div
                key={q.id}
                className="group border border-slate-800 hover:border-slate-700 bg-slate-900/40 hover:bg-slate-900/70 rounded-xl p-5 sm:p-6 transition-all space-y-4 cursor-pointer"
                onClick={() => onSelectQuestion(q)}
              >
                {/* Header metadata row (Zero-Pill rule: clean text with dividers) */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400 font-medium">{q.category}</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span>Block #{q.blockNumber}</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span>{new Date(q.createdAt).toLocaleDateString()}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`font-semibold ${
                        q.status === 'FINALIZED'
                          ? 'text-emerald-400'
                          : q.status === 'RESOLVING'
                          ? 'text-amber-400'
                          : 'text-rose-400'
                      }`}
                    >
                      {q.status}
                    </span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span>{q.sources.length} sources evaluated</span>
                  </div>
                </div>

                {/* Question title */}
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                  {q.title}
                </h3>

                {/* Consensus Verdict Box */}
                {q.verdict && (
                  <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800/90 space-y-2">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2 text-xs">
                        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="text-slate-400">Consensus Verdict:</span>
                        <span className="text-white font-semibold">{q.verdict}</span>
                      </div>
                      <div className="text-xs font-mono text-emerald-400 tabular-nums shrink-0">
                        {q.confidenceScore}% Confidence
                      </div>
                    </div>
                    {q.rationale && (
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {q.rationale}
                      </p>
                    )}
                  </div>
                )}

                {/* Source Matrix and Actions strip */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-800/60 text-xs">
                  <div className="flex items-center gap-3 text-slate-400">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <Scale className="w-3.5 h-3.5 text-slate-400" />
                      Evidence Matrix:
                    </span>
                    <span className="text-emerald-400 font-mono">
                      {agreedSources} Corroborated
                    </span>
                    <span aria-hidden="true" className="text-slate-700">·</span>
                    <span className="text-rose-400 font-mono">
                      {conflictedSources} Debunked / Conflicted
                    </span>
                    <span aria-hidden="true" className="text-slate-700">·</span>
                    <span className="font-mono text-slate-400">
                      {q.validatorsConsensus?.totalValidators || 3} Validators LLM
                    </span>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenDispute(q);
                      }}
                      className="px-2.5 py-1 text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1 font-mono cursor-pointer"
                    >
                      <GitBranch className="w-3.5 h-3.5" />
                      Dispute
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectQuestion(q);
                      }}
                      className="text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1 transition-colors"
                    >
                      Inspect Resolution
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
