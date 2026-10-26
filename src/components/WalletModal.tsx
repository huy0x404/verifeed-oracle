import React, { useState } from 'react';
import {
  X,
  Wallet,
  CheckCircle2,
  ExternalLink,
  Shield,
  RefreshCw,
  Coins,
  ArrowRight,
} from 'lucide-react';
import { WalletState } from '../types';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  wallet: WalletState;
  setWallet: React.Dispatch<React.SetStateAction<WalletState>>;
}

export const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
  wallet,
  setWallet,
}) => {
  if (!isOpen) return null;

  const handleConnect = () => {
    setWallet({
      connected: true,
      address: '0x7F2aC90b14cE40EfA10E1a4F4f74d08F0a7e8b14',
      balance: '240.50 GEN',
      network: 'Bradbury Testnet',
    });
    onClose();
  };

  const handleDisconnect = () => {
    setWallet({
      connected: false,
      address: '',
      balance: '0 GEN',
      network: 'Bradbury Testnet',
    });
    onClose();
  };

  const handleFaucet = () => {
    setWallet((prev) => ({
      ...prev,
      balance: `${(parseFloat(prev.balance) + 50).toFixed(2)} GEN`,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400">
              <Wallet className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-mono text-slate-400">GenLayer Bradbury</div>
              <h2 className="text-base font-bold text-white">Wallet Connection</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs">
          {wallet.connected ? (
            <div className="space-y-4">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Network:</span>
                  <span className="text-cyan-400 font-mono font-semibold">
                    {wallet.network} (Chain ID 42161)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Connected Address:</span>
                  <span className="text-white font-mono">{wallet.address}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  <span className="text-slate-400">Available Balance:</span>
                  <span className="text-emerald-400 font-bold font-mono text-sm tabular-nums">
                    {wallet.balance}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleFaucet}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-800 text-cyan-300 font-semibold rounded-lg transition-colors"
                >
                  <Coins className="w-3.5 h-3.5" />
                  +50 $GEN Faucet
                </button>
                <button
                  onClick={handleDisconnect}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
                >
                  Disconnect
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-slate-300 leading-relaxed">
                Connect your Web3 wallet to submit conflict queries, deposit dispute bonds, and interact with the VeriFeed Intelligent Contract.
              </p>

              <div className="space-y-2">
                <button
                  onClick={handleConnect}
                  className="w-full flex items-center justify-between p-3.5 bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-500/50 rounded-xl transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 font-bold font-mono">
                      GL
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                        Bradbury Testnet Wallet
                      </div>
                      <div className="text-[11px] text-slate-500">Auto-configured RPC</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                </button>
              </div>

              <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800 text-[11px] text-slate-400">
                Network: <span className="text-slate-200">GenLayer Bradbury Testnet</span> · RPC: <code className="text-cyan-400">https://rpc-bradbury.genlayer.com</code>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
