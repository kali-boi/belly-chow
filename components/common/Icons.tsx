import React from 'react';
import { Truck, Box, ClipboardList, Map, User, ShoppingBag, ChartBar as BarChart, ThermometerSnowflake, Calendar, Clock, SquareCheck as CheckSquare, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle } from 'lucide-react-native';

interface IconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export const TruckIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <Truck size={size} color={color} strokeWidth={strokeWidth} />
);

export const BoxIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <Box size={size} color={color} strokeWidth={strokeWidth} />
);

export const ClipboardListIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <ClipboardList size={size} color={color} strokeWidth={strokeWidth} />
);

export const MapIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <Map size={size} color={color} strokeWidth={strokeWidth} />
);

export const UserIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <User size={size} color={color} strokeWidth={strokeWidth} />
);

export const ShoppingBagIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <ShoppingBag size={size} color={color} strokeWidth={strokeWidth} />
);

export const BarChartIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <BarChart size={size} color={color} strokeWidth={strokeWidth} />
);

export const ThermometerIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <ThermometerSnowflake size={size} color={color} strokeWidth={strokeWidth} />
);

export const CalendarIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <Calendar size={size} color={color} strokeWidth={strokeWidth} />
);

export const ClockIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <Clock size={size} color={color} strokeWidth={strokeWidth} />
);

export const CheckSquareIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <CheckSquare size={size} color={color} strokeWidth={strokeWidth} />
);

export const AlertTriangleIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <AlertTriangle size={size} color={color} strokeWidth={strokeWidth} />
);

export const CheckCircleIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <CheckCircle size={size} color={color} strokeWidth={strokeWidth} />
);