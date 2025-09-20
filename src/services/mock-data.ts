// Mock data for UI development
// This simulates API responses without any real backend

import { User, Bet, BetStatus, ResolutionType, WalletState, ConversionOption, NotificationItem } from '../types';

export const mockUser: User = {
  id: 'user-1',
  walletAddress: 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7',
  displayName: 'Alex Huth',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'
};

export const mockBets: Bet[] = [
  {
    id: 'bet-1',
    creator: mockUser,
    acceptor: {
      id: 'user-2',
      walletAddress: 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKPVPG2CT',
      displayName: 'Sarah Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
    },
    title: 'Lakers vs Warriors Game Bet',
    description: 'I bet $100 sBTC that the Los Angeles Lakers will beat the Golden State Warriors in their next game on March 15th, 2024.',
    stakeAmount: 100,
    createdAt: new Date('2024-03-10'),
    expiresAt: new Date('2024-03-15'),
    status: 'active',
    contractAddress: 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKPVPG2CT.bet-escrow',
    transactionHash: '0x1234567890abcdef'
  },
  {
    id: 'bet-2',
    creator: mockUser,
    title: 'Project Deadline Bet',
    description: 'I bet $50 sBTC that the React Native app will be ready for testing by March 20th, 2024.',
    stakeAmount: 50,
    createdAt: new Date('2024-03-08'),
    expiresAt: new Date('2024-03-20'),
    status: 'pending',
    contractAddress: 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKPVPG2CT.bet-escrow'
  },
  {
    id: 'bet-3',
    creator: mockUser,
    title: 'Coffee Shop Bet',
    description: 'I bet $25 sBTC that I can drink more coffee than you in one week without getting jittery.',
    stakeAmount: 25,
    createdAt: new Date('2024-02-15'),
    expiresAt: new Date('2024-02-22'),
    status: 'resolved',
    winner: {
      id: 'user-1',
      walletAddress: 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7',
      displayName: 'Alex Huth',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'
    },
    resolvedAt: new Date('2024-02-25'),
    resolutionType: 'mutual_consent',
    contractAddress: 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKPVPG2CT.bet-escrow',
    transactionHash: '0xabcdef1234567890'
  }
];

export const mockWalletState: WalletState = {
  isConnected: true,
  address: 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7',
  balance: 1250.50,
  isConnecting: false
};

export const mockConversionOptions: ConversionOption[] = [
  {
    symbol: 'sBTC',
    name: 'Stacks Bitcoin',
    balance: 1250.50,
    isAvailable: true
  },
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    balance: 0.025,
    conversionRate: 40000, // 1 BTC = 40,000 sBTC
    isAvailable: true
  },
  {
    symbol: 'STX',
    name: 'Stacks',
    balance: 5000,
    conversionRate: 40, // 1 STX = 40 sBTC
    isAvailable: true
  }
];

export const mockNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'bet_accepted',
    title: 'Bet Accepted!',
    message: 'Sarah accepted your Lakers vs Warriors bet',
    timestamp: new Date('2024-03-10T14:30:00'),
    betId: 'bet-1',
    read: false
  },
  {
    id: 'notif-2',
    type: 'bet_resolved',
    title: 'Bet Resolved',
    message: 'Coffee shop bet resolved - you won $25 sBTC!',
    timestamp: new Date('2024-02-25T16:45:00'),
    betId: 'bet-3',
    read: true
  }
];

// Mock API functions
export const mockAPI = {
  getCurrentUser: () => Promise.resolve(mockUser),
  getUserBets: () => Promise.resolve(mockBets),
  getWalletState: () => Promise.resolve(mockWalletState),
  getConversionOptions: () => Promise.resolve(mockConversionOptions),
  getNotifications: () => Promise.resolve(mockNotifications),

  createBet: (betData: any) => {
    const newBet: Bet = {
      id: `bet-${Date.now()}`,
      creator: mockUser,
      title: betData.title,
      description: betData.description,
      stakeAmount: betData.amount,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      status: 'pending',
      contractAddress: 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKPVPG2CT.bet-escrow'
    };
    return Promise.resolve(newBet);
  },

  acceptBet: (betId: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, betId });
      }, 1000);
    });
  },

  resolveBet: (betId: string, winner: User, type: ResolutionType) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, betId, winner, type });
      }, 1500);
    });
  },

  cancelBet: (betId: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, betId });
      }, 1000);
    });
  }
};
