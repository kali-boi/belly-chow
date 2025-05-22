import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type StatusType = 
  | 'pending' 
  | 'in-transit' 
  | 'delivered' 
  | 'cancelled' 
  | 'delayed'
  | 'completed'
  | 'attention'
  | 'on-hold';

interface StatusBadgeProps {
  status: StatusType;
  size?: 'small' | 'medium' | 'large';
}

export default function StatusBadge({ status, size = 'medium' }: StatusBadgeProps) {
  const badgeStyles = [
    styles.badge,
    styles[`${status}Badge`],
    styles[`${size}Badge`]
  ];
  
  const textStyles = [
    styles.text,
    styles[`${status}Text`],
    styles[`${size}Text`]
  ];

  const getStatusText = (status: StatusType) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'in-transit': return 'In Transit';
      case 'delivered': return 'Delivered';
      case 'cancelled': return 'Cancelled';
      case 'delayed': return 'Delayed';
      case 'completed': return 'Completed';
      case 'attention': return 'Attention';
      case 'on-hold': return 'On Hold';
      default: return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  return (
    <View style={badgeStyles}>
      <Text style={textStyles}>{getStatusText(status)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 50,
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: '500',
  },
  // Status variations
  pendingBadge: {
    backgroundColor: '#FEF3C7',
  },
  pendingText: {
    color: '#D97706',
  },
  'in-transitBadge': {
    backgroundColor: '#DBEAFE',
  },
  'in-transitText': {
    color: '#2563EB',
  },
  deliveredBadge: {
    backgroundColor: '#DCFCE7',
  },
  deliveredText: {
    color: '#16A34A',
  },
  cancelledBadge: {
    backgroundColor: '#FEE2E2',
  },
  cancelledText: {
    color: '#DC2626',
  },
  delayedBadge: {
    backgroundColor: '#F3E8FF',
  },
  delayedText: {
    color: '#9333EA',
  },
  completedBadge: {
    backgroundColor: '#DCFCE7',
  },
  completedText: {
    color: '#16A34A',
  },
  attentionBadge: {
    backgroundColor: '#FEF3C7',
  },
  attentionText: {
    color: '#D97706',
  },
  'on-holdBadge': {
    backgroundColor: '#E0E7FF',
  },
  'on-holdText': {
    color: '#4F46E5',
  },
  // Size variations
  smallBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  smallText: {
    fontSize: 10,
  },
  mediumBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  mediumText: {
    fontSize: 12,
  },
  largeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  largeText: {
    fontSize: 14,
  },
});