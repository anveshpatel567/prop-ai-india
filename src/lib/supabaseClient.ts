
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jocuncymvrkfzrogpezr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvY3VuY3ltdnJrZnpyb2dwZXpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyNzU2ODEsImV4cCI6MjA2NDg1MTY4MX0.DcwazGPVfSCTcFMGe5MzJtkPiOnw7MwkLUD6cWGHR5k';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});
