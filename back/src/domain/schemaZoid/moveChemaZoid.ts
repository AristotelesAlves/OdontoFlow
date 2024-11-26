import { z } from "zod";




export const findAllMoveSchema = z.object({
    page: z.string(), 
    limit: z.string(), 
});
