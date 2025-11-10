import { z } from "zod";

export const agentsInsertSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  instructions: z.string().min(1, { message: "Instructions are required" }),
//   model: z.string(),
//   temperature: z.number(),
//   top_p: z.number(),
//   presence_penalty: z.number(),
//   frequency_penalty: z.number(),
})