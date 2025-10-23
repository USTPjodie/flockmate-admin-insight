import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const FarmDataDebug = () => {
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const runDebug = async () => {
    setLoading(true);
    setDebugInfo(null);
    
    const info: any = {
      timestamp: new Date().toISOString(),
      steps: []
    };
    
    try {
      // Step 1: Check authentication
      info.steps.push({ step: "Authentication Check", status: "running" });
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      info.steps[0].status = user ? "success" : "failed";
      info.steps[0].data = { user: user ? { id: user.id, email: user.email } : null };
      info.steps[0].error = authError;
      
      if (!user) {
        throw new Error("Not authenticated");
      }
      
      // Step 2: Check user profile
      info.steps.push({ step: "Profile Check", status: "running" });
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id, email, full_name, role')
        .eq('id', user.id)
        .single();
      
      info.steps[1].status = profile ? "success" : "failed";
      info.steps[1].data = profile;
      info.steps[1].error = profileError;
      
      // Step 3: Try to fetch farms directly
      info.steps.push({ step: "Farm Data Fetch", status: "running" });
      const { data: farms, error: farmsError } = await supabase
        .from('farms')
        .select('*')
        .order('name', { ascending: true });
      
      info.steps[2].status = farmsError ? "failed" : "success";
      info.steps[2].data = { 
        count: farms?.length || 0, 
        sample: farms?.slice(0, 3),
        all: farms
      };
      info.steps[2].error = farmsError;
      
      // Step 4: Check RLS policies by trying to insert a test farm
      info.steps.push({ step: "RLS Policy Check", status: "running" });
      const testFarm = {
        name: "Debug Test Farm",
        location: "Debug Location",
        capacity: 100,
        status: "active"
      };
      
      const { data: insertedFarm, error: insertError } = await supabase
        .from('farms')
        .insert(testFarm)
        .select()
        .single();
      
      info.steps[3].status = insertError ? "failed" : "success";
      info.steps[3].data = insertedFarm;
      info.steps[3].error = insertError;
      
      // Clean up test farm if inserted
      if (insertedFarm && insertedFarm.id) {
        await supabase.from('farms').delete().eq('id', insertedFarm.id);
      }
      
      setDebugInfo(info);
    } catch (error) {
      console.error("Debug error:", error);
      setDebugInfo(info);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Farm Data Debug</h3>
          <p className="text-sm text-muted-foreground">
            Diagnose issues with farm data not showing in the web app
          </p>
        </div>
        
        <Button onClick={runDebug} disabled={loading}>
          {loading ? "Running Debug..." : "Run Farm Data Debug"}
        </Button>
        
        {debugInfo && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <h4 className="font-bold mb-2">Debug Results</h4>
            <div className="text-sm">
              <div className="mb-2">Timestamp: {debugInfo.timestamp}</div>
              <div className="space-y-3">
                {debugInfo.steps.map((step: any, index: number) => (
                  <div key={index} className="border-b pb-2">
                    <div className="flex items-center gap-2">
                      <span className={`inline-block w-3 h-3 rounded-full ${
                        step.status === 'success' ? 'bg-green-500' : 
                        step.status === 'failed' ? 'bg-red-500' : 'bg-yellow-500'
                      }`}></span>
                      <span className="font-medium">{step.step}: {step.status}</span>
                    </div>
                    {step.error && (
                      <div className="text-red-500 text-xs mt-1 ml-5">
                        Error: {step.error.message || JSON.stringify(step.error)}
                      </div>
                    )}
                    {step.data && (
                      <div className="text-xs mt-1 ml-5">
                        <pre>{JSON.stringify(step.data, null, 2)}</pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};