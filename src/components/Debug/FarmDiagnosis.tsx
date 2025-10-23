import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";

export const FarmDiagnosis = () => {
  const { toast } = useToast();
  const [diagnosis, setDiagnosis] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const runFullDiagnosis = async () => {
    setIsLoading(true);
    setDiagnosis(null);
    
    const results: any = {
      timestamp: new Date().toISOString(),
      steps: []
    };
    
    try {
      // Step 1: Check authentication
      results.steps.push({ step: "Authentication Check", status: "running" });
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      results.steps[0].status = user ? "success" : "failed";
      results.steps[0].data = { user: user ? { id: user.id, email: user.email } : null };
      results.steps[0].error = authError;
      
      if (!user) {
        throw new Error("Not authenticated");
      }
      
      // Step 2: Check user profile
      results.steps.push({ step: "Profile Check", status: "running" });
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id, email, full_name, role')
        .eq('id', user.id)
        .single();
      
      results.steps[1].status = profile ? "success" : "failed";
      results.steps[1].data = profile;
      results.steps[1].error = profileError;
      
      if (profileError) {
        throw new Error(`Profile error: ${profileError.message}`);
      }
      
      // Step 3: Check RLS policy by trying to read farms
      results.steps.push({ step: "RLS Read Test", status: "running" });
      const { data: farms, error: readError } = await supabase
        .from('farms')
        .select('id, name')
        .limit(1);
      
      results.steps[2].status = readError ? "failed" : "success";
      results.steps[2].data = { count: farms?.length || 0, sample: farms?.[0] };
      results.steps[2].error = readError;
      
      // Step 4: Test farm insertion with detailed error handling
      results.steps.push({ step: "Insertion Test", status: "running" });
      const testFarm = {
        name: "Diagnosis Test Farm",
        location: "Test Location",
        capacity: 1000,
        status: "active"
      };
      
      const { data: insertedFarm, error: insertError } = await supabase
        .from('farms')
        .insert(testFarm)
        .select()
        .single();
      
      results.steps[3].status = insertError ? "failed" : "success";
      results.steps[3].data = insertedFarm;
      results.steps[3].error = insertError;
      
      // Step 5: Clean up if insertion was successful
      if (insertedFarm && insertedFarm.id) {
        results.steps.push({ step: "Cleanup Test", status: "running" });
        const { error: deleteError } = await supabase
          .from('farms')
          .delete()
          .eq('id', insertedFarm.id);
        
        results.steps[4].status = deleteError ? "failed" : "success";
        results.steps[4].error = deleteError;
      }
      
      setDiagnosis(results);
      toast({
        title: "Diagnosis Complete",
        description: "Check the results below for detailed information",
      });
    } catch (error) {
      console.error("Diagnosis failed:", error);
      setDiagnosis(results);
      toast({
        title: "Diagnosis Error",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-bold">Farm Addition Diagnosis</h2>
          <p className="text-muted-foreground">Run a comprehensive test to identify issues with farm addition</p>
        </div>
        
        <Button onClick={runFullDiagnosis} disabled={isLoading}>
          {isLoading ? "Running Diagnosis..." : "Run Full Diagnosis"}
        </Button>
        
        {diagnosis && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <h3 className="font-bold mb-2">Diagnosis Results</h3>
            <div className="text-sm">
              <div className="mb-2">Timestamp: {diagnosis.timestamp}</div>
              <div className="space-y-2">
                {diagnosis.steps.map((step: any, index: number) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className={`inline-block w-3 h-3 rounded-full mt-1 ${
                      step.status === 'success' ? 'bg-green-500' : 
                      step.status === 'failed' ? 'bg-red-500' : 'bg-yellow-500'
                    }`}></span>
                    <div>
                      <div className="font-medium">{step.step}: {step.status}</div>
                      {step.error && (
                        <div className="text-red-500 text-xs mt-1">
                          Error: {step.error.message || JSON.stringify(step.error)}
                        </div>
                      )}
                      {step.data && (
                        <div className="text-xs mt-1">
                          Data: {JSON.stringify(step.data, null, 2)}
                        </div>
                      )}
                    </div>
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