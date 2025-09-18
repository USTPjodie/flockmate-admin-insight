import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: ReactNode;
  trend?: ReactNode;
  className?: string;
}

export const MetricCard = ({
  title,
  value,
  change,
  changeType = "neutral",
  icon,
  trend,
  className
}: MetricCardProps) => {
  return (
    <Card className={cn("p-6 transition-all duration-200 hover:shadow-elevated", className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <div className="flex items-baseline space-x-2">
            <h3 className="text-2xl font-bold text-foreground">{value}</h3>
            {change && (
              <span
                className={cn(
                  "text-sm font-medium",
                  changeType === "positive" && "text-success",
                  changeType === "negative" && "text-error",
                  changeType === "neutral" && "text-muted-foreground"
                )}
              >
                {change}
              </span>
            )}
          </div>
        </div>
        {icon && (
          <div className="p-2 bg-muted rounded-lg">
            {icon}
          </div>
        )}
      </div>
      {trend && (
        <div className="mt-4">
          {trend}
        </div>
      )}
    </Card>
  );
};