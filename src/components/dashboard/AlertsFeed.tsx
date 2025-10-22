import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Info, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";


const getAlertIcon = (type: string) => {
  switch (type) {
    case "critical":
      return <XCircle className="h-4 w-4 text-error" />;
    case "warning":
      return <AlertTriangle className="h-4 w-4 text-warning" />;
    case "success":
      return <CheckCircle className="h-4 w-4 text-success" />;
    default:
      return <Info className="h-4 w-4 text-primary" />;
  }
};

const getAlertBadgeVariant = (type: string) => {
  switch (type) {
    case "critical":
      return "destructive";
    case "warning":
      return "secondary";
    case "success":
      return "default";
    default:
      return "outline";
  }
};

export const AlertsFeed = () => {
  const { data: alerts = [] } = useQuery({
    queryKey: ['alerts-feed'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('alerts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Alerts</h3>
        <Badge variant="outline" className="text-xs">
          Live
        </Badge>
      </div>
      
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={cn(
              "p-4 rounded-lg border transition-all duration-200 hover:shadow-sm",
              alert.type === "critical" && "border-error/20 bg-error/5",
              alert.type === "warning" && "border-warning/20 bg-warning/5",
              alert.type === "success" && "border-success/20 bg-success/5",
              alert.type === "info" && "border-primary/20 bg-primary/5"
            )}
          >
            <div className="flex items-start space-x-3">
              {getAlertIcon(alert.type)}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-foreground">
                    {alert.title}
                  </h4>
                  <Badge variant={getAlertBadgeVariant(alert.type)} className="text-xs">
                    {alert.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {alert.message}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{alert.farm}</span>
                  <span>{formatDistanceToNow(new Date(alert.created_at), { addSuffix: true })}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};