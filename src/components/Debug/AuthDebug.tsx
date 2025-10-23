import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

export const AuthDebug = () => {
  const [user, setUser] = useState<any>(null);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('admin@flockmate.com');
  const [password, setPassword] = useState('FlockmateAdmin123!');
  const [loginStatus, setLoginStatus] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get current session
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user || null);
      } catch (err) {
        console.error('Error fetching session:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async () => {
    setLoginStatus('Logging in...');
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setLoginStatus(`Login error: ${error.message}`);
        console.error('Login error:', error);
      } else {
        setLoginStatus('Login successful!');
        console.log('Login successful:', data);
      }
    } catch (err) {
      setLoginStatus(`Unexpected error: ${err}`);
      console.error('Unexpected error:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setLoginStatus('Logged out successfully');
    } catch (err) {
      setLoginStatus(`Logout error: ${err}`);
      console.error('Logout error:', err);
    }
  };

  if (loading) return <div className="p-4">Loading auth info...</div>;

  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Authentication Debug</h3>
      
      <div className="mb-4">
        <h4 className="font-medium">Current Session:</h4>
        <pre className="text-sm bg-white p-2 rounded mt-1 overflow-auto">
          {session ? JSON.stringify({
            user_id: session.user?.id,
            email: session.user?.email,
            role: session.user?.role
          }, null, 2) : 'Not authenticated'}
        </pre>
      </div>
      
      <div className="mb-4">
        <h4 className="font-medium">Login Form:</h4>
        <div className="mt-2 space-y-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 border rounded"
          />
          <div className="flex space-x-2">
            <Button onClick={handleLogin} size="sm">Login</Button>
            <Button onClick={handleLogout} variant="outline" size="sm">Logout</Button>
          </div>
        </div>
      </div>
      
      {loginStatus && (
        <div className="mb-4 p-2 bg-white rounded border">
          <p className="text-sm">{loginStatus}</p>
        </div>
      )}
      
      <div className="text-sm text-gray-600">
        <p>Default credentials: admin@flockmate.com / FlockmateAdmin123!</p>
      </div>
    </div>
  );
};