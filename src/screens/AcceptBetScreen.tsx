import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { Button } from '../components/Button';
import { Card, CardHeader, CardContent } from '../components/Card';
import { mockAPI } from '../services/mock-data';
import type { Bet } from '../types';

const { width, height } = Dimensions.get('window');

interface AcceptBetScreenProps {
  bet: Bet;
  onAccept: (bet: Bet) => void;
  onDecline: () => void;
}

export const AcceptBetScreen: React.FC<AcceptBetScreenProps> = ({
  bet,
  onAccept,
  onDecline,
}) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isFunding, setIsFunding] = useState(false);
  const [step, setStep] = useState<'review' | 'connect' | 'fund'>('review');
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.95));

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleWalletConnect = async () => {
    setIsConnecting(true);
    try {
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStep('fund');
    } catch (error) {
      Alert.alert('Error', 'Failed to connect wallet. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleFundAndAccept = async () => {
    setIsFunding(true);
    try {
      // Simulate funding process
      await new Promise(resolve => setTimeout(resolve, 2000));
      await mockAPI.acceptBet(bet.id);
      onAccept(bet);
    } catch (error) {
      Alert.alert('Error', 'Failed to fund bet. Please try again.');
    } finally {
      setIsFunding(false);
    }
  };

  const handleDecline = () => {
    Alert.alert(
      'Decline Bet',
      'Are you sure you want to decline this bet proposal?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Decline', style: 'destructive', onPress: onDecline },
      ]
    );
  };

  const renderReview = () => (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      {/* Warning Card */}
      <Card style={[styles.warningCard, { borderLeftColor: '#ef4444', borderLeftWidth: 4 }]}>
        <Text style={styles.warningTitle}>⚠️ Important Warning</Text>
        <Text style={styles.warningText}>
          Only accept bets from people you know and trust. Never accept bets from strangers.
          Consider using a small "dust" transaction first to verify the other person.
        </Text>
      </Card>

      {/* Bet Details */}
      <Card style={styles.betCard}>
        <CardHeader
          title={bet.title}
          subtitle={`Created by ${bet.creator.displayName}`}
        />

        <CardContent>
          <Text style={styles.betDescription}>{bet.description}</Text>

          <View style={styles.betDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Your Stake</Text>
              <Text style={styles.detailValue}>{bet.stakeAmount} sBTC</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Their Stake</Text>
              <Text style={styles.detailValue}>{bet.stakeAmount} sBTC</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Total Escrow</Text>
              <Text style={styles.detailValue}>{bet.stakeAmount * 2} sBTC</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Platform Fee (3%)</Text>
              <Text style={styles.detailValue}>
                {(bet.stakeAmount * 2 * 0.03).toFixed(2)} sBTC
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Expires</Text>
              <Text style={styles.detailValue}>
                {bet.expiresAt.toLocaleDateString()}
              </Text>
            </View>
          </View>

          <View style={styles.creatorInfo}>
            <Text style={styles.creatorLabel}>Bet Creator</Text>
            <Text style={styles.creatorName}>{bet.creator.displayName}</Text>
            <Text style={styles.creatorAddress}>
              {bet.creator.walletAddress.slice(0, 8)}...{bet.creator.walletAddress.slice(-6)}
            </Text>
          </View>
        </CardContent>
      </Card>

      {/* How It Works */}
      <Card style={styles.infoCard}>
        <Text style={styles.infoTitle}>How This Works</Text>
        <View style={styles.stepList}>
          <Text style={styles.step}>1. Connect your wallet</Text>
          <Text style={styles.step}>2. Fund your stake ({bet.stakeAmount} sBTC)</Text>
          <Text style={styles.step}>3. Wait for creator to fund their stake</Text>
          <Text style={styles.step}>4. Bet becomes active</Text>
        </View>
      </Card>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <Button
          title="Accept This Bet"
          onPress={() => setStep('connect')}
          variant="primary"
          size="lg"
          style={styles.acceptButton}
        />
        <Button
          title="Decline"
          onPress={handleDecline}
          variant="outline"
          size="md"
        />
      </View>
    </ScrollView>
  );

  const renderConnect = () => (
    <View style={styles.centerContainer}>
      <Card style={styles.connectCard}>
        <Text style={styles.connectTitle}>Connect Your Wallet</Text>
        <Text style={styles.connectDescription}>
          You'll need to connect your wallet to fund this bet with {bet.stakeAmount} sBTC
        </Text>

        <Button
          title="Connect Wallet"
          onPress={handleWalletConnect}
          variant="primary"
          size="lg"
          loading={isConnecting}
          disabled={isConnecting}
        />

        <TouchableOpacity onPress={() => setStep('review')} style={styles.backLink}>
          <Text style={styles.backLinkText}>← Back to Review</Text>
        </TouchableOpacity>
      </Card>
    </View>
  );

  const renderFund = () => (
    <View style={styles.centerContainer}>
      <Card style={styles.fundCard}>
        <Text style={styles.fundTitle}>Fund Your Stake</Text>
        <Text style={styles.fundDescription}>
          Transfer {bet.stakeAmount} sBTC to the escrow contract
        </Text>

        <View style={styles.fundDetails}>
          <Text style={styles.fundAmount}>{bet.stakeAmount} sBTC</Text>
          <Text style={styles.fundText}>Platform fee: {(bet.stakeAmount * 0.03).toFixed(2)} sBTC</Text>
          <Text style={styles.fundText}>You'll receive: {(bet.stakeAmount * 2 * 0.97).toFixed(2)} sBTC if you win</Text>
        </View>

        <Button
          title="Fund & Accept Bet"
          onPress={handleFundAndAccept}
          variant="primary"
          size="lg"
          loading={isFunding}
          disabled={isFunding}
        />

        <TouchableOpacity onPress={() => setStep('connect')} style={styles.backLink}>
          <Text style={styles.backLinkText}>← Back</Text>
        </TouchableOpacity>
      </Card>
    </View>
  );

  return (
    <Animated.View
      style={[
        styles.overlay,
        {
          opacity: fadeAnim,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setStep('review')} style={styles.backButton}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {step === 'review' ? 'Review Bet' : step === 'connect' ? 'Connect' : 'Fund'}
          </Text>
          <View style={styles.placeholder} />
        </View>

        {step === 'review' && renderReview()}
        {step === 'connect' && renderConnect()}
        {step === 'fund' && renderFund()}
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  container: {
    backgroundColor: '#fafaf9',
    borderRadius: 20,
    width: width * 0.9,
    maxHeight: '85%',
    overflow: 'hidden',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f4',
  },
  backButton: {
    padding: 8,
  },
  backText: {
    fontSize: 16,
    color: '#3b82f6',
    fontWeight: '500',
    fontFamily: 'Inter',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1c1917',
    fontFamily: 'Inter',
  },
  placeholder: {
    width: 40,
  },
  warningCard: {
    margin: 20,
    marginTop: 0,
    backgroundColor: '#fef2f2',
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#dc2626',
    marginBottom: 12,
    fontFamily: 'Inter',
  },
  warningText: {
    fontSize: 14,
    color: '#991b1b',
    lineHeight: 20,
    fontFamily: 'Inter',
  },
  betCard: {
    margin: 20,
    marginTop: 0,
  },
  betDescription: {
    fontSize: 16,
    color: '#44403c',
    lineHeight: 24,
    marginBottom: 20,
    fontFamily: 'Inter',
  },
  betDetails: {
    gap: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: '#78716c',
    fontFamily: 'Inter',
  },
  detailValue: {
    fontSize: 14,
    color: '#1c1917',
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  creatorInfo: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f5f5f4',
  },
  creatorLabel: {
    fontSize: 12,
    color: '#a8a29e',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
    fontFamily: 'Inter',
  },
  creatorName: {
    fontSize: 14,
    color: '#1c1917',
    fontWeight: '500',
    marginBottom: 2,
    fontFamily: 'Inter',
  },
  creatorAddress: {
    fontSize: 12,
    color: '#a8a29e',
    fontFamily: 'JetBrains Mono',
  },
  infoCard: {
    margin: 20,
    marginTop: 0,
    backgroundColor: '#f0f9ff',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0c4a6e',
    marginBottom: 16,
    fontFamily: 'Inter',
  },
  stepList: {
    gap: 8,
  },
  step: {
    fontSize: 14,
    color: '#075985',
    lineHeight: 20,
    fontFamily: 'Inter',
  },
  actionContainer: {
    padding: 20,
    paddingTop: 0,
    gap: 12,
  },
  acceptButton: {
    marginBottom: 8,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  connectCard: {
    alignItems: 'center',
    padding: 40,
  },
  connectTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1c1917',
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'Inter',
  },
  connectDescription: {
    fontSize: 16,
    color: '#78716c',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    fontFamily: 'Inter',
  },
  fundCard: {
    alignItems: 'center',
    padding: 32,
  },
  fundTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1c1917',
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'Inter',
  },
  fundDescription: {
    fontSize: 16,
    color: '#78716c',
    textAlign: 'center',
    marginBottom: 24,
    fontFamily: 'Inter',
  },
  fundDetails: {
    alignItems: 'center',
    marginBottom: 32,
    padding: 20,
    backgroundColor: '#fef7ed',
    borderRadius: 12,
    width: '100%',
  },
  fundAmount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#f59e0b',
    marginBottom: 12,
    fontFamily: 'Inter',
  },
  fundText: {
    fontSize: 14,
    color: '#92400e',
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'Inter',
  },
  backLink: {
    marginTop: 16,
    padding: 8,
  },
  backLinkText: {
    fontSize: 16,
    color: '#3b82f6',
    fontFamily: 'Inter',
  },
});
