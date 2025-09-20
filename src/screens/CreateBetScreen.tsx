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
import { Input, TextArea } from '../components/Input';
import { Card, CardHeader, CardContent } from '../components/Card';
import { mockAPI } from '../services/mock-data';

const { width } = Dimensions.get('window');

interface CreateBetScreenProps {
  onClose: () => void;
  onBetCreated: (bet: any) => void;
}

export const CreateBetScreen: React.FC<CreateBetScreenProps> = ({
  onClose,
  onBetCreated,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    stakeAmount: '',
    durationDays: '7',
  });
  const [arbitratorAddress, setArbitratorAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<'form' | 'preview' | 'funding'>('form');
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(30));

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      Alert.alert('Error', 'Please enter a bet title');
      return false;
    }
    if (!formData.description.trim()) {
      Alert.alert('Error', 'Please enter a bet description');
      return false;
    }
    if (!formData.stakeAmount || parseFloat(formData.stakeAmount) <= 0) {
      Alert.alert('Error', 'Please enter a valid stake amount');
      return false;
    }
    return true;
  };

  const handlePreview = () => {
    if (validateForm()) {
      setStep('preview');
    }
  };

  const handleCreate = async () => {
    setIsSubmitting(true);
    try {
      const betData = {
        title: formData.title,
        description: formData.description,
        amount: parseFloat(formData.stakeAmount),
        durationDays: parseInt(formData.durationDays),
        arbitratorAddress: arbitratorAddress || undefined,
      };

      const newBet = await mockAPI.createBet(betData);
      onBetCreated(newBet);
      Alert.alert(
        'Bet Created!',
        'Your bet proposal has been created. Share the URL with your betting partner.',
        [{ text: 'OK', onPress: onClose }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to create bet. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (step === 'preview') {
      setStep('form');
    } else {
      onClose();
    }
  };

  const renderForm = () => (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <Card style={styles.formCard}>
        <CardHeader
          title="Create New Bet"
          subtitle="Fill out the details below to create your bet proposal"
        />

        <CardContent>
          <Input
            label="Bet Title"
            placeholder="e.g., Lakers vs Warriors Game"
            value={formData.title}
            onChangeText={(value) => handleInputChange('title', value)}
            helperText="Keep it short and clear"
          />

          <TextArea
            label="Bet Description"
            placeholder="Describe the terms of your bet in detail..."
            value={formData.description}
            onChangeText={(value) => handleInputChange('description', value)}
            numberOfLines={4}
            helperText="Be specific about what determines the winner"
          />

          <Input
            label="Stake Amount (sBTC)"
            placeholder="100"
            value={formData.stakeAmount}
            onChangeText={(value) => handleInputChange('stakeAmount', value)}
            type="number"
            helperText="Amount each party will put up"
          />

          <Input
            label="Duration (Days)"
            placeholder="7"
            value={formData.durationDays}
            onChangeText={(value) => handleInputChange('durationDays', value)}
            type="number"
            helperText="How long until the bet expires"
          />

          <Input
            label="Arbitrator Address (Optional)"
            placeholder="SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKPVPG2CT"
            value={arbitratorAddress}
            onChangeText={setArbitratorAddress}
            helperText="3rd party to resolve disputes (for notable bets)"
          />

          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>💡 Pro Tips</Text>
            <Text style={styles.infoText}>
              • Be specific about winning conditions{'\n'}
              • Include dates, times, and clear criteria{'\n'}
              • Consider edge cases and how to resolve them{'\n'}
              • The more objective, the better
            </Text>
          </View>
        </CardContent>
      </Card>

      <View style={styles.buttonContainer}>
        <Button
          title="Preview Bet"
          onPress={handlePreview}
          variant="primary"
          size="lg"
          style={styles.primaryButton}
        />
        <Button
          title="Cancel"
          onPress={onClose}
          variant="ghost"
          size="md"
        />
      </View>
    </ScrollView>
  );

  const renderPreview = () => (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <Card style={styles.previewCard}>
        <CardHeader title="Bet Preview" />

        <CardContent>
          <View style={styles.previewSection}>
            <Text style={styles.previewLabel}>Title</Text>
            <Text style={styles.previewValue}>{formData.title}</Text>
          </View>

          <View style={styles.previewSection}>
            <Text style={styles.previewLabel}>Description</Text>
            <Text style={styles.previewValue}>{formData.description}</Text>
          </View>

          <View style={styles.previewSection}>
            <Text style={styles.previewLabel}>Stake</Text>
            <Text style={styles.previewValue}>{formData.stakeAmount} sBTC each</Text>
          </View>

          <View style={styles.previewSection}>
            <Text style={styles.previewLabel}>Duration</Text>
            <Text style={styles.previewValue}>{formData.durationDays} days</Text>
          </View>

          {arbitratorAddress && (
            <View style={styles.previewSection}>
              <Text style={styles.previewLabel}>Arbitrator</Text>
              <Text style={styles.previewValue}>
                {arbitratorAddress.slice(0, 10)}...{arbitratorAddress.slice(-8)}
              </Text>
            </View>
          )}

          <View style={styles.feeSection}>
            <Text style={styles.feeLabel}>Platform Fee (3%)</Text>
            <Text style={styles.feeValue}>
              {(parseFloat(formData.stakeAmount) * 2 * 0.03).toFixed(2)} sBTC
            </Text>
          </View>
        </CardContent>
      </Card>

      <View style={styles.buttonContainer}>
        <Button
          title="Create Bet Proposal"
          onPress={handleCreate}
          variant="primary"
          size="lg"
          style={styles.primaryButton}
          loading={isSubmitting}
          disabled={isSubmitting}
        />
        <Button
          title="Edit Details"
          onPress={() => setStep('form')}
          variant="outline"
          size="md"
        />
      </View>
    </ScrollView>
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
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {step === 'form' ? 'Create Bet' : 'Preview'}
          </Text>
          <View style={styles.placeholder} />
        </View>

        {step === 'form' ? renderForm() : renderPreview()}
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
  formCard: {
    margin: 20,
    marginTop: 0,
  },
  previewCard: {
    margin: 20,
    marginTop: 0,
    backgroundColor: '#fef7ed',
  },
  infoBox: {
    backgroundColor: '#f0f9ff',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0c4a6e',
    marginBottom: 8,
    fontFamily: 'Inter',
  },
  infoText: {
    fontSize: 12,
    color: '#075985',
    lineHeight: 18,
    fontFamily: 'Inter',
  },
  buttonContainer: {
    padding: 20,
    paddingTop: 0,
    gap: 12,
  },
  primaryButton: {
    marginBottom: 8,
  },
  previewSection: {
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f4',
  },
  previewLabel: {
    fontSize: 12,
    color: '#78716c',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
    fontFamily: 'Inter',
  },
  previewValue: {
    fontSize: 16,
    color: '#1c1917',
    fontWeight: '500',
    fontFamily: 'Inter',
  },
  feeSection: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#fef7ed',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  feeLabel: {
    fontSize: 14,
    color: '#92400e',
    fontFamily: 'Inter',
  },
  feeValue: {
    fontSize: 16,
    color: '#f59e0b',
    fontWeight: '600',
    fontFamily: 'Inter',
  },
});
