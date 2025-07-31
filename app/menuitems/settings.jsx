import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { supabase } from '../../lib/supabase'; // Import Supabase client

const SettingsScreen = ({ onBackPress }) => {

  const handleSettingPress = (settingName) => {
    Alert.alert('Setting', `Navigating to ${settingName} settings.`);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: async () => {
            const { error } = await supabase.auth.signOut();
            if (error) {
              Alert.alert('Logout Error', error.message);
            }
            // No need to navigate here, the root layout will handle it.
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const handleFeedbackPress = () => {
    Alert.alert('Feedback', 'Opening feedback form/modal.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.header}>
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#2A3142" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.headerRight} /> 
      </View>

      <ScrollView style={styles.settingsList}>

        <TouchableOpacity style={styles.settingItem} onPress={() => handleSettingPress('Privacy')}>
          <MaterialIcons name="security" size={24} color="#555" />
          <Text style={styles.settingItemText}>Privacy</Text>
          <MaterialIcons name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={handleFeedbackPress}>
          <MaterialIcons name="feedback" size={24} color="#555" />
          <Text style={styles.settingItemText}>Feedback</Text>
          <MaterialIcons name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={() => handleSettingPress('Help & Support')}>
          <MaterialIcons name="help-outline" size={24} color="#555" />
          <Text style={styles.settingItemText}>Help & Support</Text>
          <MaterialIcons name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={handleLogout}>
          <MaterialIcons name="logout" size={24} color="#FF6347" />
          <Text style={[styles.settingItemText, styles.logoutText]}>Logout</Text>
          <MaterialIcons name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 17,
    top: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2A3142',
  },
  headerRight: {
    width: 24, // To balance the back button on the left
  },
  settingsList: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 40,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
  },
  settingItemText: {
    flex: 1, // Allows text to take up remaining space
    fontSize: 16,
    color: '#2A3142',
    marginLeft: 15,
  },
  logoutText: {
    color: '#FF6347',
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
