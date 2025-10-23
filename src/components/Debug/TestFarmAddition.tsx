import { useState } from "react";
import { useFarms } from "@/hooks/useFarms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export const TestFarmAddition = () => {
  const { addFarm, farms, isLoading } = useFarms();
  const { toast } = useToast();
  const [farmData, setFarmData] = useState({
    name: "Test Farm",
    location: "Test Location",
    capacity: 1000,
    status: "active" as const
  });

  const handleAddFarm = () => {
    console.log("Attempting to add farm with data:", farmData);
    addFarm(farmData, {
      onSuccess: (data) => {
        console.log("Farm added successfully:", data);
        toast({
          title: "Success",
          description: "Farm added successfully",
        });
      },
      onError: (error) => {
        console.error("Error adding farm:", error);
        toast({
          title: "Error",
          description: error.message || "Failed to add farm",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Test Farm Addition</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Farm Name</label>
          <Input
            value={farmData.name}
            onChange={(e) => setFarmData({...farmData, name: e.target.value})}
            placeholder="Farm Name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <Input
            value={farmData.location}
            onChange={(e) => setFarmData({...farmData, location: e.target.value})}
            placeholder="Location"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Capacity</label>
          <Input
            type="number"
            value={farmData.capacity}
            onChange={(e) => setFarmData({...farmData, capacity: parseInt(e.target.value) || 0})}
            placeholder="Capacity"
          />
        </div>
        <Button onClick={handleAddFarm} disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Test Farm"}
        </Button>
      </div>
      <div className="mt-4">
        <h3 className="font-medium">Current Farms ({farms.length})</h3>
        <ul className="list-disc pl-5">
          {farms.map(farm => (
            <li key={farm.id}>{farm.name} - {farm.location} (Capacity: {farm.capacity})</li>
          ))}
        </ul>
      </div>
    </div>
  );
};