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
          "primary": "oklch(0% 0 0)",
          "primary-content": "oklch(100% 0 0)",
          "secondary": "oklch(76% 0.233 130.85)",
          "secondary-content": "oklch(98% 0.031 120.757)",
          "accent": "oklch(70% 0.04 256.788)",
          "accent-content": "oklch(97% 0.014 343.198)",
          "neutral": "oklch(44% 0.043 257.281)",
          "neutral-content": "oklch(98% 0.003 247.858)",
          "base-100": "oklch(12% 0.042 264.695)",
          "base-200": "oklch(20% 0.042 265.755)",
          "base-300": "oklch(27% 0.041 260.031)",
          "base-content": "oklch(96% 0.007 247.896)",
          "info": "oklch(58% 0.158 241.966)",
          "info-content": "oklch(97% 0.013 236.62)",
          "success": "oklch(59% 0.145 163.225)",
          "success-content": "oklch(97% 0.021 166.113)",
          "warning": "oklch(64% 0.222 41.116)",
          "warning-content": "oklch(98% 0.016 73.684)",
          "error": "oklch(57% 0.245 27.325)",
          "error-content": "oklch(97% 0.013 17.38)",
          "--rounded-box": "1rem",
          "--rounded-btn": "0.5rem",
          "--rounded-badge": "2rem",
          "--tab-radius": "1rem",
          "--btn-text-case": "uppercase",
          "--navbar-padding": "0.25rem",
          "--border-btn": "2px",
          "--tab-border": "2px",
          "--animation-btn": "0",
          "--animation-input": "0",
          "--btn-focus-scale": "1"
        }
      },
    ],
  },
}