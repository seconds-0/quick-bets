import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { LandingScreen } from './src/screens/LandingScreen';
import { MainScreen } from './src/screens/MainScreen';
import { BetDetailsScreen } from './src/screens/BetDetailsScreen';
import { CreateBetScreen } from './src/screens/CreateBetScreen';
import { AcceptBetScreen } from './src/screens/AcceptBetScreen';
import { mockAPI } from './src/services/mock-data';
import type { Bet, User } from './src/types';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'landing' | 'main' | 'bet-details' | 'create-bet' | 'accept-bet'>('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedBet, setSelectedBet] = useState<Bet | null>(null);
  const [walletType, setWalletType] = useState<'leather' | 'xverse' | null>(null);
  const [bets, setBets] = useState<Bet[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);

  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const betsData = await mockAPI.getUserBets();
    const notificationsData = await mockAPI.getNotifications();
    setBets(betsData);
    setNotifications(notificationsData);
  };

  const handleLogin = async (type: 'leather' | 'xverse') => {
    setWalletType(type);
    // Simulate wallet connection
    setTimeout(() => {
      setIsLoggedIn(true);
      setCurrentScreen('main');
    }, 1200);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setWalletType(null);
    setCurrentScreen('landing');
  };

  const handleOpenBet = (bet: Bet) => {
    setSelectedBet(bet);
    setCurrentScreen('bet-details');
  };

  const handleCreateBet = () => {
    setCurrentScreen('create-bet');
  };

  const handleAcceptBet = (bet: Bet) => {
    setSelectedBet(bet);
    setCurrentScreen('accept-bet');
  };

  const handleBetCreated = (bet: Bet) => {
    setBets(prev => [...prev, bet]);
    setCurrentScreen('main');
  };

  const handleBetCancelled = (betId: string) => {
    setBets(prev => prev.filter(bet => bet.id !== betId));
  };

  const handleBetResolved = (betId: string, winner: User) => {
    setBets(prev => prev.map(bet =>
      bet.id === betId
        ? { ...bet, status: 'resolved' as const, winner, resolvedAt: new Date() }
        : bet
    ));
  };

  const handleBackToMain = () => {
    setCurrentScreen('main');
    setSelectedBet(null);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return <LandingScreen onLogin={handleLogin} />;

      case 'main':
        return (
          <MainScreen
            onCreateBet={handleCreateBet}
            onOpenBet={handleOpenBet}
            bets={bets}
            notifications={notifications}
          />
        );

      case 'bet-details':
        return selectedBet ? (
          <BetDetailsScreen
            bet={selectedBet}
            onClose={handleBackToMain}
            onCancel={handleBetCancelled}
            onResolve={handleBetResolved}
          />
        ) : null;

      case 'create-bet':
        return (
          <CreateBetScreen
            onClose={handleBackToMain}
            onBetCreated={handleBetCreated}
          />
        );

      case 'accept-bet':
        return selectedBet ? (
          <AcceptBetScreen
            bet={selectedBet}
            onAccept={handleBackToMain}
            onDecline={handleBackToMain}
          />
        ) : null;

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.screenContainer}>
        {renderScreen()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafaf9',
  },
  screenContainer: {
    flex: 1,
    maxWidth: 414, // Mobile width
    margin: '0 auto',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
});
