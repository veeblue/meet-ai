import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AgentForm } from "./agent-form";
import { AgentGetOne } from "../../types";

interface UpdateAgentDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    initialValues?: AgentGetOne
}

export const UpdateAgentDialog = ({ open, onOpenChange, initialValues }: UpdateAgentDialogProps) => {
    return (
        <ResponsiveDialog
            title="Update Agent"
            description="Update the agent"
            open={open}
            onOpenChange={onOpenChange}
        >
            <div className="p-4 flex flex-col gap-4 cursor-pointer">
                <AgentForm  
                onSuccess={() => onOpenChange(false) } 
                onCancel={() => onOpenChange(false) }
                initialValues={initialValues}
                />
            </div>
        </ResponsiveDialog>
    )
}