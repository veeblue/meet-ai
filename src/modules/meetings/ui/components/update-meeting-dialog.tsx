import { ResponsiveDialog } from "@/components/responsive-dialog";
import { MeetingForm } from "./meeting-form";
import { useRouter } from "next/navigation";
import { MeetingGetOne } from "../../types";
// import { MeetingForm } from "./meeting-form";



interface UpdateMeetingDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    initialValues?: MeetingGetOne
}

export const UpdateMeetingDialog = ({ open, onOpenChange, initialValues }: UpdateMeetingDialogProps) => {
    const router = useRouter()
    return (
        <ResponsiveDialog
            title="Update Meeting"
            description="Update the meeting details"
            open={open}
            onOpenChange={onOpenChange}
        >
            <div className="p-4 flex flex-col gap-4 cursor-pointer">
                <MeetingForm  
                onSuccess={(id) => {
                    onOpenChange(false) 
                }} 
                onCancel={() => onOpenChange(false) }
                initialValues={initialValues}
                />
            </div>
        </ResponsiveDialog>
    )
}