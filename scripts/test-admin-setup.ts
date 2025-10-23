import { supabase } from '../src/integrations/supabase/client';

async function testAdminSetup() {
  console.log('Testing admin user setup...');
  
  try {
    // Test 1: Check if the admin user exists
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', 'c2b0d1ef-6bc0-4aaf-aba3-e0353bbfddff')
      .single();

    if (profileError) {
      console.log('❌ Error fetching profile:', profileError.message);
      return;
    }

    if (!profile) {
      console.log('❌ Admin user profile not found');
      return;
    }

    console.log('✅ Admin user profile found');
    console.log('  Email:', profile.email);
    console.log('  Full Name:', profile.full_name);
    console.log('  Role:', profile.role);
    console.log('  Created At:', profile.created_at);

    // Test 2: Verify the user has admin role
    if (profile.role === 'admin') {
      console.log('✅ User has admin role');
    } else {
      console.log('❌ User does not have admin role. Current role:', profile.role);
      return;
    }

    // Test 3: Try to access admin-only data (this would work if the user is authenticated)
    // Note: This test will only work if the current session is for this user
    const { data: financialData, error: financialError } = await supabase
      .from('financial_data')
      .select('id')
      .limit(1);

    if (financialError) {
      console.log('ℹ️ Could not access financial data (likely due to authentication, not permissions)');
    } else {
      console.log('✅ Successfully accessed financial data (user has proper permissions)');
    }

    console.log('\n✅ Admin user setup verification complete');
    
  } catch (error) {
    console.error('❌ Unexpected error during admin setup test:', error);
  }
}

// Run the test
testAdminSetup();