/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: ['./src/**/*.{js,jsx}'],
    theme: {
        extend: {
            colors: {
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    fg: 'hsl(var(--accent-fg))',
                },
                bg: {
                    DEFAULT: 'hsl(var(--bg))',
                    secondary: 'hsl(var(--bg-secondary))',
                },
                surface: {
                    DEFAULT: 'hsl(var(--surface))',
                    hover: 'hsl(var(--surface-hover))',
                },
                border: 'hsl(var(--border))',
                fg: {
                    DEFAULT: 'hsl(var(--fg))',
                    muted: 'hsl(var(--fg-muted))',
                },
            },
            fontFamily: {
                display: ['Syne', 'sans-serif'],
                body: ['DM Sans', 'sans-serif'],
            },
        },
    },
    plugins: [],
}