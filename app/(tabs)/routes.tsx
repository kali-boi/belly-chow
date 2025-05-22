import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, RefreshControl } from 'react-native';
import { Search, Calendar } from 'lucide-react-native';
import Header from '../../components/common/Header';
import RouteCard, { RouteData } from '../../components/routes/RouteCard';
import { MOCK_ROUTES } from '../../data/mockData';

const filterOptions = ['All', 'Today', 'Tomorrow', 'This Week'];

export default function RoutesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [routes, setRoutes] = useState<RouteData[]>([]);
  const [filteredRoutes, setFilteredRoutes] = useState<RouteData[]>([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // In a real app, this would fetch data from an API
    loadRoutes();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [routes, searchQuery, activeFilter]);

  const loadRoutes = () => {
    // Simulate API call
    setTimeout(() => {
      setRoutes(MOCK_ROUTES);
    }, 500);
  };

  const applyFilters = () => {
    let filtered = [...routes];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        route =>
          route.routeNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          route.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          route.vehicleInfo.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // In a real app, you would filter by dates
    // This is a simplified version for demo purposes
    setFilteredRoutes(filtered);
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadRoutes();
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

  const renderCalendarButton = () => {
    return (
      <TouchableOpacity style={styles.calendarButton}>
        <Calendar size={20} color="#64748B" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Routes" />

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#94A3B8" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search routes..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#94A3B8"
          />
        </View>
        {renderCalendarButton()}
      </View>

      {renderFilterButtons()}

      <FlatList
        data={filteredRoutes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <RouteCard route={item} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No routes found</Text>
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
  calendarButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
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