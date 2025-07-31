// lib/supabase.js
import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://afoagvcgzzwamfxjzlbt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmb2FndmNnenp3YW1meGp6bGJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5NjE5NTMsImV4cCI6MjA2OTUzNzk1M30.iOKiu9HHCQMOQEVdLDlxCiNiMaiBjnA329RiJFsvnEo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});