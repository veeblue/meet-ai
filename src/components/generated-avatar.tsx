import { createAvatar } from "@dicebear/core"
import { botttsNeutral } from "@dicebear/collection"
import { initials } from "@dicebear/collection"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface GeneratedAvatarProps {
    seed: string
    className?: string
    variant: "botttsNeutral" | "initials"
}

export const GeneratedAvatar = ({
    seed,
    className,
    variant,
}: GeneratedAvatarProps) => {
    const avatar = variant === "botttsNeutral" 
        ? createAvatar(botttsNeutral, {
            seed,
        })
        : createAvatar(initials, {
            seed,
            fontSize: 42,
            fontWeight: 500,
        })

    return (
        <Avatar className={cn(className)}>
            <AvatarImage src={avatar.toDataUri()} alt="Avatar"/>
            <AvatarFallback>
                {seed.charAt(0).toUpperCase()}
            </AvatarFallback>
        </Avatar>
    )
}