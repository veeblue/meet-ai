import { useTRPC } from "@/trpc/client";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { CommandSelect } from "@/components/command-select";

export const AgentIdFilter = () => {
    const [filters, setFilters] = useMeetingsFilters();

    const trpc = useTRPC();

    const [agentSearch, setAgentSearch] = useState("");
    const { data } = useQuery(
        trpc.agents.getMany.queryOptions({
            pageSize: 100,
            search: agentSearch,
        }),
    );

    return (
        <CommandSelect
            value={filters.agentId ?? ""}
            onSearch={setAgentSearch}
            onSelect={(value) => setFilters({ ...filters, agentId: value })}
            className="h-9 w-[100px]"
            placeholder="Agent"
            options={(data?.data ?? []).map((agent) => ({
                id: agent.id,
                value: agent.id,
                children: (
                    <div className="flex items-center gap-x-2">
                        <GeneratedAvatar
                            seed={agent.name}
                            variant="botttsNeutral"
                            className="size-4"
                        />
                        {agent.name}
                    </div>
                )
            }))}
        />
    );
};