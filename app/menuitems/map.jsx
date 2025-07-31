import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Alert } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location'; // Import expo-location

// Define map styles outside the component to prevent re-creation on re-renders
const dayMapStyle = [
  { featureType: 'administrative', elementType: 'geometry.fill', stylers: [{ color: '#d6e2e6' }] },
  { featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{ color: '#cfd4d5' }] },
  { featureType: 'administrative', elementType: 'labels.text.fill', stylers: [{ color: '#7492a8' }] },
  { featureType: 'road.highway', elementType: 'all', stylers: [{ lightness: 20 }] },
  { featureType: 'road.arterial', elementType: 'geometry.fill', stylers: [{ color: '#ffffff' }] },
  { featureType: 'road.arterial', elementType: 'geometry.stroke', stylers: [{ color: '#d6d6d6' }] },
  { featureType: 'road.local', elementType: 'geometry.fill', stylers: [{ color: '#fbfbfb' }] },
  { featureType: 'road.local', elementType: 'geometry.stroke', stylers: [{ color: '#d6d6d6' }] },
  { featureType: 'transit', elementType: 'all', stylers: [{ color: '#6d868e' }] },
  { featureType: 'water', elementType: 'all', stylers: [{ color: '#9fc5e8' }] },
];

const darkMapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#38414e' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#212a37' }] },
  { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#9ca5b3' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#746855' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#17263c' }] },
];

const { width, height } = Dimensions.get('window');

// Main MapScreen component
const MapScreen = ({ onBackPress }) => {
  // State for day/night map style
  const [isDaytime, setIsDaytime] = useState(true);
  // State to store the current live location
  const [currentLiveLocation, setCurrentLiveLocation] = useState(null);
  const mapRef = useRef(null);

  // Effect to check daylight and set map style
  useEffect(() => {
    const checkDaylight = () => {
      const currentHour = new Date().getHours();
      setIsDaytime(currentHour >= 6 && currentHour < 18);
    };

    checkDaylight(); // Initial check
    const intervalId = setInterval(checkDaylight, 60000); // Update every minute

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  // Effect to get and watch live location
  useEffect(() => {
    const getLocation = async () => {
      // Request foreground location permissions
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Permission to access location was denied. Please enable it in your device settings.');
        return;
      }

      // Watch position for continuous updates
      const locationWatcher = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000, // Update every 1 second
          distanceInterval: 1, // Update every 1 meter movement
        },
        (location) => {
          setCurrentLiveLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005, // Smaller delta for more detailed view
            longitudeDelta: 0.005,
          });
          // Animate map to current location if it's the first update or significant change
          if (mapRef.current && currentLiveLocation === null) {
            mapRef.current.animateToRegion({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }, 1000);
          }
        }
      );

      // Clean up the watcher when the component unmounts
      return () => {
        if (locationWatcher) {
          locationWatcher.remove();
        }
      };
    };

    getLocation();
  }, []); // Run once on component mount

  return (
    <View style={styles.container}>
      {/* MapView component with Google Maps provider and custom styles */}
      {currentLiveLocation ? (
        <MapView
          ref={mapRef} // Reference to the map component
          provider={PROVIDER_GOOGLE} // Use Google Maps
          style={styles.map} // Apply map styles
          initialRegion={currentLiveLocation} // Set initial region to live location
          region={currentLiveLocation} // Keep map centered on live location
          customMapStyle={isDaytime ? dayMapStyle : darkMapStyle} // Apply day or night map style
          showsUserLocation={true} // Show user's current location
          showsCompass={true} // Enable compass
          zoomControlEnabled={true} // Enable zoom controls (Android only)
          rotateEnabled={true} // Enable rotate gestures
          scrollEnabled={true} // Enable scroll gestures
          zoomEnabled={true} // Enable zoom gestures
        >
          {/* Marker for the current live location */}
          <Marker coordinate={currentLiveLocation}>
            <View style={styles.markerContainer}>
              <View style={[styles.marker, { backgroundColor: '#3498db' }]}>
                <Ionicons name="navigate" size={20} color="#fff" />
              </View>
            </View>
          </Marker>
        </MapView>
      ) : (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Getting GPS location...</Text>
        </View>
      )}

      {/* Back button to return to the dashboard, positioned at the top left */}
      {onBackPress && (
        <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      )}

      {/* Time Indicator (Day/Night mode toggle), positioned at the top right */}
      <TouchableOpacity
        style={styles.timeIndicator}
        onPress={() => setIsDaytime(!isDaytime)} // Toggle day/night mode
      >
        <Ionicons
          name={isDaytime ? 'sunny-outline' : 'moon-outline'}
          size={18}
          color="#fff"
        />
        <Text style={styles.timeIndicatorText}>
          {isDaytime ? 'Day mode' : 'Night mode'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles for the MapScreen component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    fontFamily: 'Inter',
  },
  map: {
    width: width,
    height: height,
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    width: 40, // Slightly larger marker for visibility
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3498db', // Blue for current location
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    zIndex: 1,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  timeIndicator: {
    position: 'absolute',
    top: 40,
    right: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    zIndex: 1,
  },
  timeIndicatorText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    fontSize: 18,
    color: '#333',
  },
});

export default MapScreen;
