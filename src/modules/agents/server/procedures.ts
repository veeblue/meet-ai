import { db } from "@/db";
import { agents } from "@/db/schema";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { agentsInsertSchema } from "../schemas";
import { eq, getTableColumns, sql, and, like, desc, count } from "drizzle-orm";
import { z } from "zod";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, MIN_PAGE_SIZE } from "@/constant";
import { TRPCError } from "@trpc/server";


export const agentsRouter = createTRPCRouter({
    getOne: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input, ctx }) => {
            const [existingAgent] = await db
                .select({
                    ...getTableColumns(agents),
                    meetingCount: sql<number>`5`,
                })
                .from(agents)
                .where(
                    and(
                        eq(agents.id, input.id),
                        eq(agents.userId, ctx.session.user.id),
                    ),
                );
            if (!existingAgent) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Agent not found",
                });
            }
            return existingAgent;
        }),
    getMany: protectedProcedure
        .input(z.object({
            page: z.number().default(DEFAULT_PAGE),
            pageSize: z
                .number()
                .min(MIN_PAGE_SIZE)
                .max(MAX_PAGE_SIZE)
                .default(DEFAULT_PAGE_SIZE),
            search: z.string().nullish()
            })
        )
        .query(async ({ input, ctx }) => {
            const { search, page, pageSize } = input;
            const data = await db
                .select({
                    ...getTableColumns(agents),
                    meetingCount: sql<number>`5`,
                })
                .from(agents)
                .where(
                    and(
                        eq(agents.userId, ctx.session.user.id),
                        search ? like(agents.name, `%${search}%`) : undefined,
                    )
                )
                .orderBy(desc(agents.createdAt), desc(agents.id))
                .limit(pageSize)
                .offset((page - 1) * pageSize);
            const [total] = await db
            .select({ count: count()})
            .from(agents)
            .where(
                and(
                    eq(agents.userId, ctx.session.user.id),
                    search ? like(agents.name, `%${search}%`) : undefined,
                )
            );
            const totalPages = Math.ceil(total.count / pageSize);
            return {
                data,
                total,
                totalPages,
            };
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