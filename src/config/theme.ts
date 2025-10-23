/**
 * Centralized Theme Configuration
 * This file makes it easy to modify the design system in one place
 */

export const theme = {
  // Color palette - easily modify colors here
  colors: {
    // Primary colors (#004030 as main)
    primary: {
      main: '160 100% 12.5%', // #004030
      light: '160 100% 20%',  // Lighter variant
      dark: '160 100% 8%',    // Darker variant
      foreground: '45 30% 97%', // #FFF9E5
    },
    // Secondary colors (#4A9782 as main)
    secondary: {
      main: '165 35% 45%',    // #4A9782
      light: '165 35% 55%',   // Lighter variant
      dark: '165 35% 35%',    // Darker variant
      foreground: '45 30% 97%', // #FFF9E5
    },
    // Accent colors (#DCD0A8 as main)
    accent: {
      main: '45 20% 76%',     // #DCD0A8
      light: '45 20% 85%',    // Lighter variant
      dark: '45 20% 65%',     // Darker variant
      foreground: '160 100% 12.5%', // #004030
    },
    // Status colors
    success: {
      main: '165 35% 45%',    // #4A9782
      light: '165 35% 55%',   // Lighter variant
      dark: '165 35% 35%',    // Darker variant
      foreground: '45 30% 97%', // #FFF9E5
    },
    warning: {
      main: '45 20% 76%',     // #DCD0A8
      light: '45 20% 85%',    // Lighter variant
      dark: '45 20% 65%',     // Darker variant
      foreground: '160 100% 12.5%', // #004030
    },
    error: {
      main: '0 80% 30%',      // Complementary red
      light: '0 80% 40%',     // Lighter variant
      dark: '0 80% 20%',      // Darker variant
      foreground: '45 30% 97%', // #FFF9E5
    },
    // Neutral colors
    background: '45 30% 97%',     // #FFF9E5
    foreground: '160 100% 12.5%', // #004030
    card: '45 30% 97%',           // #FFF9E5
    cardBorder: '45 20% 76%',     // #DCD0A8
    muted: '45 20% 85%',          // Light #DCD0A8
    mutedForeground: '160 100% 12.5%', // #004030
  },

  // Typography
  typography: {
    fontFamily: {
      sans: 'Inter, system-ui, -apple-system, sans-serif',
      mono: 'ui-monospace, monospace',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },

  // Spacing (in rem)
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },

  // Border radius
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },

  // Transitions
  transitions: {
    fast: '150ms',
    base: '200ms',
    slow: '300ms',
  },

  // Z-index layers
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
} as const;

export type Theme = typeof theme;
