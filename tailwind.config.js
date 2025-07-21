/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
	'./src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
  	container: {
  		center: 'true',
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	transitionAll: {
  		transitionProperty: 'all',
  		transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
  		transitionDuration: '1000ms'
  	},
  	extend: {
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: {
  				DEFAULT: 'hsl(var(--background))',
  				border: 'hsl(var(--background-border))'
  			},
  			foreground: 'hsl(var(--foreground))',
  			'accent-yellow': {
  				DEFAULT: 'hsl(var(--accent-yellow))',
  				foreground: 'hsl(var(--accent-yellow-foreground))',
  				hover: 'hsl(var(--accent-yellow-hover))'
  			},
  			'accent-pink': {
  				DEFAULT: 'hsl(var(--accent-pink))',
  				foreground: 'hsl(var(--accent-pink-foreground))',
  				hover: 'hsl(var(--accent-pink-hover))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				subued: 'hsl(var(--primary-subued))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))',
  				hover: 'hsl(var(--muted-hover))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			navbar: 'hsl(var(--navbar-background-color))',
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		fontSize: {
  			clamp: 'clamp(1rem, 5vw, 3rem)',
  			'clamp-title': 'clamp(2rem, 5vw, 3rem)'
  		},
  		height: {
  			header: 'var(--height-header)',
  			navbar: 'var(--height-navbar)'
  		},
  		padding: {
  			navbar: 'var(--height-navbar)'
  		},
  		margin: {
  			navbar: 'var(--height-navbar)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
			'caret-blink': {
				'0%,70%,100%': { opacity: '1' },
				'20%,50%': { opacity: '0' },
			},
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
			'caret-blink': 'caret-blink 1.25s ease-out infinite',
  		},
  		typography: {
  			DEFAULT: {
  				css: {
  					'--tw-prose-body': '#fff',
  					'--tw-prose-headings': 'hsl(var(--accent-yellow))',
  					'--tw-prose-lead': '#fff',
  					'--tw-prose-links': 'hsl(var(--accent-pink))',
  					'--tw-prose-bold': '#fff',
  					'--tw-prose-counters': '#fff',
  					'--tw-prose-bullets': '#fff',
  					'--tw-prose-hr': '#fff',
  					'--tw-prose-quotes': '#fff',
  					'--tw-prose-quote-borders': '#fff',
  					'--tw-prose-captions': '#fff',
  					'--tw-prose-code': '#fff',
  					'--tw-prose-pre-code': '#fff',
  					'--tw-prose-pre-bg': '#fff',
  					'--tw-prose-th-borders': '#fff',
  					'--tw-prose-td-borders': '#fff',
  					'--tw-prose-invert-body': '#000',
  					'--tw-prose-invert-headings': '#000',
  					'--tw-prose-invert-lead': '#000',
  					'--tw-prose-invert-links': '#000',
  					'--tw-prose-invert-bold': '#000',
  					'--tw-prose-invert-counters': '#000',
  					'--tw-prose-invert-bullets': '#000',
  					'--tw-prose-invert-hr': '#000',
  					'--tw-prose-invert-quotes': '#000',
  					'--tw-prose-invert-quote-borders': '#000',
  					'--tw-prose-invert-captions': '#000',
  					'--tw-prose-invert-code': '#000',
  					'--tw-prose-invert-pre-code': '#000',
  					'--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
  					'--tw-prose-invert-th-borders': '#000',
  					'--tw-prose-invert-td-borders': '#000'
  				}
  			}
  		}
  	}
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
  ],
};
