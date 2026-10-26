import React, { useState } from 'react';
import {
  X,
  Plus,
  Trash2,
  Sparkles,
  Link2,
  CheckCircle2,
  Loader2,
  HelpCircle,
  Zap,
} from 'lucide-react';
import { OutputFormat, Question, SourceItem } from '../types';
import { executeLiveGenLayerConsensus } from '../services/genlayer';

interface CreateQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newQuestion: Question) => void;
  userAddress: string;
}

export const CreateQuestionModal: React.FC<CreateQuestionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  userAddress,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Sports' | 'Prediction Markets' | 'Crypto & Web3' | 'Science & Tech' | 'World News'>('Sports');
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('text');
  const [validatorCount, setValidatorCount] = useState<number>(3);
  const [isResolving, setIsResolving] = useState(false);
  const [resolutionStep, setResolutionStep] = useState<string>('');

  const [sources, setSources] = useState<Array<{ url: string; title: string; claimedAnswer: string; reliability: 'High' | 'Medium' | 'Low' }>>([
    {
      url: 'https://www.uefa.com/uefachampionsleague/match/2039971--dortmund-vs-real-madrid/',
      title: 'UEFA Official Final Report',
      claimedAnswer: 'Real Madrid won 2-0',
      reliability: 'High',
    },
    {
      url: 'https://www.bbc.com/sport/football/articles/c1wwz1q73n1o',
      title: 'BBC Sport Match Coverage',
      claimedAnswer: 'Real Madrid won 2-0',
      reliability: 'High',
    },
    {
      url: 'https://fanblog-fakesports-rumors.xyz/ucl-final-dispute-var',
      title: 'FanZone Rumor Blog (Conflicting VAR claim)',
      claimedAnswer: 'Borussia Dortmund won 2-1',
      reliability: 'Low',
    },
  ]);

  if (!isOpen) return null;

  const handleAddSource = () => {
    if (sources.length >= 5) return;
    setSources([
      ...sources,
      {
        url: '',
        title: '',
        claimedAnswer: '',
        reliability: 'Medium',
      },
    ]);
  };

  const handleRemoveSource = (index: number) => {
    if (sources.length <= 2) return;
    setSources(sources.filter((_, i) => i !== index));
  };

  const handleSourceChange = (index: number, field: string, value: string) => {
    const updated = [...sources];
    updated[index] = { ...updated[index], [field]: value };
    setSources(updated);
  };

  const loadPreset = (presetType: 'champions' | 'crypto' | 'custom') => {
    if (presetType === 'champions') {
      setTitle('Which team won the 2024 UEFA Champions League final?');
      setCategory('Sports');
      setOutputFormat('text');
      setSources([
        {
          url: 'https://www.uefa.com/uefachampionsleague/match/2039971--dortmund-vs-real-madrid/',
          title: 'UEFA Official Match Center',
          claimedAnswer: 'Real Madrid won 2-0',
          reliability: 'High',
        },
        {
          url: 'https://www.bbc.com/sport/football/articles/c1wwz1q73n1o',
          title: 'BBC Sport Coverage',
          claimedAnswer: 'Real Madrid won 2-0',
          reliability: 'High',
        },
        {
          url: 'https://fanblog-fakesports-rumors.xyz/ucl-final-dispute-var',
          title: 'FanZone Blog (Conflicting VAR Claim)',
          claimedAnswer: 'Borussia Dortmund won 2-1',
          reliability: 'Low',
        },
      ]);
    } else if (presetType === 'crypto') {
      setTitle('Did Bitcoin reach a new all-time high above $73,000 in March 2024?');
      setCategory('Crypto & Web3');
      setOutputFormat('boolean');
      setSources([
        {
          url: 'https://www.coingecko.com/en/coins/bitcoin',
          title: 'CoinGecko Historical Price Data',
          claimedAnswer: 'Yes ($73,737 reached March 14, 2024)',
          reliability: 'High',
        },
        {
          url: 'https://www.bloomberg.com/news/articles/2024-03-14/bitcoin-hits-record-high',
          title: 'Bloomberg Markets',
          claimedAnswer: 'Yes (Surpassed prior peak)',
          reliability: 'High',
        },
        {
          url: 'https://skeptic-crypto-archive.biz/fake-out-rejection',
          title: 'Skeptic Blog (Claiming wick was invalid)',
          claimedAnswer: 'No (Claiming exchange glitch)',
          reliability: 'Low',
        },
      ]);
    } else {
      setTitle('');
      setSources([
        { url: '', title: '', claimedAnswer: '', reliability: 'High' },
        { url: '', title: '', claimedAnswer: '', reliability: 'Medium' },
      ]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || sources.some((s) => !s.url.trim())) {
      return;
    }

    setIsResolving(true);

    try {
      const sourceItems: SourceItem[] = sources.map((s, idx) => ({
        id: `src-${Date.now()}-${idx}`,
        url: s.url,
        title: s.title || `Source ${idx + 1}`,
        domain: '',
        claimedAnswer: s.claimedAnswer || 'Observation noted',
        reliability: s.reliability,
        status: 'unverified',
        publishedDate: 'Recent',
      }));

      const resolution = await executeLiveGenLayerConsensus(
        title.trim(),
        sourceItems,
        outputFormat,
        validatorCount,
        (stageText) => setResolutionStep(stageText)
      );

      const newQuestion: Question = {
        id: `vf-q-${Date.now().toString().slice(-4)}`,
        title: title.trim(),
        category,
        primaryTag: 'Oracles / Data',
        tags: ['Prediction Markets', 'AI Agents'],
        outputFormat,
        createdAt: new Date().toISOString(),
        creatorAddress: userAddress || '0x7F2aC90b14cE40EfA10E1a4F4f74d08F0a7e8b14',
        transactionHash: resolution.txHash,
        blockNumber: resolution.blockNumber,
        status: 'FINALIZED',
        verdict: resolution.verdict,
        confidenceScore: resolution.confidenceScore,
        rationale: resolution.rationale,
        resolutionTimeMs: 3800,
        sources: resolution.evaluatedSources,
        validatorsConsensus: {
          totalValidators: validatorCount,
          agreedCount: validatorCount,
          disagreedCount: 0,
          equivalenceScore: 1.0,
          validatorVotes: resolution.validatorVotes,
        },
        disputeHistory: [],
      };

      onSubmit(newQuestion);
      onClose();
    } catch (err: any) {
      console.error('Error during resolution:', err);
    } finally {
      setIsResolving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950/40">
          <div>
            <div className="text-xs font-mono text-cyan-400">GenLayer Bradbury Resolution</div>
            <h2 className="text-xl font-bold text-white tracking-tight">Create Oracle Query</h2>
          </div>
          <button
            onClick={onClose}
            disabled={isResolving}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Presets Bar */}
        <div className="px-6 py-3 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between gap-3 text-xs">
          <span className="text-slate-400 flex items-center gap-1.5 font-medium">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Quick Presets:
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => loadPreset('champions')}
              className="px-2.5 py-1 text-slate-300 hover:text-cyan-400 bg-slate-900 border border-slate-800 rounded hover:border-slate-700 transition-colors"
            >
              Champions League 2024
            </button>
            <button
              type="button"
              onClick={() => loadPreset('crypto')}
              className="px-2.5 py-1 text-slate-300 hover:text-cyan-400 bg-slate-900 border border-slate-800 rounded hover:border-slate-700 transition-colors"
            >
              Bitcoin ATH
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Question Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span>Question or Fact to Resolve *</span>
              <span className="text-[11px] font-mono text-slate-500">Min 10 characters</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Which team won the 2024 UEFA Champions League final?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm text-white bg-slate-950 border border-slate-800 rounded-lg placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          {/* Category and Output Format */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 text-xs text-white bg-slate-950 border border-slate-800 rounded-lg focus:outline-none focus:border-cyan-500"
              >
                <option value="Sports">Sports</option>
                <option value="Prediction Markets">Prediction Markets</option>
                <option value="Crypto & Web3">Crypto & Web3</option>
                <option value="Science & Tech">Science & Tech</option>
                <option value="World News">World News</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Output Format</label>
              <select
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value as OutputFormat)}
                className="w-full px-3 py-2 text-xs text-white bg-slate-950 border border-slate-800 rounded-lg focus:outline-none focus:border-cyan-500"
              >
                <option value="text">String / Entity Name</option>
                <option value="boolean">Boolean (Yes / No)</option>
                <option value="number">Numeric Metric</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Validators</label>
              <select
                value={validatorCount}
                onChange={(e) => setValidatorCount(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs text-white bg-slate-950 border border-slate-800 rounded-lg focus:outline-none focus:border-cyan-500 font-mono"
              >
                <option value={3}>3 Nodes (Standard)</option>
                <option value={5}>5 Nodes (High Security)</option>
              </select>
            </div>
          </div>

          {/* Sources Section */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Link2 className="w-3.5 h-3.5 text-cyan-400" />
                Submitted Web Sources ({sources.length} / 5) *
              </label>
              {sources.length < 5 && (
                <button
                  type="button"
                  onClick={handleAddSource}
                  className="text-xs text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 font-medium"
                >
                  <Plus className="w-3 h-3" />
                  Add Another URL
                </button>
              )}
            </div>

            <div className="text-[11px] text-slate-400">
              Provide 2–5 conflicting or complementary URLs. GenLayer validators will fetch each URL and cross-examine claims with LLM equivalence checks.
            </div>

            <div className="space-y-3">
              {sources.map((source, index) => (
                <div
                  key={index}
                  className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-2.5 relative group"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono text-cyan-400 font-semibold">
                      Source #{index + 1}
                    </span>
                    {sources.length > 2 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveSource(index)}
                        className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <input
                    type="url"
                    required
                    placeholder="https://example.com/article-or-report"
                    value={source.url}
                    onChange={(e) => handleSourceChange(index, 'url', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs text-white bg-slate-900 border border-slate-800 rounded font-mono placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <input
                      type="text"
                      placeholder="Title / Source Name"
                      value={source.title}
                      onChange={(e) => handleSourceChange(index, 'title', e.target.value)}
                      className="px-2.5 py-1.5 text-xs text-white bg-slate-900 border border-slate-800 rounded placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                    />

                    <input
                      type="text"
                      placeholder="Claimed outcome or answer"
                      value={source.claimedAnswer}
                      onChange={(e) => handleSourceChange(index, 'claimedAnswer', e.target.value)}
                      className="px-2.5 py-1.5 text-xs text-white bg-slate-900 border border-slate-800 rounded placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Loading status banner during resolution */}
          {isResolving && (
            <div className="p-4 bg-cyan-950/40 border border-cyan-800/80 rounded-xl space-y-2 text-xs">
              <div className="flex items-center gap-2 text-cyan-300 font-semibold font-mono">
                <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                <span>Simulating GenLayer Bradbury Consensus</span>
              </div>
              <p className="text-slate-300 font-mono text-[11px]">{resolutionStep}</p>
            </div>
          )}

          {/* Submit Action */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
            <button
              type="button"
              disabled={isResolving}
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isResolving}
              className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold text-cyan-950 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 rounded-md transition-colors shadow-sm"
            >
              {isResolving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Resolving Consensus...
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  Submit for GenLayer Resolution
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
