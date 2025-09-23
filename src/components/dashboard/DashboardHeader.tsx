import { Bell, Search, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { AlertTriangle, TrendingDown, Activity } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";

export const DashboardHeader = () => {
  const { user, logout } = useAuth();
  const alerts = [
    {
      id: 1,
      type: "warning",
      title: "High Mortality Rate",
      message: "Farm B3 - Batch #2847 showing 15% mortality rate",
      time: "2 minutes ago",
      icon: AlertTriangle,
    },
    {
      id: 2,
      type: "info",
      title: "Feed Inventory Low",
      message: "Farm A1 has only 3 days of feed remaining",
      time: "1 hour ago",
      icon: TrendingDown,
    },
    {
      id: 3,
      type: "success",
      title: "Batch Completed",
      message: "Batch #2845 ready for harvest - excellent FCR of 1.6",
      time: "3 hours ago",
      icon: Activity,
    },
  ];

  return (
    <header className="bg-card border-b border-card-border px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex items-center space-x-4 flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search farms, batches, or reports..."
              className="pl-10 bg-background-secondary border-border focus:ring-primary focus:border-primary"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {alerts.length}
                </Badge>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="bg-card border border-card-border rounded-lg shadow-lg">
                <div className="px-4 py-3 border-b border-card-border">
                  <h3 className="font-semibold text-foreground">Recent Alerts</h3>
                  <p className="text-sm text-muted-foreground">{alerts.length} new notifications</p>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {alerts.map((alert) => {
                    const Icon = alert.icon;
                    return (
                      <div key={alert.id} className="px-4 py-3 border-b border-card-border last:border-b-0 hover:bg-muted/50">
                        <div className="flex items-start space-x-3">
                          <div className={`mt-0.5 p-1 rounded-full ${
                            alert.type === "warning" ? "bg-destructive/10 text-destructive" :
                            alert.type === "info" ? "bg-primary/10 text-primary" :
                            "bg-success/10 text-success"
                          }`}>
                            <Icon className="h-3 w-3" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">{alert.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">{alert.message}</p>
                            <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="px-4 py-2 border-t border-card-border">
                  <Button variant="ghost" size="sm" className="w-full text-sm">
                    View all notifications
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* User Profile */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.role}</p>
            </div>
            <Avatar>
              <AvatarImage src={user?.avatar} />
              <AvatarFallback>
                {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
              </AvatarFallback>
            </Avatar>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="ml-2 text-muted-foreground hover:text-destructive"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};