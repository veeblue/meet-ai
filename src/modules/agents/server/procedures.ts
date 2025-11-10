import { db } from "@/db";
import { agents } from "@/db/schema";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { agentsInsertSchema } from "../schemas";
import { eq } from "drizzle-orm";
import { z } from "zod";


export const agentsRouter = createTRPCRouter({
    getOne: baseProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input }) => {
            const [existingAgent] = await db.select().from(agents).where(eq(agents.id, input.id));
            // throw new Error("Error loading agents");
            return existingAgent;
        }),
    getMany: baseProcedure.query(async () => {
        const data = await db.select().from(agents);
        // throw new Error("Error loading agents");
        return data;
    }),
    create: protectedProcedure
        .input(agentsInsertSchema)
        .mutation(async ({ input, ctx }) => {
            const [createdAgent] = await db
                .insert(agents)
                .values({
                    ...input,
                    userId: ctx.session.user.id
                })
                .returning();

            return createdAgent;
        })
})