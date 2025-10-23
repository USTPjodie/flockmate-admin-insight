import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings as SettingsIcon, Globe, Bell, Shield, Database, Palette, Save, RefreshCw, MapPin } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">System Settings</h1>
            <p className="text-muted-foreground">Configure system preferences and manage application settings</p>
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

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general">General</TabsTrigger>
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
              
              {/* Farm Management Redirect */}
              <Card className="p-6">
                <div className="flex items-center mb-4">
                  <MapPin className="h-5 w-5 text-primary mr-2" />
                  <h3 className="text-lg font-semibold text-foreground">Farm Management</h3>
                </div>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Farm locations and management have been moved to a dedicated section for better organization.
                  </p>
                  <Button asChild>
                    <Link to="/farms">Go to Farm Management</Link>
                  </Button>
                </div>
              </Card>
            </div>
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
                      <Label htmlFor="fcr-alerts">High FCR Alerts</Label>
                      <p className="text-sm text-muted-foreground">Alert when FCR exceeds target</p>
                    </div>
                    <Switch id="fcr-alerts" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="weight-alerts">Low Weight Alerts</Label>
                      <p className="text-sm text-muted-foreground">Alert when weight is below target</p>
                    </div>
                    <Switch id="weight-alerts" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="feed-alerts">Feed Inventory Alerts</Label>
                      <p className="text-sm text-muted-foreground">Alert when feed inventory is low</p>
                    </div>
                    <Switch id="feed-alerts" defaultChecked />
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
                    <Label>Email Notifications</Label>
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-foreground">Critical Alerts</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-foreground">Performance Reports</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-foreground">System Updates</span>
                        <Switch />
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label>Push Notifications</Label>
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-foreground">Mobile App</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-foreground">Desktop</span>
                        <Switch />
                      </div>
                    </div>
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
                  <h3 className="text-lg font-semibold text-foreground">Authentication</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                    <Input id="session-timeout" type="number" defaultValue="30" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Require 2FA for all admin users</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Single Sign-On</Label>
                      <p className="text-sm text-muted-foreground">Enable SSO integration</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center mb-4">
                  <Shield className="h-5 w-5 text-primary mr-2" />
                  <h3 className="text-lg font-semibold text-foreground">Data Security</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Encryption at Rest</Label>
                      <p className="text-sm text-muted-foreground">Encrypt all data stored in database</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Encryption in Transit</Label>
                      <p className="text-sm text-muted-foreground">Encrypt all data in transit</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Regular Security Audits</Label>
                      <p className="text-sm text-muted-foreground">Perform weekly security scans</p>
                    </div>
                    <Switch defaultChecked />
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
                  <h3 className="text-lg font-semibold text-foreground">Backup Settings</h3>
                </div>
                <div className="space-y-4">
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
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="retention-period">Retention Period</Label>
                    <Select defaultValue="90">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="180">180 days</SelectItem>
                        <SelectItem value="365">1 year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Automatic Backups</Label>
                      <p className="text-sm text-muted-foreground">Enable automated backup process</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center mb-4">
                  <Database className="h-5 w-5 text-primary mr-2" />
                  <h3 className="text-lg font-semibold text-foreground">Data Management</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label>Data Export Format</Label>
                    <Select defaultValue="csv">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                        <SelectItem value="json">JSON</SelectItem>
                        <SelectItem value="pdf">PDF</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Data Anonymization</Label>
                      <p className="text-sm text-muted-foreground">Anonymize data for testing</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="pt-4">
                    <Button variant="outline" className="w-full">
                      Export Current Data
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Appearance */}
          <TabsContent value="appearance">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="flex items-center mb-4">
                  <Palette className="h-5 w-5 text-primary mr-2" />
                  <h3 className="text-lg font-semibold text-foreground">Theme Settings</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="theme">Theme</Label>
                    <Select defaultValue="system">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System Default</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="color-scheme">Color Scheme</Label>
                    <Select defaultValue="default">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Default (Blue)</SelectItem>
                        <SelectItem value="green">Green</SelectItem>
                        <SelectItem value="purple">Purple</SelectItem>
                        <SelectItem value="orange">Orange</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center mb-4">
                  <Palette className="h-5 w-5 text-primary mr-2" />
                  <h3 className="text-lg font-semibold text-foreground">Display Options</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Compact View</Label>
                      <p className="text-sm text-muted-foreground">Reduce spacing for more content</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Show Tooltips</Label>
                      <p className="text-sm text-muted-foreground">Display helpful tooltips</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Animations</Label>
                      <p className="text-sm text-muted-foreground">Enable UI animations</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;