// components/ThemeToggle.tsx
import React from 'react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <button
            className="p-2 border rounded"
            onClick={(): void => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
            Cambiar a {theme === 'light' ? 'oscuro 🌙' : 'claro ☀️'}
        </button>
    );
}
