import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, Platform } from 'react-native';
import Header from '../../components/common/Header';
import StatCard from '../../components/dashboard/StatCard';
import { 
  TruckIcon, 
  BoxIcon, 
  BarChartIcon, 
  ThermometerIcon,
  AlertTriangleIcon,
  CheckCircleIcon
} from '../../components/common/Icons';
import { OrderData } from '../../components/orders/OrderCard';
import { InventoryItem } from '../../components/inventory/InventoryCard';
import OrderCard from '../../components/orders/OrderCard';
import InventoryCard from '../../components/inventory/InventoryCard';
import { MOCK_ORDERS, MOCK_INVENTORY_ITEMS } from '../../data/mockData';

export default function DashboardScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  
  useEffect(() => {
    // In a real app, this would fetch data from an API
    loadDashboardData();
  }, []);
  
  const loadDashboardData = () => {
    // Simulate API call
    setTimeout(() => {
      setOrders(MOCK_ORDERS.slice(0, 3));
      setInventory(MOCK_INVENTORY_ITEMS.filter(item => item.needsAttention).slice(0, 2));
    }, 500);
  };
  
  const onRefresh = () => {
    setRefreshing(true);
    loadDashboardData();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };
  
  return (
    <View style={styles.container}>
      <Header title="Dashboard" />
      
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={styles.greeting}>Good morning, John</Text>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.statsContainer}
        >
          <StatCard
            title="Active Orders"
            value="32"
            icon={<BoxIcon size={20} color="#3B82F6" />}
            changePercentage={12}
            color="#3B82F6"
          />
          <StatCard
            title="Routes Today"
            value="8"
            icon={<TruckIcon size={20} color="#22C55E" />}
            changePercentage={5}
            color="#22C55E"
          />
          <StatCard
            title="On-Time Delivery"
            value="95%"
            icon={<BarChartIcon size={20} color="#8B5CF6" />}
            changePercentage={-2}
            color="#8B5CF6"
          />
          <StatCard
            title="Temp Alerts"
            value="3"
            icon={<ThermometerIcon size={20} color="#EF4444" />}
            color="#EF4444"
          />
        </ScrollView>
        
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <AlertTriangleIcon size={18} color="#F59E0B" />
            <Text style={styles.sectionTitle}>Attention Required</Text>
          </View>
        </View>
        
        {inventory.map((item) => (
          <InventoryCard key={item.id} item={item} />
        ))}
        
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <BoxIcon size={18} color="#3B82F6" />
            <Text style={styles.sectionTitle}>Recent Orders</Text>
          </View>
        </View>
        
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
        
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <CheckCircleIcon size={18} color="#22C55E" />
            <Text style={styles.sectionTitle}>Quick Actions</Text>
          </View>
        </View>
        
        <View style={styles.placeholderCard}>
          <Text style={styles.placeholderText}>Coming soon...</Text>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E293B',
    marginTop: 16,
    marginBottom: 16,
    marginHorizontal: 16,
  },
  statsContainer: {
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  placeholderCard: {
    height: 100,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
    marginTop: 8,
  },
  placeholderText: {
    fontSize: 14,
    color: '#94A3B8',
  },
});