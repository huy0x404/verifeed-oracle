import React from 'react';
import { Shield, Sparkles, Layers, Terminal, BookOpen, ExternalLink, Globe } from 'lucide-react';
import { WalletState } from '../types';

interface NavbarProps {
  activeTab: 'explorer' | 'contract' | 'consumer' | 'steward' | 'vercel';
  setActiveTab: (tab: 'explorer' | 'contract' | 'consumer' | 'steward' | 'vercel') => void;
  wallet: WalletState;
  onConnectWallet: () => void;
  onOpenCreateModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  wallet,
  onConnectWallet,
  onOpenCreateModal,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element Brand wordmark with subtle glyph */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('explorer')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400/30 group-hover:scale-105 transition-transform">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors whitespace-nowrap">
                  VeriFeed
                </span>
                <span className="hidden sm:inline-block text-[11px] text-slate-400 font-mono ml-2">
                  on GenLayer
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: 4-5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
            <button
              onClick={() => setActiveTab('explorer')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                activeTab === 'explorer'
                  ? 'border-cyan-400 text-cyan-400 font-semibold'
                  : 'border-transparent'
              }`}
            >
              Oracle Explorer
            </button>
            <button
              onClick={() => setActiveTab('contract')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                activeTab === 'contract'
                  ? 'border-cyan-400 text-cyan-400 font-semibold'
                  : 'border-transparent'
              }`}
            >
              Intelligent Contract
            </button>
            <button
              onClick={() => setActiveTab('consumer')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                activeTab === 'consumer'
                  ? 'border-cyan-400 text-cyan-400 font-semibold'
                  : 'border-transparent'
              }`}
            >
              Consumer SDK
            </button>
            <button
              onClick={() => setActiveTab('steward')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                activeTab === 'steward'
                  ? 'border-amber-400 text-amber-400 font-semibold'
                  : 'border-transparent'
              }`}
            >
              Steward Review Dossier
            </button>
            <button
              onClick={() => setActiveTab('vercel')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                activeTab === 'vercel'
                  ? 'border-cyan-400 text-cyan-400 font-semibold'
                  : 'border-transparent'
              }`}
            >
              Vercel Deploy
            </button>
          </nav>

          {/* Zone 3: Primary Action buttons */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Live Network Badge */}
            <button
              onClick={onConnectWallet}
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded-md bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700 transition-colors whitespace-nowrap cursor-pointer"
              title="Click to switch GenLayer network"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                {wallet.activeNetwork === 'studionet' ? 'Studionet' : 'Bradbury'}
              </span>
              <span className="text-slate-500 text-[10px]">
                ({wallet.chainId || 4221})
              </span>
            </button>

            <button
              onClick={onOpenCreateModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-cyan-950 bg-cyan-400 hover:bg-cyan-300 rounded-md transition-colors whitespace-nowrap shadow-sm shadow-cyan-400/20"
            >
              <Sparkles className="w-3.5 h-3.5" />
              New Question
            </button>

            <button
              onClick={onConnectWallet}
              className={`px-3 py-1.5 text-xs font-mono rounded-md border transition-colors whitespace-nowrap ${
                wallet.connected
                  ? 'border-cyan-800 bg-cyan-950/50 text-cyan-300 hover:bg-cyan-900/60'
                  : 'border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {wallet.connected ? (
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span>
                    {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                  </span>
                  <span className="text-slate-400 text-[11px] hidden xl:inline">
                    ({wallet.balance})
                  </span>
                </span>
              ) : (
                'Connect Wallet'
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation row */}
      <div className="md:hidden flex items-center justify-around px-2 py-2 border-t border-slate-900 bg-slate-950 text-xs overflow-x-auto">
        <button
          onClick={() => setActiveTab('explorer')}
          className={`px-2 py-1 whitespace-nowrap ${activeTab === 'explorer' ? 'text-cyan-400 font-semibold' : 'text-slate-400'}`}
        >
          Explorer
        </button>
        <button
          onClick={() => setActiveTab('contract')}
          className={`px-2 py-1 whitespace-nowrap ${activeTab === 'contract' ? 'text-cyan-400 font-semibold' : 'text-slate-400'}`}
        >
          Contract
        </button>
        <button
          onClick={() => setActiveTab('consumer')}
          className={`px-2 py-1 whitespace-nowrap ${activeTab === 'consumer' ? 'text-cyan-400 font-semibold' : 'text-slate-400'}`}
        >
          SDK
        </button>
        <button
          onClick={() => setActiveTab('steward')}
          className={`px-2 py-1 whitespace-nowrap ${activeTab === 'steward' ? 'text-amber-400 font-semibold' : 'text-slate-400'}`}
        >
          Steward Dossier
        </button>
        <button
          onClick={() => setActiveTab('vercel')}
          className={`px-2 py-1 whitespace-nowrap ${activeTab === 'vercel' ? 'text-cyan-400 font-semibold' : 'text-slate-400'}`}
        >
          Vercel
        </button>
      </div>
    </header>
  );
};
