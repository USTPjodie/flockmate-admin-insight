import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users as UsersIcon, Search, Plus, Filter, Edit, Trash2, Shield, UserCheck, UserX, Mail } from "lucide-react";
import { useUsers } from "@/hooks/useUsers";
import { useState } from "react";

const users = [
  {
    id: "USR-001",
    name: "John Smith",
    email: "john.smith@flockmate.com",
    role: "Farm Manager",
    farms: ["Greenfield A", "Greenfield B"],
    status: "active",
    lastLogin: "2024-03-31 14:32",
    joinDate: "2023-01-15"
  },
  {
    id: "USR-002", 
    name: "Sarah Johnson",
    email: "sarah.johnson@flockmate.com",
    role: "Poultry Technician",
    farms: ["Valley B"],
    status: "active",
    lastLogin: "2024-03-31 09:15",
    joinDate: "2023-03-22"
  },
  {
    id: "USR-003",
    name: "Mike Chen",
    email: "mike.chen@flockmate.com", 
    role: "Management Admin",
    farms: ["All Farms"],
    status: "active",
    lastLogin: "2024-03-31 16:45",
    joinDate: "2022-11-08"
  },
  {
    id: "USR-004",
    name: "Lisa Davis",
    email: "lisa.davis@flockmate.com",
    role: "Farm Manager",
    farms: ["Hillside C"],
    status: "inactive",
    lastLogin: "2024-03-25 11:20",
    joinDate: "2023-05-12"
  },
  {
    id: "USR-005",
    name: "Robert Wilson",
    email: "robert.wilson@flockmate.com",
    role: "Poultry Technician", 
    farms: ["Riverside D"],
    status: "pending",
    lastLogin: "Never",
    joinDate: "2024-03-30"
  }
];

const userStats = [
  { label: "Total Users", value: 24, icon: UsersIcon },
  { label: "Active Users", value: 18, icon: UserCheck },
  { label: "Pending Invites", value: 3, icon: Mail },
  { label: "Inactive Users", value: 3, icon: UserX },
];

const rolePermissions = {
  "Management Admin": {
    color: "bg-primary text-primary-foreground",
    permissions: ["Full Access", "User Management", "Financial Data", "System Settings"]
  },
  "Farm Manager": {
    color: "bg-success text-success-foreground", 
    permissions: ["Farm Operations", "Batch Management", "Performance Data", "Reports"]
  },
  "Poultry Technician": {
    color: "bg-accent text-accent-foreground",
    permissions: ["Data Entry", "Health Records", "Feed Management", "Basic Reports"]
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge className="bg-success text-success-foreground">Active</Badge>;
    case "inactive":
      return <Badge variant="secondary">Inactive</Badge>;
    case "pending":
      return <Badge variant="outline">Pending</Badge>;
    default:
      return <Badge variant="destructive">Unknown</Badge>;
  }
};

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

const Users = () => {
  const { users: dbUsers, isLoading } = useUsers();
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter users based on selected filters
  const filteredUsers = dbUsers.filter(user => {
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesSearch = searchQuery === '' || 
      user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const userStats = [
    { label: "Total Users", value: dbUsers.length, icon: UsersIcon },
    { label: "Admin Users", value: dbUsers.filter(u => u.role === 'admin').length, icon: UserCheck },
    { label: "Active Users", value: dbUsers.filter(u => u.role === 'admin').length, icon: Mail },
    { label: "Total Profiles", value: dbUsers.length, icon: UserX },
  ];

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Loading users...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">User Management</h1>
            <p className="text-muted-foreground">Manage user accounts, roles, and permissions</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Mail className="h-4 w-4 mr-2" />
              Send Invites
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>

        {/* User Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {userStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6 text-center">
                <Icon className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            );
          })}
        </div>

        {/* Filters and Search */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">User Directory</h3>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search users..."
                  className="pl-10 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">User</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Role</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Assigned Farms</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Last Login</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={index} className="border-b border-border hover:bg-muted/50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {getInitials(user.full_name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-foreground">{user.full_name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className="bg-primary text-primary-foreground">
                        {user.role}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm text-foreground">
                        All Farms
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Badge className="bg-success text-success-foreground">Active</Badge>
                    </td>
                    <td className="py-4 px-4 text-foreground">{new Date(user.created_at).toLocaleDateString()}</td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Shield className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Role Permissions Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {Object.entries(rolePermissions).map(([role, config]) => (
            <Card key={role} className="p-6">
              <div className="flex items-center mb-4">
                <Badge className={config.color}>{role}</Badge>
              </div>
              <h4 className="font-semibold text-foreground mb-3">Permissions</h4>
              <ul className="space-y-2">
                {config.permissions.map((permission, index) => (
                  <li key={index} className="flex items-center text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                    {permission}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <h4 className="font-semibold text-foreground mb-2">Bulk Actions</h4>
            <p className="text-sm text-muted-foreground mb-4">Perform actions on multiple users</p>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Mail className="h-4 w-4 mr-2" />
                Send Bulk Invites
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <UserCheck className="h-4 w-4 mr-2" />
                Activate Users
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Shield className="h-4 w-4 mr-2" />
                Update Permissions
              </Button>
            </div>
          </Card>
          
          <Card className="p-6">
            <h4 className="font-semibold text-foreground mb-2">User Analytics</h4>
            <p className="text-sm text-muted-foreground mb-4">User activity and engagement</p>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Daily Active Users</span>
                <span className="font-medium text-foreground">15</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Weekly Active Users</span>
                <span className="font-medium text-foreground">22</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Avg Session Time</span>
                <span className="font-medium text-foreground">45 min</span>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <h4 className="font-semibold text-foreground mb-2">Security Settings</h4>
            <p className="text-sm text-muted-foreground mb-4">System security configuration</p>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Shield className="h-4 w-4 mr-2" />
                Password Policy
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <UserCheck className="h-4 w-4 mr-2" />
                Two-Factor Auth
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <UsersIcon className="h-4 w-4 mr-2" />
                Session Management
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Users;