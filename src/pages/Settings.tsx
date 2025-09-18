import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Settings as SettingsIcon, Globe, Bell, Shield, Database, Palette, Save, RefreshCw } from "lucide-react";

const farms = [
  { id: "farm-1", name: "Greenfield Farm A", location: "North Valley", capacity: 25000, status: "active" },
  { id: "farm-2", name: "Valley Farm B", location: "East Hills", capacity: 20000, status: "active" },
  { id: "farm-3", name: "Hillside Farm C", location: "West Ridge", capacity: 30000, status: "active" },
  { id: "farm-4", name: "Riverside Farm D", location: "South Plain", capacity: 18000, status: "maintenance" },
];

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">System Settings</h1>
            <p className="text-muted-foreground">Configure system preferences and manage farm locations</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset to Defaults
            </Button>
            <Button size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="farms">Farms</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="data">Data & Backup</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="flex items-center mb-4">
                  <Globe className="h-5 w-5 text-primary mr-2" />
                  <h3 className="text-lg font-semibold text-foreground">System Configuration</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input id="company-name" defaultValue="Flockmate Poultry Operations" />
                  </div>
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="utc-5">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                        <SelectItem value="utc-7">Mountain Time (UTC-7)</SelectItem>
                        <SelectItem value="utc-6">Central Time (UTC-6)</SelectItem>
                        <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="currency">Default Currency</Label>
                    <Select defaultValue="usd">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD ($)</SelectItem>
                        <SelectItem value="eur">EUR (€)</SelectItem>
                        <SelectItem value="gbp">GBP (£)</SelectItem>
                        <SelectItem value="cad">CAD ($)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="date-format">Date Format</Label>
                    <Select defaultValue="mm-dd-yyyy">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                        <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center mb-4">
                  <SettingsIcon className="h-5 w-5 text-primary mr-2" />
                  <h3 className="text-lg font-semibold text-foreground">Performance Benchmarks</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="target-fcr">Target FCR</Label>
                    <Input id="target-fcr" type="number" step="0.01" defaultValue="1.60" />
                  </div>
                  <div>
                    <Label htmlFor="target-mortality">Target Mortality Rate (%)</Label>
                    <Input id="target-mortality" type="number" step="0.1" defaultValue="2.0" />
                  </div>
                  <div>
                    <Label htmlFor="target-weight">Target Final Weight (kg)</Label>
                    <Input id="target-weight" type="number" step="0.01" defaultValue="2.50" />
                  </div>
                  <div>
                    <Label htmlFor="target-margin">Target Profit Margin (%)</Label>
                    <Input id="target-margin" type="number" step="0.1" defaultValue="32.0" />
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Farm Management */}
          <TabsContent value="farms">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Farm Locations</h3>
                <Button>Add New Farm</Button>
              </div>
              
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
                    {farms.map((farm, index) => (
                      <tr key={index} className="border-b border-border hover:bg-muted/50">
                        <td className="py-4 px-4 font-medium text-foreground">{farm.name}</td>
                        <td className="py-4 px-4 text-foreground">{farm.location}</td>
                        <td className="py-4 px-4 text-center text-foreground">{farm.capacity.toLocaleString()}</td>
                        <td className="py-4 px-4 text-center">
                          <Badge variant={farm.status === "active" ? "default" : "secondary"}>
                            {farm.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <Button variant="ghost" size="sm">Edit</Button>
                            <Button variant="ghost" size="sm">Deactivate</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="flex items-center mb-4">
                  <Bell className="h-5 w-5 text-primary mr-2" />
                  <h3 className="text-lg font-semibold text-foreground">Alert Settings</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="mortality-alerts">High Mortality Rate Alerts</Label>
                      <p className="text-sm text-muted-foreground">Alert when mortality exceeds threshold</p>
                    </div>
                    <Switch id="mortality-alerts" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="feed-alerts">Low Feed Inventory Alerts</Label>
                      <p className="text-sm text-muted-foreground">Alert when feed runs low</p>
                    </div>
                    <Switch id="feed-alerts" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="fcr-alerts">Poor FCR Performance Alerts</Label>
                      <p className="text-sm text-muted-foreground">Alert when FCR exceeds targets</p>
                    </div>
                    <Switch id="fcr-alerts" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="batch-alerts">Batch Completion Alerts</Label>
                      <p className="text-sm text-muted-foreground">Alert when batches are sold</p>
                    </div>
                    <Switch id="batch-alerts" defaultChecked />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center mb-4">
                  <Bell className="h-5 w-5 text-primary mr-2" />
                  <h3 className="text-lg font-semibold text-foreground">Notification Preferences</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <Select defaultValue="immediate">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediate</SelectItem>
                        <SelectItem value="daily">Daily Digest</SelectItem>
                        <SelectItem value="weekly">Weekly Summary</SelectItem>
                        <SelectItem value="disabled">Disabled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="notification-email">Notification Email</Label>
                    <Input id="notification-email" type="email" defaultValue="admin@flockmate.com" />
                  </div>
                  <div>
                    <Label htmlFor="alert-threshold">Alert Threshold Level</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low - All alerts</SelectItem>
                        <SelectItem value="medium">Medium - Important alerts</SelectItem>
                        <SelectItem value="high">High - Critical alerts only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="flex items-center mb-4">
                  <Shield className="h-5 w-5 text-primary mr-2" />
                  <h3 className="text-lg font-semibold text-foreground">Authentication Settings</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Require 2FA for all admin users</p>
                    </div>
                    <Switch id="two-factor" />
                  </div>
                  <div>
                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                    <Input id="session-timeout" type="number" defaultValue="30" />
                  </div>
                  <div>
                    <Label htmlFor="password-policy">Password Policy</Label>
                    <Select defaultValue="strong">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic - 8 characters</SelectItem>
                        <SelectItem value="strong">Strong - 12+ chars, mixed case</SelectItem>
                        <SelectItem value="enterprise">Enterprise - 16+ chars, complex</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center mb-4">
                  <Shield className="h-5 w-5 text-primary mr-2" />
                  <h3 className="text-lg font-semibold text-foreground">Access Control</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="ip-restriction">IP Address Restrictions</Label>
                      <p className="text-sm text-muted-foreground">Limit access to specific IP ranges</p>
                    </div>
                    <Switch id="ip-restriction" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="audit-logging">Audit Logging</Label>
                      <p className="text-sm text-muted-foreground">Log all user actions and changes</p>
                    </div>
                    <Switch id="audit-logging" defaultChecked />
                  </div>
                  <div>
                    <Label htmlFor="failed-attempts">Max Failed Login Attempts</Label>
                    <Input id="failed-attempts" type="number" defaultValue="5" />
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Data & Backup */}
          <TabsContent value="data">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="flex items-center mb-4">
                  <Database className="h-5 w-5 text-primary mr-2" />
                  <h3 className="text-lg font-semibold text-foreground">Data Management</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="data-retention">Data Retention Period</Label>
                    <Select defaultValue="2years">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1year">1 Year</SelectItem>
                        <SelectItem value="2years">2 Years</SelectItem>
                        <SelectItem value="5years">5 Years</SelectItem>
                        <SelectItem value="indefinite">Indefinite</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-backup">Automatic Backups</Label>
                      <p className="text-sm text-muted-foreground">Daily automated data backups</p>
                    </div>
                    <Switch id="auto-backup" defaultChecked />
                  </div>
                  <div>
                    <Label htmlFor="backup-frequency">Backup Frequency</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center mb-4">
                  <Database className="h-5 w-5 text-primary mr-2" />
                  <h3 className="text-lg font-semibold text-foreground">Backup Status</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Last Backup</span>
                    <span className="text-sm font-medium text-foreground">2024-03-31 03:00 AM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Backup Size</span>
                    <span className="text-sm font-medium text-foreground">2.3 GB</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <Badge className="bg-success text-success-foreground">Healthy</Badge>
                  </div>
                  <Button className="w-full">Manual Backup Now</Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Appearance */}
          <TabsContent value="appearance">
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <Palette className="h-5 w-5 text-primary mr-2" />
                <h3 className="text-lg font-semibold text-foreground">Theme & Display</h3>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="theme">Color Theme</Label>
                    <Select defaultValue="light">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light Mode</SelectItem>
                        <SelectItem value="dark">Dark Mode</SelectItem>
                        <SelectItem value="auto">Auto (System)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="density">Interface Density</Label>
                    <Select defaultValue="comfortable">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="compact">Compact</SelectItem>
                        <SelectItem value="comfortable">Comfortable</SelectItem>
                        <SelectItem value="spacious">Spacious</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="animations">Enable Animations</Label>
                      <p className="text-sm text-muted-foreground">Smooth transitions and effects</p>
                    </div>
                    <Switch id="animations" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="high-contrast">High Contrast Mode</Label>
                      <p className="text-sm text-muted-foreground">Improve readability</p>
                    </div>
                    <Switch id="high-contrast" />
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;