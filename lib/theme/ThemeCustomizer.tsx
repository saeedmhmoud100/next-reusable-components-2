"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Paintbrush, Moon, Sun, Plus } from "lucide-react";
import { useTheme } from "next-themes";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import ThemeButtons from "./ThemeButtons";

interface ColorConfig {
    id: string;
    color: string;
    name?: string;
}

interface ColorSection {
    key: "primary" | "secondary" | "text";
    label: string;
    cssVar: string;
    defaultLight: string;
    defaultDark: string;
}

const defaultLightColors = {
    primary: "#171717",
    secondary: "#f5f5f5",
    text: "#0a0a0a",
};

const defaultDarkColors = {
    primary: "#fafafa",
    secondary: "#262626",
    text: "#fafafa",
};

const colorSections: ColorSection[] = [
    {
        key: "primary",
        label: "Primary Color",
        cssVar: "--primary",
        defaultLight: defaultLightColors.primary,
        defaultDark: defaultDarkColors.primary,
    },
    {
        key: "secondary",
        label: "Secondary Color",
        cssVar: "--secondary",
        defaultLight: defaultLightColors.secondary,
        defaultDark: defaultDarkColors.secondary,
    },
    {
        key: "text",
        label: "Text Color",
        cssVar: "--foreground",
        defaultLight: defaultLightColors.text,
        defaultDark: defaultDarkColors.text,
    },
];

export function ThemeCustomizer() {
    const { setTheme, theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    const [colorStates, setColorStates] = useState<{
        [key: string]: {
            colors: ColorConfig[];
            selected: string;
            new: string;
        };
    }>({});

    // Initialize color states
    useEffect(() => {
        const initialStates = colorSections.reduce((acc, section) => {
            acc[section.key] = {
                colors: [
                    { id: "default-light", color: section.defaultLight, name: "default light" },
                    { id: "default-dark", color: section.defaultDark, name: "default dark" },
                ],
                selected: theme === 'dark' ? section.defaultDark : section.defaultLight,
                new: theme === 'dark' ? section.defaultDark : section.defaultLight,
            };
            return acc;
        }, {} as any);

        setColorStates(initialStates);
    }, []);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Update selected colors when theme changes
    useEffect(() => {
        if (!mounted) return;

        colorSections.forEach((section) => {
            const newSelected = theme === 'dark' ? section.defaultDark : section.defaultLight;
            setColorStates(prev => ({
                ...prev,
                [section.key]: {
                    ...prev[section.key],
                    selected: newSelected,
                }
            }));
        });
    }, [theme, mounted]);

    const convertHexToHSL = (hex: string): string => {
        hex = hex.replace('#', '');

        const r = parseInt(hex.substring(0, 2), 16) / 255;
        const g = parseInt(hex.substring(2, 4), 16) / 255;
        const b = parseInt(hex.substring(4, 6), 16) / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h = 0;
        let s = 0;
        const l = (max + min) / 2;

        if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
    };

    const addColor = (sectionKey: string, cssVar: string) => {
        const section = colorStates[sectionKey];
        if (!section) return;

        const colorToAdd = section.new;
        const colorExists = section.colors.some(c =>
            c.color.toLowerCase() === colorToAdd.toLowerCase()
        );

        if (colorExists) return;

        const newColor = {
            id: Math.random().toString(36).substr(2, 9),
            color: colorToAdd,
        };

        setColorStates(prev => ({
            ...prev,
            [sectionKey]: {
                ...prev[sectionKey],
                colors: [...prev[sectionKey].colors, newColor],
                selected: newColor.color,
            }
        }));

        document.documentElement.style.setProperty(cssVar, convertHexToHSL(newColor.color));
    };

    const selectColor = (sectionKey: string, cssVar: string, color: string) => {
        setColorStates(prev => ({
            ...prev,
            [sectionKey]: {
                ...prev[sectionKey],
                selected: color,
            }
        }));
        document.documentElement.style.setProperty(cssVar, convertHexToHSL(color));
    };

    if (!mounted) return null;

    return (
        <Sheet>
            <ThemeButtons setTheme={setTheme} theme={theme} />
            <SheetContent className="w-[300px]">
                <SheetHeader>
                    <SheetTitle>Theme Customizer</SheetTitle>
                </SheetHeader>
                <ScrollArea className="h-[calc(100vh-8rem)] pr-4">
                    <div className="space-y-6 mt-4">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Adjust the theme and colors to match your preference
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label>Mode</Label>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                                >
                                    {theme === "light" ? (
                                        <Moon className="h-4 w-4" />
                                    ) : (
                                        <Sun className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>

                            {colorSections.map((section) => (
                                <div key={section.key} className="space-y-2">
                                    <Label>{section.label}</Label>
                                    <div className="space-y-2">
                                        <div className="flex gap-2">
                                            <input
                                                type="color"
                                                value={colorStates[section.key]?.new || '#000000'}
                                                onChange={(e) => setColorStates(prev => ({
                                                    ...prev,
                                                    [section.key]: {
                                                        ...prev[section.key],
                                                        new: e.target.value,
                                                    }
                                                }))}
                                                className="h-10 w-20 cursor-pointer rounded-md border"
                                            />
                                            <Button
                                                onClick={() => addColor(section.key, section.cssVar)}
                                                className="flex-1"
                                            >
                                                <Plus className="h-4 w-4 mr-2" />
                                                Add Color
                                            </Button>
                                        </div>
                                        <div className="grid grid-cols-4 gap-2">
                                            {colorStates[section.key]?.colors.map((color) => (
                                                <div
                                                    key={color.id}
                                                    onClick={() => selectColor(section.key, section.cssVar, color.color)}
                                                    className={cn(
                                                        "aspect-square cursor-pointer rounded-md border relative group",
                                                        colorStates[section.key]?.selected === color.color && "ring-2 ring-primary"
                                                    )}
                                                    style={{ backgroundColor: color.color }}
                                                >
                                                    {color.name && (
                                                        <span className="absolute inset-0 flex items-center text-center justify-center text-xs text-white font-medium opacity-0 group-hover:opacity-100 bg-black/50 transition-opacity rounded-md">
                              {color.name}
                            </span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}