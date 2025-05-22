import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Check, Truck, MapPin, Clock, User, Phone, ShoppingBag } from 'lucide-react-native';
import Header from '../../components/common/Header';
import Card from '../../components/common/Card';
import StatusBadge from '../../components/common/StatusBadge';
import Button from '../../components/common/Button';
import { OrderData } from '../../components/orders/OrderCard';
import { MOCK_ORDERS } from '../../data/mockData';

export default function OrderDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // In a real app, fetch the order details from an API
      // Simulating API call with timeout
      setTimeout(() => {
        const foundOrder = MOCK_ORDERS.find(o => o.id === id) || null;
        setOrder(foundOrder);
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

  if (!order) {
    return (
      <View style={styles.container}>
        <Header title="Order Details" showBackButton />
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>Order not found</Text>
        </View>
      </View>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return '#22C55E';
      case 'in-transit': return '#3B82F6';
      case 'pending': return '#F59E0B';
      case 'cancelled': return '#EF4444';
      case 'delayed': return '#8B5CF6';
      default: return '#64748B';
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Order Details" showBackButton />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.orderHeader}>
          <View>
            <Text style={styles.orderNumber}>Order #{order.orderNumber}</Text>
            <Text style={styles.customerName}>{order.customerName}</Text>
          </View>
          <StatusBadge status={order.status} size="large" />
        </View>
        
        <Card variant="default" style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>Delivery Information</Text>
          
          <View style={styles.infoItem}>
            <MapPin size={18} color="#64748B" style={styles.infoIcon} />
            <View>
              <Text style={styles.infoLabel}>Address</Text>
              <Text style={styles.infoValue}>{order.deliveryAddress}</Text>
            </View>
          </View>
          
          <View style={styles.infoRow}>
            <View style={[styles.infoItem, styles.halfWidth]}>
              <Clock size={18} color="#64748B" style={styles.infoIcon} />
              <View>
                <Text style={styles.infoLabel}>Date</Text>
                <Text style={styles.infoValue}>{order.deliveryDate}</Text>
              </View>
            </View>
            
            <View style={[styles.infoItem, styles.halfWidth]}>
              <Clock size={18} color="#64748B" style={styles.infoIcon} />
              <View>
                <Text style={styles.infoLabel}>Time Window</Text>
                <Text style={styles.infoValue}>{order.deliveryTime}</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.infoItem}>
            <Truck size={18} color="#64748B" style={styles.infoIcon} />
            <View>
              <Text style={styles.infoLabel}>Route</Text>
              <Text style={styles.infoValue}>Route #RT101</Text>
            </View>
          </View>
          
          <View style={styles.infoItem}>
            <User size={18} color="#64748B" style={styles.infoIcon} />
            <View>
              <Text style={styles.infoLabel}>Contact Person</Text>
              <Text style={styles.infoValue}>James Wilson</Text>
            </View>
          </View>
          
          <View style={styles.infoItem}>
            <Phone size={18} color="#64748B" style={styles.infoIcon} />
            <View>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>(312) 555-1234</Text>
            </View>
          </View>
        </Card>
        
        <Card variant="default" style={styles.itemsCard}>
          <Text style={styles.sectionTitle}>Order Items</Text>
          
          {order.items.map((item, index) => (
            <View key={item.id} style={[styles.orderItem, index < order.items.length - 1 && styles.borderBottom]}>
              <View style={styles.itemInfo}>
                <ShoppingBag size={18} color="#64748B" style={styles.itemIcon} />
                <View>
                  <Text style={styles.itemName}>{item.name}</Text>
                  {item.temperature && (
                    <Text style={styles.itemTemp}>Temperature: {item.temperature}</Text>
                  )}
                </View>
              </View>
              <Text style={styles.itemQuantity}>{item.quantity} units</Text>
            </View>
          ))}
        </Card>
        
        <Card variant="default" style={styles.statusCard}>
          <Text style={styles.sectionTitle}>Delivery Status</Text>
          
          <View style={styles.statusTimeline}>
            <View style={[styles.statusLine, { backgroundColor: getStatusColor(order.status) }]} />
            
            <View style={styles.statusSteps}>
              <View style={styles.statusStep}>
                <View style={[styles.statusDot, { backgroundColor: '#22C55E' }]}>
                  <Check size={12} color="#FFFFFF" />
                </View>
                <View style={styles.statusStepContent}>
                  <Text style={styles.statusText}>Order Received</Text>
                  <Text style={styles.statusTime}>01/14/2025, 10:32 AM</Text>
                </View>
              </View>
              
              <View style={styles.statusStep}>
                <View style={[styles.statusDot, { backgroundColor: '#22C55E' }]}>
                  <Check size={12} color="#FFFFFF" />
                </View>
                <View style={styles.statusStepContent}>
                  <Text style={styles.statusText}>Order Processed</Text>
                  <Text style={styles.statusTime}>01/14/2025, 02:15 PM</Text>
                </View>
              </View>
              
              <View style={styles.statusStep}>
                <View style={[
                  styles.statusDot, 
                  { backgroundColor: order.status === 'pending' ? '#F8FAFC' : getStatusColor(order.status) },
                  order.status === 'pending' && styles.pendingDot
                ]}>
                  {order.status !== 'pending' && <Check size={12} color="#FFFFFF" />}
                </View>
                <View style={styles.statusStepContent}>
                  <Text style={styles.statusText}>Out for Delivery</Text>
                  {order.status !== 'pending' ? (
                    <Text style={styles.statusTime}>01/15/2025, 08:05 AM</Text>
                  ) : (
                    <Text style={styles.pendingText}>Scheduled for 01/15/2025</Text>
                  )}
                </View>
              </View>
              
              <View style={styles.statusStep}>
                <View style={[
                  styles.statusDot, 
                  { backgroundColor: order.status === 'delivered' ? '#22C55E' : '#F8FAFC' },
                  order.status !== 'delivered' && styles.pendingDot
                ]}>
                  {order.status === 'delivered' && <Check size={12} color="#FFFFFF" />}
                </View>
                <View style={styles.statusStepContent}>
                  <Text style={styles.statusText}>Delivered</Text>
                  {order.status === 'delivered' ? (
                    <Text style={styles.statusTime}>01/15/2025, 09:45 AM</Text>
                  ) : (
                    <Text style={styles.pendingText}>Pending</Text>
                  )}
                </View>
              </View>
            </View>
          </View>
        </Card>
        
        <View style={styles.buttonContainer}>
          <Button 
            title="Track Delivery" 
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
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  customerName: {
    fontSize: 16,
    color: '#64748B',
  },
  detailsCard: {
    marginBottom: 16,
  },
  itemsCard: {
    marginBottom: 16,
  },
  statusCard: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  halfWidth: {
    width: '48%',
  },
  infoIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  infoLabel: {
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    color: '#334155',
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  itemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemIcon: {
    marginRight: 12,
  },
  itemName: {
    fontSize: 14,
    color: '#334155',
  },
  itemTemp: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  itemQuantity: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1E293B',
  },
  statusTimeline: {
    position: 'relative',
    paddingLeft: 12,
  },
  statusLine: {
    position: 'absolute',
    left: 18,
    top: 16,
    bottom: 16,
    width: 2,
  },
  statusSteps: {
    marginLeft: 8,
  },
  statusStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  statusDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  pendingDot: {
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  statusStepContent: {
    flex: 1,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#334155',
    marginBottom: 2,
  },
  statusTime: {
    fontSize: 12,
    color: '#64748B',
  },
  pendingText: {
    fontSize: 12,
    color: '#94A3B8',
    fontStyle: 'italic',
  },
  buttonContainer: {
    marginTop: 8,
  },
  button: {
    width: '100%',
  },
});