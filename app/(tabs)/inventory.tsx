import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, RefreshControl } from 'react-native';
import { Search, Filter, TriangleAlert as AlertTriangle } from 'lucide-react-native';
import Header from '../../components/common/Header';
import InventoryCard, { InventoryItem } from '../../components/inventory/InventoryCard';
import Button from '../../components/common/Button';
import { MOCK_INVENTORY_ITEMS } from '../../data/mockData';

const filterOptions = ['All', 'Fresh', 'Frozen', 'Dry', 'Beverages', 'Dairy'];

export default function InventoryScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [filteredInventory, setFilteredInventory] = useState<InventoryItem[]>([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [refreshing, setRefreshing] = useState(false);
  const [showOnlyAlerts, setShowOnlyAlerts] = useState(false);

  useEffect(() => {
    // In a real app, this would fetch data from an API
    loadInventory();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [inventory, searchQuery, activeFilter, showOnlyAlerts]);

  const loadInventory = () => {
    // Simulate API call
    setTimeout(() => {
      setInventory(MOCK_INVENTORY_ITEMS);
    }, 500);
  };

  const applyFilters = () => {
    let filtered = [...inventory];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        item =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.locationCode.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (activeFilter !== 'All') {
      filtered = filtered.filter(item => item.category === activeFilter);
    }

    // Filter by alerts
    if (showOnlyAlerts) {
      filtered = filtered.filter(item => item.needsAttention);
    }

    setFilteredInventory(filtered);
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadInventory();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const toggleAlertsFilter = () => {
    setShowOnlyAlerts(!showOnlyAlerts);
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
      <Header title="Inventory" />

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#94A3B8" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search inventory..."
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

      <View style={styles.filtersRow}>
        <View style={styles.filterButtonsWrapper}>
          {renderFilterButtons()}
        </View>
        
        <TouchableOpacity 
          style={[
            styles.alertButton,
            showOnlyAlerts ? styles.alertButtonActive : null
          ]}
          onPress={toggleAlertsFilter}
        >
          <AlertTriangle 
            size={16} 
            color={showOnlyAlerts ? '#FFFFFF' : '#F59E0B'} 
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredInventory}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <InventoryCard item={item} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No inventory items found</Text>
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
  filtersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 16,
  },
  filterButtonsWrapper: {
    flex: 1,
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
  alertButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  alertButtonActive: {
    backgroundColor: '#F59E0B',
    borderColor: '#F59E0B',
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