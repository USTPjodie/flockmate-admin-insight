# Flockmate Database Schema Diagram

```mermaid
erDiagram
    profiles ||--o{ financial_data : "owns"
    profiles ||--o{ cost_breakdown : "owns"
    profiles ||--o{ farm_performance : "owns"
    profiles ||--o{ alerts : "owns"
    profiles ||--o{ dashboard_metrics : "owns"
    
    profiles {
        uuid id PK
        text email
        text full_name
        text role
        text avatar_url
        timestamp created_at
        timestamp updated_at
    }
    
    financial_data {
        uuid id PK
        text month
        decimal revenue
        decimal cost
        decimal profit
        decimal margin
        timestamp created_at
    }
    
    cost_breakdown {
        uuid id PK
        text name
        integer value
        decimal amount
        timestamp created_at
    }
    
    farm_performance {
        uuid id PK
        text farm_name
        decimal fcr
        decimal mortality
        decimal avg_weight
        decimal cost_per_kg
        timestamp created_at
        timestamp updated_at
    }
    
    alerts {
        uuid id PK
        text type
        text title
        text message
        text farm
        timestamp created_at
        boolean read
    }
    
    dashboard_metrics {
        uuid id PK
        text metric_name
        text metric_value
        text change_percentage
        text change_type
        timestamp created_at
        timestamp updated_at
    }
```

## Table Relationships

All tables are owned by the `profiles` table through Row Level Security policies. Only admin users can access all records, while regular users can only access their own data (where applicable).

## Key Constraints

1. **profiles.role** - Must be one of: 'admin', 'manager', 'operator'
2. **alerts.type** - Must be one of: 'critical', 'warning', 'info', 'success'
3. **dashboard_metrics.change_type** - Must be one of: 'positive', 'negative', 'neutral'
4. **Foreign Key** - profiles.id references auth.users.id with CASCADE DELETE