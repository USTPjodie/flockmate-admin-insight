import { supabase } from '../src/integrations/supabase/client';

async function verifyDataSync() {
  console.log('🔍 Verifying data synchronization between frontend and database...');
  
  try {
    // Test 1: Check user profiles
    console.log('\n--- User Profiles ---');
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (profilesError) {
      console.log('❌ Error fetching profiles:', profilesError.message);
    } else {
      console.log(`✅ Found ${profiles?.length || 0} user profiles`);
      if (profiles && profiles.length > 0) {
        console.log('Latest profiles:');
        profiles.slice(0, 3).forEach((profile: any) => {
          console.log(`  - ${profile.full_name} (${profile.email}) - Role: ${profile.role}`);
        });
      }
    }
    
    // Test 2: Check financial data
    console.log('\n--- Financial Data ---');
    const { data: financialData, error: financialError } = await supabase
      .from('financial_data')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (financialError) {
      console.log('❌ Error fetching financial data:', financialError.message);
    } else {
      console.log(`✅ Found ${financialData?.length || 0} financial records`);
      if (financialData && financialData.length > 0) {
        console.log('Latest financial data:');
        financialData.slice(0, 3).forEach((record: any) => {
          console.log(`  - ${record.month}: Revenue=${record.revenue}, Cost=${record.cost}, Profit=${record.profit}`);
        });
      }
    }
    
    // Test 3: Check farm performance data
    console.log('\n--- Farm Performance ---');
    const { data: farmPerformance, error: farmError } = await supabase
      .from('farm_performance')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (farmError) {
      console.log('❌ Error fetching farm performance data:', farmError.message);
    } else {
      console.log(`✅ Found ${farmPerformance?.length || 0} farm performance records`);
      if (farmPerformance && farmPerformance.length > 0) {
        console.log('Latest farm performance:');
        farmPerformance.slice(0, 3).forEach((record: any) => {
          console.log(`  - ${record.farm_name}: FCR=${record.fcr}, Mortality=${record.mortality}%, Avg Weight=${record.avg_weight}kg`);
        });
      }
    }
    
    // Test 4: Check alerts
    console.log('\n--- Alerts ---');
    const { data: alerts, error: alertsError } = await supabase
      .from('alerts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (alertsError) {
      console.log('❌ Error fetching alerts:', alertsError.message);
    } else {
      console.log(`✅ Found ${alerts?.length || 0} alerts`);
      if (alerts && alerts.length > 0) {
        console.log('Latest alerts:');
        alerts.slice(0, 3).forEach((alert: any) => {
          console.log(`  - [${alert.type.toUpperCase()}] ${alert.title}: ${alert.message}`);
        });
      }
    }
    
    // Test 5: Check if jodierey.fernandez@ustp.edu.ph is properly set as admin
    console.log('\n--- Admin User Verification ---');
    const { data: adminUser, error: adminError } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', 'jodierey.fernandez@ustp.edu.ph')
      .single();
    
    if (adminError && adminError.code !== 'PGRST116') {
      console.log('❌ Error fetching admin user:', adminError.message);
    } else if (adminUser) {
      console.log(`✅ Admin user found: ${adminUser.full_name} (${adminUser.email})`);
      console.log(`  Role: ${adminUser.role}`);
      if (adminUser.role === 'admin') {
        console.log('✅ User has admin privileges');
      } else {
        console.log('⚠️  User does not have admin privileges');
      }
    } else {
      console.log('ℹ️  Admin user jodierey.fernandez@ustp.edu.ph not found in database');
    }
    
    console.log('\n✅ Data synchronization verification complete');
    console.log('\n💡 To ensure your web app data coincides with the database:');
    console.log('  1. Make sure you are logged in as an admin user');
    console.log('  2. Refresh the web app to fetch latest data');
    console.log('  3. Check that any changes you make in the app are reflected in the database');
    console.log('  4. Verify that RLS policies allow proper data access');
    
  } catch (error) {
    console.error('❌ Unexpected error during data sync verification:', error);
  }
}

// Run the verification
verifyDataSync();