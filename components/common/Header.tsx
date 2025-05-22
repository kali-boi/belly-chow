import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, SafeAreaView, Platform } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  rightComponent?: React.ReactNode;
  variant?: 'primary' | 'transparent';
}

export default function Header({ 
  title, 
  showBackButton = false, 
  rightComponent, 
  variant = 'primary' 
}: HeaderProps) {
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.safeArea, styles[`${variant}SafeArea`]]}>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="#8B5CF6"
      />
      <View style={[styles.container, styles[`${variant}Container`]]}>
        <View style={styles.leftSection}>
          {showBackButton && (
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <ChevronLeft 
                size={24} 
                color={variant === 'primary' ? '#FFFFFF' : '#8B5CF6'} 
              />
            </TouchableOpacity>
          )}
        </View>
        
        <Text style={[styles.title, styles[`${variant}Title`]]}>{title}</Text>
        
        <View style={styles.rightSection}>
          {rightComponent || <View style={styles.placeholder} />}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    width: '100%',
  },
  primarySafeArea: {
    backgroundColor: '#8B5CF6',
  },
  transparentSafeArea: {
    backgroundColor: 'transparent',
  },
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    ...(Platform.OS === 'web' && {
      backdropFilter: 'blur(12px)',
    }),
  },
  primaryContainer: {
    backgroundColor: 'rgba(139, 92, 246, 0.95)',
  },
  transparentContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  leftSection: {
    width: 40,
    alignItems: 'flex-start',
  },
  rightSection: {
    width: 40,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  primaryTitle: {
    color: '#FFFFFF',
  },
  transparentTitle: {
    color: '#1E293B',
  },
  backButton: {
    padding: 4,
  },
  placeholder: {
    width: 24,
    height: 24,
  },
});