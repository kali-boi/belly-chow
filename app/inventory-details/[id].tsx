import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Package, Thermometer, Calendar, MapPin, Clock, TriangleAlert as AlertTriangle } from 'lucide-react-native';
import Header from '../../components/common/Header';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { InventoryItem } from '../../components/inventory/InventoryCard';
import { MOCK_INVENTORY_ITEMS } from '../../data/mockData';

export default function InventoryDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [item, setItem] = useState<InventoryItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // In a real app, fetch the inventory item details from an API
      // Simulating API call with timeout
      setTimeout(() => {
        const foundItem = MOCK_INVENTORY_ITEMS.find(i => i.id === id) || null;
        setItem(foundItem);
        setLoading(false);
      }, 1000);
    }
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#22C55E" />
      </View>
    );
  }

  if (!item) {
    return (
      <View style={styles.container}>
        <Header title="Inventory Details" showBackButton />
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>Item not found</Text>
        </View>
      </View>
    );
  }

  const isTemperatureInRange = (): boolean | null => {
    if (item.temperature === undefined || !item.temperatureRange) return null;
    return item.temperature >= item.temperatureRange.min && 
           item.temperature <= item.temperatureRange.max;
  };

  const temperatureStatus = isTemperatureInRange();

  return (
    <View style={styles.container}>
      <Header title="Inventory Details" showBackButton />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.itemHeader}>
          <View>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemSku}>SKU: {item.sku}</Text>
          </View>
          {item.needsAttention && (
            <View style={styles.attentionContainer}>
              <AlertTriangle size={20} color="#F59E0B" />
              <Text style={styles.attentionText}>Attention Required</Text>
            </View>
          )}
        </View>
        
        <Card variant="default" style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>Item Details</Text>
          
          <View style={styles.detailsRow}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Category</Text>
              <Text style={styles.detailValue}>{item.category}</Text>
            </View>
            
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Quantity</Text>
              <Text style={styles.detailValue}>{item.quantity} {item.unit}</Text>
            </View>
          </View>
          
          <View style={styles.detailsRow}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Location</Text>
              <View style={styles.locationContainer}>
                <MapPin size={16} color="#64748B" />
                <Text style={styles.locationText}>{item.locationCode}</Text>
              </View>
            </View>
            
            {item.expiryDate && (
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Expiry Date</Text>
                <View style={styles.locationContainer}>
                  <Calendar size={16} color="#64748B" />
                  <Text style={styles.locationText}>{item.expiryDate}</Text>
                </View>
              </View>
            )}
          </View>
          
          {item.temperature !== undefined && (
            <View style={styles.temperatureSection}>
              <View style={styles.temperatureHeader}>
                <Thermometer size={18} color="#64748B" />
                <Text style={styles.temperatureHeaderText}>Temperature Monitoring</Text>
              </View>
              
              <View style={styles.temperatureDetails}>
                <View style={styles.currentTemp}>
                  <Text style={styles.tempLabel}>Current</Text>
                  <Text style={[
                    styles.tempValue,
                    temperatureStatus === false ? styles.tempAlert : null
                  ]}>
                    {item.temperature}°C
                  </Text>
                </View>
                
                {item.temperatureRange && (
                  <View style={styles.tempRange}>
                    <Text style={styles.tempLabel}>Required Range</Text>
                    <Text style={styles.rangeValue}>
                      {item.temperatureRange.min}°C to {item.temperatureRange.max}°C
                    </Text>
                  </View>
                )}
              </View>
              
              {temperatureStatus === false && (
                <View style={styles.alertBox}>
                  <AlertTriangle size={16} color="#DC2626" />
                  <Text style={styles.alertText}>
                    Temperature out of range! Take immediate action.
                  </Text>
                </View>
              )}
              
              <View style={styles.tempHistoryHeader}>
                <Clock size={16} color="#64748B" />
                <Text style={styles.tempHistoryText}>Last 24 Hours</Text>
              </View>
              
              <View style={styles.tempHistory}>
                {/* Placeholder for temperature history chart */}
                <View style={styles.tempChartPlaceholder}>
                  <Text style={styles.placeholderText}>Temperature Chart</Text>
                </View>
              </View>
            </View>
          )}
        </Card>
        
        <Card variant="default" style={styles.movementCard}>
          <Text style={styles.sectionTitle}>Inventory Movement</Text>
          
          <View style={styles.movementItem}>
            <View style={styles.movementDot} />
            <View style={styles.movementContent}>
              <Text style={styles.movementTitle}>Received from Supplier</Text>
              <Text style={styles.movementDetails}>Quantity: {item.quantity} {item.unit}</Text>
              <Text style={styles.movementDate}>01/10/2025, 09:15 AM</Text>
            </View>
          </View>
          
          <View style={styles.movementItem}>
            <View style={styles.movementDot} />
            <View style={styles.movementContent}>
              <Text style={styles.movementTitle}>Quality Check Performed</Text>
              <Text style={styles.movementDetails}>Result: Passed</Text>
              <Text style={styles.movementDate}>01/10/2025, 10:30 AM</Text>
            </View>
          </View>
          
          <View style={styles.movementItem}>
            <View style={styles.movementDot} />
            <View style={styles.movementContent}>
              <Text style={styles.movementTitle}>Moved to Storage</Text>
              <Text style={styles.movementDetails}>Location: {item.locationCode}</Text>
              <Text style={styles.movementDate}>01/10/2025, 11:45 AM</Text>
            </View>
          </View>
        </Card>
        
        <View style={styles.buttonContainer}>
          <Button 
            title="Adjust Inventory" 
            onPress={() => {}} 
            variant="primary"
            size="large"
            style={styles.button}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    fontSize: 16,
    color: '#64748B',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  itemSku: {
    fontSize: 14,
    color: '#64748B',
  },
  attentionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  attentionText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#F59E0B',
  },
  detailsCard: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailItem: {
    width: '48%',
  },
  detailLabel: {
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#334155',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationText: {
    fontSize: 14,
    color: '#334155',
  },
  temperatureSection: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  temperatureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  temperatureHeaderText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#334155',
  },
  temperatureDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  currentTemp: {},
  tempRange: {},
  tempLabel: {
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 2,
  },
  tempValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
  },
  tempAlert: {
    color: '#DC2626',
  },
  rangeValue: {
    fontSize: 14,
    color: '#334155',
  },
  alertBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginBottom: 16,
  },
  alertText: {
    fontSize: 12,
    color: '#DC2626',
    flex: 1,
  },
  tempHistoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  tempHistoryText: {
    fontSize: 14,
    color: '#64748B',
  },
  tempHistory: {},
  tempChartPlaceholder: {
    height: 120,
    backgroundColor: '#F1F5F9',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 14,
    color: '#94A3B8',
  },
  movementCard: {
    marginBottom: 24,
  },
  movementItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  movementDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#3B82F6',
    marginTop: 4,
    marginRight: 12,
  },
  movementContent: {
    flex: 1,
  },
  movementTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#334155',
    marginBottom: 2,
  },
  movementDetails: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 2,
  },
  movementDate: {
    fontSize: 12,
    color: '#94A3B8',
  },
  buttonContainer: {
    marginTop: 8,
  },
  button: {
    width: '100%',
  },
});