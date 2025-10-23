import { supabase } from '../src/integrations/supabase/client';

async function testDatabaseConnection() {
  console.log('Testing connection to new Supabase database...');
  
  try {
    // Test connection by querying a simple table
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .limit(1);

    if (error) {
      console.error('❌ Database connection failed:', error.message);
      return;
    }

    console.log('✅ Successfully connected to the new database');
    console.log('✅ Profiles table is accessible');
    
    // Test auth
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      console.log('✅ Authentication is working');
    } else {
      console.log('ℹ️ No active session (this is normal if not logged in)');
    }
    
  } catch (error) {
    console.error('❌ Unexpected error during database test:', error);
  }
}

// Run the test
testDatabaseConnection();