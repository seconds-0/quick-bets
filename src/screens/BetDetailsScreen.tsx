import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import { Button } from '../components/Button';
import { Card, CardHeader, CardContent, CardFooter } from '../components/Card';
import { mockAPI } from '../services/mock-data';
import type { Bet, User } from '../types';

const { width } = Dimensions.get('window');

interface BetDetailsScreenProps {
  bet: Bet;
  onClose: () => void;
  onCancel: (betId: string) => void;
  onResolve: (betId: string, winner: User) => void;
}

export const BetDetailsScreen: React.FC<BetDetailsScreenProps> = ({
  bet,
  onClose,
  onCancel,
  onResolve,
}) => {
  const [cancelPending, setCancelPending] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.9));

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleCancel = () => {
    Alert.alert(
      'Request Cancellation',
      'Are you sure you want to request cancellation? Your betting partner will need to agree.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Request',
          style: 'destructive',
          onPress: () => {
            setCancelPending(true);
            onCancel(bet.id);
          },
        },
      ]
    );
  };

  const handleResolve = (winner: User) => {
    Alert.alert(
      'Award Bet',
      `Are you sure you want to award this bet to ${winner.displayName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Award',
          onPress: () => onResolve(bet.id, winner),
        },
      ]
    );
  };

  const getStatusColor = (status: Bet['status']) => {
    switch (status) {
      case 'active': return '#22c55e';
      case 'pending': return '#f59e0b';
      case 'resolved': return '#3b82f6';
      case 'cancelled': return '#ef4444';
      case 'expired': return '#a8a29e';
      case 'cancel_pending': return '#f59e0b';
      default: return '#78716c';
    }
  };

  const getStatusText = (status: Bet['status']) => {
    switch (status) {
      case 'active': return 'Active';
      case 'pending': return 'Waiting for Acceptor';
      case 'resolved': return 'Resolved';
      case 'cancelled': return 'Cancelled';
      case 'expired': return 'Expired';
      case 'cancel_pending': return 'Cancellation Requested';
      default: return 'Unknown';
    }
  };

  const isActiveBet = ['active', 'pending'].includes(bet.status);
  const canResolve = bet.status === 'active' && bet.acceptor;

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
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>← Back</Text>
            </TouchableOpacity>
            <View style={styles.statusContainer}>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(bet.status) }]}>
                <Text style={styles.statusText}>{getStatusText(bet.status)}</Text>
              </View>
            </View>
          </View>

          {/* Bet Info */}
          <Card style={styles.infoCard}>
            <CardHeader
              title={bet.title}
              subtitle={`Created ${bet.createdAt.toLocaleDateString()}`}
            />
            <CardContent>
              <Text style={styles.description}>{bet.description}</Text>

              <View style={styles.detailsGrid}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Stake</Text>
                  <Text style={styles.detailValue}>{bet.stakeAmount} sBTC</Text>
                </View>

                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Expires</Text>
                  <Text style={styles.detailValue}>{bet.expiresAt.toLocaleDateString()}</Text>
                </View>

                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Contract</Text>
                  <Text style={styles.contractAddress}>
                    {bet.contractAddress.slice(0, 10)}...{bet.contractAddress.slice(-8)}
                  </Text>
                </View>

                {bet.transactionHash && (
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Transaction</Text>
                    <Text style={styles.contractAddress}>
                      {bet.transactionHash.slice(0, 10)}...{bet.transactionHash.slice(-8)}
                    </Text>
                  </View>
                )}
              </View>

              {/* Participants */}
              <View style={styles.participantsSection}>
                <Text style={styles.sectionTitle}>Participants</Text>
                <View style={styles.participant}>
                  <Text style={styles.participantLabel}>Creator</Text>
                  <Text style={styles.participantValue}>{bet.creator.displayName}</Text>
                  <Text style={styles.participantAddress}>
                    {bet.creator.walletAddress.slice(0, 8)}...{bet.creator.walletAddress.slice(-6)}
                  </Text>
                </View>

                {bet.acceptor && (
                  <View style={styles.participant}>
                    <Text style={styles.participantLabel}>Acceptor</Text>
                    <Text style={styles.participantValue}>{bet.acceptor.displayName}</Text>
                    <Text style={styles.participantAddress}>
                      {bet.acceptor.walletAddress.slice(0, 8)}...{bet.acceptor.walletAddress.slice(-6)}
                    </Text>
                  </View>
                )}

                {bet.arbitrator && (
                  <View style={styles.participant}>
                    <Text style={styles.participantLabel}>Arbitrator</Text>
                    <Text style={styles.participantValue}>{bet.arbitrator.displayName}</Text>
                    <Text style={styles.participantAddress}>
                      {bet.arbitrator.walletAddress.slice(0, 8)}...{bet.arbitrator.walletAddress.slice(-6)}
                    </Text>
                  </View>
                )}
              </View>
            </CardContent>
          </Card>

          {/* Resolution Info */}
          {bet.resolvedAt && (
            <Card style={styles.resolutionCard}>
              <CardHeader title="Resolution" />
              <CardContent>
                <Text style={styles.resolutionText}>
                  {bet.resolutionType === 'mutual_consent'
                    ? 'Resolved by mutual agreement'
                    : bet.resolutionType === 'arbitrator'
                    ? 'Resolved by arbitrator'
                    : 'Resolved by timeout'
                  }
                </Text>
                <Text style={styles.resolutionDate}>
                  {bet.resolvedAt.toLocaleDateString()} at {bet.resolvedAt.toLocaleTimeString()}
                </Text>
                {bet.winner && (
                  <Text style={styles.winnerText}>
                    Winner: {bet.winner.displayName}
                  </Text>
                )}
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          {isActiveBet && (
            <Card style={styles.actionsCard}>
              <CardHeader title="Actions" />
              <CardContent>
                <View style={styles.actionButtons}>
                  <Button
                    title="I Want to Cancel"
                    onPress={handleCancel}
                    variant="outline"
                    size="md"
                    style={styles.actionButton}
                    disabled={cancelPending}
                  />

                  {canResolve && bet.acceptor && (
                    <Button
                      title={`${bet.acceptor.displayName} Won`}
                      onPress={() => handleResolve(bet.acceptor!)}
                      variant="primary"
                      size="md"
                      style={styles.actionButton}
                    />
                  )}
                </View>

                {cancelPending && (
                  <Text style={styles.pendingText}>
                    ⚠️ Cancellation requested. Waiting for your betting partner to agree.
                  </Text>
                )}
              </CardContent>
            </Card>
          )}
        </ScrollView>
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
    maxHeight: '80%',
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
  },
  closeButton: {
    padding: 8,
  },
  closeText: {
    fontSize: 16,
    color: '#3b82f6',
    fontWeight: '500',
    fontFamily: 'Inter',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
    fontFamily: 'Inter',
  },
  infoCard: {
    margin: 20,
    marginTop: 0,
  },
  description: {
    fontSize: 16,
    color: '#44403c',
    lineHeight: 24,
    marginBottom: 24,
    fontFamily: 'Inter',
  },
  detailsGrid: {
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#78716c',
    fontWeight: '500',
    fontFamily: 'Inter',
  },
  detailValue: {
    fontSize: 14,
    color: '#1c1917',
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  contractAddress: {
    fontSize: 12,
    color: '#a8a29e',
    fontFamily: 'JetBrains Mono',
  },
  participantsSection: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f5f5f4',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1c1917',
    marginBottom: 16,
    fontFamily: 'Inter',
  },
  participant: {
    marginBottom: 16,
  },
  participantLabel: {
    fontSize: 12,
    color: '#a8a29e',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
    fontFamily: 'Inter',
  },
  participantValue: {
    fontSize: 14,
    color: '#1c1917',
    fontWeight: '500',
    marginBottom: 2,
    fontFamily: 'Inter',
  },
  participantAddress: {
    fontSize: 12,
    color: '#a8a29e',
    fontFamily: 'JetBrains Mono',
  },
  resolutionCard: {
    margin: 20,
    marginTop: 0,
    backgroundColor: '#f0fdf4',
    borderColor: '#22c55e',
    borderWidth: 1,
  },
  resolutionText: {
    fontSize: 14,
    color: '#166534',
    fontWeight: '500',
    marginBottom: 8,
    fontFamily: 'Inter',
  },
  resolutionDate: {
    fontSize: 12,
    color: '#15803d',
    marginBottom: 8,
    fontFamily: 'Inter',
  },
  winnerText: {
    fontSize: 14,
    color: '#166534',
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  actionsCard: {
    margin: 20,
    marginTop: 0,
  },
  actionButtons: {
    gap: 12,
  },
  actionButton: {
    marginBottom: 8,
  },
  pendingText: {
    fontSize: 14,
    color: '#f59e0b',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 16,
    fontFamily: 'Inter',
  },
});
