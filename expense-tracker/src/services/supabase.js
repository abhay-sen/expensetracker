import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://unjybitlxmmshnofwahz.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVuanliaXRseG1tc2hub2Z3YWh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc1MDA3MDMsImV4cCI6MjAyMzA3NjcwM30.OqD-jURbUHP0z4mSGOO7lavMvvyUxIIzUnTbHgz_H5o'; // Replace with your Supabase API Key

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
