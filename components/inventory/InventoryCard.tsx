import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Card from '../common/Card';
import { ThermometerIcon, AlertTriangleIcon } from '../common/Icons';

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  unit: string;
  temperature?: number;
  temperatureRange?: {
    min: number;
    max: number;
  };
  expiryDate?: string;
  locationCode: string;
  needsAttention: boolean;
}

interface InventoryCardProps {
  item: InventoryItem;
}

export default function InventoryCard({ item }: InventoryCardProps) {
  const router = useRouter();
  
  const handlePress = () => {
    router.push({
      pathname: '/inventory-details/[id]',
      params: { id: item.id }
    });
  };

  const isTemperatureInRange = (): boolean | null => {
    if (item.temperature === undefined || !item.temperatureRange) return null;
    return item.temperature >= item.temperatureRange.min && 
           item.temperature <= item.temperatureRange.max;
  };

  const temperatureStatus = isTemperatureInRange();

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <Card variant="elevated" style={styles.card}>
        <View style={styles.header}>
          <View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.sku}>SKU: {item.sku}</Text>
          </View>
          
          {item.needsAttention && (
            <View style={styles.attentionContainer}>
              <AlertTriangleIcon size={18} color="#F59E0B" />
            </View>
          )}
        </View>
        
        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Quantity:</Text>
            <Text style={styles.detailValue}>{item.quantity} {item.unit}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Category:</Text>
            <Text style={styles.detailValue}>{item.category}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Location:</Text>
            <Text style={styles.detailValue}>{item.locationCode}</Text>
          </View>
          
          {item.expiryDate && (
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Expiry:</Text>
              <Text style={styles.detailValue}>{item.expiryDate}</Text>
            </View>
          )}
        </View>
        
        {item.temperature !== undefined && (
          <View style={styles.temperatureContainer}>
            <View style={styles.temperatureHeader}>
              <ThermometerIcon size={16} color="#64748B" />
              <Text style={styles.temperatureLabel}>Temperature</Text>
            </View>
            
            <View style={styles.temperatureValueContainer}>
              <Text style={[
                styles.temperatureValue,
                temperatureStatus === false ? styles.temperatureAlert : null
              ]}>
                {item.temperature}°C
              </Text>
              
              {item.temperatureRange && (
                <Text style={styles.temperatureRange}>
                  Range: {item.temperatureRange.min}°C - {item.temperatureRange.max}°C
                </Text>
              )}
            </View>
          </View>
        )}
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  sku: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  attentionContainer: {
    backgroundColor: '#FEF3C7',
    padding: 6,
    borderRadius: 50,
  },
  details: {
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    marginVertical: 2,
  },
  detailLabel: {
    fontSize: 14,
    color: '#64748B',
    width: 80,
  },
  detailValue: {
    fontSize: 14,
    color: '#1E293B',
    flex: 1,
  },
  temperatureContainer: {
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 12,
  },
  temperatureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  temperatureLabel: {
    fontSize: 14,
    color: '#64748B',
  },
  temperatureValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  temperatureValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  temperatureRange: {
    fontSize: 12,
    color: '#94A3B8',
  },
  temperatureAlert: {
    color: '#DC2626',
  },
});