import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  StyleSheet,
} from 'react-native';
import { Button } from '../components/Button';
import { Card, CardHeader, CardContent } from '../components/Card';

const { width, height } = Dimensions.get('window');

interface LandingScreenProps {
  onLogin: (walletType: 'leather' | 'xverse') => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({ onLogin }) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {/* Hero Section */}
        <View style={styles.hero}>
          <Text style={styles.title}>Quick-Bets</Text>
          <Text style={styles.subtitle}>
            Private bets on Bitcoin{'\n'}
            <Text style={styles.subtitleHighlight}>No intermediaries</Text>
          </Text>
          <Text style={styles.description}>
            Create, fund, and resolve private bets with friends using sBTC escrow.
            Mutual consent first, trusted resolution when needed.
          </Text>
        </View>

        {/* Feature Cards */}
        <View style={styles.features}>
          <Card style={styles.featureCard}>
            <CardHeader title="URL-Based Proposals" />
            <CardContent>
              <Text style={styles.featureDescription}>
                Create a bet and share via URL. No simultaneous wallet connections required.
              </Text>
            </CardContent>
          </Card>

          <Card style={styles.featureCard}>
            <CardHeader title="Multi-Asset Support" />
            <CardContent>
              <Text style={styles.featureDescription}>
                Fund with STX, BTC, or sBTC. Automatic conversion happens seamlessly.
              </Text>
            </CardContent>
          </Card>

          <Card style={styles.featureCard}>
            <CardHeader title="Mutual Consent First" />
            <CardContent>
              <Text style={styles.featureDescription}>
                You and your betting partner can always cancel or award at any time.
              </Text>
            </CardContent>
          </Card>
        </View>

        {/* Login Options */}
        <View style={styles.loginSection}>
          <Text style={styles.loginTitle}>Connect Your Wallet</Text>
          <Button
            title="Continue with Leather"
            onPress={() => onLogin('leather')}
            variant="primary"
            size="lg"
            style={styles.loginButton}
          />
          <Button
            title="Continue with Xverse"
            onPress={() => onLogin('xverse')}
            variant="outline"
            size="lg"
            style={styles.loginButton}
          />
        </View>

        {/* Trust Indicators */}
        <View style={styles.trustSection}>
          <Text style={styles.trustText}>🔒 Non-custodial</Text>
          <Text style={styles.trustText}>⚡ Built on Stacks</Text>
          <Text style={styles.trustText}>🛡️ sBTC Escrow</Text>
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
    padding: 24,
    paddingTop: 60,
  },
  hero: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#f59e0b',
    marginBottom: 16,
    fontFamily: 'Inter',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: '#44403c',
    textAlign: 'center',
    marginBottom: 24,
    fontFamily: 'Inter',
    lineHeight: 28,
  },
  subtitleHighlight: {
    color: '#f59e0b',
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    color: '#78716c',
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: 'Inter',
    maxWidth: 300,
  },
  features: {
    marginBottom: 48,
    gap: 16,
  },
  featureCard: {
    marginBottom: 16,
  },
  featureDescription: {
    fontSize: 14,
    color: '#78716c',
    lineHeight: 20,
    fontFamily: 'Inter',
  },
  loginSection: {
    marginBottom: 32,
  },
  loginTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1c1917',
    textAlign: 'center',
    marginBottom: 24,
    fontFamily: 'Inter',
  },
  loginButton: {
    marginBottom: 16,
  },
  trustSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginTop: 20,
  },
  trustText: {
    fontSize: 14,
    color: '#78716c',
    fontFamily: 'Inter',
  },
});
