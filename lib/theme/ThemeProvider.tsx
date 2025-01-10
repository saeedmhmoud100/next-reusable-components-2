"use client";

import {ThemeProvider as NextThemesProvider} from "next-themes";
import {type ThemeProviderProps} from "next-themes/dist/types";
import {ThemeCustomizer} from "@/lib/theme/ThemeCustomizer";

export function ThemeProvider({children, ...props}: ThemeProviderProps) {
    return <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        suppressHydrationWarning
        {...props}>
                {children}
                <ThemeCustomizer/>
            </NextThemesProvider>;
}