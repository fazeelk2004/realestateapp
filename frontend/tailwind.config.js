import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        CustomTheme: {
          "primary": "#948979",
          "primary-content": "oklch(100% 0 0)",
          "secondary": "#DFD0B8",
          "secondary-content": "oklch(100% 0 0)",
          "accent": "#866e63",
          "accent-content": "oklch(100% 0 0)",
          "neutral": "#9b8074",
          "neutral-content": "oklch(100% 0 0)",
          "base-100": "#1f140d",
          "base-200": "#34261e",
          "base-300": "#48382f",
          "base-content": "oklch(87.609% 0 0)",
          "info": "oklch(45.201% 0.313 264.052)",
          "info-content": "oklch(89.04% 0.062 264.052)",
          "success": "oklch(51.975% 0.176 142.495)",
          "success-content": "oklch(90.395% 0.035 142.495)",
          "warning": "oklch(96.798% 0.211 109.769)",
          "warning-content": "oklch(19.359% 0.042 109.769)",
          "error": "oklch(62.795% 0.257 29.233)",
          "error-content": "oklch(12.559% 0.051 29.233)",
          "--rounded-box": "1rem",
          "--rounded-btn": "0.5rem",
          "--rounded-badge": "2rem",
          "--tab-radius": "0.5rem",
          "--btn-text-case": "uppercase",
          "--navbar-padding": "0.5rem",
          "--border-btn": "1px",
          "--tab-border": "1px",
          "--animation-btn": "0",
          "--animation-input": "0",
          "--btn-focus-scale": "1",
        }
      },
    ],
  },
}