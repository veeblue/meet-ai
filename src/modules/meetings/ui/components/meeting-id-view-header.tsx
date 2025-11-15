import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronRightIcon, MoreVerticalIcon, PencilIcon, TrashIcon } from "lucide-react"
import Link from "next/link"


interface Props {
    meetingId: string
    meetingName?: string
    onEdit: () => void
    onRemove: () => void
}

export const MeetingIdViewHeader = ({ meetingId, meetingName, onEdit, onRemove }: Props) => {
    return (
        <div className="flex items-center justify-between">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild className="font-medium text-xl">
                            <Link href="/meetings">My Meetings</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="text-foreground text-xl font-medium [&>svg]:size-4" >
                        <ChevronRightIcon />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild className="font-medium text-xl text-foreground">
                            <Link href={`/meetings/${meetingId}`}>{meetingName}</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="cursor-pointer">
                        <MoreVerticalIcon />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={onEdit}>
                        <PencilIcon className="size-4 mr-2 text-black cursor-pointer" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onRemove}>
                        <TrashIcon className="size-4 mr-2 text-black cursor-pointer" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}