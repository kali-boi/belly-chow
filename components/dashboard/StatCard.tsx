import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Card from '../common/Card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  changePercentage?: number;
  color?: string;
}

export default function StatCard({ 
  title, 
  value, 
  icon, 
  changePercentage, 
  color = '#8B5CF6' 
}: StatCardProps) {
  return (
    <Card variant="glass" style={styles.card}>
      <View style={styles.iconContainer}>
        <View style={[styles.iconBackground, { backgroundColor: `${color}20` }]}>
          {icon}
        </View>
      </View>
      
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
      
      {changePercentage !== undefined && (
        <View style={styles.changeContainer}>
          <Text style={[
            styles.changeText, 
            changePercentage >= 0 ? styles.positiveChange : styles.negativeChange
          ]}>
            {changePercentage >= 0 ? '+' : ''}{changePercentage}%
          </Text>
          <Text style={styles.periodText}>vs last week</Text>
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    margin: 8,
    flex: 1,
    minWidth: 150,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderColor: 'rgba(139, 92, 246, 0.2)',
    ...(Platform.OS === 'web' && {
      backdropFilter: 'blur(12px)',
    }),
  },
  iconContainer: {
    marginBottom: 12,
  },
  iconBackground: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  value: {
    fontSize: 24,
    fontWeight: '700',
    color: '#8B5CF6',
    marginBottom: 8,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
    marginRight: 4,
  },
  positiveChange: {
    color: '#10B981',
  },
  negativeChange: {
    color: '#EF4444',
  },
  periodText: {
    fontSize: 12,
    color: '#94A3B8',
  },
});