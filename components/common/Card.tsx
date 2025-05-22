import React, { ReactNode } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, Platform } from 'react-native';

interface CardProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: 'default' | 'elevated' | 'outlined' | 'glass';
}

export default function Card({ children, style, variant = 'default' }: CardProps) {
  return (
    <View style={[styles.card, styles[`${variant}Card`], style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
  },
  defaultCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.3)',
  },
  elevatedCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
    ...(Platform.OS === 'web' && {
      backdropFilter: 'blur(12px)',
    }),
  },
  outlinedCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
    ...(Platform.OS === 'web' && {
      backdropFilter: 'blur(8px)',
    }),
  },
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    ...(Platform.OS === 'web' && {
      backdropFilter: 'blur(16px)',
    }),
  },
});