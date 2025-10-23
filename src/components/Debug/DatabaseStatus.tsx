import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const DatabaseStatus = () => {
  const [status, setStatus] = useState({
    connected: false,
    authenticated: false,
    profilesCount: 0,
    farmsCount: 0,
    error: null as string | null,
    loading: true
  });

  useEffect(() => {
    const checkDatabaseStatus = async () => {
      try {
        // Check authentication status
        const { data: { session } } = await supabase.auth.getSession();
        
        // Check if we can access profiles table
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('id')
          .limit(10);
        
        if (profilesError) {
          throw new Error(`Profiles access error: ${profilesError.message}`);
        }
        
        // Check if we can access farms table
        const { data: farms, error: farmsError } = await supabase
          .from('farms')
          .select('id')
          .limit(10);
        
        if (farmsError) {
          throw new Error(`Farms access error: ${farmsError.message}`);
        }
        
        setStatus({
          connected: true,
          authenticated: !!session,
          profilesCount: profiles?.length || 0,
          farmsCount: farms?.length || 0,
          error: null,
          loading: false
        });
      } catch (error: any) {
        setStatus({
          connected: false,
          authenticated: false,
          profilesCount: 0,
          farmsCount: 0,
          error: error.message,
          loading: false
        });
      }
    };

    checkDatabaseStatus();
  }, []);

  if (status.loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Database Status</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Checking database connection...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Database Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Connection:</span>
            <span className={status.connected ? "text-green-600" : "text-red-600"}>
              {status.connected ? "Connected" : "Disconnected"}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Authentication:</span>
            <span className={status.authenticated ? "text-green-600" : "text-red-600"}>
              {status.authenticated ? "Authenticated" : "Not Authenticated"}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Profiles in DB:</span>
            <span>{status.profilesCount}</span>
          </div>
          <div className="flex justify-between">
            <span>Farms in DB:</span>
            <span>{status.farmsCount}</span>
          </div>
          {status.error && (
            <div className="mt-2 p-2 bg-red-100 text-red-800 rounded">
              <strong>Error:</strong> {status.error}
            </div>
          )}
        </div>
        <Button 
          className="mt-4" 
          onClick={() => window.location.reload()}
        >
          Refresh Status
        </Button>
      </CardContent>
    </Card>
  );
};