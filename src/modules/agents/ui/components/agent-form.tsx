
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useTRPC } from "@/trpc/client"
import { agentsInsertSchema } from "../../schemas"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { GeneratedAvatar } from "@/components/generated-avatar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface AgentFormProps {
    onSuccess?: () => void
    onCancel?: () => void
    initialValues?: any
}

export const AgentForm = ({
    onSuccess,
    onCancel,
    initialValues,
}: AgentFormProps) => {
    const trpc = useTRPC();
    const router = useRouter();
    const queryClient = useQueryClient();

    const createAgent = useMutation(
        trpc.agents.create.mutationOptions({
            onSuccess: async () => {
                await queryClient.invalidateQueries(
                   trpc.agents.getMany.queryOptions()
                )

                if(initialValues?.id){
                    await queryClient.invalidateQueries(
                        trpc.agents.getOne.queryOptions({
                            id: initialValues.id
                        })
                    )
                }
                onSuccess?.()
             },
            onError: (e) => { 
                toast.error(e.message)
            },
        })
    )

    const form = useForm<z.infer<typeof agentsInsertSchema>>({
        resolver: zodResolver(agentsInsertSchema),
        defaultValues: {
            name: initialValues?.name ?? "",
            instructions: initialValues?.instructions ?? "",
        }
    })

    const isEdit = !!initialValues?.id
    const isPending = createAgent.isPending

    const onSubmit = (values: z.infer<typeof agentsInsertSchema>) => {
        if (isEdit) {
           console.log("TODO update agent")
        } else {
            createAgent.mutate(values)
        }
    }

    return (
        <Form {...form} >
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <GeneratedAvatar 
                    seed={form.watch("name")}
                    variant="botttsNeutral"
                    className="border size-16"
                />
                <FormField 
                 name="name"
                 control={form.control}
                 render={( {field} ) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="Enter agent name..." />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                 )}/>
                 <FormField 
                 name="instructions"
                 control={form.control}
                 render={( {field} ) => (
                    <FormItem>
                        <FormLabel>Instructions</FormLabel>
                        <FormControl>
                            <Textarea
                             {...field} 
                             placeholder="e.g: You are a helpful assistant that can answer questions." 
                             />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                 )}/>
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
    )
}