import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'floating';
  type?: 'text' | 'number' | 'email';
  disabled?: boolean;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  helperText,
  variant = 'default',
  type = 'text',
  disabled = false,
  style,
  inputStyle,
  leftIcon,
  rightIcon,
  onRightIconPress,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const getInputContainerStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: 12,
      borderWidth: 2,
      borderColor: error ? '#ef4444' : isFocused ? '#f59e0b' : '#e7e5e4',
      backgroundColor: disabled ? '#f5f5f4' : '#ffffff',
      paddingHorizontal: 16,
      paddingVertical: 12,
      flexDirection: 'row',
      alignItems: 'center',
    };

    return { ...baseStyle, ...style };
  };

  const getInputStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      flex: 1,
      fontSize: 16,
      color: '#1c1917',
      fontFamily: 'Inter',
    };

    if (disabled) {
      baseStyle.color = '#a8a29e';
    }

    return { ...baseStyle, ...inputStyle };
  };

  const getLabelStyle = (): TextStyle => ({
    fontSize: 14,
    fontWeight: '500',
    color: error ? '#ef4444' : isFocused ? '#f59e0b' : '#78716c',
    marginBottom: 8,
    fontFamily: 'Inter',
  });

  return (
    <View style={{ marginBottom: 16 }}>
      {label && <Text style={getLabelStyle()}>{label}</Text>}

      <View style={getInputContainerStyle()}>
        {leftIcon && <View style={{ marginRight: 12 }}>{leftIcon}</View>}

        <TextInput
          style={getInputStyle()}
          placeholder={placeholder}
          placeholderTextColor="#a8a29e"
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          editable={!disabled}
          keyboardType={type === 'number' ? 'numeric' : type === 'email' ? 'email-address' : 'default'}
          secureTextEntry={type === 'password'}
        />

        {rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            style={{ marginLeft: 12, padding: 4 }}
            disabled={!onRightIconPress}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <Text style={{
          fontSize: 14,
          color: '#ef4444',
          marginTop: 4,
          fontFamily: 'Inter',
        }}>
          {error}
        </Text>
      )}

      {helperText && !error && (
        <Text style={{
          fontSize: 14,
          color: '#78716c',
          marginTop: 4,
          fontFamily: 'Inter',
        }}>
          {helperText}
        </Text>
      )}
    </View>
  );
};

interface TextAreaProps extends Omit<InputProps, 'type'> {
  numberOfLines?: number;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  helperText,
  numberOfLines = 4,
  style,
  inputStyle,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const getTextAreaStyle = (): ViewStyle => ({
    borderRadius: 12,
    borderWidth: 2,
    borderColor: error ? '#ef4444' : isFocused ? '#f59e0b' : '#e7e5e4',
    backgroundColor: '#ffffff',
    padding: 16,
    minHeight: numberOfLines * 24 + 32,
  });

  const getTextStyle = (): TextStyle => ({
    fontSize: 16,
    color: '#1c1917',
    fontFamily: 'Inter',
    textAlignVertical: 'top',
  });

  return (
    <View style={{ marginBottom: 16 }}>
      {label && (
        <Text style={{
          fontSize: 14,
          fontWeight: '500',
          color: error ? '#ef4444' : isFocused ? '#f59e0b' : '#78716c',
          marginBottom: 8,
          fontFamily: 'Inter',
        }}>
          {label}
        </Text>
      )}

      <TextInput
        style={[getTextAreaStyle(), getTextStyle(), style]}
        placeholder={placeholder}
        placeholderTextColor="#a8a29e"
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        multiline
        numberOfLines={numberOfLines}
        textAlignVertical="top"
      />

      {error && (
        <Text style={{
          fontSize: 14,
          color: '#ef4444',
          marginTop: 4,
          fontFamily: 'Inter',
        }}>
          {error}
        </Text>
      )}

      {helperText && !error && (
        <Text style={{
          fontSize: 14,
          color: '#78716c',
          marginTop: 4,
          fontFamily: 'Inter',
        }}>
          {helperText}
        </Text>
      )}
    </View>
  );
};
