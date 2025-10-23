import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const DirectFarmTest = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  const testDirectFarmInsert = async () => {
    setIsLoading(true);
    setResult(null);
    setError(null);
    
    try {
      console.log("Testing direct farm insertion...");
      
      // Check current user
      const { data: { user } } = await supabase.auth.getUser();
      console.log("Current user:", user);
      
      if (!user) {
        throw new Error("Not authenticated");
      }
      
      // Check user profile and role
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id, role')
        .eq('id', user.id)
        .single();
      
      console.log("User profile:", profile);
      if (profileError) {
        throw new Error(`Profile error: ${profileError.message}`);
      }
      
      // Test farm data
      const testFarm = {
        name: "Direct Test Farm",
        location: "Direct Test Location",
        capacity: 5000,
        status: "active"
      };
      
      console.log("Inserting farm:", testFarm);
      
      // Try to insert farm
      const { data, error } = await supabase
        .from('farms')
        .insert(testFarm)
        .select()
        .single();
      
      if (error) {
        console.error("Insert error:", error);
        setError(error);
        throw error;
      }
      
      console.log("Insert successful:", data);
      setResult(data);
      
      toast({
        title: "Success",
        description: "Farm inserted successfully via direct Supabase call",
      });
      
      // Clean up
      if (data && data.id) {
        await supabase.from('farms').delete().eq('id', data.id);
      }
    } catch (err) {
      console.error("Test failed:", err);
      setError(err);
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Direct Farm Insertion Test</h2>
      <Button onClick={testDirectFarmInsert} disabled={isLoading}>
        {isLoading ? "Testing..." : "Run Direct Farm Test"}
      </Button>
      
      {result && (
        <div className="mt-4 p-3 bg-green-100 text-green-800 rounded">
          <h3 className="font-bold">Success:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
      
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-800 rounded">
          <h3 className="font-bold">Error:</h3>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};