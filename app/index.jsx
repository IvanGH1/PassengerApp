import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Link } from 'expo-router';

// Get screen dimensions for responsive styling
const { width, height } = Dimensions.get('window');

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Top Section - Teal Background */}
      <View style={styles.topSection}>
        {/* MobiKiosk Title */}
        <Text style={styles.title}>MobiKiosk</Text>

        {/* Background shapes mimicking hills/palms */}
        <View style={styles.backgroundShapesContainer}>
          <View style={styles.hillShapeLeft} />
          <View style={styles.hillShapeRight} />
          <View style={styles.palmTreeLeft} />
          <View style={styles.palmTreeRight} />
        </View>
      </View>

      {/* Bottom Section - White Background with Buttons */}
      <View style={styles.bottomSection}>
        {/* Log In Button */}
        <Link href="/login" asChild>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>
        </Link>

        {/* Sign Up Button */}
        <Link href="/signup" asChild>
          <TouchableOpacity style={styles.signupButton}>
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Takes up the entire screen
    backgroundColor: '#fff', // Default background
  },
  topSection: {
    flex: 0.7, // Takes 70% of the screen height
    backgroundColor: '#00796B', // Changed from red to Dark Teal
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // Needed for absolute positioning of background shapes
    overflow: 'hidden', // Hide overflow from background shapes
  },
  title: {
    fontSize: width * 0.1, // Responsive font size
    fontWeight: 'bold',
    color: '#fff',
    marginTop: height * 0.05, // Adjust margin from top
    marginBottom: height * 0.02,
    // Added text shadow for "edges" effect
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // Black shadow with some transparency
    textShadowOffset: { width: 2, height: 2 }, // Offset for the shadow
    textShadowRadius: 5, // Blur radius for the shadow
  },
  motorcycleImage: {
    width: width * 0.8, // Responsive width
    height: height * 0.25, // Responsive height
    resizeMode: 'contain', // Ensure the image fits within bounds
    position: 'absolute',
    bottom: height * 0.1, // Position above the white section
    zIndex: 1, // Ensure image is above background shapes
  },
  backgroundShapesContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '40%', // Height of the background shapes area
    overflow: 'hidden',
  },
  hillShapeLeft: {
    position: 'absolute',
    bottom: 0,
    left: -width * 0.1,
    width: width * 0.7,
    height: height * 0.2,
    backgroundColor: '#4DB6AC', // Changed from lighter red to Medium Teal
    borderTopLeftRadius: width * 0.5,
    borderTopRightRadius: width * 0.5,
    transform: [{ scaleX: 1.5 }], // Stretch horizontally
    opacity: 0.8,
  },
  hillShapeRight: {
    position: 'absolute',
    bottom: 0,
    right: -width * 0.1,
    width: width * 0.6,
    height: height * 0.15,
    backgroundColor: '#4DB6AC', // Changed from lighter red to Medium Teal
    borderTopLeftRadius: width * 0.4,
    borderTopRightRadius: width * 0.4,
    transform: [{ scaleX: 1.2 }],
    opacity: 0.7,
  },
  palmTreeLeft: {
    position: 'absolute',
    bottom: height * 0.05,
    left: width * 0.05,
    width: 0,
    height: 0,
    borderLeftWidth: width * 0.05,
    borderRightWidth: width * 0.05,
    borderBottomWidth: height * 0.15,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#4DB6AC', // Changed from lighter red to Medium Teal
    transform: [{ rotate: '-15deg' }],
    opacity: 0.9,
  },
  palmTreeRight: {
    position: 'absolute',
    bottom: height * 0.03,
    right: width * 0.1,
    width: 0,
    height: 0,
    borderLeftWidth: width * 0.04,
    borderRightWidth: width * 0.04,
    borderBottomWidth: height * 0.12,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#4DB6AC', // Changed from lighter red to Medium Teal
    transform: [{ rotate: '10deg' }],
    opacity: 0.8,
  },
  bottomSection: {
    flex: 0.3, // Takes 30% of the screen height
    backgroundColor: '#fff',
    justifyContent: 'flex-start', // Align items to the top of this section
    alignItems: 'center',
    paddingTop: height * 0.05, // Add some padding at the top
  },
  loginButton: {
    backgroundColor: '#333', // Dark gray for the button
    width: '80%',
    paddingVertical: 15,
    borderRadius: 30, // Rounded corners
    alignItems: 'center',
    marginBottom: 15, // Space between buttons
    shadowColor: '#000', // Add shadow for depth
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8, // For Android shadow
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupButton: {
    backgroundColor: '#eee', // Light gray for the button
    width: '80%',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 1, // Add a border
    borderColor: '#ccc', // Light gray border
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  signupButtonText: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
