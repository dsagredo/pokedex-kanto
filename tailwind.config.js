import { heroui } from '@heroui/react';

export default {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './app/**/*.{js,ts,jsx,tsx}',
        './node_modules/@heroui/react/**/*.js',
    ],
    darkMode: 'class',
    theme: {
        extend: {},
    },
    plugins: [heroui()],
};
