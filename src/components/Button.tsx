import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 8,
    };

    const sizeStyles: Record<string, ViewStyle> = {
      sm: { paddingHorizontal: 16, paddingVertical: 8, minHeight: 36 },
      md: { paddingHorizontal: 24, paddingVertical: 12, minHeight: 48 },
      lg: { paddingHorizontal: 32, paddingVertical: 16, minHeight: 56 },
    };

    const variantStyles: Record<string, ViewStyle> = {
      primary: {
        backgroundColor: '#f59e0b', // Bitcoin orange
      },
      secondary: {
        backgroundColor: '#3b82f6', // Stacks blue
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#f59e0b',
      },
      ghost: {
        backgroundColor: 'transparent',
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...(disabled && { opacity: 0.5 }),
      ...style,
    };
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontSize: size === 'sm' ? 14 : size === 'lg' ? 18 : 16,
      fontWeight: '600',
      fontFamily: 'Inter',
    };

    const variantTextStyles: Record<string, TextStyle> = {
      primary: { color: '#ffffff' },
      secondary: { color: '#ffffff' },
      outline: { color: '#f59e0b' },
      ghost: { color: '#f59e0b' },
    };

    return {
      ...baseStyle,
      ...variantTextStyles[variant],
      ...textStyle,
    };
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading && <ActivityIndicator size="small" color="#ffffff" />}
      <Text style={getTextStyle()}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
