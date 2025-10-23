import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export const DatabaseQuery = () => {
  const [query, setQuery] = useState("SELECT * FROM farms LIMIT 10;");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const executeQuery = async () => {
    setLoading(true);
    setResult(null);
    setError(null);
    
    try {
      console.log("Executing query:", query);
      
      // Parse the query to determine table and operation
      const trimmedQuery = query.trim().toLowerCase();
      
      if (trimmedQuery.startsWith('select')) {
        // Extract table name (simple parsing)
        const fromMatch = query.toLowerCase().match(/from\s+(\w+)/);
        if (fromMatch) {
          const tableName = fromMatch[1];
          console.log("Querying table:", tableName);
          
          // For farms table, we'll use the proper Supabase client
          if (tableName === 'farms') {
            const { data, error: selectError } = await supabase
              .from('farms')
              .select('*');
            
            if (selectError) {
              throw selectError;
            }
            
            setResult({ data, count: data.length });
          } else {
            // For other tables, we might need to use RPC or direct query
            // This is a simplified approach
            setError("Only farms table queries are supported in this debug tool");
          }
        } else {
          setError("Could not parse table name from query");
        }
      } else {
        setError("Only SELECT queries are supported in this debug tool");
      }
    } catch (err) {
      console.error("Query execution error:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Database Query Tool</h3>
          <p className="text-sm text-muted-foreground">
            Execute simple queries to check database content
          </p>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="query" className="text-sm font-medium">SQL Query</label>
          <Textarea
            id="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            rows={3}
            placeholder="Enter your SQL query"
          />
        </div>
        
        <Button onClick={executeQuery} disabled={loading}>
          {loading ? "Executing..." : "Execute Query"}
        </Button>
        
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-800 rounded">
            <h4 className="font-bold">Error:</h4>
            <pre className="text-xs">{JSON.stringify(error, null, 2)}</pre>
          </div>
        )}
        
        {result && (
          <div className="mt-4 p-3 bg-green-100 text-green-800 rounded">
            <h4 className="font-bold">Query Result:</h4>
            <div className="text-sm">
              <p>Rows returned: {result.count}</p>
              {result.data && result.data.length > 0 && (
                <div className="mt-2">
                  <p>Sample data:</p>
                  <pre className="text-xs bg-white p-2 rounded mt-1">
                    {JSON.stringify(result.data.slice(0, 2), null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};