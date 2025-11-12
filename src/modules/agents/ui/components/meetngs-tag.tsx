import { Badge } from "@/components/ui/badge"
import { VideoIcon } from "lucide-react"

interface Props {
    meetingCount: number
}

export const MeetingsTag = ({ meetingCount }: Props) => {
    return (
        <Badge
            variant="outline"
            className="flex items-center gap-x-2 [&>svg]:size-4">
            <VideoIcon className="text-blue-700" />
            {meetingCount} {meetingCount === 1 ? "Meeting" : "Meetings"}
        </Badge>
    )
}