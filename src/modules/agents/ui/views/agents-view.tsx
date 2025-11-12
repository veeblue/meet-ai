"use client"

import { ErrorState } from "@/components/error-state"
import { LoadingState } from "@/components/loading-state"
import { ResponsiveDialog } from "@/components/responsive-dialog"
import { Button } from "@/components/ui/button"
import { useTRPC } from "@/trpc/client"

import { useQuery, useSuspenseQuery } from "@tanstack/react-query"
import { DataTable } from "../components/data-table"
import { columns } from "../components/columns"
import { EmptyState } from "@/components/empty-state"
import { useAgentsFilters } from "../../hooks/use-agents-filters"
import { DataPagination } from "../components/data-pagination"
import { useRouter } from "next/navigation"

export const AgentsView = () => {
    const trpc = useTRPC()
    const [ filters, setFilters ] = useAgentsFilters()
    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions({...filters}))
    const router = useRouter()

    return <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
        <DataTable  data={data.data} columns={columns} onRowClick={(row) => router.push(`/agents/${row.id}`)} />
        <DataPagination totalPages={data.totalPages} page={filters.page} onPageChange={(page) => setFilters({ page })} />
        {data.data.length === 0 && (
            <EmptyState title="Create your first agent" description="Create an agent to join your meetings. Each agent will follow your instructions and can interact with participants during the call." />
        )}
    </div>
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