"use client"

import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { useTRPC } from "@/trpc/client"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

export const HomeView = () => {
    const trpc = useTRPC()
    const { data } = useQuery(trpc.hello.queryOptions({ text: "Yee"}))
    
    return (
        <div className="p-4 flex flex-col gap-4">
            <p>{data?.greeting}</p>
        </div>
    )
}