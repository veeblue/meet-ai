import { ReactNode, useState } from "react";
import { Button } from "./ui/button";
import { ChevronsUpDownIcon, CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    CommandResponsiveDialog,
    CommandEmpty,
    CommandInput,
    CommandItem,
    CommandList,
    CommandShortcut,
} from "@/components/ui/command";

interface Props {
    options: Array<{
        id: string,
        value: string,
        children: ReactNode,
    }>
    onSelect: (value: string) => void
    onSearch?: (value: string) => void
    value: string
    placeholder?: string
    isSearchable?: boolean
    className?: string
}

export const CommandSelect = ({
    options,
    onSelect,
    onSearch,
    value,
    placeholder = "Select an option...",
    isSearchable = true,
    className,
}: Props) => {
    const [open, setOpen] = useState(false)
    const selectedOption = options.find((option) => option.value === value)

    return (
        <>
            <Button
                onClick={() => setOpen(!open)}
                type="button"
                aria-expanded={open}
                role="combobox"
                variant="outline"
                className={cn(
                    "h-9 w-full justify-between px-2 font-normal",
                    "transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    !isSearchable && "text-muted-foreground",
                    className,
                )}
            >
                <span className={cn("truncate", selectedOption ? "text-foreground" : "text-muted-foreground")}>
                    {selectedOption?.children ?? placeholder}
                </span>
                <ChevronsUpDownIcon className={cn("size-4 opacity-70 transition-transform", open && "rotate-180")} />
            </Button>
            <CommandResponsiveDialog open={open} onOpenChange={setOpen} shouldFilter={!onSearch}>
                <CommandInput
                    placeholder={"Search..."}
                    onValueChange={onSearch}
                />
                <CommandList className="max-h-64 overflow-y-auto">
                    <CommandEmpty>
                        <span className="text-muted-foreground text-sm">No options found.</span>
                    </CommandEmpty>
                    {options.map((option) => {
                        const isSelected = option.value === value
                        return (
                            <CommandItem
                                key={option.id}
                                onSelect={() => {
                                    onSelect(option.value)
                                    setOpen(false)
                                }}
                                className={cn("flex items-center gap-2", isSelected && "bg-accent/60")}
                            >
                                <span className="truncate">{option.children}</span>
                                {isSelected ? (
                                    <CheckIcon className="ml-auto size-4 text-primary" />
                                ) : (
                                    <CommandShortcut className="ml-auto">↵</CommandShortcut>
                                )}
                            </CommandItem>
                        )
                    })}
                </CommandList>
            </CommandResponsiveDialog>
        </>
    )
}