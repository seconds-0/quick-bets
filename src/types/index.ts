// Type definitions for Quick-Bets

export interface User {
  id: string;
  walletAddress: string;
  displayName?: string;
  avatar?: string;
}

export interface Bet {
  id: string;
  creator: User;
  acceptor?: User;
  title: string;
  description: string;
  stakeAmount: number; // in sBTC
  createdAt: Date;
  expiresAt: Date;
  status: BetStatus;
  arbitrator?: User;
  resolvedAt?: Date;
  winner?: User;
  resolutionType?: ResolutionType;
  transactionHash?: string;
  contractAddress: string;
}

export type BetStatus =
  | 'pending'      // Proposal created, waiting for acceptor
  | 'active'       // Both parties funded, bet is live
  | 'cancelled'    // Mutual cancellation
  | 'resolved'     // Bet resolved, winner determined
  | 'expired'      // Proposal expired without acceptance
  | 'cancel_pending'; // One party wants to cancel, waiting for other

export type ResolutionType =
  | 'mutual_consent'
  | 'timeout'
  | 'arbitrator'
  | 'oracle';

export interface WalletState {
  isConnected: boolean;
  address?: string;
  balance?: number;
  isConnecting: boolean;
}

export interface ConversionOption {
  symbol: 'STX' | 'sBTC' | 'BTC';
  name: string;
  balance: number;
  conversionRate?: number;
  isAvailable: boolean;
}

export interface MockAPIResponse<T> {
  data: T;
  loading: boolean;
  error?: string;
}

export interface BetCreationData {
  title: string;
  description: string;
  stakeAmount: number;
  durationDays: number;
  arbitratorAddress?: string;
}

export interface NotificationItem {
  id: string;
  type: 'bet_created' | 'bet_accepted' | 'bet_cancelled' | 'bet_resolved' | 'payment_required';
  title: string;
  message: string;
  timestamp: Date;
  betId?: string;
  read: boolean;
}

// Animation types for smooth transitions
export interface AnimationConfig {
  duration: number;
  easing: string;
  delay?: number;
}

export interface ScreenTransition {
  from: string;
  to: string;
  animation: 'slide-left' | 'slide-right' | 'slide-up' | 'fade' | 'scale';
}

// Wallet connection states
export interface WalletConnectionState {
  isConnecting: boolean;
  isConnected: boolean;
  address?: string;
  error?: string;
}

// Bet resolution states
export interface BetResolutionState {
  isResolving: boolean;
  resolutionType?: ResolutionType;
  winner?: User;
  transactionHash?: string;
  fireworks?: boolean; // For celebration animations
}
