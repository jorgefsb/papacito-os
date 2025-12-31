/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Bitrix24 Inspired Palette
                os: {
                    blue: {
                        DEFAULT: '#2FC7F7', // Bitrix Cyan/Blue
                        dark: '#0066A1',    // Deep Business Blue
                        light: '#E5F9FF',   // Subtle Backgrounds
                    },
                    green: {
                        DEFAULT: '#9DCF00', // Bitrix-like Action Green (adjusted for readability)
                        light: '#F2FBD0',
                    },
                    gray: {
                        50: '#F5F7F8', // Main App BG
                        100: '#EEF2F4', // Secondary BG
                        200: '#D9DDE0', // Borders
                        800: '#333333', // Text Main
                        900: '#1C2126', // Sidebar Dark
                    }
                }
            },
            fontFamily: {
                sans: ['Montserrat', 'Inter', 'sans-serif'],
                body: ['Open Sans', 'sans-serif'],
            },
            boxShadow: {
                'card': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                'os': '0 2px 8px rgba(0,0,0,0.08)',
            }
        },
    },
    plugins: [],
}
