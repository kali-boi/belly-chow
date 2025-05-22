import { OrderData } from '../components/orders/OrderCard';
import { InventoryItem } from '../components/inventory/InventoryCard';
import { RouteData } from '../components/routes/RouteCard';

export const MOCK_ORDERS: OrderData[] = [
  {
    id: '1',
    orderNumber: 'ORD-2025-001',
    customerName: 'City Fresh Market',
    deliveryAddress: '123 Market St, Chicago, IL 60601',
    deliveryDate: '01/15/2025',
    deliveryTime: '08:00 - 10:00',
    status: 'pending',
    items: [
      { id: '101', name: 'Organic Apples', quantity: 25 },
      { id: '102', name: 'Fresh Milk', quantity: 50, temperature: '2-4°C' },
      { id: '103', name: 'Artisan Bread', quantity: 30 }
    ]
  },
  {
    id: '2',
    orderNumber: 'ORD-2025-002',
    customerName: 'Gourmet Bistro',
    deliveryAddress: '456 Culinary Ave, Chicago, IL 60607',
    deliveryDate: '01/15/2025',
    deliveryTime: '10:30 - 12:30',
    status: 'in-transit',
    items: [
      { id: '201', name: 'Premium Beef Cuts', quantity: 15, temperature: '-18°C' },
      { id: '202', name: 'Imported Cheese', quantity: 10, temperature: '2-4°C' },
      { id: '203', name: 'Organic Vegetables', quantity: 20 }
    ]
  },
  {
    id: '3',
    orderNumber: 'ORD-2025-003',
    customerName: 'Healthy Eats Café',
    deliveryAddress: '789 Wellness Blvd, Chicago, IL 60614',
    deliveryDate: '01/15/2025',
    deliveryTime: '13:00 - 15:00',
    status: 'delivered',
    items: [
      { id: '301', name: 'Greek Yogurt', quantity: 40, temperature: '2-4°C' },
      { id: '302', name: 'Organic Granola', quantity: 25 },
      { id: '303', name: 'Fresh Berries', quantity: 30, temperature: '2-4°C' }
    ]
  },
  {
    id: '4',
    orderNumber: 'ORD-2025-004',
    customerName: 'School District #42',
    deliveryAddress: '101 Education Dr, Chicago, IL 60618',
    deliveryDate: '01/16/2025',
    deliveryTime: '06:00 - 08:00',
    status: 'pending',
    items: [
      { id: '401', name: 'Whole Grain Bread', quantity: 100 },
      { id: '402', name: 'Fresh Fruit Cups', quantity: 500 },
      { id: '403', name: 'Milk Cartons', quantity: 500, temperature: '2-4°C' }
    ]
  },
  {
    id: '5',
    orderNumber: 'ORD-2025-005',
    customerName: 'Harbor Hotel',
    deliveryAddress: '555 Lakeview Dr, Chicago, IL 60611',
    deliveryDate: '01/15/2025',
    deliveryTime: '15:30 - 17:30',
    status: 'delayed',
    items: [
      { id: '501', name: 'Premium Seafood', quantity: 20, temperature: '-18°C' },
      { id: '502', name: 'Fine Wines', quantity: 30 },
      { id: '503', name: 'Gourmet Chocolates', quantity: 50 }
    ]
  },
  {
    id: '6',
    orderNumber: 'ORD-2025-006',
    customerName: 'Quick Stop Convenience',
    deliveryAddress: '222 Corner St, Chicago, IL 60622',
    deliveryDate: '01/15/2025',
    deliveryTime: '18:00 - 20:00',
    status: 'cancelled',
    items: [
      { id: '601', name: 'Bottled Water', quantity: 100 },
      { id: '602', name: 'Snack Items', quantity: 150 },
      { id: '603', name: 'Prepared Sandwiches', quantity: 50, temperature: '2-4°C' }
    ]
  }
];

export const MOCK_INVENTORY_ITEMS: InventoryItem[] = [
  {
    id: '1',
    name: 'Organic Apples',
    sku: 'PROD-F001',
    category: 'Fresh',
    quantity: 1250,
    unit: 'kg',
    locationCode: 'A-12-03',
    needsAttention: false
  },
  {
    id: '2',
    name: 'Fresh Milk',
    sku: 'PROD-D001',
    category: 'Dairy',
    quantity: 500,
    unit: 'liters',
    temperature: 3.5,
    temperatureRange: { min: 2, max: 4 },
    expiryDate: '02/01/2025',
    locationCode: 'C-05-02',
    needsAttention: false
  },
  {
    id: '3',
    name: 'Premium Beef Cuts',
    sku: 'PROD-M001',
    category: 'Frozen',
    quantity: 350,
    unit: 'kg',
    temperature: -15.2,
    temperatureRange: { min: -20, max: -18 },
    expiryDate: '06/15/2025',
    locationCode: 'F-02-01',
    needsAttention: true
  },
  {
    id: '4',
    name: 'Artisan Bread',
    sku: 'PROD-B001',
    category: 'Bakery',
    quantity: 120,
    unit: 'units',
    expiryDate: '01/17/2025',
    locationCode: 'B-03-04',
    needsAttention: false
  },
  {
    id: '5',
    name: 'Imported Cheese',
    sku: 'PROD-D002',
    category: 'Dairy',
    quantity: 85,
    unit: 'kg',
    temperature: 5.8,
    temperatureRange: { min: 2, max: 4 },
    expiryDate: '03/10/2025',
    locationCode: 'C-06-03',
    needsAttention: true
  },
  {
    id: '6',
    name: 'Organic Vegetables',
    sku: 'PROD-F002',
    category: 'Fresh',
    quantity: 430,
    unit: 'kg',
    temperature: 7.2,
    temperatureRange: { min: 4, max: 8 },
    locationCode: 'A-08-02',
    needsAttention: false
  },
  {
    id: '7',
    name: 'Frozen Seafood',
    sku: 'PROD-S001',
    category: 'Frozen',
    quantity: 210,
    unit: 'kg',
    temperature: -19.5,
    temperatureRange: { min: -22, max: -18 },
    expiryDate: '08/20/2025',
    locationCode: 'F-04-01',
    needsAttention: false
  },
  {
    id: '8',
    name: 'Craft Beer',
    sku: 'PROD-B001',
    category: 'Beverages',
    quantity: 310,
    unit: 'bottles',
    locationCode: 'D-09-05',
    needsAttention: false
  },
  {
    id: '9',
    name: 'Gluten-Free Pasta',
    sku: 'PROD-P001',
    category: 'Dry',
    quantity: 520,
    unit: 'packages',
    expiryDate: '12/31/2025',
    locationCode: 'E-11-03',
    needsAttention: false
  },
  {
    id: '10',
    name: 'Ice Cream',
    sku: 'PROD-D003',
    category: 'Frozen',
    quantity: 150,
    unit: 'liters',
    temperature: -14.2,
    temperatureRange: { min: -23, max: -18 },
    expiryDate: '04/15/2025',
    locationCode: 'F-01-04',
    needsAttention: true
  }
];

export const MOCK_ROUTES: RouteData[] = [
  {
    id: '1',
    routeNumber: 'RT101',
    driverName: 'Michael Johnson',
    vehicleInfo: 'Refrigerated Truck #T-15',
    startTime: '08:00 AM',
    estimatedEndTime: '12:30 PM',
    status: 'in-transit',
    stops: 4,
    distance: '45 miles',
    orders: ['1', '2', '3', '4']
  },
  {
    id: '2',
    routeNumber: 'RT102',
    driverName: 'Sarah Williams',
    vehicleInfo: 'Delivery Van #V-08',
    startTime: '09:15 AM',
    estimatedEndTime: '02:00 PM',
    status: 'pending',
    stops: 6,
    distance: '38 miles',
    orders: ['5', '6']
  },
  {
    id: '3',
    routeNumber: 'RT103',
    driverName: 'Robert Chen',
    vehicleInfo: 'Refrigerated Truck #T-22',
    startTime: '07:30 AM',
    estimatedEndTime: '11:45 AM',
    status: 'completed',
    actualEndTime: '11:30 AM',
    stops: 5,
    distance: '32 miles',
    orders: ['1', '2', '3']
  },
  {
    id: '4',
    routeNumber: 'RT104',
    driverName: 'Amanda Garcia',
    vehicleInfo: 'Box Truck #B-05',
    startTime: '10:00 AM',
    estimatedEndTime: '03:30 PM',
    status: 'delayed',
    stops: 8,
    distance: '52 miles',
    orders: ['4', '5', '6']
  },
  {
    id: '5',
    routeNumber: 'RT105',
    driverName: 'David Thompson',
    vehicleInfo: 'Refrigerated Truck #T-17',
    startTime: '06:45 AM',
    estimatedEndTime: '11:15 AM',
    status: 'pending',
    stops: 3,
    distance: '28 miles',
    orders: ['1', '2']
  },
  {
    id: '6',
    routeNumber: 'RT106',
    driverName: 'Sophia Martinez',
    vehicleInfo: 'Box Truck #B-09',
    startTime: '08:30 AM',
    estimatedEndTime: '01:00 PM',
    status: 'cancelled',
    stops: 4,
    distance: '36 miles',
    orders: ['3', '4']
  }
];