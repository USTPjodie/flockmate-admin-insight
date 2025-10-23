/**
 * Centralized Theme Configuration
 * This file makes it easy to modify the design system in one place
 */

export const theme = {
  // Color palette - easily modify colors here
  colors: {
    // Primary colors
    primary: {
      main: '221 83% 53%',
      light: '221 83% 63%',
      dark: '221 83% 43%',
      foreground: '210 40% 98%',
    },
    // Secondary colors
    secondary: {
      main: '210 40% 96%',
      light: '210 40% 98%',
      dark: '210 40% 94%',
      foreground: '222 47% 11%',
    },
    // Accent colors
    accent: {
      main: '262 83% 58%',
      light: '262 83% 68%',
      dark: '262 83% 48%',
      foreground: '210 40% 98%',
    },
    // Status colors
    success: {
      main: '142 76% 36%',
      light: '142 76% 46%',
      dark: '142 76% 26%',
      foreground: '0 0% 100%',
    },
    warning: {
      main: '38 92% 50%',
      light: '38 92% 60%',
      dark: '38 92% 40%',
      foreground: '0 0% 100%',
    },
    error: {
      main: '0 84% 60%',
      light: '0 84% 70%',
      dark: '0 84% 50%',
      foreground: '0 0% 100%',
    },
    // Neutral colors
    background: '0 0% 100%',
    foreground: '222 47% 11%',
    card: '0 0% 100%',
    cardBorder: '214 32% 91%',
    muted: '210 40% 96%',
    mutedForeground: '215 16% 47%',
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
