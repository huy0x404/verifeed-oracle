import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  ExternalLink,
  CheckCircle,
  XCircle,
  Scale,
  Brain,
  History,
  AlertCircle,
  Copy,
  Check,
  Send,
  Plus,
  Loader2,
  RefreshCw,
  Play,
} from 'lucide-react';
import { Question, SourceItem, DisputeRound, GenLayerNetwork } from '../types';
import {
  disputeQuestionOnChain,
  readVerdictFromChain,
  readQuestionCountFromChain,
  getActiveContractAddress,
} from '../services/genlayer';

interface QuestionDetailModalProps {
  question: Question | null;
  onClose: () => void;
  onDisputeSubmit: (
    questionId: string,
    newSources: SourceItem[],
    stakeAmount: string,
    txHash?: string,
    blockNumber?: number
  ) => void;
  userAddress?: string;
  activeNetwork?: GenLayerNetwork;
}

export const QuestionDetailModal: React.FC<QuestionDetailModalProps> = ({
  question,
  onClose,
  onDisputeSubmit,
  userAddress,
  activeNetwork = 'testnetBradbury',
}) => {
  const [activeTab, setActiveTab] = useState<'evidence' | 'validators' | 'dispute' | 'tx'>('evidence');
  const [copiedTx, setCopiedTx] = useState(false);
  const [disputeUrl, setDisputeUrl] = useState('');
  const [disputeTitle, setDisputeTitle] = useState('');
  const [disputeClaim, setDisputeClaim] = useState('');
  const [disputeStake, setDisputeStake] = useState('50');

  // Live on-chain dispute state
  const [isDisputing, setIsDisputing] = useState(false);
  const [disputeStep, setDisputeStep] = useState<string>('');
  const [disputeError, setDisputeError] = useState<string | null>(null);

  // Live on-chain read state
  const [onChainRecord, setOnChainRecord] = useState<any>(null);
  const [isReadingChain, setIsReadingChain] = useState(false);
  const [readError, setReadError] = useState<string | null>(null);

  if (!question) return null;

  const handleCopyTx = () => {
    navigator.clipboard.writeText(question.transactionHash);
    setCopiedTx(true);
    setTimeout(() => setCopiedTx(false), 2000);
  };

  const handleAddDispute = async (e: React.FormEvent, forceLocal = false) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!disputeUrl) return;

    let domain = 'web-source.com';
    try {
      domain = new URL(disputeUrl).hostname;
    } catch {
      domain = 'custom-source.org';
    }

    const newSource: SourceItem = {
      id: `dispute-s-${Date.now()}`,
      url: disputeUrl,
      title: disputeTitle || `Counter Source from ${domain}`,
      domain,
      claimedAnswer: disputeClaim || 'Challenging existing resolution claim',
      reliability: 'Medium',
      status: 'unverified',
      publishedDate: new Date().toLocaleDateString(),
    };

    if (forceLocal) {
      onDisputeSubmit(question.id, [newSource], disputeStake);
      setDisputeUrl('');
      setDisputeTitle('');
      setDisputeClaim('');
      setActiveTab('dispute');
      return;
    }

    setIsDisputing(true);
    setDisputeError(null);
    setDisputeStep('Opening Web3 wallet to approve 50 GEN dispute stake...');

    try {
      const activeContract = getActiveContractAddress(activeNetwork);
      const onChainRes = await disputeQuestionOnChain({
        questionId: question.id,
        newSources: [newSource],
        stakeAmount: disputeStake,
        contractAddress: activeContract,
        userAddress,
        network: activeNetwork,
        onProgress: (stepText) => setDisputeStep(stepText),
      });

      onDisputeSubmit(question.id, [newSource], disputeStake, onChainRes.txHash, onChainRes.blockNumber);
      setDisputeUrl('');
      setDisputeTitle('');
      setDisputeClaim('');
      setActiveTab('dispute');
    } catch (err: any) {
      console.warn('Dispute on-chain error:', err);
      const isRejection =
        err?.message?.includes('rejected') ||
        err?.code === 4001 ||
        err?.message?.includes('denied');

      if (isRejection) {
        setDisputeError('Transaction was rejected in your Web3 wallet. Please confirm the 50 GEN stake in MetaMask.');
      } else {
        setDisputeError(
          err?.message ||
          'Failed to broadcast dispute on GenLayer Bradbury. Please check wallet connection and gas balance.'
        );
      }
    } finally {
      setIsDisputing(false);
    }
  };

  const handleReadOnChainState = async () => {
    setIsReadingChain(true);
    setReadError(null);
    try {
      const activeContract = getActiveContractAddress(activeNetwork);
      const [verdictResult, questionCount] = await Promise.all([
        readVerdictFromChain(activeContract, question.id, activeNetwork),
        readQuestionCountFromChain(activeContract, activeNetwork),
      ]);

      setOnChainRecord({
        activeContract,
        questionId: question.id,
        network: activeNetwork,
        questionCount,
        verdictResult,
        queriedAt: new Date().toISOString(),
      });
    } catch (err: any) {
      setReadError(err?.message || 'Failed to query get_verdict from GenLayer RPC.');
    } finally {
      setIsReadingChain(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 p-6 border-b border-slate-800 bg-slate-950/40">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="text-cyan-400 font-semibold">{question.category}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Query ID: {question.id}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-emerald-400 font-semibold">{question.status}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
              {question.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Verdict Banner */}
        <div className="p-6 bg-slate-950/60 border-b border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2 space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-400 uppercase tracking-wider font-mono">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Intelligent Contract Finalized Verdict
              </div>
              <div className="text-2xl font-extrabold text-white">
                {question.verdict || 'Awaiting Consensus'}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {question.rationale}
              </p>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2 text-center md:text-left">
              <div className="text-xs text-slate-400">Equivalence Consensus</div>
              <div className="text-3xl font-extrabold font-mono text-emerald-400 tabular-nums">
                {question.confidenceScore}%
              </div>
              <div className="text-xs text-slate-400 flex items-center justify-between">
                <span>Model agreement:</span>
                <span className="font-mono text-white">
                  {question.validatorsConsensus?.agreedCount || 3} / {question.validatorsConsensus?.totalValidators || 3}
                </span>
              </div>
              <div className="text-xs text-slate-400 flex items-center justify-between">
                <span>Resolution time:</span>
                <span className="font-mono text-white tabular-nums">
                  {question.resolutionTimeMs ? `${(question.resolutionTimeMs / 1000).toFixed(2)}s` : '3.8s'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-slate-800 bg-slate-900/40 text-xs font-medium text-slate-400 overflow-x-auto">
          <button
            onClick={() => setActiveTab('evidence')}
            className={`pb-3 px-1 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'evidence'
                ? 'border-cyan-400 text-cyan-400 font-semibold'
                : 'border-transparent hover:text-white'
            }`}
          >
            <Scale className="w-4 h-4" />
            Web Sources Matrix ({question.sources.length})
          </button>
          <button
            onClick={() => setActiveTab('validators')}
            className={`pb-3 px-1 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'validators'
                ? 'border-cyan-400 text-cyan-400 font-semibold'
                : 'border-transparent hover:text-white'
            }`}
          >
            <Brain className="w-4 h-4" />
            Validator LLM Reasoning Traces ({question.validatorsConsensus?.validatorVotes.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('dispute')}
            className={`pb-3 px-1 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'dispute'
                ? 'border-amber-400 text-amber-400 font-semibold'
                : 'border-transparent hover:text-white'
            }`}
          >
            <History className="w-4 h-4" />
            Dispute & Re-Evaluation ({question.disputeHistory?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('tx')}
            className={`pb-3 px-1 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'tx'
                ? 'border-cyan-400 text-cyan-400 font-semibold'
                : 'border-transparent hover:text-white'
            }`}
          >
            <ExternalLink className="w-4 h-4" />
            Bradbury On-Chain State
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 max-h-[50vh] overflow-y-auto space-y-6">
          {/* TAB 1: EVIDENCE SOURCES */}
          {activeTab === 'evidence' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-400">
                GenLayer validators read each URL independently via <code className="text-cyan-400 font-mono">gl.get_webpage(url)</code>.
                Below is the non-deterministic ingestion matrix comparing claims against consensus:
              </div>

              <div className="space-y-3">
                {question.sources.map((s, idx) => {
                  const isAgreed = s.status === 'agreed';
                  return (
                    <div
                      key={s.id || idx}
                      className={`p-4 rounded-xl border transition-colors ${
                        isAgreed
                          ? 'border-emerald-800/50 bg-emerald-950/10'
                          : 'border-rose-800/50 bg-rose-950/10'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          {isAgreed ? (
                            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : (
                            <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                          )}
                          <a
                            href={s.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm font-semibold text-white hover:text-cyan-400 transition-colors inline-flex items-center gap-1"
                          >
                            {s.title}
                            <ExternalLink className="w-3 h-3 text-slate-400" />
                          </a>
                        </div>

                        <div className="flex items-center gap-2 text-xs font-mono">
                          <span className="text-slate-400">Domain: {s.domain}</span>
                          <span aria-hidden="true" className="text-slate-700">·</span>
                          <span
                            className={
                              isAgreed ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'
                            }
                          >
                            {isAgreed ? 'Corroborated' : 'Conflicted / Discredited'}
                          </span>
                        </div>
                      </div>

                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                        <div>
                          <span className="text-slate-400">Claimed Answer: </span>
                          <span className="text-slate-200 font-medium">{s.claimedAnswer}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Source Reliability: </span>
                          <span
                            className={`font-mono font-medium ${
                              s.reliability === 'High'
                                ? 'text-cyan-400'
                                : s.reliability === 'Medium'
                                ? 'text-amber-400'
                                : 'text-rose-400'
                            }`}
                          >
                            {s.reliability} Authority
                          </span>
                        </div>
                        {s.snippet && (
                          <div className="sm:col-span-2 text-slate-400 italic">
                            &quot;{s.snippet}&quot;
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: VALIDATOR LLM REASONING */}
          {activeTab === 'validators' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-400">
                GenLayer validators run diverse open and proprietary LLMs via <code className="text-cyan-400 font-mono">gl.exec_prompt()</code>.
                The Equivalence Principle (<code className="text-cyan-400 font-mono">gl.eq_principle_prompt_llm()</code>) ensures semantic agreement:
              </div>

              <div className="space-y-3">
                {question.validatorsConsensus?.validatorVotes.map((vote) => (
                  <div
                    key={vote.validatorId}
                    className="p-4 rounded-xl border border-slate-800 bg-slate-950/70 space-y-2.5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <Brain className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="text-white font-semibold">{vote.name}</span>
                        <span className="text-slate-500 font-mono">({vote.model})</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-mono">
                        <span className="text-emerald-400">Equivalence: Accepted</span>
                        <span aria-hidden="true" className="text-slate-700">·</span>
                        <span className="text-slate-400 tabular-nums">
                          {new Date(vote.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>

                    <div className="text-xs bg-slate-900/80 p-3 rounded-lg border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Individual Model Vote:</span>
                        <span className="text-cyan-300 font-semibold font-mono">{vote.vote}</span>
                      </div>
                      <div className="text-slate-300 pt-1 leading-relaxed">
                        <span className="text-slate-400">LLM Reasoning Trace: </span>
                        {vote.reasoning}
                      </div>
                    </div>

                    <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
                      <span>Node: {vote.nodeAddress}</span>
                      <span className="text-emerald-400 tabular-nums font-semibold">
                        {vote.confidence}% Confidence
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: DISPUTE & RE-EVALUATION */}
          {activeTab === 'dispute' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl border border-amber-800/50 bg-amber-950/10 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  Optimistic Staking & Dispute Policy
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  If you have newly discovered evidence, official corrections, or retracted publications,
                  you can challenge this verdict by staking <strong className="text-amber-300 font-mono">50 $GEN</strong> and submitting counter URLs.
                  GenLayer validators will re-evaluate all evidence in an escalated consensus round.
                </p>
              </div>

              {/* Dispute form */}
              <form onSubmit={handleAddDispute} className="space-y-3 p-4 rounded-xl border border-slate-800 bg-slate-950/60">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
                    Open Dispute Round (GenLayer Intelligent Contract)
                  </h4>
                  <span className="text-[11px] font-mono text-amber-400">
                    Bond: {disputeStake} GEN (Required)
                  </span>
                </div>

                {disputeError && (
                  <div className="p-3 bg-rose-950/50 border border-rose-800 rounded-lg text-xs text-rose-300 space-y-1.5">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <span>{disputeError}</span>
                    </div>
                    <div className="pt-1 flex items-center justify-end">
                      <button
                        type="button"
                        onClick={(e) => handleAddDispute(e, true)}
                        className="px-2 py-0.5 text-[11px] bg-rose-900/60 hover:bg-rose-800 text-rose-200 border border-rose-700 rounded transition-colors"
                      >
                        Record without Web3 wallet prompt
                      </button>
                    </div>
                  </div>
                )}

                {isDisputing && (
                  <div className="p-3.5 bg-amber-950/40 border border-amber-800/80 rounded-xl space-y-1.5 text-xs">
                    <div className="flex items-center gap-2 text-amber-300 font-semibold font-mono">
                      <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                      <span>Submitting On-Chain Dispute to GenLayer Bradbury</span>
                    </div>
                    <p className="text-slate-300 font-mono text-[11px]">{disputeStep}</p>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Counter-Evidence URL (Required)</label>
                  <input
                    type="url"
                    required
                    disabled={isDisputing}
                    placeholder="https://official-retraction.org/correction-notice"
                    value={disputeUrl}
                    onChange={(e) => setDisputeUrl(e.target.value)}
                    className="w-full px-3 py-2 text-xs text-white bg-slate-900 border border-slate-800 rounded-lg placeholder-slate-600 focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400">Source Title / Reference</label>
                    <input
                      type="text"
                      disabled={isDisputing}
                      placeholder="e.g. Official Correction Statement"
                      value={disputeTitle}
                      onChange={(e) => setDisputeTitle(e.target.value)}
                      className="w-full px-3 py-2 text-xs text-white bg-slate-900 border border-slate-800 rounded-lg placeholder-slate-600 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400">Required Stake Amount ($GEN)</label>
                    <input
                      type="number"
                      min="50"
                      disabled={isDisputing}
                      value={disputeStake}
                      onChange={(e) => setDisputeStake(e.target.value)}
                      className="w-full px-3 py-2 text-xs text-white bg-slate-900 border border-slate-800 rounded-lg font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Claim / Justification</label>
                  <input
                    type="text"
                    disabled={isDisputing}
                    placeholder="Explain why the current resolution is incorrect based on this new URL..."
                    value={disputeClaim}
                    onChange={(e) => setDisputeClaim(e.target.value)}
                    className="w-full px-3 py-2 text-xs text-white bg-slate-900 border border-slate-800 rounded-lg placeholder-slate-600 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isDisputing}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-amber-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 rounded-md transition-colors cursor-pointer"
                >
                  {isDisputing ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Broadcasting Dispute Tx...
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      Sign with Web3 Wallet & Stake {disputeStake} GEN
                    </>
                  )}
                </button>
              </form>

              {/* History */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-400">Dispute History</div>
                {(!question.disputeHistory || question.disputeHistory.length === 0) ? (
                  <div className="text-xs text-slate-500 italic p-3 border border-slate-800/80 rounded-lg bg-slate-950/40">
                    No disputes filed yet. The consensus verdict is uncontested.
                  </div>
                ) : (
                  question.disputeHistory.map((d, i) => (
                    <div key={i} className="p-3 border border-slate-800 rounded-lg bg-slate-950/60 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-amber-400 font-mono">Round #{d.round}</span>
                        <span className="text-slate-400 font-mono tabular-nums">{d.resolvedAt}</span>
                      </div>
                      <p className="text-slate-300">{d.rationale}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 4: BRADBURY STATE */}
          {activeTab === 'tx' && (
            <div className="space-y-4 font-mono text-xs">
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/80 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-slate-400">GenLayer Network:</span>
                  <span className="text-cyan-400 font-bold">
                    {activeNetwork === 'studionet' ? 'Studio Network (Chain ID 61999)' : 'Bradbury Testnet (Chain ID 4221)'}
                  </span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-slate-400">Intelligent Contract Address:</span>
                  <a
                    href={`https://explorer-bradbury.genlayer.com/address/${getActiveContractAddress(activeNetwork)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    {getActiveContractAddress(activeNetwork)}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-slate-400">Block Number:</span>
                  <span className="text-white tabular-nums">{question.blockNumber}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-slate-400">Creator Account:</span>
                  <span className="text-slate-300">{question.creatorAddress}</span>
                </div>
                <div className="space-y-1 pb-2 border-b border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Transaction Hash:</span>
                    <button
                      onClick={handleCopyTx}
                      className="text-cyan-400 hover:text-white transition-colors flex items-center gap-1"
                    >
                      {copiedTx ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      {copiedTx ? 'Copied' : 'Copy Hash'}
                    </button>
                  </div>
                  <div className="p-2 bg-slate-900 rounded border border-slate-800 text-slate-300 break-all select-all">
                    {question.transactionHash}
                  </div>
                </div>

                {/* Live On-Chain Query Section */}
                <div className="pt-2 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-slate-300 font-semibold flex items-center gap-2">
                      <Play className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Direct Contract State Query (get_verdict)</span>
                    </div>
                    <button
                      onClick={handleReadOnChainState}
                      disabled={isReadingChain}
                      className="px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/50 rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {isReadingChain ? (
                        <>
                          <Loader2 className="w-3 h-3 animate-spin" />
                          Calling gen_call...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="w-3 h-3" />
                          Query Live State via gen_call
                        </>
                      )}
                    </button>
                  </div>

                  {readError && (
                    <div className="p-3 bg-rose-950/40 border border-rose-800 rounded-lg text-rose-300 text-[11px]">
                      {readError}
                    </div>
                  )}

                  {onChainRecord && (
                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-2 text-[11px]">
                      <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-1">
                        <span>Contract Total Questions: <strong className="text-white">{onChainRecord.questionCount ?? 'Active'}</strong></span>
                        <span className="text-emerald-400 font-semibold">RPC Success</span>
                      </div>
                      <pre className="text-cyan-300 overflow-x-auto max-h-48 overflow-y-auto">
                        {JSON.stringify(onChainRecord.verdictResult, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-slate-800 bg-slate-950/60">
          <div className="text-xs text-slate-400 font-mono">
            Status: <span className="text-emerald-400 font-semibold">{question.status}</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-md transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
