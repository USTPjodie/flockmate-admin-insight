import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, MapPin, Users, Activity, Edit, ToggleLeft, ToggleRight } from "lucide-react";
import { useState } from "react";
import { useFarms } from "@/hooks/useFarms";
import { AddFarmDialog } from "@/components/farms/AddFarmDialog";
import { EditFarmDialog } from "@/components/farms/EditFarmDialog";
import type { Farm } from "@/hooks/useFarms";
import { FarmDataDebug } from "@/components/Debug/FarmDataDebug";
import { AuthDebug } from "@/components/Debug/AuthDebug";

const Farms = () => {
  const { farms, isLoading, updateFarm } = useFarms();
  const [isAddFarmDialogOpen, setIsAddFarmDialogOpen] = useState(false);
  const [isEditFarmDialogOpen, setIsEditFarmDialogOpen] = useState(false);
  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null);
  const [showDebug, setShowDebug] = useState(false);
  const [showAuthDebug, setShowAuthDebug] = useState(false);

  const handleEditClick = (farm: Farm) => {
    setSelectedFarm(farm);
    setIsEditFarmDialogOpen(true);
  };

  const handleToggleStatus = (farm: Farm) => {
    const newStatus = farm.status === "active" ? "inactive" : "active";
    updateFarm({ id: farm.id, updates: { status: newStatus } });
  };

  return (
    <DashboardLayout>
      <AddFarmDialog open={isAddFarmDialogOpen} onOpenChange={setIsAddFarmDialogOpen} />
      <EditFarmDialog 
        open={isEditFarmDialogOpen} 
        onOpenChange={setIsEditFarmDialogOpen} 
        farm={selectedFarm} 
      />
      
      <div className="space-y-6">
        {/* Debug Toggles */}
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowDebug(!showDebug)}
          >
            {showDebug ? "Hide" : "Show"} Farm Debug
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowAuthDebug(!showAuthDebug)}
          >
            {showAuthDebug ? "Hide" : "Show"} Auth Debug
          </Button>
        </div>
        
        {/* Auth Debug Information */}
        {showAuthDebug && <AuthDebug />}
        
        {/* Farm Debug Information */}
        {showDebug && <FarmDataDebug />}
        
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Farm Management</h1>
            <p className="text-muted-foreground">Manage your poultry farm locations and operational details</p>
          </div>
          <Button onClick={() => setIsAddFarmDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Farm
          </Button>
        </div>

        {/* Farm Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-primary/10 rounded-lg">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-muted-foreground">Total Farms</p>
                <p className="text-2xl font-bold text-foreground">{farms.length}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-success/10 rounded-lg">
                <Activity className="h-6 w-6 text-success" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-muted-foreground">Active Farms</p>
                <p className="text-2xl font-bold text-foreground">
                  {farms.filter(farm => farm.status === 'active').length}
                </p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-muted-foreground">Total Capacity</p>
                <p className="text-2xl font-bold text-foreground">
                  {farms.reduce((total, farm) => total + farm.capacity, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Farms List */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Farm Locations</h3>
          </div>
          
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <p className="text-muted-foreground">Loading farms...</p>
            </div>
          ) : farms.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No farms added yet</h3>
              <p className="text-muted-foreground mb-4">Get started by adding your first farm location</p>
              <Button onClick={() => setIsAddFarmDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Farm
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Farm Name</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Location</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">Capacity</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">Status</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {farms.map((farm) => (
                    <tr key={farm.id} className="border-b border-border hover:bg-muted/50">
                      <td className="py-4 px-4 font-medium text-foreground">{farm.name}</td>
                      <td className="py-4 px-4 text-foreground">{farm.location}</td>
                      <td className="py-4 px-4 text-center text-foreground">{farm.capacity.toLocaleString()}</td>
                      <td className="py-4 px-4 text-center">
                        <Badge variant={farm.status === "active" ? "default" : farm.status === "maintenance" ? "secondary" : "destructive"}>
                          {farm.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleEditClick(farm)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleToggleStatus(farm)}
                          >
                            {farm.status === "active" ? 
                              <ToggleLeft className="h-4 w-4" /> : 
                              <ToggleRight className="h-4 w-4" />
                            }
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Farms;