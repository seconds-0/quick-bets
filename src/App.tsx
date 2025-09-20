import React, { useState, useEffect } from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { LandingScreen } from './screens/LandingScreen';
import { MainScreen } from './screens/MainScreen';
import { BetDetailsScreen } from './screens/BetDetailsScreen';
import { CreateBetScreen } from './screens/CreateBetScreen';
import { AcceptBetScreen } from './screens/AcceptBetScreen';
import { mockAPI } from './services/mock-data';
import type { Bet, User } from './types';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'landing' | 'main' | 'bet-details' | 'create-bet' | 'accept-bet'>('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedBet, setSelectedBet] = useState<Bet | null>(null);
  const [walletType, setWalletType] = useState<'leather' | 'xverse' | null>(null);
  const [fadeAnim] = useState(new Animated.Value(1));
  const [slideAnim] = useState(new Animated.Value(0));

  // Wallet connection simulation
  const handleLogin = async (type: 'leather' | 'xverse') => {
    setWalletType(type);

    // Simulate wallet connection
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.3,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(800),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

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
    setCurrentScreen('main');
  };

  const handleBetCancelled = (betId: string) => {
    // In a real app, this would update the bet status
    console.log('Bet cancelled:', betId);
  };

  const handleBetResolved = (betId: string, winner: User) => {
    // In a real app, this would update the bet with winner
    console.log('Bet resolved:', betId, 'Winner:', winner.displayName);
  };

  const handleBackToMain = () => {
    setCurrentScreen('main');
    setSelectedBet(null);
  };

  // Screen transition animations
  const getScreenStyle = () => {
    const baseStyle: any = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: width,
      height: height,
      opacity: fadeAnim,
    };

    if (currentScreen === 'bet-details' || currentScreen === 'create-bet' || currentScreen === 'accept-bet') {
      baseStyle.transform = [{ scale: slideAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.95],
      }) }];
      baseStyle.shadowColor = '#000';
      baseStyle.shadowOffset = { width: 0, height: 10 };
      baseStyle.shadowOpacity = 0.3;
      baseStyle.shadowRadius = 20;
      baseStyle.elevation = 10;
    }

    return baseStyle;
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return (
          <LandingScreen onLogin={handleLogin} />
        );

      case 'main':
        return (
          <MainScreen
            onCreateBet={handleCreateBet}
            onOpenBet={handleOpenBet}
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
      <StatusBar barStyle="dark-content" backgroundColor="#fafaf9" />

      {/* Background screens with subtle animations */}
      <View style={styles.background}>
        {currentScreen !== 'landing' && (
          <View style={styles.backgroundScreen}>
            <LandingScreen onLogin={handleLogin} />
          </View>
        )}
      </View>

      {/* Current screen */}
      <Animated.View style={getScreenStyle()}>
        {renderScreen()}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafaf9',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  backgroundScreen: {
    flex: 1,
    opacity: 0.05,
  },
});
