export type QuestionStatus = 'PENDING' | 'RESOLVING' | 'FINALIZED' | 'DISPUTED';

export type OutputFormat = 'text' | 'number' | 'boolean';

export interface SourceItem {
  id: string;
  url: string;
  title: string;
  domain: string;
  claimedAnswer: string;
  reliability: 'High' | 'Medium' | 'Low';
  status: 'agreed' | 'conflicted' | 'unverified';
  snippet?: string;
  publishedDate?: string;
}

export interface ValidatorVote {
  validatorId: string;
  name: string;
  nodeAddress: string;
  model: string;
  vote: string;
  confidence: number;
  reasoning: string;
  timestamp: string;
  isEquivalenceAccepted: boolean;
}

export interface DisputeRound {
  round: number;
  disputerAddress: string;
  stakeAmount: string;
  addedSources: SourceItem[];
  previousVerdict: string;
  newVerdict: string;
  rationale: string;
  resolvedAt: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}

export interface Question {
  id: string;
  title: string;
  category: 'Sports' | 'Prediction Markets' | 'Crypto & Web3' | 'Science & Tech' | 'World News';
  primaryTag: string;
  tags: string[];
  outputFormat: OutputFormat;
  createdAt: string;
  creatorAddress: string;
  transactionHash: string;
  blockNumber: number;
  status: QuestionStatus;
  sources: SourceItem[];
  verdict?: string;
  confidenceScore?: number;
  rationale?: string;
  resolutionTimeMs?: number;
  validatorsConsensus?: {
    totalValidators: number;
    agreedCount: number;
    disagreedCount: number;
    equivalenceScore: number;
    validatorVotes: ValidatorVote[];
  };
  disputeHistory?: DisputeRound[];
}

export type GenLayerNetwork = 'testnetBradbury' | 'studionet';

export interface LiveDeploymentRecord {
  txHash: string;
  contractAddress: string;
  deployedAt: string;
  network: GenLayerNetwork;
  networkName: string;
  status: string;
  resultName: string;
  blockNumber: number;
  gasUsed: string;
  leaderAddress: string;
  validatorVotes: Array<{
    validator: string;
    vote: string;
  }>;
}

export interface WalletState {
  connected: boolean;
  address: string;
  balance: string;
  network: string;
  chainId: number;
  providerType: 'injected' | 'generated' | 'simulated';
  privateKey?: string;
  activeNetwork: GenLayerNetwork;
}

export interface NetworkHealth {
  blockNumber: number;
  rpcStatus: 'connected' | 'degraded' | 'disconnected';
  latencyMs: number;
  networkName: string;
  chainId: number;
  gasPriceGwei: string;
  activeNetwork: GenLayerNetwork;
}

declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (...args: any[]) => void) => void;
      removeListener: (event: string, callback: (...args: any[]) => void) => void;
    };
  }
}


