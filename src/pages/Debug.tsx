import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DatabaseStatus } from "@/components/Debug/DatabaseStatus";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Debug = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Debug Information</h1>
            <p className="text-muted-foreground">System status and diagnostics</p>
          </div>
          <Button onClick={() => navigate(-1)}>Back</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Database Connection</CardTitle>
          </CardHeader>
          <CardContent>
            <DatabaseStatus />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Synchronization</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This page helps you verify that your web application is properly connected to the database 
              and that data is synchronized correctly.
            </p>
            <div className="mt-4 space-y-2">
              <h3 className="font-semibold">To ensure data coincides with the database:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Check that the database connection status shows "Connected"</li>
                <li>Verify you are authenticated</li>
                <li>Confirm that data appears in the UI matches the database</li>
                <li>Make a test change and verify it's saved to the database</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Debug;