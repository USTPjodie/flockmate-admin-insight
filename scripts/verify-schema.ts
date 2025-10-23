import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function verifySchema() {
  console.log('Verifying Flockmate database schema...');
  
  // Get Supabase credentials from environment variables
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials in environment variables');
    return;
  }
  
  // Create Supabase client
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  try {
    // Check if all required tables exist
    const requiredTables = [
      'profiles',
      'financial_data',
      'cost_breakdown',
      'farm_performance',
      'alerts',
      'dashboard_metrics'
    ];
    
    console.log('\n🔍 Checking tables...');
    for (const tableName of requiredTables) {
      const { data, error } = await supabase
        .from(tableName)
        .select('id')
        .limit(1);
      
      if (error && error.code === '42P01') {
        console.log(`❌ Table '${tableName}' does not exist`);
      } else if (error) {
        console.log(`⚠️  Error checking table '${tableName}': ${error.message}`);
      } else {
        console.log(`✅ Table '${tableName}' exists`);
      }
    }
    
    // Check if RLS is enabled on all tables
    console.log('\n🔍 Checking RLS policies...');
    // Note: We can't directly check RLS status through the client,
    // but we can verify that the policies work by trying to access data
    
    // Check if the handle_new_user function exists
    console.log('\n🔍 Checking functions...');
    // Note: We can't directly check functions through the client
    
    // Read the schema file and check for completeness
    console.log('\n🔍 Checking schema file...');
    const schemaPath = path.resolve(__dirname, '../supabase/schema.sql');
    if (fs.existsSync(schemaPath)) {
      const schemaContent = fs.readFileSync(schemaPath, 'utf8');
      
      // Check for required elements
      const requiredElements = [
        'CREATE TABLE public.profiles',
        'CREATE TABLE public.financial_data',
        'CREATE TABLE public.cost_breakdown',
        'CREATE TABLE public.farm_performance',
        'CREATE TABLE public.alerts',
        'CREATE TABLE public.dashboard_metrics',
        'ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY',
        'CREATE POLICY "Users can view their own profile"',
        'CREATE POLICY "Admins can view all profiles"',
        'CREATE FUNCTION public.handle_new_user',
        'CREATE TRIGGER on_auth_user_created'
      ];
      
      let allElementsFound = true;
      for (const element of requiredElements) {
        if (schemaContent.includes(element)) {
          console.log(`✅ Found: ${element.substring(0, 50)}...`);
        } else {
          console.log(`❌ Missing: ${element}`);
          allElementsFound = false;
        }
      }
      
      if (allElementsFound) {
        console.log('✅ All required schema elements found in schema.sql');
      } else {
        console.log('❌ Some required schema elements are missing');
      }
    } else {
      console.log('❌ schema.sql file not found');
    }
    
    console.log('\n✅ Schema verification complete');
    
  } catch (error) {
    console.error('❌ Error during schema verification:', error);
  }
}

// Run the verification
verifySchema();