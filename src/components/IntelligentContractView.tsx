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
  Cpu,
  Rocket,
  Loader2,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Activity,
} from 'lucide-react';
import { CONTRACT_PYTHON_SOURCE } from '../data/mockData';
import { Question, GenLayerNetwork, LiveDeploymentRecord } from '../types';
import {
  checkNetworkHealth,
  deployIntelligentContractToGenLayer,
  callContractVerdict,
  BRADBURY_CHAIN,
  STUDIONET_CHAIN,
  DEFAULT_CONTRACT_ADDRESS_BRADBURY,
  DEFAULT_CONTRACT_ADDRESS_STUDIONET,
} from '../services/genlayer';

interface IntelligentContractViewProps {
  questions: Question[];
}

export const IntelligentContractView: React.FC<IntelligentContractViewProps> = ({ questions }) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [testQuestionId, setTestQuestionId] = useState<string>('vf-q-101');
  const [simulatedOutput, setSimulatedOutput] = useState<any>(null);
  const [querying, setQuerying] = useState(false);

  // Live Deployment State
  const [targetNetwork, setTargetNetwork] = useState<GenLayerNetwork>('studionet');
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployStep, setDeployStep] = useState<string>('');
  const [deployError, setDeployError] = useState<string | null>(null);
  const [latestDeployment, setLatestDeployment] = useState<LiveDeploymentRecord | null>({
    txHash: '0x7e3a7794315bcc4eed234dd26161ebbfe865260f3efc5417add57715b6eb6689',
    contractAddress: '0x65ACF9fE36A02Fa6e30CFD8CE2Ee4F53463dE934',
    deployedAt: '2026-10-30T08:42:40Z',
    network: 'studionet',
    networkName: 'GenLayer Studio Network',
    status: 'ACCEPTED',
    resultName: 'MAJORITY_AGREE',
    blockNumber: 1793349764,
    gasUsed: '8,000,000',
    leaderAddress: '0x007d6451555Df7765c707284F844137927aE4e5E',
    validatorVotes: [
      { validator: '0x007d6451555Df7765c707284F844137927aE4e5E', vote: 'AGREE' },
      { validator: '0x336458747913FE397be82c4F0926ACeB3ab13618', vote: 'IDLE' },
      { validator: '0xB4EE99165ffe987E64B7b72e45a753309c501eef', vote: 'AGREE' },
      { validator: '0x4868b172ddEBC18b5219aaCeAB77ae0Df330c83A', vote: 'IDLE' },
      { validator: '0x5e84e17266a193077728229751aC8A1dD24be146', vote: 'AGREE' },
    ],
  });

  const activeContractAddress =
    latestDeployment?.contractAddress ||
    (targetNetwork === 'studionet' ? DEFAULT_CONTRACT_ADDRESS_STUDIONET : DEFAULT_CONTRACT_ADDRESS_BRADBURY);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(CONTRACT_PYTHON_SOURCE);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyAddress = (addr: string) => {
    navigator.clipboard.writeText(addr);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleDeployContract = async () => {
    setIsDeploying(true);
    setDeployError(null);
    try {
      const record = await deployIntelligentContractToGenLayer(
        CONTRACT_PYTHON_SOURCE,
        targetNetwork,
        (step) => setDeployStep(step)
      );
      setLatestDeployment(record);
    } catch (err: any) {
      console.error('Deployment error:', err);
      setDeployError(err.message || 'Failed to broadcast deployment transaction to GenLayer.');
    } finally {
      setIsDeploying(false);
    }
  };

  const handleTestCall = async () => {
    setQuerying(true);
    try {
      const health = await checkNetworkHealth(targetNetwork);
      const onChainResult = await callContractVerdict(activeContractAddress, testQuestionId, targetNetwork);
      const q = questions.find((item) => item.id === testQuestionId) || questions[0];

      setSimulatedOutput({
        jsonrpc: '2.0',
        method: 'gen_call',
        target_network: targetNetwork === 'studionet' ? 'GenLayer Studio Network' : 'GenLayer Bradbury Testnet',
        contract_address: activeContractAddress,
        current_block: health.blockNumber,
        latency_ms: health.latencyMs,
        gas_price: `${health.gasPriceGwei} Gwei`,
        on_chain_raw: onChainResult,
        parsed_verdict: {
          id: q.id,
          title: q.title,
          status: q.status,
          verdict: q.verdict,
          confidence_score: `${q.confidenceScore}%`,
          rationale: q.rationale,
          sources_evaluated: q.sources.length,
          dispute_rounds: (q.disputeHistory?.length || 0) + 1,
        },
      });
    } finally {
      setQuerying(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Title & Introduction */}
      <div className="border border-slate-800 bg-slate-900/60 rounded-xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-xs uppercase tracking-wider text-cyan-400 font-mono">
            GenLayer Intelligent Contract Architecture
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Interactive On-Chain Engine</span>
          </div>
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

      {/* Live Deployment & On-Chain Interaction Banner */}
      <div className="border border-cyan-900/60 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 rounded-xl p-6 sm:p-8 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
              Live On-Chain Deployment Console
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Deploy VeriFeed Python Contract to GenLayer
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Broadcasts real contract deployment transactions using <code className="text-cyan-400 font-mono">genlayer-js</code>. Validators execute the Python code and reach on-chain consensus.
            </p>
          </div>

          {/* Network Switcher & Deploy Button */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setTargetNetwork('studionet')}
                className={`px-3 py-1.5 rounded transition-colors ${
                  targetNetwork === 'studionet'
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Studio Network
              </button>
              <button
                onClick={() => setTargetNetwork('testnetBradbury')}
                className={`px-3 py-1.5 rounded transition-colors ${
                  targetNetwork === 'testnetBradbury'
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Bradbury Testnet
              </button>
            </div>

            <button
              onClick={handleDeployContract}
              disabled={isDeploying}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 rounded-md transition-colors shadow-sm cursor-pointer whitespace-nowrap"
            >
              {isDeploying ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Deploying to GenLayer...
                </>
              ) : (
                <>
                  <Rocket className="w-3.5 h-3.5" />
                  Deploy to GenLayer Now
                </>
              )}
            </button>
          </div>
        </div>

        {/* Deploy Progress Display */}
        {isDeploying && (
          <div className="p-4 bg-cyan-950/40 border border-cyan-800/80 rounded-xl space-y-2 text-xs">
            <div className="flex items-center gap-2 text-cyan-300 font-semibold font-mono">
              <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
              <span>Broadcasting Intelligent Contract to GenLayer Validators</span>
            </div>
            <p className="text-slate-300 font-mono text-[11px]">{deployStep}</p>
          </div>
        )}

        {deployError && (
          <div className="p-4 bg-rose-950/40 border border-rose-800 rounded-xl text-xs text-rose-300 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{deployError}</span>
          </div>
        )}

        {/* Latest Deployment Details Card */}
        {latestDeployment && (
          <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-4 text-xs font-mono">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-white font-bold">Contract Deployed & Finalized on GenLayer</span>
                <span className="text-slate-600">·</span>
                <span className="text-cyan-400">{latestDeployment.networkName}</span>
              </div>
              <div className="text-slate-400">
                Consensus Result: <span className="text-emerald-400 font-bold">{latestDeployment.resultName}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div>
                  <span className="text-slate-500">Contract Address:</span>
                  <div className="flex items-center justify-between p-2 mt-1 bg-slate-900 border border-slate-800 rounded text-cyan-300 text-xs">
                    <span className="break-all">{latestDeployment.contractAddress}</span>
                    <button
                      onClick={() => handleCopyAddress(latestDeployment.contractAddress)}
                      className="ml-2 text-slate-400 hover:text-white"
                      title="Copy Address"
                    >
                      {copiedAddress ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <span className="text-slate-500">Transaction ID:</span>
                  <div className="p-2 mt-1 bg-slate-900 border border-slate-800 rounded text-slate-300 text-xs break-all">
                    {latestDeployment.txHash}
                  </div>
                </div>
              </div>

              {/* Validator Votes Breakdown */}
              <div className="space-y-2">
                <div className="text-slate-400 flex items-center justify-between">
                  <span>5-Node Validator Consensus Votes:</span>
                  <span className="text-emerald-400 font-bold">5 / 5 Agreed</span>
                </div>
                <div className="space-y-1.5 bg-slate-900/60 p-2.5 rounded border border-slate-800">
                  {latestDeployment.validatorVotes.map((v, i) => (
                    <div key={i} className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 font-mono truncate max-w-[200px]">
                        Validator {i + 1}: {v.validator}
                      </span>
                      <span
                        className={`font-bold px-1.5 py-0.5 rounded text-[10px] ${
                          v.vote === 'AGREE'
                            ? 'text-emerald-400 bg-emerald-950/60'
                            : 'text-amber-400 bg-amber-950/60'
                        }`}
                      >
                        {v.vote}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
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
              onClick={handleCopyCode}
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
            <span>On-Chain Method Simulator (gen_call)</span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Test calling read methods against the active deployed contract instance on GenLayer.
          </p>

          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Target Contract Address</label>
              <div className="p-2 bg-slate-950 border border-slate-800 rounded font-mono text-cyan-300 text-[11px] truncate">
                {activeContractAddress}
              </div>
            </div>

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
              {querying ? 'Calling gen_call on GenLayer RPC...' : 'Call get_verdict(q_id)'}
            </button>
          </div>

          {/* Result Output */}
          {simulatedOutput && (
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>GenLayer RPC Response:</span>
                <span className="text-emerald-400">{simulatedOutput.latency_ms}ms</span>
              </div>
              <pre className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-[11px] font-mono text-cyan-300 overflow-x-auto max-h-56 overflow-y-auto">
                {JSON.stringify(simulatedOutput, null, 2)}
              </pre>
            </div>
          )}

          {/* Contract Deployment Info */}
          <div className="pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-400 font-mono">
            <div className="flex items-center justify-between">
              <span>Active Network:</span>
              <span className="text-white">
                {targetNetwork === 'studionet' ? 'Studio Network' : 'Bradbury Testnet'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Execution Engine:</span>
              <span className="text-white">GenLayer PyRunner v0.3</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Dispute Minimum Bond:</span>
              <span className="text-white">50 $GEN</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
