"use client"
import { Button } from "@/components/ui/button"
import { NewAgentDialog } from "./new-agent-dialog"
import { useState } from "react"

export const AgentsListHeader = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    return (
        <>
            <NewAgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
            <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
                <div className="flex items-center justify-between">
                    <h5 className="text-2xl font-bold">My Agents</h5>
                    <Button onClick={() => setIsDialogOpen(true)}>New Agent</Button>
                </div>
            </div>
        </>

    )
}