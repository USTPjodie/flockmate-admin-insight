import { Card } from '@/components/ui/card';
import { DatabaseStatus } from '@/components/Debug/DatabaseStatus';
import { TestFarmAddition } from '@/components/Debug/TestFarmAddition';
import { DirectFarmTest } from '@/components/Debug/DirectFarmTest';
import { FarmDiagnosis } from '@/components/Debug/FarmDiagnosis';
import { FarmDataDebug } from '@/components/Debug/FarmDataDebug';
import { DatabaseQuery } from '@/components/Debug/DatabaseQuery';

export const Debug = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Debug</h1>
        <p className="text-muted-foreground">System debugging and testing tools</p>
      </div>
      
      <div className="grid gap-6">
        <Card className="p-6">
          <DatabaseStatus />
        </Card>
        
        <FarmDiagnosis />
        
        <FarmDataDebug />
        
        <DatabaseQuery />
        
        <Card className="p-6">
          <TestFarmAddition />
        </Card>
        
        <Card className="p-6">
          <DirectFarmTest />
        </Card>
      </div>
    </div>
  );
};