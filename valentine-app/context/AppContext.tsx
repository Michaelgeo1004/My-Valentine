"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "light" | "dark" | "rainbow";
type Lang = "en" | "ta";

interface AppContextType {
    theme: Theme;
    setTheme: (t: Theme) => void;
    lang: Lang;
    setLang: (l: Lang) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>("light");
    const [lang, setLang] = useState<Lang>("en");
    const [mount, setMount] = useState(false);

    useEffect(() => {
        // Initial load from localStorage
        const savedTheme = localStorage.getItem("valentine-theme") as Theme;
        const savedLang = localStorage.getItem("valentine-lang") as Lang;

        if (savedTheme) setTheme(savedTheme);
        if (savedLang) setLang(savedLang);

        setMount(true);
    }, []);

    useEffect(() => {
        if (mount) {
            document.documentElement.classList.remove("light", "dark", "rainbow");
            document.documentElement.classList.add(theme);
            localStorage.setItem("valentine-theme", theme);
        }
    }, [theme, mount]);

    useEffect(() => {
        if (mount) {
            localStorage.setItem("valentine-lang", lang);
        }
    }, [lang, mount]);

    if (!mount) return null;

    return (
        <AppContext.Provider value={{ theme, setTheme, lang, setLang }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) throw new Error("useAppContext must be used within AppContextProvider");
    return context;
}
