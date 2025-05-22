import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Card from '../common/Card';
import StatusBadge from '../common/StatusBadge';
import { CalendarIcon, ClockIcon } from '../common/Icons';

export type OrderStatus = 'pending' | 'in-transit' | 'delivered' | 'cancelled' | 'delayed';

export interface OrderData {
  id: string;
  orderNumber: string;
  customerName: string;
  deliveryAddress: string;
  deliveryDate: string;
  deliveryTime: string;
  status: OrderStatus;
  items: {
    id: string;
    name: string;
    quantity: number;
    temperature?: string;
  }[];
}

interface OrderCardProps {
  order: OrderData;
}

export default function OrderCard({ order }: OrderCardProps) {
  const router = useRouter();
  
  const handlePress = () => {
    router.push({
      pathname: '/order-details/[id]',
      params: { id: order.id }
    });
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <Card variant="elevated" style={styles.card}>
        <View style={styles.header}>
          <View>
            <Text style={styles.orderNumber}>#{order.orderNumber}</Text>
            <Text style={styles.customerName}>{order.customerName}</Text>
          </View>
          <StatusBadge status={order.status} />
        </View>
        
        <View style={styles.addressContainer}>
          <Text style={styles.addressLabel}>Delivery Address:</Text>
          <Text style={styles.address} numberOfLines={2}>{order.deliveryAddress}</Text>
        </View>
        
        <View style={styles.footer}>
          <View style={styles.dateTimeContainer}>
            <View style={styles.iconTextPair}>
              <CalendarIcon size={16} color="#64748B" />
              <Text style={styles.dateTime}>{order.deliveryDate}</Text>
            </View>
            <View style={styles.iconTextPair}>
              <ClockIcon size={16} color="#64748B" />
              <Text style={styles.dateTime}>{order.deliveryTime}</Text>
            </View>
          </View>
          <Text style={styles.itemCount}>{order.items.length} items</Text>
        </View>
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
  orderNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  customerName: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 2,
  },
  addressContainer: {
    marginBottom: 12,
  },
  addressLabel: {
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 2,
  },
  address: {
    fontSize: 14,
    color: '#334155',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 12,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  iconTextPair: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateTime: {
    fontSize: 13,
    color: '#64748B',
  },
  itemCount: {
    fontSize: 13,
    fontWeight: '500',
    color: '#3B82F6',
  },
});