"use client"
import { CommandResponsiveDialog, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { CommandIcon } from "lucide-react"
import { SearchIcon } from "lucide-react"
import { Dispatch, SetStateAction } from "react"

interface Props{
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}
export const DashboardCommand = ({ open, setOpen }: Props) => {
    return (
        <CommandResponsiveDialog open={open} onOpenChange={setOpen}>
            <CommandInput 
                placeholder="Find a meeting or agent"
            />
            <CommandList>
                <CommandItem>
                    <CommandIcon>
                        Test
                    </CommandIcon>
                </CommandItem>
            </CommandList>
        </CommandResponsiveDialog>
    )
}