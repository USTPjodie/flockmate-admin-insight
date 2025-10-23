import { supabase } from '../src/integrations/supabase/client';

async function verifyDatabaseConnection() {
  console.log('🔍 Verifying database connection...');
  
  try {
    // Test 1: Check if we can connect to the database
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.log('⚠️  Auth session check error:', sessionError.message);
    } else {
      console.log('✅ Auth connection successful');
      if (sessionData.session) {
        console.log('✅ User is authenticated');
      } else {
        console.log('ℹ️  No active session (this is normal if not logged in)');
      }
    }
    
    // Test 2: Check if we can access the profiles table
    const { data: profilesData, error: profilesError } = await supabase
      .from('profiles')
      .select('id, email, full_name, role')
      .limit(1);
    
    if (profilesError) {
      console.log('❌ Profiles table access error:', profilesError.message);
    } else {
      console.log('✅ Profiles table accessible');
      if (profilesData && profilesData.length > 0) {
        console.log(`✅ Found ${profilesData.length} profile(s) in database`);
        console.log('  Sample profile:', profilesData[0]);
      } else {
        console.log('ℹ️  No profiles found in database');
      }
    }
    
    // Test 3: Check if we can access other tables
    console.log('\n🔍 Checking other tables...');
    
    // Check financial_data table
    try {
      const { data: financialData, error: financialError } = await supabase
        .from('financial_data')
        .select('id')
        .limit(1);
      
      if (financialError) {
        console.log('❌ financial_data access error:', financialError.message);
      } else {
        console.log(`✅ financial_data accessible (${financialData?.length || 0} records)`);
      }
    } catch (error) {
      console.log('❌ financial_data check failed:', error);
    }
    
    // Check farm_performance table
    try {
      const { data: farmData, error: farmError } = await supabase
        .from('farm_performance')
        .select('id')
        .limit(1);
      
      if (farmError) {
        console.log('❌ farm_performance access error:', farmError.message);
      } else {
        console.log(`✅ farm_performance accessible (${farmData?.length || 0} records)`);
      }
    } catch (error) {
      console.log('❌ farm_performance check failed:', error);
    }
    
    // Check alerts table
    try {
      const { data: alertsData, error: alertsError } = await supabase
        .from('alerts')
        .select('id')
        .limit(1);
      
      if (alertsError) {
        console.log('❌ alerts access error:', alertsError.message);
      } else {
        console.log(`✅ alerts accessible (${alertsData?.length || 0} records)`);
      }
    } catch (error) {
      console.log('❌ alerts check failed:', error);
    }
    
    // Check dashboard_metrics table
    try {
      const { data: metricsData, error: metricsError } = await supabase
        .from('dashboard_metrics')
        .select('id')
        .limit(1);
      
      if (metricsError) {
        console.log('❌ dashboard_metrics access error:', metricsError.message);
      } else {
        console.log(`✅ dashboard_metrics accessible (${metricsData?.length || 0} records)`);
      }
    } catch (error) {
      console.log('❌ dashboard_metrics check failed:', error);
    }
    
    // Check cost_breakdown table
    try {
      const { data: costData, error: costError } = await supabase
        .from('cost_breakdown')
        .select('id')
        .limit(1);
      
      if (costError) {
        console.log('❌ cost_breakdown access error:', costError.message);
      } else {
        console.log(`✅ cost_breakdown accessible (${costData?.length || 0} records)`);
      }
    } catch (error) {
      console.log('❌ cost_breakdown check failed:', error);
    }
    
    // Test 4: Check environment variables (we'll read them from the process.env)
    console.log('\n🔍 Checking environment configuration...');
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const projectId = process.env.VITE_SUPABASE_PROJECT_ID;
    
    if (supabaseUrl && projectId) {
      console.log('✅ Environment variables found');
      console.log('  Project URL:', supabaseUrl);
      console.log('  Project ID:', projectId);
      
      // Check if they match our expected configuration
      if (supabaseUrl.includes('weonltiidlnpgvanwvba')) {
        console.log('✅ Connected to the correct Supabase project');
      } else {
        console.log('⚠️  Connected to a different Supabase project than expected');
      }
    } else {
      console.log('ℹ️  Environment variables not available in this context');
    }
    
    console.log('\n✅ Database connection verification complete');
    
  } catch (error) {
    console.error('❌ Unexpected error during database verification:', error);
  }
}

// Run the verification
verifyDatabaseConnection();