import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { User as UserIcon, Bell, CircleHelp as HelpCircle, Settings, LogOut, ChevronRight, Moon, Globe } from 'lucide-react-native';
import Header from '../../components/common/Header';
import Card from '../../components/common/Card';

export default function ProfileScreen() {
  // We'd normally get this from authentication state
  const user = {
    name: 'John Smith',
    role: 'Warehouse Manager',
    email: 'john.smith@example.com',
    company: 'FreshFoods Logistics',
    locationName: 'Chicago Warehouse'
  };
  
  const menuItems = [
    {
      id: 'notifications',
      title: 'Notifications',
      icon: <Bell size={22} color="#64748B" />,
      hasNotification: true,
    },
    {
      id: 'appearance',
      title: 'Appearance',
      icon: <Moon size={22} color="#64748B" />,
    },
    {
      id: 'language',
      title: 'Language',
      icon: <Globe size={22} color="#64748B" />,
      info: 'English',
    },
    {
      id: 'help',
      title: 'Help & Support',
      icon: <HelpCircle size={22} color="#64748B" />,
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: <Settings size={22} color="#64748B" />,
    },
  ];
  
  const handleMenuItemPress = (id: string) => {
    // In a real app, navigate to the corresponding screen
    console.log(`Pressed ${id}`);
  };
  
  const handleLogout = () => {
    // In a real app, handle logout logic
    console.log('Logout pressed');
  };
  
  return (
    <View style={styles.container}>
      <Header title="Profile" />
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <UserIcon size={40} color="#94A3B8" />
            </View>
          </View>
          
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userRole}>{user.role}</Text>
          <Text style={styles.userInfo}>{user.company}</Text>
          <Text style={styles.userInfo}>{user.locationName}</Text>
        </View>
        
        <Card variant="default" style={styles.menuCard}>
          {menuItems.map((item, index) => (
            <React.Fragment key={item.id}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => handleMenuItemPress(item.id)}
              >
                <View style={styles.menuItemLeft}>
                  {item.icon}
                  <Text style={styles.menuItemTitle}>{item.title}</Text>
                </View>
                
                <View style={styles.menuItemRight}>
                  {item.info && <Text style={styles.menuItemInfo}>{item.info}</Text>}
                  {item.hasNotification && <View style={styles.notificationDot} />}
                  <ChevronRight size={18} color="#94A3B8" />
                </View>
              </TouchableOpacity>
              
              {index < menuItems.length - 1 && <View style={styles.menuDivider} />}
            </React.Fragment>
          ))}
        </Card>
        
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
        
        <Text style={styles.versionText}>Version 1.0.0</Text>
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
  profileSection: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 8,
  },
  userInfo: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 2,
  },
  menuCard: {
    marginHorizontal: 16,
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  menuItemTitle: {
    fontSize: 16,
    color: '#334155',
  },
  menuItemInfo: {
    fontSize: 14,
    color: '#94A3B8',
  },
  notificationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginHorizontal: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FEE2E2',
    borderRadius: 8,
    marginBottom: 16,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#EF4444',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 24,
  },
});