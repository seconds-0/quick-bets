import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Button } from '../components/Button';
import { Card, CardHeader, CardContent } from '../components/Card';
import type { Bet, NotificationItem } from '../types';

const { width } = Dimensions.get('window');

interface MainScreenProps {
  onCreateBet: () => void;
  onOpenBet: (bet: Bet) => void;
  bets?: Bet[];
  notifications?: NotificationItem[];
}

export const MainScreen: React.FC<MainScreenProps> = ({
  onCreateBet,
  onOpenBet,
  bets = [],
  notifications = []
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(30));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
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
      case 'pending': return 'Waiting';
      case 'resolved': return 'Resolved';
      case 'cancelled': return 'Cancelled';
      case 'expired': return 'Expired';
      case 'cancel_pending': return 'Cancelling';
      default: return 'Unknown';
    }
  };

  const activeBets = bets.filter(bet => ['active', 'pending', 'cancel_pending'].includes(bet.status));
  const completedBets = bets.filter(bet => ['resolved', 'cancelled', 'expired'].includes(bet.status));
  const unreadNotifications = notifications.filter(n => !n.read);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={loadData} />
      }
    >
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>My Bets</Text>
          <Button
            title="Create New Bet"
            onPress={onCreateBet}
            variant="primary"
            size="md"
          />
        </View>

        {/* Notifications */}
        {unreadNotifications.length > 0 && (
          <Card style={styles.notificationsCard}>
            <Text style={styles.notificationsTitle}>
              Notifications ({unreadNotifications.length})
            </Text>
            {unreadNotifications.slice(0, 3).map((notification) => (
              <View key={notification.id} style={styles.notificationItem}>
                <Text style={styles.notificationText}>{notification.message}</Text>
                <Text style={styles.notificationTime}>
                  {notification.timestamp.toLocaleDateString()}
                </Text>
              </View>
            ))}
          </Card>
        )}

        {/* Active Bets */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Active Bets</Text>
          {activeBets.length === 0 ? (
            <Card style={styles.emptyCard}>
              <Text style={styles.emptyText}>No active bets</Text>
              <Text style={styles.emptySubtext}>
                Create your first bet to get started
              </Text>
            </Card>
          ) : (
            activeBets.map((bet) => (
              <Card
                key={bet.id}
                style={styles.betCard}
                onPress={() => onOpenBet(bet)}
              >
                <View style={styles.betHeader}>
                  <Text style={styles.betTitle}>{bet.title}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(bet.status) }]}>
                    <Text style={styles.statusText}>{getStatusText(bet.status)}</Text>
                  </View>
                </View>

                <Text style={styles.betDescription} numberOfLines={2}>
                  {bet.description}
                </Text>

                <View style={styles.betFooter}>
                  <Text style={styles.betAmount}>{bet.stakeAmount} sBTC</Text>
                  <Text style={styles.betDate}>
                    {bet.expiresAt.toLocaleDateString()}
                  </Text>
                </View>
              </Card>
            ))
          )}
        </View>

        {/* Completed Bets */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Results</Text>
          {completedBets.length === 0 ? (
            <Card style={styles.emptyCard}>
              <Text style={styles.emptyText}>No completed bets</Text>
              <Text style={styles.emptySubtext}>
                Completed bets will appear here
              </Text>
            </Card>
          ) : (
            completedBets.map((bet) => (
              <Card
                key={bet.id}
                style={styles.betCard}
                onPress={() => onOpenBet(bet)}
              >
                <View style={styles.betHeader}>
                  <Text style={styles.betTitle}>{bet.title}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(bet.status) }]}>
                    <Text style={styles.statusText}>{getStatusText(bet.status)}</Text>
                  </View>
                </View>

                <Text style={styles.betDescription} numberOfLines={2}>
                  {bet.description}
                </Text>

                <View style={styles.betFooter}>
                  <Text style={styles.betAmount}>
                    {bet.winner ? 'Won' : 'Lost'} {bet.stakeAmount} sBTC
                  </Text>
                  <Text style={styles.betDate}>
                    {bet.resolvedAt?.toLocaleDateString()}
                  </Text>
                </View>
              </Card>
            ))
          )}
        </View>
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafaf9',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1c1917',
    fontFamily: 'Inter',
  },
  notificationsCard: {
    marginBottom: 24,
    backgroundColor: '#fef7ed',
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
  },
  notificationsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1c1917',
    marginBottom: 12,
    fontFamily: 'Inter',
  },
  notificationItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f4',
  },
  notificationText: {
    fontSize: 14,
    color: '#44403c',
    fontFamily: 'Inter',
  },
  notificationTime: {
    fontSize: 12,
    color: '#a8a29e',
    marginTop: 4,
    fontFamily: 'Inter',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1c1917',
    marginBottom: 16,
    fontFamily: 'Inter',
  },
  emptyCard: {
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#44403c',
    marginBottom: 8,
    fontFamily: 'Inter',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#a8a29e',
    textAlign: 'center',
    fontFamily: 'Inter',
  },
  betCard: {
    marginBottom: 16,
  },
  betHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  betTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1c1917',
    flex: 1,
    marginRight: 12,
    fontFamily: 'Inter',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
    fontFamily: 'Inter',
  },
  betDescription: {
    fontSize: 14,
    color: '#78716c',
    lineHeight: 20,
    marginBottom: 12,
    fontFamily: 'Inter',
  },
  betFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  betAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f59e0b',
    fontFamily: 'Inter',
  },
  betDate: {
    fontSize: 12,
    color: '#a8a29e',
    fontFamily: 'Inter',
  },
});
