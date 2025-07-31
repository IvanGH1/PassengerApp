import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Assuming @expo/vector-icons is installed

const HistoryScreen = ({ onBackPress }) => {
  // Dummy data for ride history
  const [rideHistory, setRideHistory] = useState([
    { id: 1, date: '2025-07-24', time: '10:30 AM', origin: 'Market', destination: 'Home', fare: 25.00, status: 'Completed' },
    { id: 2, date: '2025-07-23', time: '04:15 PM', origin: 'Office', destination: 'Mall', fare: 35.50, status: 'Completed' },
    { id: 3, date: '2025-07-22', time: '08:00 AM', origin: 'School', destination: 'Library', fare: 18.00, status: 'Completed' },
    { id: 4, date: '2025-07-21', time: '06:45 PM', origin: 'Home', destination: 'Office', fare: 28.00, status: 'Completed' },
    { id: 5, date: '2025-07-20', time: '01:20 PM', origin: 'Mall', destination: 'Park', fare: 22.00, status: 'Completed' },
    { id: 6, date: '2025-07-19', time: '09:55 AM', origin: 'Park', destination: 'Home', fare: 20.00, status: 'Completed' },
    { id: 7, date: '2025-07-18', time: '11:00 AM', origin: 'Market', destination: 'School', fare: 27.00, status: 'Completed' },
    { id: 8, date: '2025-07-17', time: '03:30 PM', origin: 'Library', destination: 'Office', fare: 30.00, status: 'Completed' },
    { id: 9, date: '2025-07-16', time: '07:00 AM', origin: 'Home', destination: 'Market', fare: 25.00, status: 'Completed' },
    { id: 10, date: '2025-07-15', time: '05:00 PM', origin: 'Office', destination: 'Home', fare: 40.00, status: 'Completed' },
  ]);

  const handleRideDetails = (ride) => {
    Alert.alert(
      "Ride Details",
      `Date: ${ride.date}\nTime: ${ride.time}\nFrom: ${ride.origin}\nTo: ${ride.destination}\nFare: ₱${ride.fare.toFixed(2)}\nStatus: ${ride.status}`
    );
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#2A3142" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transport History</Text>
        <View style={{ width: 24 }} /> 
      </View>

      <ScrollView style={styles.scrollViewContent}>
        {rideHistory.length > 0 ? (
          <View style={styles.historyList}>
            {rideHistory.map((ride) => (
              <TouchableOpacity
                key={ride.id}
                style={styles.historyItem}
                onPress={() => handleRideDetails(ride)}
              >
                <View style={styles.itemLeft}>
                  <MaterialIcons name="directions-bus" size={24} color="#6200EE" />
                  <View style={styles.rideInfo}>
                    <Text style={styles.rideDescription}>{ride.origin} to {ride.destination}</Text>
                    <Text style={styles.rideDateTime}>{ride.date} at {ride.time}</Text>
                  </View>
                </View>
                <View style={styles.itemRight}>
                  <Text style={styles.rideFare}>₱{ride.fare.toFixed(2)}</Text>
                  <Text style={[
                    styles.rideStatus,
                    ride.status === 'Completed' ? styles.statusCompleted : styles.statusPending // Example status styling
                  ]}>
                    {ride.status}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <Text style={styles.noHistoryText}>No ride history available.</Text>
        )}
      </ScrollView>

      
      <Text style={styles.footerText}>
        Your ride history is securely stored.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2A3142',
  },
  scrollViewContent: {
    flex: 1,
  },
  historyList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 20,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  rideInfo: {
    marginLeft: 10,
    flexShrink: 1,
  },
  rideDescription: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    flexWrap: 'wrap',
  },
  rideDateTime: {
    fontSize: 12,
    color: '#777777',
    marginTop: 2,
  },
  itemRight: {
    alignItems: 'flex-end',
  },
  rideFare: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50', // Green for fare amounts
  },
  rideStatus: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 5,
  },
  statusCompleted: {
    color: '#2196F3', // Blue for completed status
  },
  statusPending: {
    color: '#FF9800', // Orange for pending status
  },
  noHistoryText: {
    textAlign: 'center',
    color: '#777777',
    paddingVertical: 20,
    fontSize: 16,
  },
  footerText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#999999',
    marginTop: 10,
  },
});

export default HistoryScreen;
