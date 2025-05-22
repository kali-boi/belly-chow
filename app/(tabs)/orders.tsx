import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, RefreshControl } from 'react-native';
import { Search, Filter } from 'lucide-react-native';
import Header from '../../components/common/Header';
import OrderCard, { OrderData } from '../../components/orders/OrderCard';
import Button from '../../components/common/Button';
import { MOCK_ORDERS } from '../../data/mockData';

const filterOptions = ['All', 'Pending', 'In Transit', 'Delivered', 'Cancelled', 'Delayed'];

export default function OrdersScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<OrderData[]>([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // In a real app, this would fetch data from an API
    loadOrders();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [orders, searchQuery, activeFilter]);

  const loadOrders = () => {
    // Simulate API call
    setTimeout(() => {
      setOrders(MOCK_ORDERS);
    }, 500);
  };

  const applyFilters = () => {
    let filtered = [...orders];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        order =>
          order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.deliveryAddress.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (activeFilter !== 'All') {
      const statusFilter = activeFilter.toLowerCase().replace(' ', '-') as OrderData['status'];
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadOrders();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const renderFilterButtons = () => {
    return (
      <FlatList
        horizontal
        data={filterOptions}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.filterButton,
              activeFilter === item ? styles.activeFilterButton : null
            ]}
            onPress={() => setActiveFilter(item)}
          >
            <Text
              style={[
                styles.filterButtonText,
                activeFilter === item ? styles.activeFilterText : null
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterButtonsContainer}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Orders" />

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#94A3B8" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search orders..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#94A3B8"
          />
        </View>
        <Button
          title="Filter"
          variant="outline"
          size="small"
          leftIcon={<Filter size={16} color="#22C55E" />}
          onPress={() => {}}
          style={styles.filterButton}
        />
      </View>

      {renderFilterButtons()}

      <FlatList
        data={filteredOrders}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <OrderCard order={item} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No orders found</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 8,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#1E293B',
    fontSize: 14,
  },
  filterButtonsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  activeFilterButton: {
    backgroundColor: '#22C55E',
    borderColor: '#22C55E',
  },
  filterButtonText: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#94A3B8',
  },
});