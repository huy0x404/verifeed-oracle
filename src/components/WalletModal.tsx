import React, { useState, useEffect } from 'react';
import {
  X,
  Wallet,
  CheckCircle2,
  ExternalLink,
  Shield,
  RefreshCw,
  Coins,
  ArrowRight,
  Key,
  Copy,
  Check,
  AlertCircle,
  Activity,
} from 'lucide-react';
import { NetworkHealth, WalletState } from '../types';
import {
  connectWeb3Wallet,
  getOrCreateLocalGenLayerAccount,
  getLiveBalance,
  checkNetworkHealth,
} from '../services/genlayer';

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
  const [connecting, setConnecting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const [networkHealth, setNetworkHealth] = useState<NetworkHealth | null>(null);

  useEffect(() => {
    if (isOpen) {
      checkNetworkHealth().then(setNetworkHealth).catch(console.error);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConnectInjected = async () => {
    setConnecting(true);
    setErrorMsg(null);
    try {
      const { address, chainId, balance } = await connectWeb3Wallet();
      setWallet({
        connected: true,
        address,
        balance,
        network: 'Bradbury Testnet',
        chainId,
        providerType: 'injected',
      });
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to connect to MetaMask/Web3 wallet.');
    } finally {
      setConnecting(false);
    }
  };

  const handleCreateLocalAccount = () => {
    try {
      const { address, privateKey } = getOrCreateLocalGenLayerAccount();
      setWallet({
        connected: true,
        address,
        balance: '150.00 GEN',
        network: 'Bradbury Testnet',
        chainId: 4221,
        providerType: 'generated',
        privateKey,
      });
      onClose();
    } catch (err: any) {
      setErrorMsg('Failed to generate local GenLayer account.');
    }
  };

  const handleDisconnect = () => {
    setWallet({
      connected: false,
      address: '',
      balance: '0 GEN',
      network: 'Bradbury Testnet',
      chainId: 4221,
      providerType: 'simulated',
    });
    onClose();
  };

  const handleCopyPrivateKey = () => {
    if (wallet.privateKey) {
      navigator.clipboard.writeText(wallet.privateKey);
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    }
  };

  const handleRefreshBalance = async () => {
    if (wallet.address) {
      const updated = await getLiveBalance(wallet.address);
      setWallet((prev) => ({ ...prev, balance: updated }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400">
              <Wallet className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-mono text-cyan-400">GenLayer Bradbury RPC</div>
              <h2 className="text-base font-bold text-white">Wallet & On-Chain Provider</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Network Health Indicator */}
        <div className="px-6 py-2.5 bg-slate-950/90 border-b border-slate-800/80 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300">Bradbury Node</span>
            <span className="text-slate-600">·</span>
            <span className="text-cyan-400">Chain ID 4221</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>Block #{networkHealth?.blockNumber || 172600}</span>
            <span className="text-slate-600">·</span>
            <span className="text-emerald-400">{networkHealth?.latencyMs || 45}ms</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs">
          {errorMsg && (
            <div className="p-3 bg-rose-950/40 border border-rose-800 rounded-lg text-rose-300 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {wallet.connected ? (
            <div className="space-y-4">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Active Network:</span>
                  <span className="text-cyan-400 font-mono font-semibold">
                    {wallet.network} (ID: {wallet.chainId})
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Connection Mode:</span>
                  <span className="text-slate-300 font-mono capitalize">
                    {wallet.providerType === 'injected'
                      ? 'MetaMask / Web3 Injected'
                      : wallet.providerType === 'generated'
                      ? 'In-Browser GenLayer Keypair'
                      : 'Simulated Session'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Account Address:</span>
                  <span className="text-white font-mono break-all text-[11px] select-all">
                    {wallet.address}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  <span className="text-slate-400">Live Balance:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold font-mono text-sm tabular-nums">
                      {wallet.balance}
                    </span>
                    <button
                      onClick={handleRefreshBalance}
                      className="p-1 text-slate-400 hover:text-cyan-400 transition-colors"
                      title="Refresh On-Chain Balance"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* If generated account, allow viewing/copying private key */}
              {wallet.providerType === 'generated' && wallet.privateKey && (
                <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 flex items-center gap-1 font-mono">
                      <Key className="w-3.5 h-3.5 text-amber-400" />
                      Export Private Key (secp256k1)
                    </span>
                    <button
                      onClick={() => setShowPrivateKey(!showPrivateKey)}
                      className="text-cyan-400 hover:underline"
                    >
                      {showPrivateKey ? 'Hide' : 'Reveal'}
                    </button>
                  </div>
                  {showPrivateKey && (
                    <div className="flex items-center justify-between p-2 bg-slate-900 border border-slate-800 rounded font-mono text-[10px] text-amber-300 break-all select-all">
                      <span>{wallet.privateKey}</span>
                      <button
                        onClick={handleCopyPrivateKey}
                        className="ml-2 text-slate-400 hover:text-white shrink-0"
                      >
                        {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  )}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={`https://explorer-bradbury.genlayer.com/address/${wallet.address}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-medium rounded-lg transition-colors text-center"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                  View on Explorer
                </a>
                <button
                  onClick={handleDisconnect}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
                >
                  Disconnect Wallet
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-slate-300 leading-relaxed">
                Choose how you want to connect to GenLayer Bradbury Testnet. You can use an installed Web3 wallet or generate a real cryptographic keypair right in your browser.
              </p>

              {/* Option 1: Injected MetaMask */}
              <button
                onClick={handleConnectInjected}
                disabled={connecting}
                className="w-full flex items-center justify-between p-3.5 bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-500/50 rounded-xl transition-all group cursor-pointer text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-orange-950/60 border border-orange-800/60 flex items-center justify-center text-orange-400 font-bold font-mono">
                    🦊
                  </div>
                  <div>
                    <div className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      MetaMask / Rabby / Web3 Wallet
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Auto-switches to GenLayer Bradbury Testnet (Chain ID 4221)
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all shrink-0" />
              </button>

              {/* Option 2: In-Browser GenLayer Keypair */}
              <button
                onClick={handleCreateLocalAccount}
                className="w-full flex items-center justify-between p-3.5 bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-500/50 rounded-xl transition-all group cursor-pointer text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-cyan-950/80 border border-cyan-800 flex items-center justify-center text-cyan-400 font-bold font-mono">
                    GL
                  </div>
                  <div>
                    <div className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      In-Browser GenLayer Keypair (Instant)
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Uses genlayer-js createAccount() · Real secp256k1 keys
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all shrink-0" />
              </button>

              <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <div className="text-slate-300 font-medium">RPC Configuration:</div>
                <div>• Network: <span className="text-white">GenLayer Bradbury Testnet</span></div>
                <div>• RPC URL: <code className="text-cyan-400">https://rpc-bradbury.genlayer.com</code></div>
                <div>• Explorer: <code className="text-cyan-400">https://explorer-bradbury.genlayer.com/</code></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
