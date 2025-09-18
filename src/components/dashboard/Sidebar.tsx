import { BarChart3, Users, TrendingUp, Settings, Home, FileText, PieChart, Database } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home, current: true },
  { name: "Financial Analytics", href: "/analytics", icon: TrendingUp, current: false },
  { name: "Farm Performance", href: "/performance", icon: BarChart3, current: false },
  { name: "Batch Reports", href: "/reports", icon: FileText, current: false },
  { name: "Comparisons", href: "/comparisons", icon: PieChart, current: false },
  { name: "Data Export", href: "/export", icon: Database, current: false },
  { name: "User Management", href: "/users", icon: Users, current: false },
  { name: "Settings", href: "/settings", icon: Settings, current: false },
];

export const Sidebar = () => {
  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-card-border">
      {/* Logo */}
      <div className="flex items-center px-6 py-4 border-b border-card-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">F</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">Flockmate</h1>
            <p className="text-xs text-muted-foreground">Admin Console</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-6 px-3">
        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                  item.current
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {item.name}
              </a>
            );
          })}
        </div>
      </nav>

      {/* Quick Stats */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-card-border">
        <div className="text-xs text-muted-foreground">
          <div className="flex justify-between mb-1">
            <span>Active Batches</span>
            <span className="font-medium text-foreground">12</span>
          </div>
          <div className="flex justify-between">
            <span>Total Birds</span>
            <span className="font-medium text-foreground">45,230</span>
          </div>
        </div>
      </div>
    </div>
  );
};