import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  ScrollView,
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import WalletScreen from './wallet.jsx';
import HistoryScreen from './history.jsx';
import SettingsScreen from './settings.jsx';
import MapScreen from './map.jsx';
import { supabase } from '../../lib/supabase'; // Import supabase for logout

const Dashboard = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  // 'showMessages' state and 'messages' data removed
  const [showProfile, setShowProfile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeScreen, setActiveScreen] = useState('Dashboard');

  const notifications = [
    { id: 1, text: 'New customer registration' },
    { id: 2, text: 'Transaction completed' },
    { id: 3, text: 'System update available' },
  ];

  // "Logout" button removed from menuItems
  const menuItems = [   
    { id: 1, name: 'Map', icon: 'place' },
    { id: 2, name: 'History', icon: 'history' },   
    { id: 3, name: 'Wallet', icon: 'account-balance-wallet' },
    { id: 4, name: 'Settings', icon: 'settings' },
  ];

  const handleMenuPress = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNotificationsPress = () => {
    if (showProfile) setShowProfile(false);
    setShowNotifications(!showNotifications);
  };

  // 'handleEmailPress' function removed

  const handleProfilePress = () => {
    if (showNotifications) setShowNotifications(false);
    setShowProfile(!showProfile);
  };

  const handleViewAllNotifications = () => {
    setShowNotifications(false);
    Alert.alert('View All', 'Navigating to all notifications');
  };

  // 'handleViewAllMessages' function removed

  // handleLogout logic is removed from handleMenuItemPress
  const handleMenuItemPress = (item) => {
    if (item.name === 'Wallet') {
      setActiveScreen('Wallet');
    } else if (item.name === 'History') {
      setActiveScreen('History');
    } else if (item.name === 'Settings') {
      setActiveScreen('Settings');
    } else if (item.name === 'Map') {
      setActiveScreen('Map');
    } else {
      Alert.alert(String(item.name), `Navigating to ${item.name}`);
      setActiveScreen('Dashboard');
    }
    setIsSidebarOpen(false);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case 'Dashboard':
        return (
          <>
            <View style={styles.header}>
              <View style={styles.headerSection}>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={handleMenuPress}
                >
                  <MaterialIcons name="menu" size={24} color="#2A3142" />
                </TouchableOpacity>
              </View>

              <View style={styles.headerMiddleEmpty} />

              <View style={styles.headerSection}>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={handleNotificationsPress}
                >
                  <MaterialIcons name="notifications" size={24} color="#2A3142" />
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>15</Text>
                  </View>
                </TouchableOpacity>

                {/* Email/Messages icon removed */}

                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={handleProfilePress}
                >
                  <MaterialIcons name="account-circle" size={24} color="#2A3142" />
                </TouchableOpacity>
              </View>
            </View>

            {isSidebarOpen && (
              <View style={styles.sidebarOverlay}>
                <View style={styles.sidebar}>
                  <View style={styles.sidebarHeader}>
                    <View style={styles.sidebarLogoContainer}>
                      <MaterialIcons name="directions-bus" size={24} color="#2A3142" />
                      <Text style={styles.sidebarLogo}>MobiKiosk</Text>
                    </View>
                    <TouchableOpacity onPress={handleCloseSidebar}>
                      <MaterialIcons name="close" size={24} color="#2A3142" />
                    </TouchableOpacity>
                  </View>

                  <ScrollView style={styles.sidebarMenu}>
                    {menuItems.map((item) => (
                      <TouchableOpacity
                        key={item.id}
                        style={styles.sidebarMenuItem}
                        onPress={() => handleMenuItemPress(item)}
                      >
                        <MaterialIcons name={item.icon} size={24} color="#555" />
                        <Text style={styles.sidebarMenuItemText}>{String(item.name)}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>

                <TouchableOpacity
                  style={styles.sidebarBackdrop}
                  onPress={handleCloseSidebar}
                  activeOpacity={1}
                />
              </View>
            )}

            {showNotifications && (
              <View style={[styles.dropdown, styles.notificationsDropdown]}>
                <Text style={styles.dropdownTitle}>Notifications</Text>
                <ScrollView style={styles.dropdownList}>
                  {notifications.map(notification => (
                    <TouchableOpacity
                      key={notification.id}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setShowNotifications(false);
                        Alert.alert('Notification', `You clicked: ${notification.text}`);
                      }}
                    >
                      <Text style={styles.dropdownItemText}>{notification.text}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <TouchableOpacity style={styles.viewAllButton} onPress={handleViewAllNotifications}>
                  <Text style={styles.viewAllText}>View all</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Messages dropdown removed */}

            {showProfile && (
              <View style={[styles.dropdown, styles.profileDropdown]}>
                <Text style={styles.dropdownTitle}>My Account</Text>
                <View style={styles.dropdownList}>
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => {
                      setShowProfile(false);
                      Alert.alert('Profile', 'Navigating to profile screen');
                    }}
                  >
                    <Text style={styles.dropdownItemText}>Profile</Text>
                  </TouchableOpacity>
                  {/* Logout button removed from here */}
                </View>
              </View>
            )}

            <Text style={styles.dashboardTitle}>Dashboard</Text>

            <View style={styles.cardsContainer}>
              <View style={[styles.card, styles.balanceCard]}>
                <View style={styles.cardHeader}>
                  <Text
                    style={styles.cardTitle}
                  >
                    Balance
                  </Text>
                  <MaterialIcons name="apps" size={24} color="#FFF" style={styles.cardIcon} />
                </View>
                <Text
                  style={styles.balanceAmount}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  ₱247
                </Text>
              </View>

              <View style={[styles.card, styles.transactionCard]}>
                <View style={styles.cardHeader}>
                  <Text
                    style={styles.cardTitle}
                  >
                    Total Transaction
                  </Text>
                  <MaterialIcons name="swap-horiz" size={24} color="#FFF" style={styles.cardIcon} />
                </View>
                <Text
                  style={styles.transactionValue}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  12
                </Text>
              </View>

              <View style={[styles.card, styles.valueCard]}>
                <View style={styles.cardHeader}>
                  <Text
                    style={styles.cardTitle}
                  >
                    Total Transaction Value
                  </Text>
                  <MaterialIcons name="trending-up" size={24} color="#FFF" style={styles.cardIcon} />
                </View>
                <Text
                  style={styles.valueAmount}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  ₱135
                </Text>
              </View>

              <View style={[styles.card, styles.todayCard]}>
                <View style={styles.cardHeader}>
                  <Text
                    style={styles.cardTitle}
                  >
                    This Week's Transaction
                  </Text>
                  <MaterialIcons name="calendar-today" size={24} color="#FFF" style={styles.cardIcon} />
                </View>
                <Text
                  style={styles.todayValue}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  3
                </Text>
              </View>
            </View>
          </>
        );
      case 'Wallet':
        return <WalletScreen onBackPress={() => setActiveScreen('Dashboard')} />;
      case 'History':
        return <HistoryScreen onBackPress={() => setActiveScreen('Dashboard')} />;
      case 'Settings':
        return <SettingsScreen onBackPress={() => setActiveScreen('Dashboard')} />;
      case 'Map':
        return <MapScreen onBackPress={() => setActiveScreen('Dashboard')} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      {renderScreen()}
    </SafeAreaView>
  );
};

// Stylesheet definition
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 27,
    bottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 5,
    borderBottomColor: '#E0E0E0',
    zIndex: 10,
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerMiddleEmpty: {
    flex: 1,
  },
  iconButton: {
    padding: 8,
    marginHorizontal: 5,
    top: 25,
  },
  badge: {
    position: 'absolute',
    top: 3,
    right: 5,
    backgroundColor: '#FF6347',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },

  // Sidebar Styles
  sidebarOverlay: {
    position: 'absolute',
    top: 35,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    zIndex: 20,
  },
  sidebar: {
    width: 250,
    backgroundColor: '#FFFFFF',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  sidebarBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sidebarHeader: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  sidebarLogoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sidebarLogo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#2A3142',
  },
  sidebarMenu: {
    paddingVertical: 10,
  },
  sidebarMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  sidebarMenuItemText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#555',
  },

  // Dropdown Styles
  dropdown: {
    position: 'absolute',
    top: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    width: 250,
    maxHeight: 300,
    zIndex: 15,
  },
  notificationsDropdown: {
    right: 50, // Adjusted position after removing messages
  },
  profileDropdown: {
    right: 5,
  },
  dropdownTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    color: '#2A3142',
  },
  dropdownList: {
    paddingVertical: 10,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#333',
  },
  viewAllButton: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
  },
  viewAllText: {
    color: '#2A3142',
    fontWeight: 'bold',
  },

  // Dashboard Content Styles
  dashboardTitle: {
    fontSize: 27,
    fontWeight: 'bold',
    padding: 20,
    bottom: 30,
    color: '#2A3142',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  card: {
    width: '45%',
    marginBottom: 20,
    borderRadius: 15,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    flexShrink: 1,
    flex: 1,
  },
  cardIcon: {
    marginLeft: 8,
  },

  balanceCard: {
    backgroundColor: '#4CAF50',
  },
  balanceAmount: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    flexShrink: 1,
    numberOfLines: 1,
    ellipsizeMode: 'tail',
    overflow: 'hidden',
  },
  transactionCard: {
    backgroundColor: '#2196F3',
  },
  transactionValue: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    flexShrink: 1,
    numberOfLines: 1,
    ellipsizeMode: 'tail',
    overflow: 'hidden',
  },
  valueCard: {
    backgroundColor: '#FF9800',
  },
  valueAmount: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    flexShrink: 1,
    numberOfLines: 1,
    ellipsizeMode: 'tail',
    overflow: 'hidden',
  },
  todayCard: {
    backgroundColor: '#9C27B0',
  },
  todayValue: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    flexShrink: 1,
    numberOfLines: 1,
    ellipsizeMode: 'tail',
    overflow: 'hidden',
  },
});

export default Dashboard;
