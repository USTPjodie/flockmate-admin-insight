# Data Hooks Documentation

This directory contains all the React hooks for integrating with the Supabase database. Each hook provides a consistent API for fetching, creating, updating, and deleting data.

## Available Hooks

### User Management
- `useUsers` - Manage user profiles and authentication
- `useSupabaseAuth` - Handle authentication state

### Farm Management
- `useFarms` - Manage farm information (locations, capacity, status)

### Financial Data
- `useFinancialData` - Manage financial records and cost breakdowns

### Performance Tracking
- `usePerformanceData` - Read-only access to farm performance metrics
- `useFarmPerformance` - Full CRUD operations for performance data

### System Data
- `useAlerts` - Manage system alerts and notifications
- `useDashboardMetrics` - Manage dashboard KPIs and metrics
- `useReports` - Manage report generation (currently uses mock data)

### Utilities
- `useExportTemplates` - Handle data export functionality
- `useToast` - Display notifications
- `useMobile` - Mobile device detection

## Usage Patterns

All hooks follow a consistent pattern:

```typescript
const { data, isLoading, isError, error, operation } = useHookName();

// For mutations:
const { mutate } = useHookName();
mutate(data);
```

### Data Fetching
```typescript
const { farms, isLoading } = useFarms();
```

### Data Creation
```typescript
const { addFarm } = useFarms();
addFarm({ name: 'New Farm', location: 'Location', capacity: 10000, status: 'active' });
```

### Data Updates
```typescript
const { updateFarm } = useFarms();
updateFarm({ id: 'farm-id', updates: { status: 'inactive' } });
```

### Data Deletion
```typescript
const { deleteFarm } = useFarms();
deleteFarm('farm-id');
```

## Error Handling

All hooks include proper error handling with toast notifications for user feedback. Errors are automatically displayed using the toast system.

## Caching and Refetching

All hooks use React Query for automatic caching and refetching. Data is automatically invalidated and refetched after mutations to ensure consistency.

## Type Safety

All hooks provide full TypeScript support with proper typing for data structures based on the Supabase database schema.