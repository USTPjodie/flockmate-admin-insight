const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Read .env file directly
const envPath = path.join(__dirname, '..', '.env');
const envContent = fs.readFileSync(envPath, 'utf8');

// Parse the env file
const lines = envContent.split('\n');
const envVars = {};

lines.forEach(line => {
  if (line.trim() && !line.startsWith('#')) {
    const [key, value] = line.split('=');
    if (key && value) {
      envVars[key.trim()] = value.trim().replace(/"/g, '');
    }
  }
});

const supabaseUrl = envVars.VITE_SUPABASE_URL;
const supabaseServiceKey = envVars.SUPABASE_SERVICE_ROLE_KEY;

console.log('Connecting to Supabase at:', supabaseUrl);

// Create Supabase client with service role key (bypasses RLS)
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkDuplicateMetrics() {
  try {
    console.log('Checking for duplicate dashboard metrics...');
    
    // Get all dashboard metrics
    const { data: metrics, error } = await supabase
      .from('dashboard_metrics')
      .select('*')
      .order('metric_name', { ascending: true });
    
    if (error) {
      console.error('Error fetching dashboard metrics:', error.message);
      return;
    }
    
    console.log(`Found ${metrics.length} dashboard metrics:`);
    
    // Group metrics by name to identify duplicates
    const metricsByName = {};
    metrics.forEach(metric => {
      if (!metricsByName[metric.metric_name]) {
        metricsByName[metric.metric_name] = [];
      }
      metricsByName[metric.metric_name].push(metric);
    });
    
    // Check for duplicates
    let hasDuplicates = false;
    Object.keys(metricsByName).forEach(name => {
      if (metricsByName[name].length > 1) {
        hasDuplicates = true;
        console.log(`\n⚠️  Duplicate metrics found for "${name}":`);
        metricsByName[name].forEach((metric, index) => {
          console.log(`  ${index + 1}. Value: ${metric.metric_value}, Created: ${metric.created_at}`);
        });
      }
    });
    
    if (!hasDuplicates) {
      console.log('\n✅ No duplicate metrics found.');
      
      // Show all metrics
      console.log('\nAll metrics:');
      metrics.forEach(metric => {
        console.log(`- ${metric.metric_name}: ${metric.metric_value} (${metric.change_percentage || 'No change'})`);
      });
    }
    
  } catch (err) {
    console.error('Unexpected error:', err.message);
  }
}

checkDuplicateMetrics();