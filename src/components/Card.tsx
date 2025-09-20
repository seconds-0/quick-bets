import React from 'react';
import { View, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  variant?: 'default' | 'elevated' | 'outline';
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  onPress,
  variant = 'default'
}) => {
  const getCardStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      backgroundColor: '#ffffff',
      borderRadius: 16,
      padding: 20,
    };

    const variantStyles: Record<string, ViewStyle> = {
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
      },
      elevated: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 6,
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#e7e5e4',
        shadowOpacity: 0,
        elevation: 0,
      },
    };

    return {
      ...baseStyle,
      ...variantStyles[variant],
      ...style,
    };
  };

  if (onPress) {
    return (
      <TouchableOpacity style={getCardStyle()} onPress={onPress} activeOpacity={0.7}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={getCardStyle()}>{children}</View>;
};

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  style?: ViewStyle;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  subtitle,
  action,
  style,
}) => (
  <View style={[{ marginBottom: 16 }, style]}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <View style={{ flex: 1 }}>
        <Text style={{
          fontSize: 18,
          fontWeight: '600',
          color: '#1c1917',
          marginBottom: subtitle ? 4 : 0,
          fontFamily: 'Inter',
        }}>
          {title}
        </Text>
        {subtitle && (
          <Text style={{
            fontSize: 14,
            color: '#78716c',
            fontFamily: 'Inter',
          }}>
            {subtitle}
          </Text>
        )}
      </View>
      {action && <View style={{ marginLeft: 12 }}>{action}</View>}
    </View>
  </View>
);

interface CardContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const CardContent: React.FC<CardContentProps> = ({ children, style }) => (
  <View style={style}>
    {children}
  </View>
);

interface CardFooterProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, style }) => (
  <View style={[{ marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#f5f5f4' }, style]}>
    {children}
  </View>
);
