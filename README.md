# Flockmate - Poultry Farm Management System

A comprehensive farm operations dashboard for monitoring and analyzing poultry farm performance with real-time data integration.

## Project info

**URL**: https://lovable.dev/projects/354dfa37-46d4-4c1d-8b9a-1edc70a47e01

## Features

- **Dashboard**: Real-time farm metrics and KPIs
- **Financial Analytics**: P&L analysis and batch profitability  
- **Performance Tracking**: FCR, mortality, and growth metrics
- **Farm Comparisons**: Multi-farm performance benchmarking
- **Reports**: Generate custom reports and analytics
- **Data Export**: Export data in multiple formats
- **User Management**: Role-based access control
- **Settings**: Comprehensive system configuration

## Database Configuration

This project now uses a new Supabase database:

- **Project ID**: `weonltiidlnpgvanwvba`
- **URL**: `https://weonltiidlnpgvanwvba.supabase.co`

Environment variables have been updated in the `.env` file to reflect this change.

## Database Setup and Management

This project includes several utility scripts for database management in the `scripts/` directory:

### Available Scripts

- `npm run verify-db` - Verifies database connectivity and table accessibility
- `npm run verify-schema-db` - Checks that all required tables exist in the database
- `npm run populate-db` - Populates the database with sample data (requires Service Role Key)
- `npm run create-admin` - Creates an admin user for the application (requires Service Role Key)
- `npm run get-service-key` - Displays instructions for obtaining the Supabase Service Role Key

See `scripts/README.md` for detailed information about each script.

## Theme Configuration

The design system is centralized in `src/config/theme.ts` for easy customization of colors, spacing, typography, and more.

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/354dfa37-46d4-4c1d-8b9a-1edc70a47e01) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/354dfa37-46d4-4c1d-8b9a-1edc70a47e01) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)