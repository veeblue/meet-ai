
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useTRPC } from "@/trpc/client"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { GeneratedAvatar } from "@/components/generated-avatar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { meetingsInsertSchema } from "../../schema"
import { MeetingGetOne } from "../../types"
import { useState } from "react"
import { CommandSelect } from "@/components/command-select"
import { NewAgentDialog } from "@/modules/agents/ui/components/new-agent-dialog"

interface MeetingFormProps {
    onSuccess?: (id?: string) => void
    onCancel?: () => void
    initialValues?: MeetingGetOne
}

export const MeetingForm = ({
    onSuccess,
    onCancel,
    initialValues,
}: MeetingFormProps) => {
    const trpc = useTRPC();
    const router = useRouter();
    const queryClient = useQueryClient();
    const [agentSearch, setAgentSearch] = useState("")
    const [openNewAgentDialog, setOpenNewAgentDialog] = useState(false)
    const agents = useQuery(
        trpc.agents.getMany.queryOptions({
            pageSize: 100,
            search: agentSearch,
        })
    )
    const createMeeting = useMutation(
        trpc.meetings.create.mutationOptions({
            onSuccess: async () => {
                await queryClient.invalidateQueries(
                    trpc.meetings.getMany.queryOptions({})
                )

                //TODO: invalidate getOne query
                onSuccess?.()
            },
            onError: (e) => {
                toast.error(e.message)
            },
        })
    )

    const updateMeeting = useMutation(
        trpc.meetings.update.mutationOptions({
            onSuccess: async (data) => {
                await queryClient.invalidateQueries(
                    trpc.meetings.getMany.queryOptions({})
                )

                if (initialValues?.id) {
                    await queryClient.invalidateQueries(
                        trpc.meetings.getOne.queryOptions({
                            id: initialValues.id
                        })
                    )
                }
                onSuccess?.(data?.id)
            },
            onError: (e) => {
                toast.error(e.message)
            },
        })
    )

    const form = useForm<z.infer<typeof meetingsInsertSchema>>({
        resolver: zodResolver(meetingsInsertSchema),
        defaultValues: {
            name: initialValues?.name ?? "",
            instructions: initialValues?.instructions ?? "",
        }
    })

    const isEdit = !!initialValues?.id
    const isPending = createMeeting.isPending || updateMeeting.isPending

    const onSubmit = (values: z.infer<typeof meetingsInsertSchema>) => {
        if (isEdit) {
            updateMeeting.mutate({
                id: initialValues.id,
                ...values
            })
        } else {
            createMeeting.mutate(values)
        }
    }

    return (
        <>
            <NewAgentDialog
                open={openNewAgentDialog}
                onOpenChange={setOpenNewAgentDialog}
            />
            <Form {...form} >
                <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        name="name"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Enter meeting name..." />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    <FormField
                        name="agentId"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Agent</FormLabel>
                                <FormControl>
                                    <CommandSelect
                                        onSearch={setAgentSearch}
                                        onSelect={field.onChange}
                                        value={field.value}
                                        placeholder="Search for an agent..."
                                        options={(agents.data?.data ?? []).map((agent) => ({
                                            id: agent.id,
                                            value: agent.id,
                                            children: (
                                                <div className="flex items-center gap-x-2">
                                                    <GeneratedAvatar
                                                        seed={agent.name}
                                                        variant="botttsNeutral"
                                                        className="border size-6"
                                                    />
                                                    <span>{agent.name}</span>
                                                </div>
                                            ),
                                        }))}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Not Found What You're Looking For? {""}
                                    <button
                                    type="button"
                                        className="text-primary hover:underline cursor-pointer"
                                        onClick={() => setOpenNewAgentDialog(true)}
                                    >
                                        Create a new agent
                                    </button>

                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )} />
                    <div className="flex justify-between gap-x-2">
                        {onCancel &&
                            <Button
                                onClick={onCancel}
                                variant="ghost"
                                type="button"
                            >Cancel</Button>}
                        <Button
                            type="submit"
                            disabled={isPending}
                        >
                            {isEdit ? "Update" : "Create"}
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    )
}