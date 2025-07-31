import { useEffect, useState } from 'react';
import { Slot, useRouter, useSegments } from 'expo-router';
import { supabase } from '../lib/supabase'; // Make sure this path is correct
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function RootLayout() {
  const [session, setSession] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    // This effect runs once to set up the session listener.
    // It checks for an existing session and then listens for any changes.
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setInitializing(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    // This effect handles redirection based on the session status.
    // It runs whenever the session, initialization state, or route changes.
    if (initializing) return; // Don't redirect until we know the session status.

    // A segment is a part of the URL path. `segments[0]` is the top-level directory.
    // For example, for '/menuitems/dashboard', segments[0] is 'menuitems'.
    // For the index page '/', segments is an empty array.
    const inProtectedRoute = segments[0] === 'menuitems';

    if (session && !inProtectedRoute) {
      // If the user is logged in (`session` exists) AND they are NOT in a protected route,
      // it means they are on a public page like the index, login, or signup screen.
      // We should redirect them to the main dashboard.
      router.replace('/menuitems/dashboard');
    } else if (!session && inProtectedRoute) {
      // If the user is NOT logged in (`session` is null) AND they are trying to access a protected route,
      // we should redirect them to the public welcome screen (index.jsx).
      router.replace('/');
    }
  }, [session, initializing, segments]);

  // While we are checking for a session, show a loading spinner.
  if (initializing) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // If initialization is complete, render the current screen.
  return <Slot />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
