/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./app/**/*.{js,ts,jsx,tsx}',
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		// Or if using `src` directory:
		'./src/**/*.{js,ts,jsx,tsx}', 
		'../prefab-header-module/**/*.{js,ts,jsx,tsx}',
		'../prefab-footer-module/**/*.{js,ts,jsx,tsx}',
		'../prefab-appcontent-module/**/*.{js,ts,jsx,tsx}',
		'../prefab-auth-service-module/**/*.{js,ts,jsx,tsx}',
		'../prefab-shared-styles-module/**/*.{js,ts,jsx,tsx}',
		'../prefab-mfehost-module/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
	  extend: {
		screens: {
		  xs: '475px',
		  sm: '575px',
		  md: '768px',
		  lg: '1024px',
		  xl: '1280px',
		  '2xl': '1536px',
		  '3xl': '1920px',
		},
		borderRadius: {
		  lg: 'var(--radius)',
		  md: 'calc(var(--radius) - 2px)',
		  sm: 'calc(var(--radius) - 4px)',
		},
		spacing: {
		  128: '32rem',
		  144: '36rem',
		},
		colors: {
		  background: 'hsl(var(--background))',
		  foreground: 'hsl(var(--foreground))',
		  card: {
			DEFAULT: 'hsl(var(--card))',
			foreground: 'hsl(var(--card-foreground))',
		  },
		  popover: {
			DEFAULT: 'hsl(var(--popover))',
			foreground: 'hsl(var(--popover-foreground))',
		  },
		  primary: {
			DEFAULT: 'hsl(var(--primary))',
			foreground: 'hsl(var(--primary-foreground))',
		  },
		  secondary: {
			DEFAULT: 'hsl(var(--secondary))',
			foreground: 'hsl(var(--secondary-foreground))',
		  },
		  muted: {
			DEFAULT: 'hsl(var(--muted))',
			foreground: 'hsl(var(--muted-foreground))',
		  },
		  accent: {
			DEFAULT: 'hsl(var(--accent))',
			foreground: 'hsl(var(--accent-foreground))',
		  },
		  destructive: {
			DEFAULT: 'hsl(var(--destructive))',
			foreground: 'hsl(var(--destructive-foreground))',
		  },
		  border: 'hsl(var(--border))',
		  input: 'hsl(var(--input))',
		  ring: 'hsl(var(--ring))',
		  chart: {
			1: 'hsl(var(--chart-1))',
			2: 'hsl(var(--chart-2))',
			3: 'hsl(var(--chart-3))',
			4: 'hsl(var(--chart-4))',
			5: 'hsl(var(--chart-5))',
		  },
		  info: '#007bff',
		  danger: '#e5000c',
		  light: '#F9FAFB',
		},
	  },
	},
	plugins: [require('tailwindcss-animate')],
  }
  