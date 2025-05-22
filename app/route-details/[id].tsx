import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';
import { MapPin, Truck, User, Phone, Clock, Flag, Navigation, CircleCheck as CheckCircle } from 'lucide-react-native';
import Header from '../../components/common/Header';
import Card from '../../components/common/Card';
import StatusBadge from '../../components/common/StatusBadge';
import Button from '../../components/common/Button';
import { RouteData } from '../../components/routes/RouteCard';
import { MOCK_ROUTES, MOCK_ORDERS } from '../../data/mockData';

export default function RouteDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [route, setRoute] = useState<RouteData | null>(null);
  const [routeOrders, setRouteOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      // In a real app, fetch the route details from an API
      // Simulating API call with timeout
      setTimeout(() => {
        const foundRoute = MOCK_ROUTES.find(r => r.id === id) || null;
        setRoute(foundRoute);
        
        if (foundRoute) {
          // Get order details for this route
          const orders = MOCK_ORDERS.filter(order => 
            foundRoute.orders.includes(order.id)
          );
          setRouteOrders(orders);
        }
        
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

  if (!route) {
    return (
      <View style={styles.container}>
        <Header title="Route Details" showBackButton />
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>Route not found</Text>
        </View>
      </View>
    );
  }

  const handleOrderPress = (orderId: string) => {
    router.push({
      pathname: '/order-details/[id]',
      params: { id: orderId }
    });
  };

  return (
    <View style={styles.container}>
      <Header title="Route Details" showBackButton />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.routeHeader}>
          <View>
            <Text style={styles.routeNumber}>Route #{route.routeNumber}</Text>
            <Text style={styles.date}>January 15, 2025</Text>
          </View>
          <StatusBadge status={route.status} size="large" />
        </View>
        
        <Card variant="default" style={styles.mapCard}>
          <View style={styles.mapPlaceholder}>
            <MapPin size={24} color="#64748B" />
            <Text style={styles.mapPlaceholderText}>Route Map View</Text>
          </View>
        </Card>
        
        <Card variant="default" style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>Route Information</Text>
          
          <View style={styles.infoItem}>
            <Truck size={18} color="#64748B" style={styles.infoIcon} />
            <View>
              <Text style={styles.infoLabel}>Vehicle</Text>
              <Text style={styles.infoValue}>{route.vehicleInfo}</Text>
            </View>
          </View>
          
          <View style={styles.infoItem}>
            <User size={18} color="#64748B" style={styles.infoIcon} />
            <View>
              <Text style={styles.infoLabel}>Driver</Text>
              <Text style={styles.infoValue}>{route.driverName}</Text>
            </View>
          </View>
          
          <View style={styles.infoItem}>
            <Phone size={18} color="#64748B" style={styles.infoIcon} />
            <View>
              <Text style={styles.infoLabel}>Contact</Text>
              <Text style={styles.infoValue}>(312) 555-8765</Text>
            </View>
          </View>
          
          <View style={styles.timeDistanceInfo}>
            <View style={styles.timeDistanceItem}>
              <Clock size={16} color="#64748B" />
              <Text style={styles.timeDistanceText}>
                {route.startTime} - {route.estimatedEndTime}
              </Text>
            </View>
            
            <View style={styles.timeDistanceItem}>
              <Flag size={16} color="#64748B" />
              <Text style={styles.timeDistanceText}>
                {route.distance} • {route.stops} stops
              </Text>
            </View>
          </View>
        </Card>
        
        <Text style={styles.stopsTitle}>Delivery Stops ({routeOrders.length})</Text>
        
        {routeOrders.map((order, index) => (
          <TouchableOpacity 
            key={order.id} 
            onPress={() => handleOrderPress(order.id)}
            activeOpacity={0.7}
          >
            <Card variant="default" style={styles.stopCard}>
              <View style={styles.stopHeader}>
                <View style={styles.stopNumberContainer}>
                  <Text style={styles.stopNumber}>{index + 1}</Text>
                </View>
                <View style={styles.stopInfo}>
                  <Text style={styles.customerName}>{order.customerName}</Text>
                  <Text style={styles.orderNumber}>Order #{order.orderNumber}</Text>
                </View>
                <StatusBadge status={order.status} size="small" />
              </View>
              
              <View style={styles.stopAddress}>
                <MapPin size={16} color="#64748B" />
                <Text style={styles.addressText}>{order.deliveryAddress}</Text>
              </View>
              
              <View style={styles.stopTimeItems}>
                <View style={styles.stopTime}>
                  <Clock size={14} color="#64748B" />
                  <Text style={styles.timeText}>{order.deliveryTime}</Text>
                </View>
                <Text style={styles.itemsText}>{order.items.length} items</Text>
              </View>
              
              {index === 0 && route.status === 'in-transit' && (
                <View style={styles.currentStop}>
                  <Navigation size={16} color="#FFFFFF" />
                  <Text style={styles.currentStopText}>Current Stop</Text>
                </View>
              )}
              
              {order.status === 'delivered' && (
                <View style={styles.completedBadge}>
                  <CheckCircle size={16} color="#FFFFFF" />
                  <Text style={styles.completedText}>Completed</Text>
                </View>
              )}
            </Card>
          </TouchableOpacity>
        ))}
        
        <View style={styles.buttonContainer}>
          <Button 
            title="Track Driver" 
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
  routeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  routeNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: '#64748B',
  },
  mapCard: {
    marginBottom: 16,
    padding: 0,
    overflow: 'hidden',
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapPlaceholderText: {
    marginTop: 8,
    fontSize: 14,
    color: '#64748B',
  },
  detailsCard: {
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
  timeDistanceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  timeDistanceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timeDistanceText: {
    fontSize: 14,
    color: '#64748B',
  },
  stopsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  stopCard: {
    marginBottom: 12,
    position: 'relative',
  },
  stopHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stopNumberContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stopNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  stopInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1E293B',
  },
  orderNumber: {
    fontSize: 12,
    color: '#64748B',
  },
  stopAddress: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 12,
  },
  addressText: {
    fontSize: 14,
    color: '#334155',
    flex: 1,
  },
  stopTimeItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stopTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timeText: {
    fontSize: 13,
    color: '#64748B',
  },
  itemsText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#3B82F6',
  },
  currentStop: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#3B82F6',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    gap: 6,
  },
  currentStopText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  completedBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#22C55E',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    gap: 6,
  },
  completedText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  buttonContainer: {
    marginTop: 12,
  },
  button: {
    width: '100%',
  },
});