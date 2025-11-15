import { ResponsiveDialog } from "@/components/responsive-dialog";
import { MeetingForm } from "./meeting-form";
import { useRouter } from "next/navigation";
// import { MeetingForm } from "./meeting-form";



interface NewMeetingDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export const NewMeetingDialog = ({ open, onOpenChange }: NewMeetingDialogProps) => {
    const router = useRouter()
    return (
        <ResponsiveDialog
            title="New Meeting"
            description="Create a new meeting"
            open={open}
            onOpenChange={onOpenChange}
        >
            <div className="p-4 flex flex-col gap-4 cursor-pointer">
                <MeetingForm  
                onSuccess={(id) => {
                    onOpenChange(false) 
                    router.push(`/meetings/${id}`)
                }} 
                onCancel={() => onOpenChange(false) }
                />
            </div>
        </ResponsiveDialog>
    )
}