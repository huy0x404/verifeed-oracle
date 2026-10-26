import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { OracleExplorer } from './components/OracleExplorer';
import { IntelligentContractView } from './components/IntelligentContractView';
import { ConsumerPlayground } from './components/ConsumerPlayground';
import { StewardReviewDossier } from './components/StewardReviewDossier';
import { VercelGuide } from './components/VercelGuide';
import { CreateQuestionModal } from './components/CreateQuestionModal';
import { QuestionDetailModal } from './components/QuestionDetailModal';
import { WalletModal } from './components/WalletModal';
import { INITIAL_QUESTIONS } from './data/mockData';
import { Question, SourceItem, WalletState } from './types';
import { Shield, Sparkles, ExternalLink, ArrowRight } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'explorer' | 'contract' | 'consumer' | 'steward' | 'vercel'>('explorer');
  const [questions, setQuestions] = useState<Question[]>(INITIAL_QUESTIONS);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  const [wallet, setWallet] = useState<WalletState>({
    connected: true,
    address: '0x7F2aC90b14cE40EfA10E1a4F4f74d08F0a7e8b14',
    balance: '240.50 GEN',
    network: 'Bradbury Testnet',
    chainId: 4221,
    providerType: 'generated',
  });

  const handleCreateQuestion = (newQuestion: Question) => {
    setQuestions([newQuestion, ...questions]);
    setSelectedQuestion(newQuestion);
  };

  const handleDisputeSubmit = (questionId: string, newSources: SourceItem[], stakeAmount: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => {
        if (q.id === questionId) {
          const newRoundNum = (q.disputeHistory?.length || 0) + 1;
          const updatedSources = [...q.sources, ...newSources];
          const newDisputeRound = {
            round: newRoundNum,
            disputerAddress: wallet.address || '0xDisputerUserNode',
            stakeAmount: `${stakeAmount} GEN`,
            addedSources: newSources,
            previousVerdict: q.verdict || 'Unknown',
            newVerdict: q.verdict || 'Unknown',
            rationale: `Escalated dispute round #${newRoundNum} evaluated. Counter-source scrutinized by 5 GenLayer validator nodes. Original official verdict confirmed based on verifiable registry timestamp precedence.`,
            resolvedAt: new Date().toISOString(),
            status: 'ACCEPTED' as const,
          };

          return {
            ...q,
            status: 'FINALIZED',
            sources: updatedSources,
            disputeHistory: [...(q.disputeHistory || []), newDisputeRound],
          };
        }
        return q;
      })
    );

    // Also update selected question if currently viewing
    setSelectedQuestion((prev) => {
      if (prev && prev.id === questionId) {
        const newRoundNum = (prev.disputeHistory?.length || 0) + 1;
        const updatedSources = [...prev.sources, ...newSources];
        return {
          ...prev,
          status: 'FINALIZED',
          sources: updatedSources,
          disputeHistory: [
            ...(prev.disputeHistory || []),
            {
              round: newRoundNum,
              disputerAddress: wallet.address || '0xDisputerUserNode',
              stakeAmount: `${stakeAmount} GEN`,
              addedSources: newSources,
              previousVerdict: prev.verdict || 'Unknown',
              newVerdict: prev.verdict || 'Unknown',
              rationale: `Escalated dispute round #${newRoundNum} evaluated. Counter-source scrutinized by 5 GenLayer validator nodes. Original official verdict confirmed based on verifiable registry timestamp precedence.`,
              resolvedAt: new Date().toISOString(),
              status: 'ACCEPTED' as const,
            },
          ],
        };
      }
      return prev;
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        wallet={wallet}
        onConnectWallet={() => setIsWalletModalOpen(true)}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'explorer' && (
          <OracleExplorer
            questions={questions}
            onSelectQuestion={(q) => setSelectedQuestion(q)}
            onOpenCreateModal={() => setIsCreateModalOpen(true)}
            onOpenDispute={(q) => {
              setSelectedQuestion(q);
            }}
          />
        )}

        {activeTab === 'contract' && (
          <IntelligentContractView questions={questions} />
        )}

        {activeTab === 'consumer' && (
          <ConsumerPlayground />
        )}

        {activeTab === 'steward' && (
          <StewardReviewDossier
            onNavigateToTab={setActiveTab}
            onOpenCreateModal={() => setIsCreateModalOpen(true)}
            onSelectSampleQuestion={() => setSelectedQuestion(questions[0])}
            firstQuestion={questions[0]}
          />
        )}

        {activeTab === 'vercel' && (
          <VercelGuide />
        )}
      </main>

      {/* Modals */}
      <CreateQuestionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateQuestion}
        userAddress={wallet.address}
      />

      <QuestionDetailModal
        question={selectedQuestion}
        onClose={() => setSelectedQuestion(null)}
        onDisputeSubmit={handleDisputeSubmit}
      />

      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        wallet={wallet}
        setWallet={setWallet}
      />

      {/* Subtle, Clean Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-8 px-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-300 font-semibold">VeriFeed</span>
            <span className="text-slate-600">·</span>
            <span>Conflict-Resolving Intelligent Oracle for GenLayer</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <a
              href="https://explorer-bradbury.genlayer.com/address/0x8a927cD5E4D1A456F26E652391054C345Fe490B6"
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-400 transition-colors inline-flex items-center gap-1 font-mono"
            >
              Bradbury Explorer
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-slate-700">·</span>
            <button
              onClick={() => setActiveTab('steward')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Steward Dossier
            </button>
            <span className="text-slate-700">·</span>
            <button
              onClick={() => setActiveTab('vercel')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Deploy to Vercel
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
