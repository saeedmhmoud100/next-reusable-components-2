import {SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {Moon, Paintbrush, Sun} from "lucide-react";


export default function ThemeButtons({theme, setTheme}) {
    return (
        <div className={"fixed flex gap-4 bottom-4 right-4"}>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className=" "
                >
                    <Paintbrush className="h-4 w-4"/>
                </Button>
            </SheetTrigger>
            <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
                {theme === "light" ? (
                    <Moon className="h-4 w-4"/>
                ) : (
                    <Sun className="h-4 w-4"/>
                )}
            </Button>
        </div>
    )
}