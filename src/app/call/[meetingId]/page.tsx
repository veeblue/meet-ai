import { auth } from "@/lib/auth";
import { CallView } from "@/modules/call/ui/views/call-view";
import CallLayout from "@/modules/call/layout";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

interface Props {
    params: Promise<{
        meetingId: string;
    }>;
}

const Page = async ({ params }: Props) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/sign-in");
    }

    const { meetingId } = await params;

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(
        trpc.meetings.getOne.queryOptions({ id: meetingId }),
    );

    return (
        <CallLayout>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <CallView meetingId={meetingId} />
            </HydrationBoundary>
        </CallLayout>
    );
}

export default Page