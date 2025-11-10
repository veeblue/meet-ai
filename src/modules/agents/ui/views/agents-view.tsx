"use client"

import { ErrorState } from "@/components/error-state"
import { LoadingState } from "@/components/loading-state"
import { ResponsiveDialog } from "@/components/responsive-dialog"
import { Button } from "@/components/ui/button"
import { useTRPC } from "@/trpc/client"

import { useQuery, useSuspenseQuery } from "@tanstack/react-query"

export const AgentsView = () => {
    const trpc = useTRPC()
    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions())
    return (
        <div>
            <ResponsiveDialog 
            title="Agents" 
            description="List of agents" 
            open={false}
            onOpenChange={() => { }}
            >
                <Button>
                    some action
                </Button>
            </ResponsiveDialog>
            {JSON.stringify(data, null, 2)}
        </div>
    )
}

export const AgentsViewLoading = () => {
    return (
        <LoadingState title="Loading agents" description="Please wait while we fetch your agents." />
    )
}

export const AgentsViewError = () => {
    return (
        <ErrorState title="Error loading agents" description="Please try again." />
    )
}