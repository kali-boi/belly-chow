import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Card from '../common/Card';
import StatusBadge from '../common/StatusBadge';
import { TruckIcon, MapIcon, ClockIcon } from '../common/Icons';

export type RouteStatus = 'pending' | 'in-transit' | 'completed' | 'cancelled' | 'delayed';

export interface RouteData {
  id: string;
  routeNumber: string;
  driverName: string;
  vehicleInfo: string;
  startTime: string;
  estimatedEndTime: string;
  actualEndTime?: string;
  status: RouteStatus;
  stops: number;
  distance: string;
  orders: string[];
}

interface RouteCardProps {
  route: RouteData;
}

export default function RouteCard({ route }: RouteCardProps) {
  const router = useRouter();
  
  const handlePress = () => {
    router.push({
      pathname: '/route-details/[id]',
      params: { id: route.id }
    });
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <Card variant="elevated" style={styles.card}>
        <View style={styles.header}>
          <View>
            <Text style={styles.routeNumber}>Route #{route.routeNumber}</Text>
            <View style={styles.driverContainer}>
              <TruckIcon size={14} color="#64748B" />
              <Text style={styles.driverName}>{route.driverName}</Text>
            </View>
          </View>
          <StatusBadge status={route.status} />
        </View>
        
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Vehicle:</Text>
            <Text style={styles.infoValue}>{route.vehicleInfo}</Text>
          </View>
          
          <View style={styles.timeDistanceContainer}>
            <View style={styles.infoItem}>
              <ClockIcon size={14} color="#64748B" />
              <Text style={styles.timeText}>{route.startTime} - {route.estimatedEndTime}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <MapIcon size={14} color="#64748B" />
              <Text style={styles.distanceText}>{route.distance}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.stopsText}>{route.stops} Stops</Text>
          <Text style={styles.ordersText}>{route.orders.length} Orders</Text>
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
  routeNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  driverContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  driverName: {
    fontSize: 14,
    color: '#64748B',
  },
  infoContainer: {
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  infoLabel: {
    fontSize: 14,
    color: '#64748B',
    width: 60,
  },
  infoValue: {
    fontSize: 14,
    color: '#1E293B',
    flex: 1,
  },
  timeDistanceContainer: {
    marginTop: 8,
    gap: 6,
  },
  timeText: {
    fontSize: 14,
    color: '#1E293B',
  },
  distanceText: {
    fontSize: 14,
    color: '#1E293B',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 12,
  },
  stopsText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3B82F6',
  },
  ordersText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3B82F6',
  },
});