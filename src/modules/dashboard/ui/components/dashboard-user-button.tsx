"use client"
import { authClient } from "@/lib/auth-client"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenuTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { GeneratedAvatar } from "@/components/ui/generated-avatar"
import { ChevronDownIcon, ChevronRightIcon, CreditCardIcon, LogOutIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useIsMobile } from "@/hooks/use-mobile"
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"



export const DashboardUserButton = () => {
    const { data, isPending } = authClient.useSession()
    const router = useRouter()
    const isMobile = useIsMobile();
    const onLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/sign-in")
                }
            }
        })
    }
    if (isPending || !data?.user) {
        return null
    }

    if (isMobile) {
        return (
            <Drawer>
                <DrawerTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden">
                    <div className="flex items-center gap-3 overflow-hidden flex-1 min-w-0">
                        {data.user.image ? (
                            <Avatar className="size-8 flex-shrink-0">
                                <AvatarImage src={data.user.image} />
                            </Avatar>
                        ) : (
                            <GeneratedAvatar seed={data.user.name} variant="initials" className="size-8 flex-shrink-0" />
                        )}
                        <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
                            <p className="text-sm truncate w-full">{data.user.name}</p>
                            <p className="text-xs font-normal text-muted-foreground truncate">{data.user.email}</p>
                        </div>
                    </div>
                    <ChevronRightIcon className="size-4 shrink-0" />
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>{data.user.name}</DrawerTitle>
                        <DrawerDescription>{data.user.email}</DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                        <Button
                            variant="outline"
                            onClick={() => {}}
                        >
                            <CreditCardIcon className="size-4 shrink-0" />
                            Billing
                        </Button>
                        <Button
                            variant="outline"
                            onClick={onLogout}
                        >
                            <LogOutIcon className="size-4 shrink-0" />
                            Log Out
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden">
                <div className="flex items-center gap-3 overflow-hidden flex-1 min-w-0">
                    {data.user.image ? (
                        <Avatar className="size-8 flex-shrink-0">
                            <AvatarImage src={data.user.image} />
                        </Avatar>
                    ) : (
                        <GeneratedAvatar seed={data.user.name} variant="initials" className="size-8 flex-shrink-0" />
                    )}
                    <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
                        <p className="text-sm truncate w-full">{data.user.name}</p>
                        <p className="text-xs font-normal text-muted-foreground truncate">{data.user.email}</p>
                    </div>
                </div>
                <ChevronRightIcon className="size-4 shrink-0" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="right" className="w-72">
                <DropdownMenuLabel>
                    <div className="flex flex-col gap-1">
                        <span className="font-medium truncate ">{data.user.name}</span>
                        <span className="text-xs font-normal text-muted-foreground truncate">{data.user.email}</span>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer flex items-center justify-between">
                    Billing
                    <CreditCardIcon className="size-4 shrink-0" />
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="cursor-pointer flex items-center justify-between"
                    onClick={onLogout}>
                    Log Out
                    <LogOutIcon className="size-4 shrink-0" />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}